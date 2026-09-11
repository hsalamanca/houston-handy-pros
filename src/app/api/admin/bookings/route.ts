import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/admin-auth';
import { listBookings } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!(await isAdminRequest(req))) return unauthorized();
  try {
    const bookings = await listBookings();
    return NextResponse.json({ bookings });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load bookings';
    return NextResponse.json({ error: message, bookings: [] }, { status: 503 });
  }
}
