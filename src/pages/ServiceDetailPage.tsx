import React, { useEffect } from 'react';
import { CheckCircle2, Shield, Phone, Mail, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PageHero } from '../components/layout/PageHero';
import { Link } from '../router';
import { SERVICES } from '../data/services';
import { COMPANY_INFO } from '../data/company';
import { ServiceEnquiryForm } from '../components/forms/ServiceEnquiryForm';

interface ServiceDetailPageProps {
  slug: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug }) => {
  const service = SERVICES.find((s) => s.slug === slug);

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Starmax Systems Kochi`;
    } else {
      document.title = 'Service Not Found | Starmax Systems';
    }
  }, [service]);

  if (!service) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4">
        <h1 className="text-[2rem] font-normal text-navy">Service Not Found</h1>
        <p className="text-sm text-muted mt-3 mb-7">
          The requested service page does not exist in our system.
        </p>
        <Link to="/services" className="btn solid">
          Return to Services Overview
        </Link>
      </div>
    );
  }

  const related = SERVICES.filter((s) => service.relatedServices.includes(s.slug));

  return (
    <div className="bg-white">
      <div className="border-b border-rule bg-white">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: service.title }
            ]}
          />
        </div>
      </div>

      <PageHero label="Service" title={service.title} lede={service.fullDescription}>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#enquiry-section" className="btn solid">
            <span>{service.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href={`tel:${COMPANY_INFO.contacts.primaryPhoneRaw}`} className="btn ghost">
            <Phone className="w-4 h-4 text-blue" />
            <span>Call {COMPANY_INFO.contacts.primaryPhone}</span>
          </a>
        </div>
      </PageHero>

      {/* System Overview */}
      <section className="section-pad border-b border-rule">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="label">System overview</p>
              <h2>Understanding {service.title}</h2>
              <p className="mt-5 text-[16px] text-muted leading-relaxed">
                {service.whatIsIt}
              </p>
              <div className="mt-7 p-6 rounded-[2px] bg-mist border border-rule text-[14px] text-navy">
                <div className="font-semibold text-[15px] text-navy flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-blue shrink-0" />
                  <span>Configured According to Site Requirements</span>
                </div>
                <p className="text-muted leading-relaxed">
                  Hardware choices, wiring paths, and controller capacities are planned around your specific property layout, operating hours, and environmental conditions.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[2px] overflow-hidden border border-rule bg-white">
                <div className="overflow-hidden bg-mist h-80 sm:h-96">
                  <img
                    src={service.image}
                    alt={`${service.title} installation by Starmax Systems`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 bg-mist border-t border-rule flex items-center justify-between text-xs gap-3">
                  <span className="text-muted">Technical Solution Category</span>
                  <span className="text-blue font-semibold text-right">{service.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications & Capabilities */}
      <section className="section-pad bg-mist border-b border-rule">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white p-8 rounded-[2px] border border-rule">
              <p className="label">Deployment scenarios</p>
              <h3 className="text-[1.4rem] font-normal text-navy">
                Applications &amp; Use Cases
              </h3>
              <p className="text-[13px] text-muted mt-2 mb-6">
                Common environments where this system provides essential protection or oversight.
              </p>

              <ul className="space-y-3.5 text-[15px] text-navy">
                {service.applications.map((app, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue shrink-0 mt-1" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-[2px] border border-rule">
              <p className="label">Technical specifications</p>
              <h3 className="text-[1.4rem] font-normal text-navy">Key Capabilities</h3>
              <p className="text-[13px] text-muted mt-2 mb-6">
                Features and configuration options available with supported equipment models.
              </p>

              <ul className="space-y-3.5 text-[15px] text-navy">
                {service.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue shrink-0 mt-1" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad border-b border-rule">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="label">Practical value</p>
            <h2>System benefits</h2>
            <p className="lead mt-5">
              Tangible advantages delivered through proper hardware selection and professional installation.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {service.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-7 rounded-[2px] border border-rule bg-white hover:border-blue transition-colors"
              >
                <div className="w-9 h-9 rounded-[2px] bg-mist border border-rule flex items-center justify-center text-blue font-mono text-xs font-semibold mb-4">
                  0{idx + 1}
                </div>
                <p className="text-[15px] font-medium text-navy leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry-section" className="section-pad bg-mist border-b border-rule">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <p className="label">Get started</p>
              <h2>Talk to a technician</h2>
              <p className="mt-4 text-[15px] text-muted leading-relaxed">
                Contact our Kadavanthra office directly or submit the enquiry form with your requirements. We provide consultation and technical proposals for sites across Kerala.
              </p>

              <div className="mt-7 p-7 rounded-[2px] bg-navy text-white">
                <div className="font-tech text-[12px] uppercase tracking-[0.14em] text-[#8FB0F0] font-semibold">
                  Direct Contact Details
                </div>

                <div className="mt-5 space-y-3.5 text-[15px]">
                  <a
                    href={`tel:${COMPANY_INFO.contacts.primaryPhoneRaw}`}
                    className="flex items-center gap-3 text-white hover:text-[#8FB0F0] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#8FB0F0] shrink-0" />
                    <span className="font-semibold">{COMPANY_INFO.contacts.primaryPhone}</span>
                  </a>

                  <a
                    href={`tel:${COMPANY_INFO.contacts.secondaryPhoneRaw}`}
                    className="flex items-center gap-3 text-[#CBD8E8] hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#8FB0F0] shrink-0" />
                    <span>{COMPANY_INFO.contacts.secondaryPhone}</span>
                  </a>

                  <a
                    href={`mailto:${COMPANY_INFO.contacts.generalEmail}`}
                    className="flex items-center gap-3 text-[#CBD8E8] hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#8FB0F0] shrink-0" />
                    <span>{COMPANY_INFO.contacts.generalEmail}</span>
                  </a>
                </div>

                <div className="mt-6 pt-5 border-t border-white/15 text-xs text-[#A9B9D0]">
                  Registered Office: {COMPANY_INFO.registeredOffice.shortAddress}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ServiceEnquiryForm serviceTitle={service.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-x">
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="label">Related systems</p>
                <h2 className="text-[clamp(1.5rem,3vw,2rem)]">Frequently installed together</h2>
              </div>
              <Link to="/services" className="tlink inline-flex items-center gap-1.5 shrink-0 group">
                <span>All Services</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/services/${rel.slug}`}
                  className="p-6 rounded-[2px] border border-rule hover:border-blue hover:bg-mist transition-colors group flex flex-col justify-between bg-white"
                >
                  <div>
                    <h4 className="text-[15px] font-sans font-semibold text-navy group-hover:text-blue transition-colors tracking-normal mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-[13px] text-muted line-clamp-2">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="pt-4 mt-5 border-t border-rule flex items-center justify-between text-[13px] font-semibold text-blue">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
