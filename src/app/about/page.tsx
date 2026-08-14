import type { Metadata } from 'next';
import Image from 'next/image';
import { Shield, Award, Users, Heart, CheckCircle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';

export const metadata: Metadata = {
  title: 'About Houston Handy Pros',
  description:
    'Houston Handy Pros is an independent, insured handyman company founded in The Heights in 2015. Meet the team and see why homeowners call us back.',
};

const team = [
  { name: 'Marcus Johnson', role: 'Founder & Lead Technician', spec: 'Carpentry, plumbing, general repairs', years: 15 },
  { name: 'Derek Williams', role: 'Senior Technician', spec: 'Electrical, drywall, painting', years: 10 },
  { name: 'Carlos Reyes', role: 'Field Technician', spec: 'Flooring, tile, pressure washing', years: 7 },
  { name: 'Tony Nguyen', role: 'Field Technician', spec: 'TV mounting, smart home, assembly', years: 5 },
];

const values = [
  { icon: Shield, title: 'Safety first', desc: 'Background-checked and insured. You know who is in your home.' },
  { icon: Award, title: 'Quality work', desc: '1-year workmanship guarantee on every job. Period.' },
  { icon: Users, title: 'Respect', desc: 'We treat the house like it is ours. We clean up. We do not overstay.' },
  { icon: Heart, title: 'Community', desc: 'Houston raised us. We give back through Habitat for Humanity and school repair days.' },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our story"
        title="Built in Houston. Built for Houston."
        subtitle={`Started in a Heights garage in ${BUSINESS.founded}. Still independent. Still the same rule: fix it right the first time, or come back and fix it for free.`}
      >
        <Image
          src="/images/logo.jpg"
          alt="Houston Handy Pros logo"
          width={640}
          height={360}
          className="mx-auto h-auto w-full max-w-md rounded-sm"
        />
      </PageHero>

      <section className="section-pad bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/images/about.jpg"
              alt="Houston Handy Pros founder"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">Founder</p>
            <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">Why I started this company</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-muted">
              <p>
                I grew up watching my dad fix everything himself — not because he wanted to, but because he could not
                afford to hire anyone. I apprenticed under a master carpenter in Galveston and spent a decade learning
                the trade from the ground up.
              </p>
              <p>
                When I moved to Houston I kept seeing the same problem: homeowners either could not find a reliable
                handyman, got gouged, or paid twice to undo the first job.
              </p>
              <p>
                So in {BUSINESS.founded} I started Houston Handy Pros with one truck, one toolbox, and one rule:{' '}
                <strong className="text-ink">fix it right the first time, or come back and fix it for free.</strong>
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { v: '15+', l: 'Years experience' },
                { v: `${BUSINESS.jobsCompleted.toLocaleString()}+`, l: 'Jobs completed' },
                { v: `${BUSINESS.rating}★`, l: 'Average rating' },
                { v: String(BUSINESS.founded), l: 'Founded' },
              ].map(({ v, l }) => (
                <div key={l} className="border border-line bg-cream p-4">
                  <p className="font-display text-2xl text-ink">{v}</p>
                  <p className="text-xs text-muted">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-10 text-center font-display text-3xl text-ink">What we stand for</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 border border-line bg-paper p-6">
                <Icon className="h-6 w-6 shrink-0 text-copper" />
                <div>
                  <h3 className="font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-sm text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl text-ink">The crew</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted">
            Every technician is background-checked and drug-tested.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="border border-line bg-cream p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ink font-display text-2xl text-gold">
                  {member.name[0]}
                </div>
                <h3 className="font-semibold text-ink">{member.name}</h3>
                <p className="mt-1 text-xs font-semibold text-copper">{member.role}</p>
                <p className="mt-2 text-xs text-muted">{member.spec}</p>
                <p className="mt-1 text-xs text-muted">{member.years} yrs experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl text-cream">Bonded, insured, and guaranteed</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'General liability', value: BUSINESS.insurance },
              { label: 'Background-checked crew', value: 'Every technician' },
              { label: 'Workmanship guarantee', value: BUSINESS.guarantee },
            ].map(({ label, value }) => (
              <div key={label} className="border border-white/10 bg-white/5 p-5">
                <CheckCircle className="mx-auto mb-2 h-5 w-5 text-gold" />
                <p className="text-sm font-semibold text-cream">{label}</p>
                <p className="mt-1 text-xs text-cream/60">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/book">Book the team</Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
