import React, { useEffect } from 'react';
import { ShieldCheck, MapPin, Wrench, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PageHero } from '../components/layout/PageHero';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { Link } from '../router';
import { SERVICES } from '../data/services';
import { COMPANY_INFO } from '../data/company';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About Starmax Systems | Security Solutions in Kerala';
  }, []);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-rule bg-white">
        <div className="container-x">
          <Breadcrumbs items={[{ label: 'About Us' }]} />
        </div>
      </div>

      <PageHero
        label="About Us"
        title="About Starmax Systems"
        lede="Starmax Systems supplies a range of security and protection solutions designed around client requirements, with installation and long-term maintenance support across Kerala."
      />

      {/* Company Introduction */}
      <section className="section-pad border-b border-rule">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="label">Modern security &amp; protection</p>
              <h2 className="text-balance">
                Protection designed for contemporary environments
              </h2>
              <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-muted">
                <p>
                  In today’s fast-paced world, security and protection are essential in our daily lives. Different technologies and devices help protect people, premises and property against risks such as theft, pilferage, fire, accidents and sabotage.
                </p>
                <p>
                  Security technology has evolved beyond traditional measures such as grills, locks and physical barriers. Advances in technology have made modern security and protection systems an important consideration for homes, businesses and institutions.
                </p>
                <p>
                  Security systems are used in offices, retail stores, clinics, hospitals, airports, warehouses, banks, schools, apartments and residential complexes. Depending on their requirements, organizations may choose their own systems or engage a specialist company to provide installation and maintenance services.
                </p>
                <p>
                  Starmax Systems promotes a range of security and protection solutions. The company provides options designed around client requirements, with installation and maintenance support.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[2px] overflow-hidden border border-rule bg-white">
                <div className="overflow-hidden bg-mist h-80">
                  <img
                    src="/src/assets/images/hero_security_cctv_1791638420546.jpg"
                    alt="Starmax Systems Security Operations"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-pad grad-b border-b border-rule">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="label">Our methodology</p>
            <h2>Our approach to security</h2>
            <p className="lead mt-5">
              A structured process ensuring that security equipment fits your actual site parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="bg-white p-7 rounded-[2px] border border-rule hover:border-blue transition-colors">
              <div className="w-11 h-11 rounded-[2px] bg-mist border border-rule flex items-center justify-center mb-5">
                <ShieldCheck className="w-5 h-5 text-blue" />
              </div>
              <h3 className="text-[17px] font-sans font-semibold text-navy tracking-normal mb-2.5">
                1. Assessment &amp; Selection
              </h3>
              <p className="text-[14px] text-muted leading-relaxed">
                Evaluating physical layout, entry-exit points, illumination conditions, and usage volume before selecting specific cameras, controllers, or gates.
              </p>
            </div>

            <div className="bg-white p-7 rounded-[2px] border border-rule hover:border-blue transition-colors">
              <div className="w-11 h-11 rounded-[2px] bg-mist border border-rule flex items-center justify-center mb-5">
                <Wrench className="w-5 h-5 text-blue" />
              </div>
              <h3 className="text-[17px] font-sans font-semibold text-navy tracking-normal mb-2.5">
                2. Professional Installation
              </h3>
              <p className="text-[14px] text-muted leading-relaxed">
                Careful cable concealment, hardware mounting, power protection, device termination, and comprehensive system testing.
              </p>
            </div>

            <div className="bg-white p-7 rounded-[2px] border border-rule hover:border-blue transition-colors">
              <div className="w-11 h-11 rounded-[2px] bg-mist border border-rule flex items-center justify-center mb-5">
                <Building2 className="w-5 h-5 text-blue" />
              </div>
              <h3 className="text-[17px] font-sans font-semibold text-navy tracking-normal mb-2.5">
                3. Maintenance &amp; Handover
              </h3>
              <p className="text-[14px] text-muted leading-relaxed">
                Handover with training on user interfaces, ongoing maintenance support, and troubleshooting assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose Starmax */}
      <div className="bg-white border-b border-rule">
        <WhyChooseUsSection />
      </div>

      {/* Environments we secure */}
      <div className="grad-a border-b border-rule">
        <IndustriesSection />
      </div>

      {/* Services */}
      <section className="section-pad border-b border-rule">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="label">Portfolio</p>
            <h2>Our security &amp; automation services</h2>
            <p className="lead mt-5">
              Explore the eight dedicated systems supplied and maintained by Starmax Systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="p-6 rounded-[2px] border border-rule hover:border-blue hover:bg-mist transition-colors flex flex-col justify-between group"
              >
                <div>
                  <h3 className="text-[15px] font-sans font-semibold text-navy group-hover:text-blue transition-colors mb-2 tracking-normal">
                    {s.title}
                  </h3>
                  <p className="text-[13px] text-muted line-clamp-2">
                    {s.shortDescription}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-rule flex items-center justify-between text-[13px] font-semibold text-blue">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Installation & Coverage */}
      <section className="section-pad grad-b border-b border-rule">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className="label">Technical support</p>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)]">
                Installation and maintenance services
              </h2>
              <p className="mt-4 text-[15px] text-muted leading-relaxed">
                Security systems require accurate physical placement, uninterrupted power conditioning, and proper network configuration to perform consistently over time.
              </p>
              <ul className="space-y-3 text-[14px] text-navy pt-5">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                  <span>On-site feasibility review and cable routing planning</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                  <span>Mounting and enclosure assembly according to indoor/outdoor conditions</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                  <span>Network recorder, PBX switchboard, or motor drive commissioning</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                  <span>Preventive inspection and replacement of worn components</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="label">Regional network</p>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)]">Service points across Kerala</h2>
              <p className="mt-4 text-[15px] text-muted leading-relaxed">
                Starmax Systems maintains its registered office in Kadavanthra, Kochi, with service points mentioned in key regional centers across Kerala.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-5 text-xs">
                {COMPANY_INFO.servicePoints.map((loc, index) => (
                  <div key={index} className="p-4 bg-white rounded-[2px] border border-rule">
                    <div className="font-semibold text-navy text-[14px] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue shrink-0" />
                      <span>{loc.name}</span>
                    </div>
                    <div className="text-[11px] text-muted mt-1">{loc.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad cta-band text-white">
        <div className="container-x text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-[clamp(1.6rem,3.6vw,2.4rem)] text-white font-normal">
              Discuss your security &amp; automation project
            </h2>
            <p className="mt-4 text-[15px] text-[#A9B9D0]">
              Reach out to our technical team for system recommendations and site consultations in Kochi and Kerala.
            </p>
            <div className="pt-8 flex justify-center">
              <Link to="/contact" className="btn white">
                Request an Enquiry
                <ArrowRight className="w-4 h-4 text-blue" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
