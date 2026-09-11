import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Search, Calendar } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import DbBanner, { LivePill } from '@/components/admin/DbBanner';
import { listBookings, listCustomers, probeDatabase, type Booking, type Customer } from '@/lib/db';

export const metadata: Metadata = { title: 'Customer CRM | Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

type Row = {
  email: string;
  name: string;
  phone: string;
  area: string;
  jobs: number;
  spent: number;
  lastJob: string;
  plan: string;
};

function mergeCustomers(customers: Customer[], bookings: Booking[]): Row[] {
  const map = new Map<string, Row>();

  for (const c of customers) {
    map.set(c.email.toLowerCase(), {
      email: c.email,
      name: c.name,
      phone: c.phone || '',
      area: c.neighborhood || c.address || '',
      jobs: 0,
      spent: 0,
      lastJob: c.created_at,
      plan: c.maintenance_plan && c.maintenance_plan !== 'none' ? c.maintenance_plan : 'None',
    });
  }

  for (const b of bookings) {
    const key = b.customer_email.toLowerCase();
    const existing = map.get(key);
    const spent = existing?.spent ?? 0;
    const jobs = (existing?.jobs ?? 0) + 1;
    const last = existing?.lastJob && new Date(existing.lastJob) > new Date(b.created_at) ? existing.lastJob : b.created_at;
    map.set(key, {
      email: b.customer_email,
      name: existing?.name || b.customer_name,
      phone: existing?.phone || b.customer_phone || '',
      area: existing?.area || b.address || '',
      jobs,
      spent: spent + Number(b.amount || 0),
      lastJob: last,
      plan: existing?.plan || 'None',
    });
  }

  return [...map.values()].sort((a, b) => b.jobs - a.jobs || a.name.localeCompare(b.name));
}

function ago(iso: string) {
  const then = new Date(iso).getTime();
  if (!then) return '—';
  const days = Math.round((Date.now() - then) / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 14) return `${days} days ago`;
  if (days < 60) return `${Math.round(days / 7)} weeks ago`;
  return new Date(iso).toLocaleDateString();
}

const planColors: Record<string, string> = {
  Pro: 'bg-[#F5A623]/20 text-[#1B2A4A]',
  pro: 'bg-[#F5A623]/20 text-[#1B2A4A]',
  Basic: 'bg-blue-100 text-blue-700',
  essential: 'bg-blue-100 text-blue-700',
  None: 'bg-gray-100 text-gray-500',
  none: 'bg-gray-100 text-gray-500',
};

export default async function CustomersPage() {
  const probe = await probeDatabase();
  const customers = probe.ok ? await listCustomers().catch(() => []) : [];
  const bookings = probe.ok ? await listBookings().catch(() => []) : [];
  const rows = mergeCustomers(customers, bookings);
  const onPlan = rows.filter((r) => r.plan && r.plan !== 'None' && r.plan !== 'none').length;
  const avgJobs = rows.length ? (rows.reduce((s, r) => s + r.jobs, 0) / rows.length).toFixed(1) : '0';
  const avgLtv = rows.length ? Math.round(rows.reduce((s, r) => s + r.spent, 0) / rows.length) : 0;

  return (
    <div>
      <AdminHeader current="/admin/customers" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black text-[#1B2A4A]">Customer CRM</h1>
            <LivePill ok={probe.ok} />
          </div>
          <span className="text-gray-500 text-sm">{rows.length} customers</span>
        </div>
        <DbBanner ok={probe.ok} message={probe.message} />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Customers', value: String(rows.length) },
            { label: 'On Maintenance Plan', value: String(onPlan) },
            { label: 'Avg Jobs per Customer', value: avgJobs },
            { label: 'Avg Lifetime Value', value: `$${avgLtv.toLocaleString()}` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <p className="text-2xl font-black text-[#1B2A4A]">{value}</p>
              <p className="text-gray-500 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search is live from your bookings — use the browser find for now"
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            disabled
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {rows.length === 0 ? (
            <p className="px-6 py-10 text-sm text-gray-500">Customers appear here after the first booking or quote.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-[#F8F9FA]">
                    <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Area</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Jobs</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Spent</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Last Job</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Plan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rows.map((c) => (
                    <tr key={c.email} className="hover:bg-[#F8F9FA] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#1B2A4A] flex items-center justify-center shrink-0">
                            <span className="text-[#F5A623] font-bold text-sm">{c.name[0]}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-[#1B2A4A]">{c.name}</p>
                            <p className="text-gray-400 text-xs">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <div className="space-y-1">
                          {c.phone && (
                            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                              <Phone className="w-3 h-3" />
                              {c.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                            <Mail className="w-3 h-3" />
                            {c.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        {c.area && (
                          <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                            <MapPin className="w-3 h-3 text-[#F5A623]" />
                            {c.area}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-gray-700 text-xs">
                          <Calendar className="w-3 h-3" />
                          {c.jobs}
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="font-bold text-[#1B2A4A] text-sm">${c.spent.toLocaleString()}</span>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell text-gray-500 text-xs">{ago(c.lastJob)}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${planColors[c.plan] ?? planColors.None}`}>
                          {c.plan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
