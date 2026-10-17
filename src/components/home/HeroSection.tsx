import React from 'react';
import { Link } from '../../router';
import { ArrowDown } from 'lucide-react';
import { HeroArt } from '../common/Icons';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="container-x">
        <div className="hero-grid">
          <div>
            <h1>Smart security. Seamless connectivity. Safer tomorrow.</h1>
            <p className="lead">
              Starmax Systems provides reliable security and network solutions for homes,
              businesses and industries across Kerala.
            </p>
            <div className="actions">
              <Link to="/services" className="btn solid">
                Explore Our Services
              </Link>
              <Link to="/about" className="btn ghost">
                About Starmax
              </Link>
            </div>
            <div className="presence">
              <b>Our presence</b>
              <span>Kochi</span>
              <span>Haripad</span>
              <span>Chengannur</span>
              <span>Calicut</span>
            </div>
          </div>

          <figure>
            <HeroArt />
            {/* <figcaption className="art-cap">
              Camera coverage at the main entrance of a residence.
            </figcaption> */}
          </figure>
        </div>

        {/* <a className="scroll-cue" href="#pillars" aria-label="Scroll to explore">
          <span className="cue-label">Scroll to explore</span>
          <span className="cue-arrow" aria-hidden="true">
            <ArrowDown strokeWidth={1.75} />
          </span>
        </a> */}
      </div>
    </section>
  );
};
