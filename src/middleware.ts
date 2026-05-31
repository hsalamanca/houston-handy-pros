import { NextRequest, NextResponse } from 'next/server';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Change PREVIEW_PASSWORD to something only you know before deploying.
const PREVIEW_PASSWORD = process.env.PREVIEW_PASSWORD ?? 'hhp2026';

// When true, ALL visitors see the coming soon page (except you with the cookie).
// Flip to false to take the site fully live — no restart needed, just redeploy.
const COMING_SOON_ACTIVE = process.env.COMING_SOON_ACTIVE !== 'false';

// Paths that always bypass the coming-soon gate
const ALWAYS_ALLOW = [
  '/coming-soon',
  '/api/',
  '/_next/',
  '/favicon.ico',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
];

export function middleware(req: NextRequest) {
  if (!COMING_SOON_ACTIVE) return NextResponse.next();

  const { pathname, searchParams } = req.nextUrl;

  // Always allow internal/static paths
  if (ALWAYS_ALLOW.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check for preview cookie
  const hasPreviewCookie = req.cookies.get('hhp_preview')?.value === PREVIEW_PASSWORD;

  // ?preview=<password> in URL → set cookie and redirect to the page they wanted
  const previewParam = searchParams.get('preview');
  if (previewParam === PREVIEW_PASSWORD) {
    const url = req.nextUrl.clone();
    url.searchParams.delete('preview');
    const res = NextResponse.redirect(url);
    res.cookies.set('hhp_preview', PREVIEW_PASSWORD, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
      sameSite: 'lax',
    });
    return res;
  }

  // Has valid cookie → let them through
  if (hasPreviewCookie) return NextResponse.next();

  // Everyone else → coming soon
  const url = req.nextUrl.clone();
  url.pathname = '/coming-soon';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
