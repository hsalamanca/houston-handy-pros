import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/admin-auth';
import { listLeads } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) return unauthorized();
  try {
    const leads = await listLeads();
    return NextResponse.json({ leads });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load leads';
    return NextResponse.json({ error: message, leads: [] }, { status: 503 });
  }
}
