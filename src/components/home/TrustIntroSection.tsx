import React from 'react';
import { Link } from '../../router';
import { CheckIcon } from '../common/AppIcons';
import { COMPANY_INFO } from '../../data/company';
import { useScrollRevealAll } from '../common/useScrollRevealAll';

const HANDLED = [
  'Tailored site architecture',
  'Efficient equipment selection',
  'Clean cable and rack management',
  'Post-installation AMC support',
];

export const TrustIntroSection: React.FC = () => {
  useScrollRevealAll();
  return (
    <section className="about section-pad reveal-fade" id="about">
      <div className="container-x about-grid">
        <div>
          <p className="label reveal">Certified integration · AMC support · Kerala-wide</p>
          <h2 className="reveal">Your security. Our operational priority.</h2>
          <p className="sub reveal">
            Starmax Systems works with homes, businesses and industrial premises across
            Kerala &mdash; planning every detail around your site before a single unit is
            installed, and backing the system with responsive local service.
          </p>

          <ul className="checks">
            {HANDLED.map((item, i) => (
              <li className="reveal" data-reveal-delay={i * 50} key={item}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="actions reveal">
            <Link to="/about" className="btn ghost">
              Learn About Starmax
            </Link>
          </div>
        </div>

        <dl className="facts">
          <div className="reveal-scale" data-reveal-delay="0">
            <dt>Kerala-wide coverage</dt>
            <dd>Service point in Kochi, Kerala.</dd>
          </div>
          <div className="reveal-scale" data-reveal-delay="75">
            <dt>Registered integration contractor</dt>
            <dd>GSTIN {COMPANY_INFO.tax.gstin} for commercial projects.</dd>
          </div>
          <div className="reveal-scale" data-reveal-delay="150">
            <dt>End-to-end delivery</dt>
            <dd>CCTV, access control, networking and automation as one system.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};
