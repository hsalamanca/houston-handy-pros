import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import JobDetail from '@/components/admin/JobDetail';
import { getBooking } from '@/lib/db';

export const metadata: Metadata = { title: 'Job | Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getBooking(id);
  if (!job) notFound();

  return (
    <div>
      <AdminHeader current="/admin/jobs" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/admin/jobs" className="text-sm text-gray-500 hover:text-[#1B2A4A] font-semibold">
          ← Job board
        </Link>
        <div className="mt-4">
          <JobDetail initial={job} />
        </div>
      </div>
    </div>
  );
}
