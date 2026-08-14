import Image from 'next/image';
import { CloudRain, Shield, Clock3, Handshake } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const reasons = [
  {
    icon: CloudRain,
    title: 'We know Houston houses',
    body: 'Clay soil cracks drywall. Humidity swells doors. Storms drop fences. We repair for this climate, not a generic punch list from somewhere dry.',
  },
  {
    icon: Shield,
    title: 'Bonded and insured',
    body: 'Background-checked technicians. $1M liability. You know who is in the house — and who stands behind the work.',
  },
  {
    icon: Clock3,
    title: 'On time, or we tell you first',
    body: 'A person confirms the window. A branded truck shows up. If we are running late, you hear from us before you start looking out the window.',
  },
  {
    icon: Handshake,
    title: 'Price before we start',
    body: 'You approve the number. No bait-and-switch. If we find something else, we stop and ask. The 1-year guarantee is on the labor, in writing.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/images/about.jpg"
              alt="Houston Handy Pros founder in the workshop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 max-w-xs border border-line bg-paper p-5 shadow-xl sm:right-6">
            <p className="font-display text-3xl text-ink">Since 2015</p>
            <p className="mt-1 text-sm text-muted">
              Independent. Local. Still run by the person who started it in The Heights.
            </p>
          </div>
        </div>

        <div className="lg:pl-4">
          <SectionHeading
            align="left"
            eyebrow="Why homeowners call us back"
            title="A Houston company, not a franchise script."
            subtitle="The big brands have vans. We have people who live here — and a guarantee that is ours, not a national slogan."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border-t border-line pt-4">
                <Icon className="mb-3 h-5 w-5 text-copper" />
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
