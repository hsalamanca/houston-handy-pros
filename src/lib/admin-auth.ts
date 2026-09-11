import { NextRequest, NextResponse } from 'next/server';

export const SESSION_COOKIE = 'hhp_session';
const SESSION_MS = 60 * 60 * 8 * 1000;

export function adminPassword(): string {
  return (process.env.ADMIN_PASSWORD ?? '').trim();
}

function timingSafeEqual(a: string, b: string): boolean {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  const len = Math.max(left.length, right.length, 1);
  let diff = left.length === right.length ? 0 : 1;
  for (let i = 0; i < len; i++) diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  return diff === 0;
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function createSessionToken(): Promise<string | null> {
  const secret = adminPassword();
  if (!secret) return null;
  const exp = String(Date.now() + SESSION_MS);
  const sig = await hmacHex(secret, exp);
  return `${exp}.${sig}`;
}

export async function isValidSession(token: string | undefined | null): Promise<boolean> {
  const secret = adminPassword();
  if (!secret || !token) return false;
  const dot = token.indexOf('.');
  if (dot < 1) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(exp) || sig.length !== 64) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = await hmacHex(secret, exp);
  return timingSafeEqual(sig, expected);
}

export async function isAdminRequest(req: NextRequest): Promise<boolean> {
  return isValidSession(req.cookies.get(SESSION_COOKIE)?.value);
}

export function sessionCookie(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MS / 1000,
  };
}

export function clearSessionCookie() {
  return {
    name: SESSION_COOKIE,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 0,
  };
}

export function passwordsMatch(input: string): boolean {
  const secret = adminPassword();
  if (!secret) return false;
  return timingSafeEqual(input, secret);
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
