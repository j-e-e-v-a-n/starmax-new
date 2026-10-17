import React from 'react';
import { Link } from '../../router';
import { CheckIcon } from '../common/AppIcons';
import { COMPANY_INFO } from '../../data/company';

const HANDLED = [
  'Tailored site architecture',
  'Efficient equipment selection',
  'Clean cable and rack management',
  'Post-installation AMC support',
];

export const TrustIntroSection: React.FC = () => {
  return (
    <section className="about section-pad" id="about">
      <div className="container-x about-grid">
        <div>
          <p className="label">Certified integration · AMC support · Kerala-wide</p>
          <h2>Your security. Our operational priority.</h2>
          <p className="sub">
            Starmax Systems works with homes, businesses and industrial premises across
            Kerala &mdash; planning every detail around your site before a single unit is
            installed, and backing the system with responsive local service.
          </p>

          <ul className="checks">
            {HANDLED.map((item) => (
              <li key={item}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="actions">
            <Link to="/about" className="btn ghost">
              Learn About Starmax
            </Link>
          </div>
        </div>

        <dl className="facts">
          <div>
            <dt>Kerala-wide coverage</dt>
            <dd>Service points in Kochi, Haripad, Chengannur and Calicut.</dd>
          </div>
          <div>
            <dt>Registered integration contractor</dt>
            <dd>GSTIN {COMPANY_INFO.tax.gstin} for commercial projects.</dd>
          </div>
          <div>
            <dt>End-to-end delivery</dt>
            <dd>CCTV, access control, networking and automation as one system.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};
