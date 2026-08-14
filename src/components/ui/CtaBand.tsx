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
    <section className="bg-copper">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-12 text-center md:flex-row md:text-left sm:px-6">
        <div>
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">{title}</h2>
          <p className="mt-2 text-ink/75">{subtitle}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href="/book" variant="secondary">
            Get Free Quote
          </Button>
          <Button href={BUSINESS.phoneHref} variant="outline" className="border-ink/20">
            <Phone className="h-4 w-4" />
            Call {BUSINESS.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
