import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';

const reasons = [
  {
    title: 'We know Houston houses',
    body: 'Clay soil cracks drywall. Humidity swells doors. Storms drop fences. We repair for this climate, not a generic punch list from somewhere dry.',
  },
  {
    title: 'Bonded and insured',
    body: 'Background-checked technicians. $1M liability. You know who is in the house — and who stands behind the work.',
  },
  {
    title: 'On time, or we tell you first',
    body: 'A person confirms the window. A branded truck shows up. If we are running late, you hear from us before you start looking out the window.',
  },
  {
    title: 'Price before we start',
    body: 'You approve the number. No bait-and-switch. If we find something else, we stop and ask. The 1-year guarantee is on the labor, in writing.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/about.jpg"
              alt="Houston Handy Pros founder in the workshop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute bottom-5 left-5 max-w-xs rounded-2xl bg-white/85 p-5 backdrop-blur-xl">
            <p className="text-2xl font-semibold tracking-tight text-ink">Since 2015</p>
            <p className="mt-1 text-sm text-muted">
              Independent. Local. Still run by the person who started it in The Heights.
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Why homeowners call us back"
            title="A Houston company, not a franchise script."
            subtitle="The big brands have vans. We have people who live here — and a guarantee that is ours, not a national slogan."
          />
          <div className="grid gap-8 sm:grid-cols-2">
            {reasons.map(({ title, body }) => (
              <div key={title}>
                <h3 className="font-semibold tracking-tight text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
