import { Wrench, Phone, ArrowRight } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper px-4">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-ink text-gold">
          <Wrench className="h-8 w-8" />
        </div>
        <p className="font-display text-6xl text-ink">404</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Page not found</h1>
        <p className="mt-3 text-muted">
          This page went missing — like that one screw from the IKEA shelf. We can still fix the shelf.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="secondary">
            Go home <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/book">Book a repair</Button>
          <Button href={BUSINESS.phoneHref} variant="outline">
            <Phone className="h-4 w-4" />
            Call us
          </Button>
        </div>
      </div>
    </div>
  );
}
