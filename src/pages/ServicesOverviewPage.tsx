import React, { useEffect } from 'react';
import { ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PageHero } from '../components/layout/PageHero';
import { Link } from '../router';
import { SERVICES } from '../data/services';
import { ServiceEnquiryForm } from '../components/forms/ServiceEnquiryForm';

export const ServicesOverviewPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Security Systems & Automation Services | Starmax Systems';
  }, []);

  return (
    <div className="bg-white">
      <div className="border-b border-rule bg-white">
        <div className="container-x">
          <Breadcrumbs items={[{ label: 'Services' }]} />
        </div>
      </div>

      <PageHero
        label="Services"
        title="Security & Automation Services"
        lede="Starmax Systems delivers a range of commercial security hardware, perimeter automation, and structured network infrastructure designed around specific operating requirements."
      />

      {/* Services Grid */}
      <section className="section-pad border-b border-rule bg-white">
        <div className="container-x">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {SERVICES.map((service, index) => (
              <div
                key={service.slug}
                className="bg-white rounded-[2px] border border-rule overflow-hidden hover:border-blue transition-colors duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-32 sm:h-48 overflow-hidden bg-mist">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/90 backdrop-blur-sm text-navy text-[9px] sm:text-[11px] font-mono font-semibold px-1.5 sm:px-2 py-0.5 rounded-[2px]">
                      0{index + 1}
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xs sm:text-base font-sans font-semibold text-navy group-hover:text-blue transition-colors mb-1 sm:mb-2 tracking-normal line-clamp-2 leading-snug">
                        {service.title}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-muted leading-relaxed mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                        {service.shortDescription}
                      </p>

                      <div className="hidden sm:block space-y-1.5 pt-3 border-t border-rule text-[11px] text-navy">
                        {service.capabilities.slice(0, 2).map((cap, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-5 pt-0">
                  <div className="pt-3 sm:pt-4 border-t border-rule">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center justify-between w-full text-[11px] sm:text-xs font-semibold text-blue group-hover:text-navy transition-colors"
                    >
                      <span>Overview</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation */}
      <section className="section-pad bg-mist">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="label">Need assistance?</p>
              <h2>Request a security system consultation</h2>
              <p className="mt-4 text-[15px] text-muted leading-relaxed">
                Whether you need a dedicated surveillance setup for a single storefront or a complete access control and gate automation project for a commercial business park, our team provides consultation tailored to your layout.
              </p>

              <div className="mt-7 bg-white p-7 rounded-[2px] border border-rule space-y-3.5 text-[14px] text-navy">
                <div className="font-semibold text-navy mb-1">How We Work:</div>
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span>Site inspection and risk assessment based on client drawings or walkthrough.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span>Transparent bill of materials and technical options suited to budget.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span>Professional installation with concealed cabling and ongoing service support.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ServiceEnquiryForm serviceTitle="General Security Consultation" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
