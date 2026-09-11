import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/admin-auth';
import { getLead, updateLead } from '@/lib/db';
import { parseQuoteItems, quoteTotal } from '@/lib/quote';
import { sendCustomerQuote } from '@/lib/notify';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest(req))) return unauthorized();
  const { id } = await params;
  let lead = await getLead(id);
  if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  try {
    const body = await req.json().catch(() => ({}));
    if (body.quote_items) {
      lead = await updateLead(id, { quote_items: parseQuoteItems(body.quote_items) });
    }
    const items = lead.quote_items;
    if (!items.length) return NextResponse.json({ error: 'Add at least one priced line' }, { status: 400 });

    const sent = await sendCustomerQuote({
      name: lead.name,
      email: lead.email,
      service: lead.service || 'Handyman service',
      address: null,
      items,
      total: lead.quoted_amount ?? quoteTotal(items),
    });
    if (!sent) return NextResponse.json({ error: 'Could not send the quote email' }, { status: 502 });
    return NextResponse.json({ ok: true, lead });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send quote';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
