import { Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import Button from './Button';

export default function CtaBand({
  title = 'Ready to cross it off the list?',
  subtitle = 'Free estimate. Upfront price. One-year guarantee.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] text-muted">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/book">Get a quote</Button>
          <Button href={BUSINESS.phoneHref} variant="secondary">
            <Phone className="h-4 w-4" />
            Call {BUSINESS.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
