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
    <footer className="bg-[#f5f5f7] text-[12px] text-muted">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-6">
        <div className="flex flex-col justify-between gap-8 border-b border-line pb-10 md:flex-row md:items-end">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Need it done right the first time?
            </h3>
            <p className="mt-2 text-[15px]">Book in a minute. Or call — a person answers.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="rounded-full bg-ink px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-black"
            >
              Get a quote
            </Link>
            <a
              href={BUSINESS.phoneHref}
              className="rounded-full bg-white px-6 py-2.5 text-center text-sm font-medium text-ink ring-1 ring-black/5 hover:bg-white"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandMark />
            <p className="mt-5 max-w-xs leading-relaxed">
              Independent Houston handyman company since {BUSINESS.founded}. Bonded, insured, and guaranteed.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-[12px] font-semibold text-ink">Services</h4>
            <ul className="space-y-2">
              {SERVICES.slice(0, 8).map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.id}`} className="hover:text-ink">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[12px] font-semibold text-ink">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[12px] font-semibold text-ink">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href={BUSINESS.phoneHref} className="hover:text-ink">
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-ink">
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

        <div className="flex flex-col items-start justify-between gap-3 border-t border-line py-6 sm:flex-row sm:items-center">
          <p>Copyright © {new Date().getFullYear()} Houston Handy Pros. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="hover:text-ink">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
