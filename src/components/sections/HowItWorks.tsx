import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

const steps = [
  {
    step: '01',
    title: 'Tell us the job',
    description:
      'Book online or call. Describe the list. Photos help. You get a clear estimate before anyone knocks.',
  },
  {
    step: '02',
    title: 'We show up on time',
    description:
      'A background-checked tech arrives, walks the job with you, and confirms the price before work starts.',
  },
  {
    step: '03',
    title: 'Done. Guaranteed.',
    description:
      'We clean up, send photos, and leave a 1-year workmanship guarantee. If it fails, we come back.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-pad bg-ink">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          inverted
          eyebrow="How it works"
          title="From the list to done."
          subtitle="No phone tag. No mystery invoices. No “we’ll see when we get there.”"
        />

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map(({ step, title, description }) => (
            <div key={step} className="rounded-[1.75rem] bg-white/5 p-8">
              <p className="text-[13px] font-medium text-white/40">{step}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/55">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/book" variant="ghost">
            Book a free estimate
          </Button>
        </div>
      </div>
    </section>
  );
}
