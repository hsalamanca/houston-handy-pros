import { NextRequest, NextResponse } from 'next/server';
import { adminPassword, createSessionToken, passwordsMatch, sessionCookie } from '@/lib/admin-auth';
import { tooLarge } from '@/lib/validate';

export async function POST(req: NextRequest) {
  if (!adminPassword()) {
    return NextResponse.json({ error: 'Admin is not configured' }, { status: 503 });
  }
  if (tooLarge(req, 4_000)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 413 });
  }

  let password = '';
  try {
    const body = await req.json();
    password = typeof body?.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!passwordsMatch(password)) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const token = await createSessionToken();
  if (!token) return NextResponse.json({ error: 'Admin is not configured' }, { status: 503 });

  const res = NextResponse.json({ ok: true });
  const cookie = sessionCookie(token);
  res.cookies.set(cookie.name, cookie.value, cookie);
  return res;
}
