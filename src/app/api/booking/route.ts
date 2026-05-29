import { NextRequest, NextResponse } from 'next/server';

export interface BookingPayload {
  service: string;
  description: string;
  date: string;
  time: string;
  address: string;
  name: string;
  email: string;
  phone: string;
  isEmergency?: boolean;
}

// Sends confirmation email via Resend
async function sendConfirmationEmail(booking: BookingPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL ?? 'hello@houstonhandypros.com',
      to: booking.email,
      subject: `Booking Confirmed — ${booking.service} on ${booking.date}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
          <div style="background:#1B2A4A;padding:32px;border-radius:12px 12px 0 0;">
            <h1 style="color:#F5A623;margin:0;font-size:24px;">Houston Handy Pros</h1>
            <p style="color:white;margin:8px 0 0;">Booking Confirmed ✓</p>
          </div>
          <div style="background:#F8F9FA;padding:32px;border-radius:0 0 12px 12px;">
            <p style="color:#374151;">Hi <strong>${booking.name}</strong>,</p>
            <p style="color:#374151;">Your booking request has been received. We'll confirm your appointment within 30 minutes.</p>
            <table style="width:100%;border-collapse:collapse;margin:24px 0;">
              <tr><td style="padding:8px 0;color:#6B7280;font-size:14px;">Service</td><td style="padding:8px 0;font-weight:600;color:#1B2A4A;">${booking.service}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7280;font-size:14px;">Date & Time</td><td style="padding:8px 0;font-weight:600;color:#1B2A4A;">${booking.date} at ${booking.time}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7280;font-size:14px;">Address</td><td style="padding:8px 0;font-weight:600;color:#1B2A4A;">${booking.address}</td></tr>
            </table>
            <p style="color:#374151;font-size:14px;">Questions? Call us at <a href="tel:+17135550190" style="color:#F5A623;">(713) 555-0190</a></p>
            <p style="color:#6B7280;font-size:12px;margin-top:24px;">Houston Handy Pros · Licensed & Insured · 1-Year Guarantee</p>
          </div>
        </div>
      `,
    }),
  });
}

// Sends SMS via Twilio
async function sendConfirmationSMS(booking: BookingPayload) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;
  if (!sid || !token || !from) return;

  const body = `Houston Handy Pros: Your ${booking.service} booking on ${booking.date} at ${booking.time} is confirmed! Questions? Call (713) 555-0190.`;
  const params = new URLSearchParams({ From: from, To: booking.phone, Body: body });

  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });
}

// Saves booking to Supabase
async function saveToDatabase(booking: BookingPayload) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { id: `local-${Date.now()}` };

  const res = await fetch(`${url}/rest/v1/bookings`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      service: booking.service,
      description: booking.description,
      preferred_date: booking.date,
      preferred_time: booking.time,
      address: booking.address,
      customer_name: booking.name,
      customer_email: booking.email,
      customer_phone: booking.phone,
      is_emergency: booking.isEmergency ?? false,
      status: 'new',
      created_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Database save failed: ${err}`);
  }

  const [row] = await res.json();
  return row;
}

export async function POST(req: NextRequest) {
  try {
    const booking: BookingPayload = await req.json();

    // Basic validation
    if (!booking.service || !booking.name || !booking.email || !booking.phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save, then fire notifications concurrently
    const saved = await saveToDatabase(booking);
    await Promise.allSettled([
      sendConfirmationEmail(booking),
      sendConfirmationSMS(booking),
    ]);

    return NextResponse.json({ success: true, bookingId: saved?.id });
  } catch (err) {
    console.error('Booking API error:', err);
    return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
  }
}
