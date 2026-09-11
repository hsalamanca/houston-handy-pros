import type { Metadata } from 'next';
import Link from 'next/link';
import { ClipboardList, Users, DollarSign, Calendar, TrendingUp, Inbox } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import DbBanner, { LivePill } from '@/components/admin/DbBanner';
import { listBookings, listLeads, probeDatabase, type Booking } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Houston Handy Pros',
  robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

const statusStyles: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-orange-100 text-orange-700',
  complete: 'bg-green-100 text-green-700',
  new: 'bg-purple-100 text-purple-700',
  cancelled: 'bg-gray-100 text-gray-600',
};

const statusLabels: Record<string, string> = {
  scheduled: 'Scheduled',
  in_progress: 'In Progress',
  complete: 'Complete',
  new: 'New',
  cancelled: 'Cancelled',
};

function startOfWeek(now = new Date()) {
  const d = new Date(now);
  const day = d.getDay();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  return d;
}

function money(n: number) {
  return `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

export default async function AdminDashboard() {
  const probe = await probeDatabase();
  let bookings: Booking[] = [];
  let leadCount = 0;
  if (probe.ok) {
    try {
      bookings = await listBookings();
      leadCount = (await listLeads()).length;
    } catch {
      /* probe already captured the error */
    }
  }

  const now = new Date();
  const week = startOfWeek(now);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const newThisWeek = bookings.filter((b) => new Date(b.created_at) >= week && b.status === 'new');
  const active = bookings.filter((b) => b.status === 'scheduled' || b.status === 'in_progress');
  const monthJobs = bookings.filter((b) => new Date(b.created_at) >= monthStart);
  const monthRevenue = bookings
    .filter((b) => b.status === 'complete' && b.amount != null && new Date(b.updated_at || b.created_at) >= monthStart)
    .reduce((sum, b) => sum + Number(b.amount || 0), 0);
  const customers = new Set(bookings.map((b) => b.customer_email.toLowerCase())).size;

  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekCounts = weekday.map((_, i) => {
    const day = new Date(week);
    day.setDate(week.getDate() + i);
    const next = new Date(day);
    next.setDate(day.getDate() + 1);
    return bookings.filter((b) => {
      const t = new Date(b.created_at);
      return t >= day && t < next;
    }).length;
  });
  const weekMax = Math.max(1, ...weekCounts);

  const stats = [
    { label: 'New Bookings', value: String(newThisWeek.length), sub: 'This week', icon: ClipboardList, color: 'bg-blue-500' },
    { label: 'Active Jobs', value: String(active.length), sub: 'Scheduled or in progress', icon: Calendar, color: 'bg-orange-500' },
    { label: 'Revenue (MTD)', value: money(monthRevenue), sub: now.toLocaleString('en-US', { month: 'long', year: 'numeric' }), icon: DollarSign, color: 'bg-green-500' },
    { label: 'Website Leads', value: String(leadCount), sub: 'Quote + contact forms', icon: Inbox, color: 'bg-yellow-500' },
    { label: 'Customers', value: String(customers), sub: 'Unique emails', icon: Users, color: 'bg-purple-500' },
    { label: 'Jobs This Month', value: String(monthJobs.length), sub: 'Created this month', icon: TrendingUp, color: 'bg-teal-500' },
  ];

  const recent = bookings.slice(0, 8);

  return (
    <div>
      <AdminHeader current="/admin" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-[#1B2A4A]">Dashboard</h1>
          <LivePill ok={probe.ok} />
        </div>

        <DbBanner ok={probe.ok} message={probe.message} />

        {probe.ok && newThisWeek.length > 0 && (
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8 text-sm text-orange-800">
            <span>
              <strong>{newThisWeek.length} new booking{newThisWeek.length === 1 ? '' : 's'}</strong> need confirmation.{' '}
              <Link href="/admin/jobs" className="underline font-semibold">
                Review now →
              </Link>
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {stats.map(({ label, value, sub, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-black text-[#1B2A4A]">{value}</p>
              <p className="text-gray-800 text-xs font-semibold mt-0.5">{label}</p>
              <p className="text-gray-400 text-xs">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-black text-[#1B2A4A]">Recent Bookings</h2>
              <Link href="/admin/jobs" className="text-[#F5A623] text-sm font-semibold hover:underline">
                View All
              </Link>
            </div>
            {recent.length === 0 ? (
              <p className="px-6 py-10 text-sm text-gray-500">
                No bookings stored yet. When someone uses Book online, they show up here — and you get an email and text immediately.
              </p>
            ) : (
              <div className="divide-y">
                {recent.map((booking) => (
                  <Link
                    key={booking.id}
                    href={`/admin/jobs/${booking.id}`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8F9FA] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1B2A4A] text-sm truncate">{booking.customer_name}</p>
                      <p className="text-gray-500 text-xs">
                        {booking.service} · {booking.address || booking.customer_phone}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-gray-600 text-xs">
                        {booking.preferred_date || new Date(booking.created_at).toLocaleDateString()} {booking.preferred_time || ''}
                      </p>
                      {booking.amount != null && (
                        <p className="font-bold text-[#1B2A4A] text-sm">{money(Number(booking.amount))}</p>
                      )}
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[booking.status]}`}>
                      {statusLabels[booking.status] ?? booking.status}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-black text-[#1B2A4A] mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { href: '/admin/jobs', label: 'Job Board' },
                  { href: '/admin/leads', label: 'Website Leads' },
                  { href: '/admin/customers', label: 'Customer CRM' },
                  { href: '/book', label: 'Create New Booking' },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-xl hover:bg-[#1B2A4A] hover:text-white group transition-colors"
                  >
                    <span className="text-[#1B2A4A] group-hover:text-white text-sm font-medium transition-colors">{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-[#1B2A4A] rounded-2xl p-6">
              <h3 className="font-black text-white mb-3">This Week</h3>
              {weekday.map((day, i) => (
                <div key={day} className="flex items-center gap-3 mb-2">
                  <span className="text-white/50 text-xs w-8">{day}</span>
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div className="bg-[#F5A623] h-2 rounded-full" style={{ width: `${(weekCounts[i] / weekMax) * 100}%` }} />
                  </div>
                  <span className="text-white/70 text-xs w-4">{weekCounts[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
