import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, isValidSession } from '@/lib/admin-auth';
import { clientIp, rateLimit } from '@/lib/rate-limit';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method.toUpperCase();

  if (method === 'POST' && (pathname === '/api/booking' || pathname === '/api/contact')) {
    const limited = rateLimit(`public:${clientIp(req)}`, 8, 10 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait and try again, or call (832) 215-0668.' },
        { status: 429, headers: { 'Retry-After': String(limited.retryAfter) } },
      );
    }
  }

  if (method === 'POST' && pathname === '/api/admin-login') {
    const limited = rateLimit(`login:${clientIp(req)}`, 8, 15 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: 'Too many login attempts. Try again later.' },
        { status: 429, headers: { 'Retry-After': String(limited.retryAfter) } },
      );
    }
  }

  const isAdminRoute =
    (pathname.startsWith('/admin') && !pathname.startsWith('/admin-login')) ||
    pathname.startsWith('/portal') ||
    (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin-logout') && !pathname.startsWith('/api/admin-login'));

  if (!isAdminRoute) return NextResponse.next();

  const authed = await isValidSession(req.cookies.get(SESSION_COOKIE)?.value);
  if (authed) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

  if (pathname.startsWith('/api/admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/admin-login';
  loginUrl.search = '';
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png|robots.txt|sitemap.xml).*)'],
};
