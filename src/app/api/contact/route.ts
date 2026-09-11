import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';
import { insertLead, upsertCustomer } from '@/lib/db';
import { notifyCustomerLead, notifyOwnerNewLead, type LeadNotice } from '@/lib/notify';

export async function POST(req: NextRequest) {
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const lead: LeadNotice = {
      name: String(body.name ?? '').trim(),
      email: String(body.email ?? '').trim(),
      phone: String(body.phone ?? '').trim(),
      service: String(body.service ?? '').trim(),
      message: String(body.message ?? '').trim() || 'Quote request from the website form.',
      source: String(body.source ?? 'contact'),
    };

    if (!lead.name || !lead.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ownerNotified = await notifyOwnerNewLead(lead).catch((err) => {
      console.error('Owner lead notify failed:', err);
      return false;
    });

    await Promise.allSettled([notifyCustomerLead(lead)]);

    let persisted = false;
    try {
      await insertLead({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        message: lead.message,
        source: lead.source || 'contact',
      });
      persisted = true;
      await upsertCustomer({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
      }).catch((err) => console.error('Customer upsert failed:', err));
    } catch (err) {
      console.error('Lead DB save failed (owner still notified):', err);
    }

    if (!persisted && !ownerNotified) {
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ success: true, persisted });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
