import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Search, Star, Calendar } from 'lucide-react';

export const metadata: Metadata = { title: 'Customer CRM | Admin', robots: { index: false, follow: false } };

const customers = [
  { id: 'C-001', name: 'Jennifer Torres', email: 'jtorres@email.com', phone: '(713) 555-0210', area: 'Katy', jobs: 12, spent: '$4,850', lastJob: '2 weeks ago', plan: 'Pro', rating: 5 },
  { id: 'C-002', name: 'Robert Chen', email: 'rchen@email.com', phone: '(713) 555-0211', area: 'River Oaks', jobs: 7, spent: '$2,340', lastJob: '1 month ago', plan: 'Basic', rating: 5 },
  { id: 'C-003', name: 'Sarah Mitchell', email: 'smitchell@email.com', phone: '(713) 555-0212', area: 'The Heights', jobs: 4, spent: '$1,200', lastJob: '2 days ago', plan: 'None', rating: 5 },
  { id: 'C-004', name: 'David Kim', email: 'dkim@email.com', phone: '(713) 555-0213', area: 'West University', jobs: 9, spent: '$3,100', lastJob: '3 weeks ago', plan: 'Pro', rating: 5 },
  { id: 'C-005', name: 'Amanda Foster', email: 'afoster@email.com', phone: '(713) 555-0214', area: 'Memorial', jobs: 2, spent: '$450', lastJob: 'Yesterday', plan: 'None', rating: 4 },
  { id: 'C-006', name: 'Carlos Reyes', email: 'creyes@email.com', phone: '(713) 555-0215', area: 'Pearland', jobs: 5, spent: '$1,680', lastJob: '1 week ago', plan: 'Basic', rating: 5 },
  { id: 'C-007', name: 'Linda Park', email: 'lpark@email.com', phone: '(713) 555-0216', area: 'Sugar Land', jobs: 3, spent: '$920', lastJob: '3 days ago', plan: 'None', rating: 5 },
  { id: 'C-008', name: 'Marcus Williams', email: 'mwilliams@email.com', phone: '(713) 555-0217', area: 'Montrose', jobs: 6, spent: '$2,100', lastJob: '2 weeks ago', plan: 'Pro', rating: 5 },
];

const planColors: Record<string, string> = {
  Pro: 'bg-[#F5A623]/20 text-[#1B2A4A]',
  Basic: 'bg-blue-100 text-blue-700',
  None: 'bg-gray-100 text-gray-500',
};

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="bg-[#1B2A4A] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-white/70 hover:text-white text-sm">← Dashboard</Link>
          <span className="text-white/30">/</span>
          <span className="text-white font-bold">Customer CRM</span>
        </div>
        <span className="text-white/60 text-sm">{customers.length} customers</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Customers', value: '847' },
            { label: 'On Maintenance Plan', value: '183' },
            { label: 'Avg Jobs per Customer', value: '3.8' },
            { label: 'Avg Lifetime Value', value: '$1,240' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <p className="text-2xl font-black text-[#1B2A4A]">{value}</p>
              <p className="text-gray-500 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers by name, email, or area…"
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
          />
        </div>

        {/* Customers table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
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
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F8F9FA] transition-colors cursor-pointer">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#1B2A4A] flex items-center justify-center shrink-0">
                          <span className="text-[#F5A623] font-bold text-sm">{c.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1B2A4A]">{c.name}</p>
                          <p className="text-gray-400 text-xs">{c.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                          <Phone className="w-3 h-3" />{c.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                          <Mail className="w-3 h-3" />{c.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                        <MapPin className="w-3 h-3 text-[#F5A623]" />{c.area}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-gray-700 text-xs">
                        <Calendar className="w-3 h-3" />{c.jobs}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="font-bold text-[#1B2A4A] text-sm">{c.spent}</span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-gray-500 text-xs">{c.lastJob}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${planColors[c.plan]}`}>{c.plan}</span>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <div className="flex gap-0.5">
                        {[...Array(c.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
