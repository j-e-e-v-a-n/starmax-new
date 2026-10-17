import React, { useEffect } from 'react';
import { Link } from '../router';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found | Starmax Systems';
  }, []);

  return (
    <div className="nf">
      <div className="container-x nf-inner">
        <div className="nf-art">
          <svg
            className="nf-svg"
            viewBox="0 0 240 240"
            role="img"
            aria-label="Radar scanning for a page that cannot be found"
          >
            <circle className="nf-ring-line" cx="120" cy="120" r="108" />
            <circle className="nf-ring-line" cx="120" cy="120" r="78" />
            <circle className="nf-ring-line" cx="120" cy="120" r="48" />

            <line className="nf-axis" x1="12" y1="120" x2="228" y2="120" />
            <line className="nf-axis" x1="120" y1="12" x2="120" y2="228" />

            <g className="nf-sweep">
              <path d="M120 120 L120 12 A108 108 0 0 1 213.5 66 Z" />
            </g>

            <circle className="nf-blip" cx="170" cy="86" r="4.5" />
            <circle className="nf-blip nf-blip-2" cx="82" cy="158" r="3.5" />

            <circle className="nf-pulse" cx="120" cy="120" r="48" />
            <circle className="nf-pulse nf-pulse-2" cx="120" cy="120" r="48" />

            <path
              className="nf-shield"
              d="M120 78 L154 91 V118 C154 142 140 160 120 170 C100 160 86 142 86 118 V91 Z"
            />
            <line className="nf-mark" x1="120" y1="104" x2="120" y2="128" />
            <circle className="nf-mark-dot" cx="120" cy="140" r="3.5" />
          </svg>
        </div>

        <div className="nf-copy">
          <span className="label">Error 404 &middot; Not Found</span>
          <h1>This page could not be located</h1>
          <p className="sub">
            The requested security page does not exist or may have been relocated. Head back to
            our homepage, or explore the systems we design, install and maintain.
          </p>
          <div className="nf-actions">
            <Link to="/" className="btn solid">
              Go to Home
            </Link>
            <Link to="/services" className="btn ghost">
              View Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
