import React from 'react';
import { Link } from '../../router';
import { COMPANY_INFO } from '../../data/company';
import { SERVICES } from '../../data/services';
import { StarmaxLogo } from '../common/StarmaxLogo';

const COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Top Clients', href: '/clients' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container-x">
        <div className="foot-grid">
          <div>
            <Link to="/" className="brand" aria-label="Starmax Systems home">
              <span className="footer-logo">
                <StarmaxLogo />
              </span>
            </Link>
            <p className="about-line">
              Starmax Systems provides comprehensive security and network solutions for
              homes, businesses and industries across Kerala.
            </p>
            <p style={{ marginTop: 16 }}>
              Kochi &middot; Haripad &middot; Chengannur &middot; Calicut
            </p>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link to={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Our services</h4>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>Kadavanthra, Kochi</li>
              <li>
                <a href={`tel:${COMPANY_INFO.contacts.primaryPhoneRaw}`}>
                  {COMPANY_INFO.contacts.primaryPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY_INFO.contacts.generalEmail}`}>
                  {COMPANY_INFO.contacts.generalEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-base">
          <span>{COMPANY_INFO.copyright}</span>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};
