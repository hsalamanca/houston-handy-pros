import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL('/admin-login', req.url), 303);
  res.cookies.set('hhp_admin', '', { maxAge: 0, path: '/' });
  return res;
}
