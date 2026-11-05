import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PageHero } from '../components/layout/PageHero';
import { Link } from '../router';
import { Lightbox } from '../components/ui/Lightbox';
import { GALLERY_ITEMS } from '../data/gallery';
import { useSiteContent } from '../lib/content';

export const GalleryPage: React.FC = () => {
  const galleryItems = useSiteContent('gallery', GALLERY_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Security Systems Gallery | Starmax Systems Kochi';
  }, []);

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'cctv', label: 'CCTV Systems' },
    { id: 'booster', label: 'Signal Boosters' },
    { id: 'gates', label: 'Automatic Gates' },
    { id: 'access', label: 'Access Control' },
    { id: 'equipment', label: 'Security Equipment' },
    { id: 'automation', label: 'Home Automation' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-white">
      <div className="border-b border-rule bg-white">
        <div className="container-x">
          <Breadcrumbs items={[{ label: 'Gallery' }]} />
        </div>
      </div>

      <PageHero
        label="Gallery"
        title="Hardware & Deployment Gallery"
        lede="Field photographs of IP surveillance arrays, cellular booster kits, automatic gate motors and biometric access controllers installed across Kerala."
      />

      <section className="section-pad border-b border-rule bg-white">
        <div className="container-x">
          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-2 mb-11 pb-5 border-b border-rule">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 text-xs font-semibold rounded-[2px] border transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue text-white border-blue'
                    : 'bg-white text-navy border-rule hover:border-blue hover:text-blue'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group cursor-pointer rounded-[2px] border border-rule overflow-hidden bg-white hover:border-blue transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-32 sm:h-52 lg:h-60 overflow-hidden bg-mist">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-semibold px-2 sm:px-4 py-1 sm:py-2 rounded-[2px] bg-white/25 backdrop-blur-sm">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Enlarge</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5">
                    <span className="text-[9px] sm:text-[11px] uppercase font-mono font-semibold tracking-wider text-blue">
                      {item.categoryLabel}
                    </span>
                <h2 className="text-xs sm:text-base font-sans font-semibold text-navy mt-1 group-hover:text-blue transition-colors tracking-normal leading-snug">
                  {item.title}
                </h2>
                <p className="text-[10px] sm:text-xs text-muted mt-2 leading-relaxed">
                  {item.caption}
                </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-16 text-center text-muted text-sm">
              No items in this category.
            </div>
          )}
        </div>
      </section>

      <section className="section-pad bg-mist">
        <div className="container-x text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-[clamp(1.6rem,3.6vw,2.4rem)]">
              Have questions about specific equipment?
            </h2>
            <p className="mt-4 text-[15px] text-muted">
              Our engineering team can advise on hardware compatibility, coverage distances, and installation logistics.
            </p>
            <div className="pt-8">
              <Link to="/contact" className="btn solid">
                Enquire About Equipment
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
};
