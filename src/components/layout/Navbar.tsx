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
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={cn(
          'border-b transition-all duration-300',
          scrolled || mobileOpen
            ? 'border-black/5 bg-white/75 backdrop-blur-xl'
            : 'border-transparent bg-white/55 backdrop-blur-xl'
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-6">
          <Link href="/" aria-label="Houston Handy Pros home">
            <BrandMark compact />
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
                    className="flex items-center gap-1 px-3 py-2 text-[13px] font-normal text-ink/80 hover:text-ink"
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                  <div
                    className={cn(
                      'absolute left-1/2 top-full w-64 -translate-x-1/2 rounded-2xl bg-white/95 p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] ring-1 ring-black/5 backdrop-blur-xl transition-all',
                      servicesOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
                    )}
                  >
                    {SERVICES.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.id}`}
                        className="block rounded-xl px-3 py-2 text-sm text-ink/80 hover:bg-cream hover:text-ink"
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
                  className="px-3 py-2 text-[13px] font-normal text-ink/80 hover:text-ink"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-1.5 text-[13px] text-ink/70 hover:text-ink"
            >
              <Phone className="h-3.5 w-3.5" />
              {BUSINESS.phone}
            </a>
            <Link
              href="/book"
              className="rounded-full bg-copper px-4 py-1.5 text-[13px] font-medium text-white hover:bg-copper-dark"
            >
              Book
            </Link>
          </div>

          <button
            className="p-2 text-ink lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-black/5 bg-white/90 px-5 pb-6 backdrop-blur-xl lg:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block border-b border-black/5 py-3.5 text-[17px] text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={BUSINESS.phoneHref}
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-cream py-3 text-sm font-medium text-ink"
            >
              <Phone className="h-4 w-4" />
              Call {BUSINESS.phone}
            </a>
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="mt-3 block rounded-full bg-copper py-3 text-center text-sm font-medium text-white"
            >
              Get a quote
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
