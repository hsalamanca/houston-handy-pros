import Link from 'next/link';
import { ClipboardList, CalendarCheck, ThumbsUp } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Book Online in 60 Seconds',
    description:
      'Choose your service, describe the job, pick a date that works. No phone tag required — though we love talking to our customers too.',
  },
  {
    icon: CalendarCheck,
    step: '02',
    title: 'We Show Up — On Time',
    description:
      'Your technician arrives in a branded vehicle, introduces themselves, and reviews the job with you before touching a thing. No surprises.',
  },
  {
    icon: ThumbsUp,
    step: '03',
    title: 'Job Done. Guaranteed.',
    description:
      'We clean up completely when finished. You get an invoice, photos of the completed work, and a 1-year workmanship guarantee.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-[#1B2A4A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-[#F5A623] font-bold uppercase tracking-wider text-sm">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4">
            From Broken to Fixed in 3 Steps
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            We&apos;ve made hiring a handyman as easy as ordering pizza — minus the 45-minute wait.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-[#F5A623]/30 z-0" />

          {steps.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F5A623] mb-6 relative">
                <Icon className="w-9 h-9 text-[#1B2A4A]" />
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-white text-[#1B2A4A] rounded-full text-xs font-black flex items-center justify-center shadow">
                  {step}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-black text-lg px-10 py-4 rounded-xl hover:bg-[#e8941a] transition-colors"
          >
            Book My Free Estimate
          </Link>
        </div>
      </div>
    </section>
  );
}
