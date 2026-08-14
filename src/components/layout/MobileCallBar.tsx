import Link from 'next/link';
import { Phone, CalendarCheck } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/85 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2 gap-2 p-3">
        <a
          href={BUSINESS.phoneHref}
          className="flex items-center justify-center gap-2 rounded-full bg-cream py-3 text-sm font-medium text-ink"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <Link
          href="/book"
          className="flex items-center justify-center gap-2 rounded-full bg-copper py-3 text-sm font-medium text-white"
        >
          <CalendarCheck className="h-4 w-4" />
          Quote
        </Link>
      </div>
    </div>
  );
}
