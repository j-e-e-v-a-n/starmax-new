import React from 'react';
import { Link } from '../../router';
import { SERVICES } from '../../data/services';

export const ServicesGridSection: React.FC = () => {
  return (
    <section className="section-pad" id="services">
      <div className="container-x">
        <div className="head">
          <div>
            <p className="label">Core capabilities · 08 disciplines · Kerala-wide</p>
            <h2>Engineered security solutions for Kerala premises</h2>
          </div>
          <div className="side">
            <p className="sub">
              Each system is planned around the premises and can be combined into a
              single, coordinated security setup.
            </p>
            <Link to="/services" className="tlink">
              Explore all 08 disciplines
            </Link>
          </div>
        </div>

        <div className="svc-grid">
          {SERVICES.map((service) => (
            <article className="svc" key={service.slug}>
              <div className="svc-media">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3>{service.title}</h3>
              <p>{service.shortDescription}</p>
              <Link to={`/services/${service.slug}`} className="tlink">
                View specifications
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
