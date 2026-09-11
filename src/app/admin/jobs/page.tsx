import type { Metadata } from 'next';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import DbBanner, { LivePill } from '@/components/admin/DbBanner';
import JobBoard from '@/components/admin/JobBoard';
import { listBookings, probeDatabase } from '@/lib/db';

export const metadata: Metadata = { title: 'Job Board | Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function JobBoardPage() {
  const probe = await probeDatabase();
  const bookings = probe.ok ? await listBookings().catch(() => []) : [];

  return (
    <div>
      <AdminHeader current="/admin/jobs" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black text-[#1B2A4A]">Job Board</h1>
            <LivePill ok={probe.ok} />
          </div>
          <Link
            href="/book"
            className="bg-[#F5A623] text-[#1B2A4A] font-bold text-sm px-4 py-2 rounded-lg hover:bg-[#e8941a] transition-colors"
          >
            + New Booking
          </Link>
        </div>
        <DbBanner ok={probe.ok} message={probe.message} />
        <JobBoard initial={bookings} />
      </div>
    </div>
  );
}
