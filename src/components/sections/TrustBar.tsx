import { Shield, Award, Users, Star, Clock } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

const badges = [
  { icon: Shield, label: 'Licensed & Insured', sub: 'TCLP #12345678' },
  { icon: Award, label: '1-Year Guarantee', sub: 'On all labor' },
  { icon: Users, label: `${BUSINESS.jobsCompleted.toLocaleString()}+ Jobs Done`, sub: 'In Houston metro' },
  { icon: Star, label: `${BUSINESS.rating} Star Rating`, sub: `${BUSINESS.reviewCount}+ Google reviews` },
  { icon: Clock, label: 'Fast Response', sub: 'Same-week booking' },
];

export default function TrustBar() {
  return (
    <section className="bg-[#F8F9FA] border-y border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {badges.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#1B2A4A] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#F5A623]" />
              </div>
              <div>
                <p className="font-bold text-[#1B2A4A] text-sm">{label}</p>
                <p className="text-gray-500 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
