import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Award, Users, Heart, CheckCircle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Houston Handy Pros | Our Story & Team',
  description:
    'Learn about Houston Handy Pros — Houston\'s trusted handyman service since 2015. Meet our team, see our licenses, and learn our story.',
};

const team = [
  { name: 'Marcus Johnson', role: 'Founder & Lead Technician', spec: 'Carpentry, Plumbing, General Repairs', years: 15 },
  { name: 'Derek Williams', role: 'Senior Technician', spec: 'Electrical, Drywall, Painting', years: 10 },
  { name: 'Carlos Reyes', role: 'Field Technician', spec: 'Flooring, Tile, Pressure Washing', years: 7 },
  { name: 'Tony Nguyen', role: 'Field Technician', spec: 'TV Mounting, Smart Home, Assembly', years: 5 },
];

const values = [
  { icon: Shield, title: 'Safety First', desc: 'Every tech is background-checked, licensed, and insured. You know who\'s in your home.' },
  { icon: Award, title: 'Quality Work', desc: '1-year workmanship guarantee on every job we complete. Period.' },
  { icon: Users, title: 'Respect', desc: 'We treat your home like it\'s our own. We clean up. We don\'t smoke, swear, or overstay.' },
  { icon: Heart, title: 'Community', desc: 'Houston raised us. We give back through Habitat for Humanity and local school repair days.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1B2A4A] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">Our Story</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-5">
            Built in Houston. Built for Houston.
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Houston Handy Pros started in a garage in The Heights in {BUSINESS.founded}. Today we&apos;re Houston&apos;s most-reviewed independent handyman service — and we&apos;re still run by the same guy who started it.
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-[#1B2A4A] rounded-3xl p-10 text-center">
            <div className="w-24 h-24 rounded-full bg-[#F5A623] flex items-center justify-center mx-auto mb-4">
              <span className="text-[#1B2A4A] font-black text-3xl">M</span>
            </div>
            <h3 className="text-white font-black text-xl mb-1">Marcus Johnson</h3>
            <p className="text-[#F5A623] text-sm mb-4">Founder & Lead Technician</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { v: '15+', l: 'Years Experience' },
                { v: `${BUSINESS.jobsCompleted}+`, l: 'Jobs Completed' },
                { v: '5★', l: 'Average Rating' },
                { v: '2015', l: 'Founded' },
              ].map(({ v, l }) => (
                <div key={l} className="bg-white/10 rounded-xl p-3">
                  <p className="text-[#F5A623] font-black text-xl">{v}</p>
                  <p className="text-white/60 text-xs">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#1B2A4A] mb-5">Why I Started This Company</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I grew up watching my dad fix everything himself — not because he wanted to, but because he couldn&apos;t afford to hire anyone. When I was old enough to work, I apprenticed under a master carpenter in Galveston and spent a decade learning the trade from the ground up.
              </p>
              <p>
                When I moved to Houston, I kept seeing the same problem: homeowners either couldn&apos;t find a reliable handyman, got gouged on price, or ended up with shoddy work that cost more to fix later. I knew I could do better.
              </p>
              <p>
                So in {BUSINESS.founded}, I started Houston Handy Pros with one truck, one toolbox, and one rule: <strong>fix it right the first time, or come back and fix it for free.</strong>
              </p>
              <p>
                That rule is still the backbone of everything we do. It always will be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-[#1B2A4A] mb-10 text-center">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1B2A4A] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#F5A623]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2A4A] text-base mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-[#1B2A4A] mb-3 text-center">The Team</h2>
          <p className="text-gray-600 text-center mb-10">Every technician is background-checked, licensed, and drug-tested.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#1B2A4A] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#F5A623] font-black text-2xl">{member.name[0]}</span>
                </div>
                <h3 className="font-bold text-[#1B2A4A] text-sm mb-0.5">{member.name}</h3>
                <p className="text-[#F5A623] text-xs font-semibold mb-1">{member.role}</p>
                <p className="text-gray-500 text-xs mb-2">{member.spec}</p>
                <p className="text-gray-400 text-xs">{member.years} yrs experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licenses */}
      <section className="py-16 px-4 bg-[#1B2A4A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-8">Fully Licensed, Bonded & Insured</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { label: 'TX Contractor License', value: 'TCLP #12345678' },
              { label: 'General Liability', value: '$1,000,000 Coverage' },
              { label: 'Workers Compensation', value: 'All technicians covered' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 rounded-xl p-5">
                <CheckCircle className="w-6 h-6 text-[#F5A623] mx-auto mb-2" />
                <p className="text-white font-bold text-sm">{label}</p>
                <p className="text-white/60 text-xs mt-1">{value}</p>
              </div>
            ))}
          </div>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-black px-10 py-4 rounded-xl hover:bg-[#e8941a] transition-colors"
          >
            Book Our Team Today
          </Link>
        </div>
      </section>
    </div>
  );
}
