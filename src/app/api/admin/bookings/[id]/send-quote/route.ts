import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/admin-auth';
import { getBooking, updateBooking } from '@/lib/db';
import { parseQuoteItems } from '@/lib/quote';
import { sendCustomerQuote } from '@/lib/notify';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest(req))) return unauthorized();
  const { id } = await params;
  let booking = await getBooking(id);
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  try {
    const body = await req.json().catch(() => ({}));
    if (body.quote_items) {
      booking = await updateBooking(id, { quote_items: parseQuoteItems(body.quote_items) });
    }
    const items = booking.quote_items;
    if (!items.length) return NextResponse.json({ error: 'Add at least one priced line' }, { status: 400 });

    const sent = await sendCustomerQuote({
      name: booking.customer_name,
      email: booking.customer_email,
      service: booking.service,
      address: booking.address,
      items,
      total: booking.amount ?? 0,
    });
    if (!sent) return NextResponse.json({ error: 'Could not send the quote email' }, { status: 502 });
    return NextResponse.json({ ok: true, booking });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send quote';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
