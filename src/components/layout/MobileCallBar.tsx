import Link from 'next/link';
import { Phone, CalendarCheck } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper md:hidden">
      <div className="grid grid-cols-2">
        <a
          href={BUSINESS.phoneHref}
          className="flex items-center justify-center gap-2 bg-ink py-3.5 text-sm font-semibold text-cream"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
        <Link
          href="/book"
          className="flex items-center justify-center gap-2 bg-copper py-3.5 text-sm font-semibold text-ink"
        >
          <CalendarCheck className="h-4 w-4" />
          Get Free Quote
        </Link>
      </div>
    </div>
  );
}
