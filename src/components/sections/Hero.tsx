import Image from 'next/image';
import { Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import QuoteForm from '@/components/forms/QuoteForm';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f7]">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <div>
          <p className="mb-5 text-[13px] font-medium tracking-wide text-muted">
            Houston · Since {BUSINESS.founded} · Bonded & insured
          </p>

          <h1 className="text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
            Home, handled.
          </h1>

          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted sm:text-[19px]">
            Precision repairs for Houston houses. Carpentry, plumbing, electrical, drywall, fences —
            booked in a minute. One-year guarantee.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/book">Get a quote</Button>
            <Button href={BUSINESS.phoneHref} variant="secondary">
              <Phone className="h-4 w-4" />
              {BUSINESS.phone}
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/hero.jpg"
              alt="Houston Handy Pros technician at a Heights bungalow"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-x-4 bottom-4 hidden rounded-[1.5rem] bg-white/80 p-5 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:block lg:inset-x-auto lg:bottom-6 lg:right-6 lg:w-[20.5rem]">
            <p className="text-[13px] font-medium text-muted">This week</p>
            <h2 className="mb-4 mt-1 text-xl font-semibold tracking-tight text-ink">Request an estimate</h2>
            <QuoteForm compact />
          </div>
        </div>
        <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-black/5 lg:hidden">
          <p className="text-[13px] font-medium text-muted">This week</p>
          <h2 className="mb-4 mt-1 text-xl font-semibold tracking-tight text-ink">Request an estimate</h2>
          <QuoteForm compact />
        </div>
      </div>
    </section>
  );
}
