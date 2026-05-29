import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      // Forward to business inbox
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL ?? 'hello@houstonhandypros.com',
          to: 'hello@houstonhandypros.com',
          reply_to: email,
          subject: `New Contact Form — ${service || 'General Inquiry'} from ${name}`,
          html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Service:</strong> ${service || 'Not specified'}</p>
            <hr/>
            <p>${message.replace(/\n/g, '<br/>')}</p>
          `,
        }),
      });

      // Auto-reply to sender
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL ?? 'hello@houstonhandypros.com',
          to: email,
          subject: `We got your message — Houston Handy Pros`,
          html: `<p>Hi ${name},</p><p>Thanks for reaching out! We'll get back to you within a few hours. For faster service, call us at (713) 555-0190.</p><p>— The Houston Handy Pros Team</p>`,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
