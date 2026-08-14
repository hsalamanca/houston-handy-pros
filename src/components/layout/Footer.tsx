import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { BUSINESS, SERVICES } from '@/lib/constants';
import BrandMark from '@/components/ui/BrandMark';

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/portfolio', label: 'Project Gallery' },
  { href: '/pricing', label: 'Pricing & Plans' },
  { href: '/service-area', label: 'Service Area' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/emergency', label: 'Same-Day / Emergency' },
  { href: '/book', label: 'Book Online' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="bg-copper">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 text-center md:flex-row md:text-left sm:px-6">
          <div>
            <h3 className="font-display text-2xl font-medium text-ink md:text-3xl">
              Need it done right the first time?
            </h3>
            <p className="mt-1 text-ink/80">Book in a minute. Or call — a person answers.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/book"
              className="rounded-sm bg-ink px-7 py-3 text-center text-sm font-semibold text-cream hover:bg-navy"
            >
              Get Free Quote
            </Link>
            <a
              href={BUSINESS.phoneHref}
              className="rounded-sm border border-ink/20 bg-paper px-7 py-3 text-center text-sm font-semibold text-ink hover:bg-cream"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <BrandMark inverted />
          <p className="mt-5 text-sm leading-relaxed text-cream/65">
            Independent Houston handyman company since {BUSINESS.founded}. Bonded, insured, and guaranteed. We fix
            the list — and we stand behind the work.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Services</h4>
          <ul className="space-y-2">
            {SERVICES.slice(0, 8).map((s) => (
              <li key={s.id}>
                <Link href={`/services/${s.id}`} className="text-sm text-cream/65 hover:text-cream">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Company</h4>
          <ul className="space-y-2">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-cream/65 hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Contact</h4>
          <ul className="space-y-3 text-sm text-cream/70">
            <li>
              <a href={BUSINESS.phoneHref} className="flex items-center gap-2 hover:text-cream">
                <Phone className="h-4 w-4 text-gold" />
                {BUSINESS.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 hover:text-cream">
                <Mail className="h-4 w-4 text-gold" />
                {BUSINESS.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {BUSINESS.address}
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {BUSINESS.hours}
                <br />
                {BUSINESS.hoursSunday}
              </span>
            </li>
          </ul>
          <div className="mt-5 rounded-sm border border-white/10 bg-white/5 p-4 text-xs text-cream/55">
            <p>Bonded & insured — {BUSINESS.insurance}</p>
            <p className="mt-1">{BUSINESS.guarantee}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-cream/45 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Houston Handy Pros. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-cream">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-cream">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="hover:text-cream">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
