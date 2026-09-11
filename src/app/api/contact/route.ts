import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';
import { insertLead, upsertCustomer } from '@/lib/db';
import { notifyCustomerLead, notifyOwnerNewLead } from '@/lib/notify';
import { allowedOrigin, parsePublicLead, tooLarge } from '@/lib/validate';

export async function POST(req: NextRequest) {
  if (!allowedOrigin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  if (tooLarge(req)) return NextResponse.json({ error: 'Request too large' }, { status: 413 });

  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const parsed = parsePublicLead(body);
    if ('honeypot' in parsed) return NextResponse.json({ success: true, persisted: true });
    if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });

    const lead = {
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone,
      service: parsed.service,
      message: parsed.message || 'Quote request from the website form.',
      source: parsed.source,
    };

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
