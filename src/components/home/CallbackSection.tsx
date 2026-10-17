import React from 'react';
import { Link } from '../../router';
import { CallbackForm } from '../forms/CallbackForm';
import { CheckIcon } from '../common/AppIcons';
import { COMPANY_INFO } from '../../data/company';

const NEXT_STEPS = [
  'We review your requirements and the details you sent.',
  'Someone from our team calls you to discuss the site.',
  'Where useful, we visit the premises before proposing anything.',
];

export const CallbackSection: React.FC = () => {
  return (
    <section className="call section-pad" id="contact">
      <div className="container-x call-grid">
        <div>
          <p className="label">Direct consultation</p>
          <h2>Need help choosing the right security system?</h2>
          <p className="sub" style={{ marginTop: 28 }}>
            Tell us what you need, and our engineering team will contact you to discuss
            an optimised hardware and deployment proposal for your premises.
          </p>

          <ul className="checks">
            {NEXT_STEPS.map((step) => (
              <li key={step}>
                <CheckIcon />
                <span>{step}</span>
              </li>
            ))}
          </ul>

          <div className="talk">
            <small>Prefer to talk right now?</small>
            <a href={`tel:${COMPANY_INFO.contacts.primaryPhoneRaw}`}>
              {COMPANY_INFO.contacts.primaryPhone}
            </a>
          </div>
        </div>

        <div className="call-form-panel">
          <CallbackForm />
        </div>
      </div>
    </section>
  );
};
