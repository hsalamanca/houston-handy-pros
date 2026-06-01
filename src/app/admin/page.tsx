import type { Metadata } from 'next';
import Link from 'next/link';
import { ClipboardList, Users, DollarSign, Star, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

export const metadata: Metadata = { title: 'Admin Dashboard | Houston Handy Pros', robots: { index: false, follow: false } };

// In production these would be fetched from Supabase
const stats = [
  { label: 'New Bookings', value: '12', sub: 'This week', icon: ClipboardList, color: 'bg-blue-500' },
  { label: 'Active Jobs', value: '4', sub: 'In progress today', icon: Calendar, color: 'bg-orange-500' },
  { label: 'Revenue (MTD)', value: '$14,820', sub: 'May 2026', icon: DollarSign, color: 'bg-green-500' },
  { label: 'Avg Rating', value: '4.9★', sub: 'Last 30 days', icon: Star, color: 'bg-yellow-500' },
  { label: 'Customers', value: '847', sub: 'Total', icon: Users, color: 'bg-purple-500' },
  { label: 'Jobs This Month', value: '63', sub: '+8% vs last month', icon: TrendingUp, color: 'bg-teal-500' },
];

const recentBookings = [
  { id: 'BK-1042', name: 'Sarah Mitchell', service: 'Plumbing Repair', date: 'Today 10am', address: 'The Heights', status: 'scheduled', amount: '$125' },
  { id: 'BK-1041', name: 'James Torres', service: 'TV Mounting', date: 'Today 2pm', address: 'Montrose', status: 'in_progress', amount: '$175' },
  { id: 'BK-1040', name: 'Linda Park', service: 'Drywall Patch', date: 'Yesterday', address: 'Sugar Land', status: 'complete', amount: '$250' },
  { id: 'BK-1039', name: 'Carlos Reyes', service: 'Fence Repair', date: 'Yesterday', address: 'Katy', status: 'complete', amount: '$380' },
  { id: 'BK-1038', name: 'Amanda Foster', service: 'Ceiling Fan', date: '2 days ago', address: 'Memorial', status: 'complete', amount: '$150' },
  { id: 'BK-1037', name: 'David Kim', service: 'Carpentry', date: '2 days ago', address: 'West University', status: 'complete', amount: '$320' },
];

const statusStyles: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-orange-100 text-orange-700',
  complete: 'bg-green-100 text-green-700',
  new: 'bg-purple-100 text-purple-700',
};

const statusLabels: Record<string, string> = {
  scheduled: 'Scheduled', in_progress: 'In Progress', complete: 'Complete', new: 'New',
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Admin header */}
      <div className="bg-[#1B2A4A] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center">
            <span className="text-[#1B2A4A] font-black text-sm">H</span>
          </div>
          <span className="text-white font-bold">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/jobs" className="text-white/70 hover:text-white text-sm">Jobs</Link>
          <Link href="/admin/customers" className="text-white/70 hover:text-white text-sm">Customers</Link>
          <Link href="/" className="text-white/70 hover:text-white text-sm">View Site →</Link>
          <form action="/api/admin-logout" method="POST">
            <button type="submit" className="text-white/40 hover:text-white text-xs border border-white/20 px-3 py-1.5 rounded-lg hover:border-white/40 transition-colors">
              Log Out
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Alert */}
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8 text-sm text-orange-800">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span><strong>3 new bookings</strong> need confirmation. <Link href="/admin/jobs" className="underline font-semibold">Review now →</Link></span>
        </div>

        {/* Stats grid */}
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
          {/* Recent bookings */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-black text-[#1B2A4A]">Recent Bookings</h2>
              <Link href="/admin/jobs" className="text-[#F5A623] text-sm font-semibold hover:underline">View All</Link>
            </div>
            <div className="divide-y">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8F9FA] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1B2A4A] text-sm truncate">{booking.name}</p>
                    <p className="text-gray-500 text-xs">{booking.service} · {booking.address}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-gray-600 text-xs">{booking.date}</p>
                    <p className="font-bold text-[#1B2A4A] text-sm">{booking.amount}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[booking.status]}`}>
                    {statusLabels[booking.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-black text-[#1B2A4A] mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { href: '/admin/jobs', label: 'Job Board (Kanban)', icon: ClipboardList },
                  { href: '/admin/customers', label: 'Customer CRM', icon: Users },
                  { href: '/book', label: 'Create New Booking', icon: Calendar },
                ].map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-xl hover:bg-[#1B2A4A] hover:text-white group transition-colors"
                  >
                    <Icon className="w-4 h-4 text-[#F5A623]" />
                    <span className="text-[#1B2A4A] group-hover:text-white text-sm font-medium transition-colors">{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-[#1B2A4A] rounded-2xl p-6">
              <h3 className="font-black text-white mb-3">This Week</h3>
              {[
                { day: 'Mon', jobs: 3 }, { day: 'Tue', jobs: 4 }, { day: 'Wed', jobs: 2 },
                { day: 'Thu', jobs: 5 }, { day: 'Fri', jobs: 4 }, { day: 'Sat', jobs: 3 },
              ].map(({ day, jobs }) => (
                <div key={day} className="flex items-center gap-3 mb-2">
                  <span className="text-white/50 text-xs w-6">{day}</span>
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div className="bg-[#F5A623] h-2 rounded-full" style={{ width: `${(jobs / 5) * 100}%` }} />
                  </div>
                  <span className="text-white/70 text-xs w-4">{jobs}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
