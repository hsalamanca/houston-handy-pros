import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  try {
    const { name, email, phone, service, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('Contact API: RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Email is not configured' }, { status: 500 });
    }

    const from = process.env.FROM_EMAIL ?? 'Houston Handy Pros <hello@houstonhandypros.com>';
    const details = (message || 'Quote request from the website form.').replace(/\n/g, '<br/>');

    const inbound = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: 'hello@houstonhandypros.com',
        reply_to: email,
        subject: `New Contact Form — ${service || 'General Inquiry'} from ${name}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Service:</strong> ${service || 'Not specified'}</p>
            <hr/>
            <p>${details}</p>
          `,
      }),
    });

    if (!inbound.ok) {
      const err = await inbound.text();
      console.error('Resend inbound failed:', inbound.status, err);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: email,
        subject: `We got your message — Houston Handy Pros`,
        html: `<p>Hi ${name},</p><p>Thanks for reaching out! We'll get back to you within a few hours. For faster service, call us at (832) 215-0668.</p><p>— The Houston Handy Pros Team</p>`,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
