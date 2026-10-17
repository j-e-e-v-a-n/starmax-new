import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PageHero } from '../components/layout/PageHero';
import { Link } from '../router';
import { TESTIMONIALS } from '../data/testimonials';
import { TestimonialCard } from '../components/testimonials/TestimonialCard';

export const TestimonialsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Client Testimonials | Starmax Systems Kochi';
  }, []);

  return (
    <div className="bg-white">
      <div className="border-b border-rule bg-white">
        <div className="container-x">
          <Breadcrumbs items={[{ label: 'Testimonials' }]} />
        </div>
      </div>

      <PageHero
        label="Testimonials"
        title="Client Testimonials"
        lede="Reviews and feedback shared by commercial facility teams, residence owners and project leads after work was completed."
      />

      <section className="section-pad border-b border-rule bg-white">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
            {TESTIMONIALS.map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>

          <p className="mt-12 text-center text-xs text-muted max-w-xl mx-auto">
            Testimonials reflect actual statements shared regarding gate automation and security solutions supplied by Starmax Systems.
          </p>
        </div>
      </section>

      <section className="section-pad bg-mist">
        <div className="container-x text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-[clamp(1.6rem,3.6vw,2.4rem)]">
              Ready to work with Starmax Systems?
            </h2>
            <p className="mt-4 text-[15px] text-muted">
              Contact our team to discuss your security, surveillance, or gate automation requirements.
            </p>
            <div className="pt-8">
              <Link to="/contact" className="btn solid">
                Contact Starmax Systems
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
