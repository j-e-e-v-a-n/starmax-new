import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PageHero } from '../components/layout/PageHero';
import { COMPANY_INFO } from '../data/company';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Starmax Systems Kochi';
  }, []);

  return (
    <div className="bg-white">
      <div className="border-b border-rule bg-white">
        <div className="container-x">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
        </div>
      </div>

      <PageHero
        label="Legal"
        title="Privacy Policy"
        lede="Information regarding how Starmax Systems handles contact enquiries and job application details."
      />

      <section className="section-pad border-b border-rule">
        <div className="max-w-3xl mx-auto container-x space-y-10 text-muted">
          <div>
            <h2 className="text-[1.4rem] font-normal text-navy mb-3">1. Overview</h2>
            <p className="text-[15px] leading-relaxed">
              This website is operated by <strong className="text-navy">Starmax Systems</strong> ({COMPANY_INFO.registeredOffice.fullAddress}). We are committed to processing the contact and personal information provided by visitors responsibly and solely for legitimate business communication, quotations, and career evaluations.
            </p>
          </div>

          <div>
            <h2 className="text-[1.4rem] font-normal text-navy mb-3">2. Information We Collect</h2>
            <p className="text-[15px] leading-relaxed mb-3">
              When you interact with our website through our forms, we may collect the following details based on your voluntary submission:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[15px]">
              <li><strong className="text-navy">Contact Enquiries &amp; Callbacks:</strong> Full name, telephone number, email address, company or establishment name, site location, and the nature of your security or automation enquiry.</li>
              <li><strong className="text-navy">Career Applications:</strong> Full name, email address, date of birth, present address, educational qualification, and resume / CV documents that you upload.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[1.4rem] font-normal text-navy mb-3">3. Purpose of Processing</h2>
            <p className="text-[15px] leading-relaxed mb-3">
              We use the submitted information strictly for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[15px]">
              <li>To respond to your commercial queries and schedule site evaluations or telephone callbacks.</li>
              <li>To prepare technical system proposals for CCTV, access control, automated gates, or other requested equipment.</li>
              <li>To review candidate qualifications and reach out to prospective applicants regarding relevant employment opportunities.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[1.4rem] font-normal text-navy mb-3">4. Data Protection &amp; Confidentiality</h2>
            <p className="text-[15px] leading-relaxed">
              We do not sell, rent, or trade your personal information to third-party marketing companies. CV documents and personal contact data are treated confidentially and are accessible only to authorized personnel at Starmax Systems responsible for recruitment or client coordination.
            </p>
          </div>

          <div>
            <h2 className="text-[1.4rem] font-normal text-navy mb-3">5. Data Retention</h2>
            <p className="text-[15px] leading-relaxed">
              Commercial enquiries are retained for as long as necessary to fulfill the business consultation or active installation engagement. Candidate resumes are kept for a reasonable evaluation period, after which they are securely deleted if no employment opportunity matches the profile.
            </p>
          </div>

          <div>
            <h2 className="text-[1.4rem] font-normal text-navy mb-3">6. Contact for Privacy Matters</h2>
            <p className="text-[15px] leading-relaxed">
              If you have questions regarding the information you submitted or wish to request the removal of your contact details or CV, please contact us at:
            </p>
            <div className="mt-4 p-5 bg-mist rounded-[2px] border border-rule text-[13px] text-navy space-y-1.5 font-mono">
              <div className="font-semibold">Starmax Systems</div>
              <div>55/1668, Green Nest Business Center, Girinagar, Kadavanthra, Kochi – 682020</div>
              <div>Email: <a href={`mailto:${COMPANY_INFO.contacts.generalEmail}`} className="text-blue underline">{COMPANY_INFO.contacts.generalEmail}</a></div>
              <div>Phone: {COMPANY_INFO.contacts.primaryPhone}</div>
            </div>
          </div>

          <div className="pt-6 border-t border-rule text-[13px] text-muted">
            Last updated: 2025. This privacy document outlines operational practices and does not constitute formal legal counsel.
          </div>
        </div>
      </section>
    </div>
  );
};
