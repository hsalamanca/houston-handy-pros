import { Shield, Award, Clock, BadgeCheck, Calendar } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

const badges = [
  { icon: Shield, label: 'Bonded & Insured', sub: BUSINESS.insurance },
  { icon: Award, label: '1-Year Guarantee', sub: 'On all labor' },
  { icon: BadgeCheck, label: `${BUSINESS.jobsCompleted.toLocaleString()}+ Jobs`, sub: 'Houston metro' },
  { icon: Calendar, label: `Est. ${BUSINESS.founded}`, sub: 'Houston-based' },
  { icon: Clock, label: 'Same-Week Booking', sub: '24–48 hr typical' },
];

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:grid-cols-5">
        {badges.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-ink text-gold">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{label}</p>
              <p className="text-xs text-muted">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
