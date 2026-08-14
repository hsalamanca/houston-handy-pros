import { ClipboardList, Truck, BadgeCheck } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Tell us the job',
    description:
      'Book online or call. Describe the list. Photos help. You get a clear estimate before anyone knocks.',
  },
  {
    icon: Truck,
    step: '02',
    title: 'We show up on time',
    description:
      'A background-checked tech arrives in a marked truck, walks the job with you, and confirms the price before work starts.',
  },
  {
    icon: BadgeCheck,
    step: '03',
    title: 'Done. Guaranteed.',
    description:
      'We clean up, send photos, and leave a 1-year workmanship guarantee. If it fails, we come back.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-pad bg-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          inverted
          eyebrow="How it works"
          title="From the list to done in three steps."
          subtitle="No phone tag. No mystery invoices. No “we’ll see when we get there.”"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="border border-white/10 bg-white/5 p-7">
              <div className="mb-6 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-copper text-ink">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-3xl text-white/15">{step}</span>
              </div>
              <h3 className="font-display text-2xl text-cream">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/book">Book my free estimate</Button>
        </div>
      </div>
    </section>
  );
}
