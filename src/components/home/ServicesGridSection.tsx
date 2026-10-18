import React from 'react';
import { Link } from '../../router';
import { SERVICES } from '../../data/services';
import { useScrollRevealAll } from '../common/useScrollRevealAll';

export const ServicesGridSection: React.FC = () => {
  useScrollRevealAll();
  return (
    <section className="section-pad reveal-fade" id="services">
      <div className="container-x">
        <div className="head reveal">
          <div>
            <p className="label reveal">Core capabilities · 08 disciplines · Kerala-wide</p>
            <h2 className="reveal">Engineered security solutions for Kerala premises</h2>
          </div>
          <div className="side">
            <p className="sub reveal">
              Each system is planned around the premises and can be combined into a
              single, coordinated security setup.
            </p>
            <div className="reveal">
              <Link to="/services" className="tlink">
                Explore all 08 disciplines
              </Link>
            </div>
          </div>
        </div>

        <div className="svc-grid">
          {SERVICES.map((service, i) => (
            <article className="svc reveal-scale" data-reveal-delay={i % 4 * 75} key={service.slug}>
              <div className="svc-media" style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <h3 className="reveal">{service.title}</h3>
              <p className="reveal">{service.shortDescription}</p>
              <div className="reveal">
                <Link to={`/services/${service.slug}`} className="tlink">
                  View specifications
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
