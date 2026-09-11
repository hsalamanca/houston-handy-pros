import { NextRequest, NextResponse } from 'next/server';

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? 'hhpadmin2026';
}

export function isAdminRequest(req: NextRequest): boolean {
  return req.cookies.get('hhp_admin')?.value === adminPassword();
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
