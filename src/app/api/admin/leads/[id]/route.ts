import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/admin-auth';
import { getLead, updateLead } from '@/lib/db';
import { parseQuoteItems } from '@/lib/quote';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest(req))) return unauthorized();
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ lead });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest(req))) return unauthorized();
  const { id } = await params;
  try {
    const body = await req.json();
    const quote_items = body.quote_items ? parseQuoteItems(body.quote_items) : undefined;
    const lead = await updateLead(id, { quote_items });
    return NextResponse.json({ lead });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update lead';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
