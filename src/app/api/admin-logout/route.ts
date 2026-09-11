import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL('/admin-login', req.url), 303);
  const cookie = clearSessionCookie();
  res.cookies.set(cookie.name, cookie.value, cookie);
  res.cookies.set('hhp_admin', '', { maxAge: 0, path: '/' });
  return res;
}
