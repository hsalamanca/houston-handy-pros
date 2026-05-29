import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = { title: 'Job Board | Admin', robots: { index: false, follow: false } };

const columns = [
  {
    id: 'new', label: 'New', color: 'bg-purple-500',
    jobs: [
      { id: 'BK-1043', name: 'Robert Chen', service: 'Plumbing Repair', time: 'Tomorrow 9am', address: 'River Oaks', phone: '(713) 555-0201', amount: '$200' },
      { id: 'BK-1044', name: 'Maria Gonzalez', service: 'Ceiling Fan Install', time: 'Thu 11am', address: 'Pearland', phone: '(713) 555-0202', amount: '$150' },
      { id: 'BK-1045', name: 'Tom Bradley', service: 'Drywall Patch', time: 'Fri 2pm', address: 'Katy', phone: '(713) 555-0203', amount: '$225' },
    ],
  },
  {
    id: 'scheduled', label: 'Scheduled', color: 'bg-blue-500',
    jobs: [
      { id: 'BK-1041', name: 'James Torres', service: 'TV Mounting', time: 'Today 2pm', address: 'Montrose', phone: '(713) 555-0101', amount: '$175' },
      { id: 'BK-1042', name: 'Sarah Mitchell', service: 'Plumbing Repair', time: 'Today 10am', address: 'The Heights', phone: '(713) 555-0102', amount: '$125' },
    ],
  },
  {
    id: 'in_progress', label: 'In Progress', color: 'bg-orange-500',
    jobs: [
      { id: 'BK-1038', name: 'Amanda Foster', service: 'Pressure Washing', time: 'Now', address: 'Memorial', phone: '(713) 555-0103', amount: '$300' },
    ],
  },
  {
    id: 'complete', label: 'Complete', color: 'bg-green-500',
    jobs: [
      { id: 'BK-1039', name: 'Carlos Reyes', service: 'Fence Repair', time: 'Yesterday', address: 'Katy', phone: '(713) 555-0104', amount: '$380' },
      { id: 'BK-1040', name: 'Linda Park', service: 'Drywall Patch', time: 'Yesterday', address: 'Sugar Land', phone: '(713) 555-0105', amount: '$250' },
      { id: 'BK-1037', name: 'David Kim', service: 'Carpentry', time: '2 days ago', address: 'West U', phone: '(713) 555-0106', amount: '$320' },
    ],
  },
];

export default function JobBoardPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="bg-[#1B2A4A] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-white/70 hover:text-white text-sm">← Dashboard</Link>
          <span className="text-white/30">/</span>
          <span className="text-white font-bold">Job Board</span>
        </div>
        <Link href="/book" className="bg-[#F5A623] text-[#1B2A4A] font-bold text-sm px-4 py-2 rounded-lg hover:bg-[#e8941a] transition-colors">
          + New Booking
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {columns.map((col) => (
            <div key={col.id}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${col.color}`} />
                <h3 className="font-black text-[#1B2A4A] text-sm uppercase tracking-wider">{col.label}</h3>
                <span className="ml-auto bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">{col.jobs.length}</span>
              </div>
              <div className="space-y-3">
                {col.jobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-[#1B2A4A] text-sm">{job.name}</p>
                        <p className="text-[#F5A623] text-xs font-semibold">{job.service}</p>
                      </div>
                      <span className="text-[#1B2A4A] font-black text-sm">{job.amount}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <Clock className="w-3 h-3" />
                        {job.time}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <MapPin className="w-3 h-3" />
                        {job.address}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <Phone className="w-3 h-3" />
                        {job.phone}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">{job.id}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
