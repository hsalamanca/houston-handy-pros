import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';
import { insertBooking, upsertCustomer } from '@/lib/db';
import { notifyCustomerBooking, notifyOwnerNewBooking } from '@/lib/notify';
import { allowedOrigin, parsePublicBooking, tooLarge } from '@/lib/validate';

export async function POST(req: NextRequest) {
  if (!allowedOrigin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  if (tooLarge(req)) return NextResponse.json({ error: 'Request too large' }, { status: 413 });

  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const parsed = parsePublicBooking(body);
    if ('honeypot' in parsed) return NextResponse.json({ success: true, persisted: true });
    if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });

    const booking = {
      service: parsed.service,
      description: parsed.description,
      date: parsed.date,
      time: parsed.time,
      address: parsed.address,
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone,
      isEmergency: parsed.isEmergency,
    };

    const ownerNotified = await notifyOwnerNewBooking(booking).catch((err) => {
      console.error('Owner booking notify failed:', err);
      return false;
    });

    await Promise.allSettled([notifyCustomerBooking(booking)]);

    let bookingId: string | null = null;
    let persisted = false;
    try {
      const saved = await insertBooking({
        service: booking.service,
        description: booking.description,
        preferred_date: booking.date,
        preferred_time: booking.time,
        address: booking.address,
        customer_name: booking.name,
        customer_email: booking.email,
        customer_phone: booking.phone,
        is_emergency: booking.isEmergency ?? false,
        source: 'book',
      });
      bookingId = saved.id;
      persisted = true;
      await upsertCustomer({
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        address: booking.address,
      }).catch((err) => console.error('Customer upsert failed:', err));
    } catch (err) {
      console.error('Booking DB save failed (owner still notified):', err);
    }

    if (!persisted && !ownerNotified) {
      return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
    }

    return NextResponse.json({ success: true, bookingId, persisted });
  } catch (err) {
    console.error('Booking API error:', err);
    return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
  }
}
