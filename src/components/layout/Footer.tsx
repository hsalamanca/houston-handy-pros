import Link from 'next/link';
import { Phone, Mail, MapPin, Share2, Camera, Star } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

const serviceLinks = [
  { href: '/services/carpentry', label: 'Carpentry & Woodwork' },
  { href: '/services/plumbing', label: 'Plumbing Repairs' },
  { href: '/services/electrical', label: 'Electrical' },
  { href: '/services/drywall', label: 'Drywall & Painting' },
  { href: '/services/flooring', label: 'Flooring' },
  { href: '/services/pressure-washing', label: 'Pressure Washing' },
  { href: '/services/fence', label: 'Fence & Gate Repair' },
  { href: '/services/commercial', label: 'Commercial Services' },
];

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/portfolio', label: 'Project Gallery' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/pricing', label: 'Pricing & Plans' },
  { href: '/service-area', label: 'Service Area' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B2A4A] text-white">
      {/* CTA Banner */}
      <div className="bg-[#F5A623]">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-[#1B2A4A] text-2xl font-black">Ready to Cross It Off Your List?</h3>
            <p className="text-[#1B2A4A]/80 mt-1">Book online in 60 seconds. No hassle, no surprises.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/book"
              className="bg-[#1B2A4A] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#2d3f6b] transition-colors"
            >
              Get Free Estimate
            </Link>
            <a
              href={BUSINESS.phoneHref}
              className="bg-white text-[#1B2A4A] font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#F5A623] flex items-center justify-center">
              <span className="text-[#1B2A4A] font-black text-lg">H</span>
            </div>
            <span className="text-white font-bold text-lg">Houston Handy Pros</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-5">
            Houston&apos;s trusted handyman service since {BUSINESS.founded}. Licensed, bonded, and insured. We fix it right the first time.
          </p>
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
            ))}
            <span className="text-white/70 text-sm ml-2">{BUSINESS.rating} ({BUSINESS.reviewCount} reviews)</span>
          </div>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#F5A623] transition-colors">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#F5A623] transition-colors">
              <Camera className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-[#F5A623] font-bold uppercase tracking-wider text-xs mb-4">Services</h4>
          <ul className="space-y-2">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/70 hover:text-white text-sm transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[#F5A623] font-bold uppercase tracking-wider text-xs mb-4">Company</h4>
          <ul className="space-y-2">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/70 hover:text-white text-sm transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[#F5A623] font-bold uppercase tracking-wider text-xs mb-4">Contact</h4>
          <ul className="space-y-3">
            <li>
              <a href={BUSINESS.phoneHref} className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
                <Phone className="w-4 h-4 text-[#F5A623] shrink-0" />
                {BUSINESS.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
                <Mail className="w-4 h-4 text-[#F5A623] shrink-0" />
                {BUSINESS.email}
              </a>
            </li>
            <li className="flex items-start gap-2 text-white/70 text-sm">
              <MapPin className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
              <span>{BUSINESS.address}</span>
            </li>
          </ul>
          <div className="mt-6 p-4 bg-white/5 rounded-xl">
            <p className="text-[#F5A623] font-bold text-sm">Hours</p>
            <p className="text-white/70 text-sm mt-1">{BUSINESS.hours}</p>
            <p className="text-white/50 text-xs mt-1">Sunday: Closed</p>
          </div>
          <div className="mt-4 p-3 bg-white/5 rounded-xl">
            <p className="text-white/50 text-xs">License: {BUSINESS.license}</p>
            <p className="text-white/50 text-xs mt-0.5">Bonded & Insured — $1M Coverage</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>© {new Date().getFullYear()} Houston Handy Pros. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
