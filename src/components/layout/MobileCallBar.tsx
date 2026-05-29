'use client';

import Link from 'next/link';
import { Phone, CalendarCheck } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export default function MobileCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-2xl">
      <div className="grid grid-cols-2">
        <a
          href={BUSINESS.phoneHref}
          className="flex items-center justify-center gap-2 bg-[#1B2A4A] text-white font-bold py-4 text-sm active:bg-[#2d3f6b]"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <Link
          href="/book"
          className="flex items-center justify-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-bold py-4 text-sm active:bg-[#e8941a]"
        >
          <CalendarCheck className="w-4 h-4" />
          Book Online
        </Link>
      </div>
    </div>
  );
}
