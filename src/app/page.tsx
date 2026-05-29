import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import ServicesGrid from '@/components/sections/ServicesGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import ReviewsCarousel from '@/components/sections/ReviewsCarousel';
import ServiceAreaSection from '@/components/sections/ServiceAreaSection';
import FAQ from '@/components/sections/FAQ';

export const metadata: Metadata = {
  title: 'Houston Handy Pros | Licensed Handyman Services in Houston, TX',
  description:
    "Houston's most trusted handyman service since 2015. Licensed, bonded & insured. Plumbing, carpentry, electrical, drywall, TV mounting & more. Book online today.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <HowItWorks />
      <ReviewsCarousel />
      <ServiceAreaSection />
      <FAQ />
    </>
  );
}
