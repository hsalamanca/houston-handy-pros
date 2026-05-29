'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/services', label: 'Services', hasDropdown: true },
  { href: '/pricing', label: 'Pricing' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/service-area', label: 'Service Area' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const serviceLinks = [
  { href: '/services/carpentry', label: 'Carpentry & Woodwork' },
  { href: '/services/plumbing', label: 'Plumbing Repairs' },
  { href: '/services/electrical', label: 'Electrical' },
  { href: '/services/drywall', label: 'Drywall & Painting' },
  { href: '/services/flooring', label: 'Flooring' },
  { href: '/services/pressure-washing', label: 'Pressure Washing' },
  { href: '/services/fence', label: 'Fence & Gate Repair' },
  { href: '/services/assembly', label: 'Furniture Assembly' },
  { href: '/services/tv-mounting', label: 'TV Mounting' },
  { href: '/services/commercial', label: 'Commercial Services' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-[#1B2A4A] shadow-lg' : 'bg-[#1B2A4A]/95'
      )}
    >
      {/* Top bar */}
      <div className="bg-[#F5A623] text-[#1B2A4A] text-sm py-1.5 px-4 text-center font-medium">
        🔧 Houston&apos;s Most Trusted Handyman · Licensed, Bonded & Insured · Call{' '}
        <a href={BUSINESS.phoneHref} className="font-bold underline">{BUSINESS.phone}</a>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[#F5A623] flex items-center justify-center">
            <span className="text-[#1B2A4A] font-black text-lg">H</span>
          </div>
          <div>
            <p className="text-white font-bold text-base leading-none">Houston Handy Pros</p>
            <p className="text-[#F5A623] text-xs leading-none mt-0.5">Est. 2015</p>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.href} className="relative group">
                <button
                  className="flex items-center gap-1 text-white/90 hover:text-[#F5A623] text-sm font-medium px-3 py-2 transition-colors"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  {link.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div
                  className={cn(
                    'absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl py-2 transition-all duration-200',
                    servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                  )}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F8F9FA] hover:text-[#1B2A4A] font-medium transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                  <div className="border-t my-1" />
                  <Link href="/services" className="block px-4 py-2 text-sm text-[#F5A623] font-semibold hover:bg-[#F8F9FA]">
                    View All Services →
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-[#F5A623] text-sm font-medium px-3 py-2 transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center gap-2 text-white/90 hover:text-[#F5A623] text-sm font-medium transition-colors"
          >
            <Phone className="w-4 h-4" />
            {BUSINESS.phone}
          </a>
          <Link
            href="/book"
            className="bg-[#F5A623] text-[#1B2A4A] font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-[#e8941a] transition-colors"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#1B2A4A] border-t border-white/10 px-4 pb-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-white py-3 text-base font-medium border-b border-white/10 last:border-0"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 space-y-3">
            <a
              href={BUSINESS.phoneHref}
              className="flex items-center justify-center gap-2 w-full bg-white/10 text-white font-semibold py-3 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              {BUSINESS.phone}
            </a>
            <Link
              href="/book"
              className="block w-full bg-[#F5A623] text-[#1B2A4A] font-bold text-center py-3 rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
