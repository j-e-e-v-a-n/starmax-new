import React, { useEffect } from 'react';
import { Building2, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PageHero } from '../components/layout/PageHero';
import { Link } from '../router';
import { CLIENTS } from '../data/clients';

export const ClientsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Top Clients & References | Starmax Systems Kochi';
  }, []);

  return (
    <div className="bg-white">
      <div className="border-b border-rule bg-white">
        <div className="container-x">
          <Breadcrumbs items={[{ label: 'Top Clients' }]} />
        </div>
      </div>

      <PageHero
        label="Clients"
        title="Our Top Clients"
        lede="Commercial buildings, logistics operations, healthcare facilities and financial institutions across Kerala that Starmax Systems has worked with."
      />

      <section className="section-pad border-b border-rule bg-white">
        <div className="container-x">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {CLIENTS.map((client) => (
              <div
                key={client.id}
                className="flex flex-col items-center justify-center p-5 sm:p-6 h-36 rounded-[2px] border border-rule bg-white hover:border-blue transition-colors duration-300 text-center group"
              >
                {client.image || client.logo ? (
                  <div className="flex items-center justify-center h-full w-full px-2">
                    <img
                      src={client.image || client.logo}
                      alt={client.name}
                      className="max-h-12 max-w-[140px] object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-[2px] bg-mist border border-rule flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white transition-colors mb-3">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h2 className="text-xs sm:text-sm font-sans font-semibold text-navy group-hover:text-blue transition-colors tracking-normal line-clamp-1">
                      {client.name}
                    </h2>
                    {client.industry && (
                      <span className="text-[10px] sm:text-[11px] text-muted mt-1 line-clamp-1">
                        {client.industry}
                      </span>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-navy text-white">
        <div className="container-x text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-[clamp(1.6rem,3.6vw,2.4rem)] text-white font-normal">
              Discuss your security requirements
            </h2>
            <p className="mt-4 text-[15px] text-[#A9B9D0]">
              Find out how Starmax Systems can configure reliable surveillance and access solutions for your business.
            </p>
            <div className="pt-8">
              <Link to="/contact" className="btn white">
                Discuss Your Security Requirements
                <ArrowRight className="w-4 h-4 text-blue" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
