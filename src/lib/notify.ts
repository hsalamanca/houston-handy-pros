import { BUSINESS } from '@/lib/constants';
import { escapeHtml, toE164 } from '@/lib/html';

export type BookingNotice = {
  service: string;
  description: string;
  date: string;
  time: string;
  address: string;
  name: string;
  email: string;
  phone: string;
  isEmergency?: boolean;
};

export type LeadNotice = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source?: string;
};

function fromAddress(): string {
  return process.env.FROM_EMAIL ?? 'Houston Handy Pros <hello@houstonhandypros.com>';
}

export function ownerEmails(): string[] {
  const raw = process.env.OWNER_EMAIL ?? 'hello@houstonhandypros.com,hsalamanca@gmail.com';
  return [...new Set(raw.split(',').map((s) => s.trim()).filter(Boolean))];
}

export function ownerPhone(): string | null {
  return toE164(process.env.OWNER_PHONE ?? BUSINESS.phone);
}

async function sendEmail(payload: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Resend: RESEND_API_KEY is not set');
    return false;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: fromAddress(),
      to: payload.to,
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    }),
  });

  if (!res.ok) {
    console.error('Resend failed:', res.status, await res.text());
    return false;
  }
  return true;
}

async function sendSms(to: string, body: string): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;
  const dest = toE164(to);
  if (!sid || !token || !from || !dest) return false;

  const params = new URLSearchParams({ From: from, To: dest, Body: body });
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!res.ok) {
    console.error('Twilio failed:', res.status, await res.text());
    return false;
  }
  return true;
}

const wrap = (title: string, inner: string) => `
  <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
    <div style="background:#1B2A4A;padding:32px;border-radius:12px 12px 0 0;">
      <h1 style="color:#F5A623;margin:0;font-size:24px;">Houston Handy Pros</h1>
      <p style="color:white;margin:8px 0 0;">${title}</p>
    </div>
    <div style="background:#F8F9FA;padding:32px;border-radius:0 0 12px 12px;">
      ${inner}
      <p style="color:#6B7280;font-size:12px;margin-top:24px;">Houston Handy Pros · Bonded & Insured · 1-Year Guarantee</p>
    </div>
  </div>
`;

export async function notifyOwnerNewBooking(booking: BookingNotice): Promise<boolean> {
  const to = ownerEmails();
  const subject = `${booking.isEmergency ? 'EMERGENCY ' : ''}New booking — ${booking.service} from ${booking.name}`;
  const html = wrap(
    'New booking request',
    `
      <p style="color:#374151;">A customer just submitted a job on houstonhandypros.com.</p>
      <table style="width:100%;border-collapse:collapse;margin:24px 0;">
        <tr><td style="padding:8px 0;color:#6B7280;font-size:14px;">Name</td><td style="padding:8px 0;font-weight:600;color:#1B2A4A;">${escapeHtml(booking.name)}</td></tr>
        <tr><td style="padding:8px 0;color:#6B7280;font-size:14px;">Phone</td><td style="padding:8px 0;font-weight:600;color:#1B2A4A;"><a href="tel:${escapeHtml(booking.phone)}">${escapeHtml(booking.phone)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6B7280;font-size:14px;">Email</td><td style="padding:8px 0;font-weight:600;color:#1B2A4A;">${escapeHtml(booking.email)}</td></tr>
        <tr><td style="padding:8px 0;color:#6B7280;font-size:14px;">Service</td><td style="padding:8px 0;font-weight:600;color:#1B2A4A;">${escapeHtml(booking.service)}</td></tr>
        <tr><td style="padding:8px 0;color:#6B7280;font-size:14px;">When</td><td style="padding:8px 0;font-weight:600;color:#1B2A4A;">${escapeHtml(booking.date)} at ${escapeHtml(booking.time)}</td></tr>
        <tr><td style="padding:8px 0;color:#6B7280;font-size:14px;">Address</td><td style="padding:8px 0;font-weight:600;color:#1B2A4A;">${escapeHtml(booking.address)}</td></tr>
      </table>
      <p style="color:#374151;"><strong>Details</strong><br/>${escapeHtml(booking.description).replace(/\n/g, '<br/>')}</p>
      <p style="color:#374151;font-size:14px;">Open the job board: <a href="https://houstonhandypros.com/admin/jobs" style="color:#F5A623;">houstonhandypros.com/admin/jobs</a></p>
    `,
  );

  const emailOk = await sendEmail({ to, subject, html, replyTo: booking.email });
  const phone = ownerPhone();
  const smsOk = phone
    ? await sendSms(
        phone,
        `HHP NEW BOOKING: ${booking.name} — ${booking.service} ${booking.date} ${booking.time}. ${booking.phone}. ${booking.address}`,
      )
    : false;

  return emailOk || smsOk;
}

export async function notifyCustomerBooking(booking: BookingNotice): Promise<void> {
  await sendEmail({
    to: booking.email,
    subject: `We got your ${booking.service} request — Houston Handy Pros`,
    html: wrap(
      'Request received',
      `
        <p style="color:#374151;">Hi <strong>${escapeHtml(booking.name)}</strong>,</p>
        <p style="color:#374151;">Your booking request is in. We'll confirm your appointment shortly.</p>
        <table style="width:100%;border-collapse:collapse;margin:24px 0;">
          <tr><td style="padding:8px 0;color:#6B7280;font-size:14px;">Service</td><td style="padding:8px 0;font-weight:600;color:#1B2A4A;">${escapeHtml(booking.service)}</td></tr>
          <tr><td style="padding:8px 0;color:#6B7280;font-size:14px;">Date & Time</td><td style="padding:8px 0;font-weight:600;color:#1B2A4A;">${escapeHtml(booking.date)} at ${escapeHtml(booking.time)}</td></tr>
          <tr><td style="padding:8px 0;color:#6B7280;font-size:14px;">Address</td><td style="padding:8px 0;font-weight:600;color:#1B2A4A;">${escapeHtml(booking.address)}</td></tr>
        </table>
        <p style="color:#374151;font-size:14px;">Questions? Call us at <a href="tel:+18322150668" style="color:#F5A623;">(832) 215-0668</a></p>
      `,
    ),
  });

  await sendSms(
    booking.phone,
    `Houston Handy Pros: we received your ${booking.service} request for ${booking.date} at ${booking.time}. We'll confirm shortly. Call (832) 215-0668 with questions.`,
  );
}

export async function notifyOwnerNewLead(lead: LeadNotice): Promise<boolean> {
  const to = ownerEmails();
  const source = lead.source === 'quote' ? 'quote form' : 'contact form';
  const subject = `New ${source} — ${lead.service || 'General inquiry'} from ${lead.name}`;
  const html = wrap(
    'New website lead',
    `
      <p style="color:#374151;">Someone just sent a ${escapeHtml(source)} on houstonhandypros.com.</p>
      <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(lead.phone || 'Not provided')}</p>
      <p><strong>Service:</strong> ${escapeHtml(lead.service || 'Not specified')}</p>
      <hr/>
      <p>${escapeHtml(lead.message || 'No message').replace(/\n/g, '<br/>')}</p>
      <p style="color:#374151;font-size:14px;">Inbox: <a href="https://houstonhandypros.com/admin/leads" style="color:#F5A623;">houstonhandypros.com/admin/leads</a></p>
    `,
  );

  const emailOk = await sendEmail({ to, subject, html, replyTo: lead.email });
  const phone = ownerPhone();
  const smsOk = phone
    ? await sendSms(
        phone,
        `HHP NEW LEAD (${source}): ${lead.name} — ${lead.service || 'inquiry'}. ${lead.phone || lead.email}`,
      )
    : false;

  return emailOk || smsOk;
}

export async function notifyCustomerLead(lead: LeadNotice): Promise<void> {
  await sendEmail({
    to: lead.email,
    subject: 'We got your message — Houston Handy Pros',
    html: `<p>Hi ${escapeHtml(lead.name)},</p><p>Thanks for reaching out! We'll get back to you within a few hours. For faster service, call us at (832) 215-0668.</p><p>— The Houston Handy Pros Team</p>`,
  });
}
