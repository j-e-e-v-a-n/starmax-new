import React, { useEffect } from 'react';
import { MapPin, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PageHero } from '../components/layout/PageHero';
import { CareerForm } from '../components/forms/CareerForm';
import { COMPANY_INFO } from '../data/company';

export const CareersPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Careers at Starmax Systems | Kochi, Kerala';
  }, []);

  return (
    <div className="bg-white">
      <div className="border-b border-rule bg-white">
        <div className="container-x">
          <Breadcrumbs items={[{ label: 'Careers' }]} />
        </div>
      </div>

      <PageHero
        label="Careers"
        title="Careers at Starmax Systems"
        lede="Interested in security and network technology? Join our technician and systems engineering teams working out of Kochi, Haripad, Chengannur and Calicut."
      />

      <section className="section-pad border-b border-rule">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="label">Employment enquiries</p>
              <h2>Working in security technology</h2>
              <p className="mt-4 text-[15px] text-muted leading-relaxed">
                Starmax Systems operates in the supply, installation, and servicing of electronic security infrastructure, CCTV cameras, biometric access control devices, automatic gate operators, and automation technologies across Kerala.
              </p>

              <div className="mt-7 p-7 rounded-[2px] bg-mist border border-rule space-y-4">
                <div className="text-[13px] font-semibold text-navy uppercase tracking-wide">
                  Typical Specializations Considered:
                </div>
                <div className="space-y-3 text-[14px] text-navy">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                    <span>Security Systems Installation &amp; Cabling Technicians</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                    <span>Electronics &amp; Telecommunication Field Engineers</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                    <span>Automatic Gate Mechanical &amp; Electrical Operators</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                    <span>Technical Support &amp; Customer Coordination</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-7 rounded-[2px] bg-navy text-white text-[14px]">
                <div className="flex items-center gap-2 text-[#8FB0F0] font-semibold mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Office Location</span>
                </div>
                <p className="text-[#CBD8E8] leading-relaxed">
                  {COMPANY_INFO.registeredOffice.fullAddress}
                </p>
                <div className="pt-3 mt-3 border-t border-white/15 text-[#A9B9D0] text-[13px]">
                  Direct HR questions can also be directed to{' '}
                  <a href={`mailto:${COMPANY_INFO.contacts.generalEmail}`} className="text-white font-semibold underline">
                    {COMPANY_INFO.contacts.generalEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[2px] border border-rule">
              <div className="mb-7">
                <h3 className="text-[1.4rem] font-normal text-navy">
                  Submit Candidate Information
                </h3>
                <p className="text-[13px] text-muted mt-2">
                  Please provide your contact information, academic background, and attach your latest CV.
                </p>
              </div>

              <CareerForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
