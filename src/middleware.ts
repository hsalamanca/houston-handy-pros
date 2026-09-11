import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'hhpadmin2026';

function setAdminCookie(res: NextResponse, password: string) {
  res.cookies.set('hhp_admin', password, {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  const isAdminRoute =
    (pathname.startsWith('/admin') && !pathname.startsWith('/admin-login')) ||
    pathname.startsWith('/portal') ||
    (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin-logout'));

  if (!isAdminRoute) return NextResponse.next();

  const hasAdminCookie = req.cookies.get('hhp_admin')?.value === ADMIN_PASSWORD;

  const adminParam = searchParams.get('admin');
  if (adminParam === ADMIN_PASSWORD) {
    const url = req.nextUrl.clone();
    url.searchParams.delete('admin');
    const res = NextResponse.redirect(url);
    setAdminCookie(res, ADMIN_PASSWORD);
    return res;
  }

  if (hasAdminCookie) return NextResponse.next();

  if (pathname.startsWith('/api/admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/admin-login';
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
