import Link from 'next/link';
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
    <footer className="bg-ink text-[12px] text-white/55">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-6">
        <div className="flex flex-col justify-between gap-8 border-b border-line pb-10 md:flex-row md:items-end">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Need it done right the first time?
            </h3>
            <p className="mt-2 text-[15px] text-white/65">Book in a minute. Or call — a person answers.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="rounded-full bg-copper px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-copper-dark"
            >
              Get a quote
            </Link>
            <a
              href={BUSINESS.phoneHref}
              className="rounded-full bg-white/10 px-6 py-2.5 text-center text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/15"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>

        <div className="grid gap-10 border-b border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandMark inverted />
            <p className="mt-5 max-w-xs leading-relaxed">
              Independent Houston handyman company since {BUSINESS.founded}. Bonded, insured, and guaranteed.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-[12px] font-semibold text-gold">Services</h4>
            <ul className="space-y-2">
              {SERVICES.slice(0, 8).map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.id}`} className="hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[12px] font-semibold text-gold">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[12px] font-semibold text-gold">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href={BUSINESS.phoneHref} className="hover:text-white">
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-white">
                  {BUSINESS.email}
                </a>
              </li>
              <li>{BUSINESS.address}</li>
              <li>
                {BUSINESS.hours}
                <br />
                {BUSINESS.hoursSunday}
              </li>
              <li className="pt-2">
                Bonded & insured — {BUSINESS.insurance}
                <br />
                {BUSINESS.guarantee}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p>Copyright © {new Date().getFullYear()} Houston Handy Pros. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
