import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/admin-auth';
import { getBooking, updateBooking } from '@/lib/db';
import { parseQuoteItems } from '@/lib/quote';
import { clip } from '@/lib/html';
import type { BookingStatus } from '@/lib/types';

const STATUSES: BookingStatus[] = ['new', 'scheduled', 'in_progress', 'complete', 'cancelled'];

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest(req))) return unauthorized();
  const { id } = await params;
  const booking = await getBooking(id);
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ booking });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest(req))) return unauthorized();

  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  try {
    const body = await req.json();
    const patch: {
      status?: BookingStatus;
      notes?: string;
      assigned_tech?: string;
      amount?: number;
      quote_items?: ReturnType<typeof parseQuoteItems>;
    } = {};

    if (body.status) {
      if (!STATUSES.includes(body.status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
      }
      patch.status = body.status;
    }
    if (typeof body.notes === 'string') patch.notes = clip(body.notes, 4000);
    if (typeof body.assigned_tech === 'string') patch.assigned_tech = clip(body.assigned_tech, 80);
    if (body.amount != null && body.amount !== '') {
      const amount = Number(body.amount);
      if (!Number.isFinite(amount) || amount < 0 || amount > 100000) {
        return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
      }
      patch.amount = amount;
    }
    if (body.quote_items) patch.quote_items = parseQuoteItems(body.quote_items);

    const booking = await updateBooking(id, patch);
    return NextResponse.json({ booking });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update booking';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
