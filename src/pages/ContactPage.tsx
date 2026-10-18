import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Copy, Check, FileText, MessageCircle, Clock, Building2, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PageHero } from '../components/layout/PageHero';
import { ContactForm } from '../components/forms/ContactForm';
import { COMPANY_INFO } from '../data/company';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'form' | 'details'>('form');

  useEffect(() => {
    document.title = 'Contact Starmax Systems | Kadavanthra, Kochi';
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(COMPANY_INFO.registeredOffice.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white w-full max-w-full overflow-x-hidden">
      <div className="border-b border-rule bg-white">
        <div className="container-x">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />
        </div>
      </div>

      <PageHero
        label="Contact"
        title="Contact Starmax Systems"
        lede="Reach out to our central office in Kadavanthra, Kochi for system recommendations, site consultation and technical support across Kerala."
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-9">
          <a
            href={`tel:${COMPANY_INFO.contacts.primaryPhoneRaw}`}
            className="flex items-center gap-3 p-3.5 rounded-[2px] bg-white border border-rule hover:border-blue transition-colors group"
          >
            <span className="w-9 h-9 rounded-[2px] bg-mist text-blue flex items-center justify-center shrink-0 group-hover:bg-blue group-hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] sm:text-[11px] text-muted font-medium uppercase tracking-wider truncate">Call Helpline</span>
              <span className="block text-xs sm:text-sm font-semibold text-navy truncate group-hover:text-blue transition-colors">
                {COMPANY_INFO.contacts.primaryPhone}
              </span>
            </span>
          </a>

          <a
            href={`https://wa.me/${COMPANY_INFO.contacts.whatsappRaw}?text=Hi%20Starmax%20Systems%2C%20I%20would%20like%20to%20enquire%20about%20security%20solutions.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-[2px] bg-white border border-rule hover:border-blue transition-colors group"
          >
            <span className="w-9 h-9 rounded-[2px] bg-[#eef8f1] text-[#1f8a4c] flex items-center justify-center shrink-0 group-hover:bg-[#1faf52] group-hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] sm:text-[11px] text-muted font-medium uppercase tracking-wider truncate">WhatsApp</span>
              <span className="block text-xs sm:text-sm font-semibold text-navy truncate group-hover:text-blue transition-colors">
                Chat Instantly
              </span>
            </span>
          </a>

          <a
            href={`mailto:${COMPANY_INFO.contacts.generalEmail}`}
            className="flex items-center gap-3 p-3.5 rounded-[2px] bg-white border border-rule hover:border-blue transition-colors group"
          >
            <span className="w-9 h-9 rounded-[2px] bg-mist text-blue flex items-center justify-center shrink-0 group-hover:bg-blue group-hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] sm:text-[11px] text-muted font-medium uppercase tracking-wider truncate">Email Office</span>
              <span className="block text-xs sm:text-sm font-semibold text-navy truncate group-hover:text-blue transition-colors">
                {COMPANY_INFO.contacts.generalEmail}
              </span>
            </span>
          </a>

          <a
            href="https://maps.google.com/?q=Kadavanthra+Kochi+Kerala"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-[2px] bg-white border border-rule hover:border-blue transition-colors group"
          >
            <span className="w-9 h-9 rounded-[2px] bg-mist text-blue flex items-center justify-center shrink-0 group-hover:bg-blue group-hover:text-white transition-colors">
              <MapPin className="w-4 h-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] sm:text-[11px] text-muted font-medium uppercase tracking-wider truncate">Office Location</span>
              <span className="block text-xs sm:text-sm font-semibold text-navy truncate group-hover:text-blue transition-colors">
                Kadavanthra, Kochi
              </span>
            </span>
          </a>
        </div>
      </PageHero>

      {/* Mobile tab switcher */}
      <div className="block lg:hidden border-b border-rule bg-white sticky top-0 z-20">
        <div className="container-x py-2.5 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveMobileTab('form')}
            className={`flex-1 py-2 px-4 rounded-[2px] text-xs font-semibold transition-colors text-center cursor-pointer border ${
              activeMobileTab === 'form' ? 'bg-blue text-white border-blue' : 'bg-white text-muted border-rule'
            }`}
          >
            Direct Message Form
          </button>
          <button
            type="button"
            onClick={() => setActiveMobileTab('details')}
            className={`flex-1 py-2 px-4 rounded-[2px] text-xs font-semibold transition-colors text-center cursor-pointer border ${
              activeMobileTab === 'details' ? 'bg-blue text-white border-blue' : 'bg-white text-muted border-rule'
            }`}
          >
            Office Info &amp; Numbers
          </button>
        </div>
      </div>

      <section className="section-pad border-b border-rule bg-white">
        <div className="container-x w-full max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Details */}
            <div className={`lg:col-span-5 space-y-6 ${activeMobileTab === 'details' ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-mist p-6 sm:p-7 rounded-[2px] border border-rule space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-tech text-[11px] font-semibold tracking-[0.14em] text-blue uppercase flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Registered Office</span>
                  </div>
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-blue bg-white px-3 py-1.5 rounded-[2px] border border-rule transition-colors cursor-pointer"
                    title="Copy full address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1f8a4c]" />
                        <span className="text-[#1f8a4c]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-muted" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-1">
                  <h2 className="text-lg font-sans font-semibold text-navy tracking-normal">
                    Starmax Systems
                  </h2>
                  <address className="not-italic text-sm text-muted leading-relaxed">
                    <p className="font-semibold text-navy">{COMPANY_INFO.registeredOffice.doorNo}, {COMPANY_INFO.registeredOffice.building}</p>
                    <p>{COMPANY_INFO.registeredOffice.area}</p>
                    <p>{COMPANY_INFO.registeredOffice.locality}, {COMPANY_INFO.registeredOffice.city} – {COMPANY_INFO.registeredOffice.pincode}</p>
                    <p>{COMPANY_INFO.registeredOffice.state}, {COMPANY_INFO.registeredOffice.country}</p>
                  </address>
                </div>

                <div className="pt-4 border-t border-rule text-xs text-muted flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue shrink-0" />
                    <span>GSTIN: <span className="font-mono text-navy font-semibold">{COMPANY_INFO.tax.gstin}</span></span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#1f8a4c] font-semibold bg-[#eef8f1] px-2 py-0.5 rounded-[2px] border border-[#cfe9d8]">
                    <ShieldCheck className="w-3 h-3 shrink-0" />
                    <span>Verified Taxpayer</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-7 rounded-[2px] border border-rule space-y-4">
                <div className="font-tech text-[11px] font-semibold tracking-[0.14em] text-navy uppercase flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue" />
                  <span>Direct Helpline Channels</span>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-[2px] bg-mist text-blue flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs text-muted">Primary Technical Line</div>
                      <a href={`tel:${COMPANY_INFO.contacts.primaryPhoneRaw}`} className="text-base font-semibold text-navy hover:text-blue transition-colors block">
                        {COMPANY_INFO.contacts.primaryPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-4 border-t border-rule">
                    <span className="w-8 h-8 rounded-[2px] bg-mist text-blue flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs text-muted">Secondary Office Line</div>
                      <a href={`tel:${COMPANY_INFO.contacts.secondaryPhoneRaw}`} className="text-sm font-semibold text-navy hover:text-blue transition-colors block">
                        {COMPANY_INFO.contacts.secondaryPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-4 border-t border-rule">
                    <span className="w-8 h-8 rounded-[2px] bg-mist text-blue flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs text-muted">General Inquiries</div>
                      <a href={`mailto:${COMPANY_INFO.contacts.generalEmail}`} className="text-sm font-semibold text-blue hover:underline transition-colors block break-all">
                        {COMPANY_INFO.contacts.generalEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-4 border-t border-rule">
                    <span className="w-8 h-8 rounded-[2px] bg-mist text-blue flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs text-muted">Working Hours</div>
                      <div className="text-sm font-semibold text-navy">
                        Mon – Sat: 9:00 AM – 6:30 PM IST
                      </div>
                      <div className="text-[11px] text-muted">Emergency 24/7 client dispatch available</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-[2px] bg-mist border border-rule">
                <div className="font-tech text-[11px] uppercase font-semibold tracking-[0.14em] text-navy mb-3">
                  Kerala Dispatch &amp; Office
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-white rounded-[2px] border border-rule font-semibold text-navy flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue" />
                    <span>Kochi (Central)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className={`lg:col-span-7 bg-white p-6 sm:p-8 rounded-[2px] border border-rule ${activeMobileTab === 'form' ? 'block' : 'hidden lg:block'}`}>
              <div className="mb-7">
                <div className="font-tech text-[11px] uppercase font-semibold tracking-[0.14em] text-blue mb-2">
                  Direct Commercial Enquiry
                </div>
                <h2 className="text-[1.6rem] font-sans font-semibold text-navy tracking-normal">
                  Send a Direct Message
                </h2>
                <p className="text-[13px] text-muted mt-2 leading-relaxed">
                  Our engineering staff will review your request and get back within 2-4 business hours with equipment guidance or an itemized site quote.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
