import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ServiceStrip } from '../components/home/ServiceStrip';
import { TrustIntroSection } from '../components/home/TrustIntroSection';
import { ServicesGridSection } from '../components/home/ServicesGridSection';
import { ClientsMarqueeSection } from '../components/home/ClientsMarqueeSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';
import { CallbackSection } from '../components/home/CallbackSection';

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
      <ClientsMarqueeSection />
      <FinalCtaSection />
      <CallbackSection />
    </div>
  );
};
