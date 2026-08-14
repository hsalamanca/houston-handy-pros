import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import ServicesGrid from '@/components/sections/ServicesGrid';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import HowItWorks from '@/components/sections/HowItWorks';
import GalleryPreview from '@/components/sections/GalleryPreview';
import ServiceAreaSection from '@/components/sections/ServiceAreaSection';
import FAQ from '@/components/sections/FAQ';
import CtaBand from '@/components/ui/CtaBand';

export const metadata: Metadata = {
  title: 'Houston Handy Pros | Handyman Services in Houston, TX',
  description:
    'Bonded & insured handyman serving Houston, Katy, Sugar Land, Pearland, and The Woodlands. Same-week booking. 1-year guarantee. Get a free quote.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid limit={6} />
      <WhyChooseUs />
      <HowItWorks />
      <GalleryPreview />
      <ServiceAreaSection />
      <FAQ />
      <CtaBand title="15% off your first job." subtitle="New Houston customers. Book this month." />
    </>
  );
}
