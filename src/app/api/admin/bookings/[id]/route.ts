import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/admin-auth';
import { getBooking, updateBooking } from '@/lib/db';
import type { BookingStatus } from '@/lib/types';

const STATUSES: BookingStatus[] = ['new', 'scheduled', 'in_progress', 'complete', 'cancelled'];

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) return unauthorized();
  const { id } = await params;
  const booking = await getBooking(id);
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ booking });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) return unauthorized();

  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  try {
    const body = await req.json();
    const patch: { status?: BookingStatus; notes?: string; assigned_tech?: string; amount?: number } = {};

    if (body.status) {
      if (!STATUSES.includes(body.status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
      }
      patch.status = body.status;
    }
    if (typeof body.notes === 'string') patch.notes = body.notes;
    if (typeof body.assigned_tech === 'string') patch.assigned_tech = body.assigned_tech;
    if (body.amount != null && body.amount !== '') patch.amount = Number(body.amount);

    const booking = await updateBooking(id, patch);
    return NextResponse.json({ booking });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update booking';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
