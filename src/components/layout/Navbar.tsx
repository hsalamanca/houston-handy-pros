'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { BUSINESS, NAV_LINKS, SERVICES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import BrandMark from '@/components/ui/BrandMark';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-ink text-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] sm:px-6">
          <p className="hidden text-cream/70 sm:block">
            Bonded · Insured · {BUSINESS.offer}
          </p>
          <p className="sm:hidden text-cream/80">{BUSINESS.offer}</p>
          <a href={BUSINESS.phoneHref} className="font-semibold text-gold hover:text-cream">
            {BUSINESS.phone}
          </a>
        </div>
      </div>

      <nav
        className={cn(
          'border-b transition-all duration-300',
          scrolled ? 'border-line bg-paper/95 shadow-sm backdrop-blur' : 'border-transparent bg-paper'
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" aria-label="Houston Handy Pros home">
            <BrandMark />
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3 py-2 text-[13px] font-semibold text-ink/80 hover:text-ink"
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                  <div
                    className={cn(
                      'absolute left-0 top-full w-64 border border-line bg-paper p-2 shadow-xl transition-all',
                      servicesOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
                    )}
                  >
                    {SERVICES.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.id}`}
                        className="block px-3 py-2 text-sm text-ink/80 hover:bg-cream hover:text-ink"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-[13px] font-semibold text-ink/80 hover:text-ink"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink"
            >
              <Phone className="h-4 w-4 text-copper" />
              {BUSINESS.phone}
            </a>
            <Link
              href="/book"
              className="rounded-sm bg-copper px-5 py-2.5 text-sm font-semibold text-ink hover:bg-copper-dark"
            >
              Book Online
            </Link>
          </div>

          <button
            className="p-2 text-ink lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-line bg-paper px-4 pb-6 lg:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block border-b border-line py-3 text-base font-medium text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={BUSINESS.phoneHref}
              className="mt-4 flex items-center justify-center gap-2 rounded-sm bg-ink py-3 font-semibold text-cream"
            >
              <Phone className="h-4 w-4" />
              Call {BUSINESS.phone}
            </a>
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="mt-3 block rounded-sm bg-copper py-3 text-center font-semibold text-ink"
            >
              Get Free Quote
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
