import { clip } from '@/lib/html';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string): boolean {
  return EMAIL.test(value) && value.length <= 120;
}

export function tooLarge(req: { headers: Headers }, max = 48_000): boolean {
  const len = Number(req.headers.get('content-length') || 0);
  return Number.isFinite(len) && len > max;
}

const ALLOWED_ORIGINS = new Set([
  'https://houstonhandypros.com',
  'https://www.houstonhandypros.com',
  'https://houston-handy-pros.vercel.app',
  'http://localhost:3000',
]);

export function allowedOrigin(req: { headers: Headers }): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  try {
    const host = new URL(origin).hostname;
    return host.endsWith('.vercel.app') && host.includes('houston-handy-pros');
  } catch {
    return false;
  }
}

export function parsePublicLead(body: Record<string, unknown>) {
  const website = clip(body.website, 80);
  if (website) return { honeypot: true as const };

  const name = clip(body.name, 80);
  const email = clip(body.email, 120).toLowerCase();
  const phone = clip(body.phone, 30);
  const service = clip(body.service, 80);
  const message = clip(body.message, 4000);
  const source = clip(body.source, 20) === 'quote' ? 'quote' : 'contact';

  if (!name || !isEmail(email)) return { error: 'Missing required fields' as const };
  return { name, email, phone, service, message, source };
}

export function parsePublicBooking(body: Record<string, unknown>) {
  const website = clip(body.website, 80);
  if (website) return { honeypot: true as const };

  const service = clip(body.service, 80);
  const description = clip(body.description, 4000);
  const date = clip(body.date, 20);
  const time = clip(body.time, 20);
  const address = clip(body.address, 200);
  const name = clip(body.name, 80);
  const email = clip(body.email, 120).toLowerCase();
  const phone = clip(body.phone, 30);
  const isEmergency = Boolean(body.isEmergency);

  if (!service || !name || !isEmail(email) || !phone) {
    return { error: 'Missing required fields' as const };
  }
  return { service, description, date, time, address, name, email, phone, isEmergency };
}
