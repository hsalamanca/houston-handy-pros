import { BUSINESS } from '@/lib/constants';

const badges = [
  { label: 'Bonded & insured', sub: BUSINESS.insurance },
  { label: '1-year guarantee', sub: 'On all labor' },
  { label: `${BUSINESS.jobsCompleted.toLocaleString()}+ jobs`, sub: 'Houston metro' },
  { label: `Est. ${BUSINESS.founded}`, sub: 'Houston-based' },
  { label: 'Same-week booking', sub: '24–48 hr typical' },
];

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-12 sm:grid-cols-3 sm:px-6 lg:grid-cols-5">
        {badges.map(({ label, sub }) => (
          <div key={label}>
            <p className="text-sm font-semibold tracking-tight text-ink">{label}</p>
            <p className="mt-1 text-[13px] text-muted">{sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
