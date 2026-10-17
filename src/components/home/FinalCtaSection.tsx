import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from '../../router';
import { COMPANY_INFO } from '../../data/company';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="consult section-pad" id="consult">
      <div className="container-x consult-wrap">
        <div className="consult-copy">
          <p className="label">Talk to our team</p>
          <h2>Consult with our Kerala security specialists</h2>
          <p className="sub">
            Speak directly with Starmax Systems engineers in Kadavanthra, Kochi, or submit your
            layouts for a customised, itemised equipment proposal.
          </p>

          <div className="reg-ports">
            <small>Regional offices</small>
            {COMPANY_INFO.servicePoints.map((point) => (
              <span key={point.name} className="reg-chip">
                <MapPin />
                {point.name}
              </span>
            ))}
          </div>
        </div>

        <div className="btns">
          <a
            href={`tel:${COMPANY_INFO.contacts.primaryPhoneRaw}`}
            className="btn white"
          >
            Call {COMPANY_INFO.contacts.primaryPhone}
          </a>
          <Link to="/contact" className="btn light">
            Request project proposal
          </Link>
        </div>
      </div>
    </section>
  );
};
