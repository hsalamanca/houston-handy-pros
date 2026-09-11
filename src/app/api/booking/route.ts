import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';
import { insertBooking, upsertCustomer } from '@/lib/db';
import { notifyCustomerBooking, notifyOwnerNewBooking, type BookingNotice } from '@/lib/notify';

export async function POST(req: NextRequest) {
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  try {
    const body = (await req.json()) as Partial<BookingNotice>;
    const booking: BookingNotice = {
      service: String(body.service ?? '').trim(),
      description: String(body.description ?? '').trim(),
      date: String(body.date ?? '').trim(),
      time: String(body.time ?? '').trim(),
      address: String(body.address ?? '').trim(),
      name: String(body.name ?? '').trim(),
      email: String(body.email ?? '').trim(),
      phone: String(body.phone ?? '').trim(),
      isEmergency: Boolean(body.isEmergency),
    };

    if (!booking.service || !booking.name || !booking.email || !booking.phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Owner notify first so a paused database cannot drop the lead.
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
