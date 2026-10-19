import React from 'react';

interface PageHeroProps {
  title: string;
  lede?: string;
  label?: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, lede, label, children }) => {
  return (
    <section className="page-hero">
      <div className="container-x page-hero-inner pt-14 pb-16 sm:pt-16 sm:pb-20">
        <div className="page-hero-copy">
          {label && <p className="label">{label}</p>}
          <div className="max-w-3xl">
            <h1 className="text-balance">{title}</h1>
            {lede && <p className="lead mt-6">{lede}</p>}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};
