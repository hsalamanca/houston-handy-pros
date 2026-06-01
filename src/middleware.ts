import { NextRequest, NextResponse } from 'next/server';

// ─── CONFIG ──────────────────────────────────────────────────────────────────

// Coming soon gate — flip COMING_SOON_ACTIVE to 'false' in Vercel env vars to launch
const COMING_SOON_ACTIVE = process.env.COMING_SOON_ACTIVE !== 'false';
const PREVIEW_PASSWORD   = process.env.PREVIEW_PASSWORD  ?? 'hhp2026';

// Admin gate — protects /admin and /portal routes
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'hhpadmin2026';

// Paths that always bypass the coming-soon gate (but NOT the admin gate)
const COMING_SOON_BYPASS = [
  '/coming-soon',
  '/api/',
  '/_next/',
  '/favicon.ico',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function setAdminCookie(res: NextResponse, password: string) {
  res.cookies.set('hhp_admin', password, {
    httpOnly: true,
    maxAge: 60 * 60 * 8, // 8-hour session
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

function setPreviewCookie(res: NextResponse, password: string) {
  res.cookies.set('hhp_preview', password, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // ── 1. ADMIN / PORTAL GATE (always active, regardless of coming soon) ──────
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/portal');

  if (isAdminRoute) {
    const hasAdminCookie = req.cookies.get('hhp_admin')?.value === ADMIN_PASSWORD;

    // ?admin=<password> in URL → set cookie, redirect cleanly
    const adminParam = searchParams.get('admin');
    if (adminParam === ADMIN_PASSWORD) {
      const url = req.nextUrl.clone();
      url.searchParams.delete('admin');
      const res = NextResponse.redirect(url);
      setAdminCookie(res, ADMIN_PASSWORD);
      return res;
    }

    // Valid cookie → let through
    if (hasAdminCookie) return NextResponse.next();

    // No access → show admin login page
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/admin-login';
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── 2. COMING SOON GATE ───────────────────────────────────────────────────
  if (!COMING_SOON_ACTIVE) return NextResponse.next();

  if (COMING_SOON_BYPASS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const hasPreviewCookie = req.cookies.get('hhp_preview')?.value === PREVIEW_PASSWORD;

  // ?preview=<password> → set cookie, redirect to clean URL
  const previewParam = searchParams.get('preview');
  if (previewParam === PREVIEW_PASSWORD) {
    const url = req.nextUrl.clone();
    url.searchParams.delete('preview');
    const res = NextResponse.redirect(url);
    setPreviewCookie(res, PREVIEW_PASSWORD);
    return res;
  }

  if (hasPreviewCookie) return NextResponse.next();

  // Everyone else → coming soon
  const url = req.nextUrl.clone();
  url.pathname = '/coming-soon';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
