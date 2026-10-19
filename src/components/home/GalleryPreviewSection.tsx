import React, { useState } from 'react';
import { Link } from '../../router';
import { GALLERY_ITEMS } from '../../data/gallery';
import { Lightbox } from '../ui/Lightbox';
import { useSiteContent } from '../../lib/content';

export const GalleryPreviewSection: React.FC = () => {
  const gallery = useSiteContent('gallery', GALLERY_ITEMS);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const items = gallery.slice(0, 4);

  return (
    <section className="section-pad" id="gallery">
      <div className="container-x">
        <div className="head">
          <div>
            <p className="label">
              Installation logs · Hardware verified · Kerala sites
            </p>
            <h2>Field deployments and hardware integration</h2>
          </div>
          <div className="side">
            <p className="sub">
              Photographs of security installations, IP camera deployments, signal
              boosters and automated gate systems from our project sites.
            </p>
            <Link to="/gallery" className="tlink">
              View full gallery and projects
            </Link>
          </div>
        </div>

        <div className="gal">
          {items.map((item, idx) => (
            <article className="tile" key={item.id}>
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="block w-full text-left focus-visible:outline-none"
                aria-label={`View ${item.title}`}
              >
                <div className="panel">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </button>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </article>
          ))}
        </div>
      </div>

      <Lightbox
        items={items}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
};
