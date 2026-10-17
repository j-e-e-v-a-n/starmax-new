import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ServiceStrip } from '../components/home/ServiceStrip';
import { TrustIntroSection } from '../components/home/TrustIntroSection';
import { ServicesGridSection } from '../components/home/ServicesGridSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { ClientsMarqueeSection } from '../components/home/ClientsMarqueeSection';
import { TestimonialsPreviewSection } from '../components/home/TestimonialsPreviewSection';
import { GalleryPreviewSection } from '../components/home/GalleryPreviewSection';
import { CallbackSection } from '../components/home/CallbackSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Starmax Systems | Security & Network Integration in Kochi, Kerala';
  }, []);

  return (
    <div className="flex flex-col w-full max-w-full">
      <HeroSection />
      <ServiceStrip />
      <TrustIntroSection />
      <ServicesGridSection />
      <WhyChooseUsSection />
      <IndustriesSection />
      <FeaturedSection />
      <ClientsMarqueeSection />
      <TestimonialsPreviewSection />
      <GalleryPreviewSection />
      <FinalCtaSection />
      <CallbackSection />
    </div>
  );
};
