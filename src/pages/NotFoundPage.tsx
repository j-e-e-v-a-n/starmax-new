import React, { useEffect } from 'react';
import { Link } from '../router';

interface NotFoundPageProps {
  title?: string;
  message?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  title = 'This page could not be located',
  message = 'The requested security page does not exist or may have been relocated. Head back to our homepage, or explore the systems we design, install and maintain.',
}) => {
  useEffect(() => {
    document.title = `${title} | Starmax Systems`;
  }, [title]);

  return (
    <div className="nf">
      <div className="container-x nf-inner">
        <div className="nf-art">
          <svg
            className="nf-svg"
            viewBox="0 0 240 240"
            role="img"
            aria-label="A page and magnifying glass in a radar scan"
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

            <path className="nf-page" d="M96 76h34l18 18v63a7 7 0 0 1-7 7H96a7 7 0 0 1-7-7V83a7 7 0 0 1 7-7Z" />
            <path className="nf-page-fold" d="M130 77v12a6 6 0 0 0 6 6h11" />
            <path className="nf-page-line" d="M102 108h28M102 118h22" />
            <circle className="nf-search" cx="130" cy="137" r="10" />
            <path className="nf-search" d="m137.5 144.5 8 8" />
          </svg>
        </div>

        <div className="nf-copy">
          <span className="label">Starmax Systems &middot; Page not found</span>
          <h1>{title}</h1>
          <p className="lead">{message}</p>
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
