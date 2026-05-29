import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, FileText, RefreshCw, Star, Shield, Clock, CheckCircle, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Account | Houston Handy Pros',
  robots: { index: false, follow: false },
};

const upcomingBookings = [
  { id: 'BK-1042', service: 'Plumbing Repair', date: 'Tomorrow', time: '10:00 AM', tech: 'Marcus J.', status: 'Confirmed' },
];

const pastJobs = [
  { id: 'BK-1031', service: 'TV Mounting', date: 'Apr 14, 2026', tech: 'Tony N.', amount: '$175', rated: true },
  { id: 'BK-1028', service: 'Ceiling Fan Install', date: 'Mar 28, 2026', tech: 'Derek W.', amount: '$150', rated: true },
  { id: 'BK-1019', service: 'Drywall Patch', date: 'Feb 12, 2026', tech: 'Marcus J.', amount: '$225', rated: false },
];

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Portal header */}
      <div className="bg-[#1B2A4A] px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-[#F5A623] text-sm font-semibold">Welcome back</p>
            <h1 className="text-white font-black text-xl">Sarah Mitchell</h1>
            <p className="text-white/50 text-xs">The Heights · Customer since 2023</p>
          </div>
          <Link
            href="/book"
            className="bg-[#F5A623] text-[#1B2A4A] font-black text-sm px-5 py-2.5 rounded-xl hover:bg-[#e8941a] transition-colors"
          >
            + New Booking
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Calendar, label: 'Total Jobs', value: '4' },
            { icon: FileText, label: 'Total Spent', value: '$725' },
            { icon: Star, label: 'Avg Rating Given', value: '5.0★' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-5 text-center shadow-sm">
              <Icon className="w-6 h-6 text-[#F5A623] mx-auto mb-2" />
              <p className="text-2xl font-black text-[#1B2A4A]">{value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-black text-[#1B2A4A]">Upcoming Bookings</h2>
            <Link href="/book" className="text-[#F5A623] text-sm font-semibold hover:underline">Book Another</Link>
          </div>
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((b) => (
              <div key={b.id} className="px-6 py-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5A623]/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#F5A623]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1B2A4A]">{b.service}</p>
                    <p className="text-gray-500 text-sm">{b.date} at {b.time} · {b.tech}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">{b.status}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-10 text-center text-gray-400">
              <Calendar className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No upcoming bookings.</p>
              <Link href="/book" className="text-[#F5A623] text-sm font-semibold mt-2 inline-block hover:underline">Book a service →</Link>
            </div>
          )}
        </div>

        {/* Past jobs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="font-black text-[#1B2A4A]">Past Jobs</h2>
          </div>
          <div className="divide-y">
            {pastJobs.map((job) => (
              <div key={job.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1B2A4A] text-sm">{job.service}</p>
                    <p className="text-gray-500 text-xs">{job.date} · {job.tech}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#1B2A4A] text-sm">{job.amount}</span>
                  {!job.rated ? (
                    <button className="flex items-center gap-1 bg-[#F5A623]/20 text-[#1B2A4A] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#F5A623]/30 transition-colors">
                      <Star className="w-3 h-3" /> Rate
                    </button>
                  ) : (
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />)}
                    </div>
                  )}
                  <button className="flex items-center gap-1 text-[#1B2A4A] text-xs font-semibold border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-[#F8F9FA] transition-colors">
                    <RefreshCw className="w-3 h-3" /> Rebook
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance plan upsell */}
        <div className="bg-[#1B2A4A] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <Shield className="w-10 h-10 text-[#F5A623] shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-black text-lg">Upgrade to a Maintenance Plan</p>
              <p className="text-white/60 text-sm mt-1">Starting at $70/mo — priority scheduling, discounts, and seasonal check-ups included.</p>
            </div>
          </div>
          <Link
            href="/pricing"
            className="shrink-0 bg-[#F5A623] text-[#1B2A4A] font-black px-6 py-3 rounded-xl hover:bg-[#e8941a] transition-colors text-sm whitespace-nowrap"
          >
            View Plans
          </Link>
        </div>

        {/* Invoices shortcut */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-black text-[#1B2A4A]">Invoices</h2>
            <Link href="/portal/invoices" className="text-[#F5A623] text-sm font-semibold hover:underline">View All</Link>
          </div>
          {pastJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between px-6 py-3 hover:bg-[#F8F9FA] transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-[#1B2A4A] text-sm font-medium">{job.service}</p>
                  <p className="text-gray-400 text-xs">{job.id} · {job.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-[#1B2A4A] text-sm">{job.amount}</span>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Paid</span>
                <Clock className="w-4 h-4 text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
