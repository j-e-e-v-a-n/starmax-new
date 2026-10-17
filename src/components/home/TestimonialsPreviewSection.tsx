import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '../../router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import { TestimonialItem } from '../../types';

const getInitials = (name?: string) => {
  if (!name) return 'C';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

const ReviewCard: React.FC<{ item: TestimonialItem; hidden?: boolean }> = ({ item, hidden }) => (
  <article className="rv" aria-hidden={hidden || undefined}>
    <span className="stars" aria-label="Rated 5 out of 5">
      &#9733;&#9733;&#9733;&#9733;&#9733;
    </span>
    <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
    <div className="rv-foot">
      {item.avatar ? (
        <img
          className="rv-avatar"
          src={item.avatar}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="rv-avatar rv-avatar-fallback">{getInitials(item.name)}</div>
      )}
      <div className="rv-who">
        <b>{item.name}</b>
        <span>
          {item.clientReference}
          {item.context ? ` · ${item.context}` : ''}
        </span>
      </div>
    </div>
  </article>
);

export const TestimonialsPreviewSection: React.FC = () => {
  const N = TESTIMONIALS.length;
  const [perView, setPerView] = useState(3);
  const [step, setStep] = useState(0);
  const [noAnim, setNoAnim] = useState(false);
  const pendingPrev = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calc = () =>
      setPerView(window.innerWidth >= 1000 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const g = gcd(N, perView) || 1;
  const pages = Math.max(1, Math.round(N / g));
  const copies = Math.max(1, Math.ceil(((pages + 1) * perView) / N));
  const offsetCards = step * perView;

  useEffect(() => {
    setStep(0);
    setNoAnim(false);
    pendingPrev.current = false;
  }, [perView]);

  const goNext = useCallback(() => {
    if (noAnim) return;
    setStep((s) => (s >= pages ? s : s === pages - 1 ? pages : s + 1));
  }, [pages, noAnim]);

  const goPrev = useCallback(() => {
    if (noAnim) return;
    setStep((s) => {
      if (s === 0) {
        pendingPrev.current = true;
        setNoAnim(true);
        return pages;
      }
      return s - 1;
    });
  }, [noAnim, pages]);

  const goto = useCallback(
    (i: number) => {
      if (noAnim) return;
      setStep(i);
    },
    [noAnim]
  );

  useEffect(() => {
    if (!noAnim) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setNoAnim(false);
        if (pendingPrev.current) {
          pendingPrev.current = false;
          setStep((s) => s - 1);
        }
      })
    );
    return () => cancelAnimationFrame(id);
  }, [noAnim]);

  const onTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== trackRef.current || e.propertyName !== 'transform') return;
    if (step >= pages) {
      setNoAnim(true);
      setStep(0);
    }
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(goNext, 4500);
    return () => clearInterval(id);
  }, [goNext]);

  const active = ((step % pages) + pages) % pages;

  const track = Array.from({ length: copies }).flatMap((_, c) =>
    TESTIMONIALS.map((item) => ({ item, key: `c${c}-${item.id}`, copy: c }))
  );

  return (
    <section className="reviews section-pad" id="testimonials">
      <div className="container-x">
        <div className="head">
          <div>
            <p className="label">Client experiences · Verified reviews</p>
            <h2>What our clients say across Kerala</h2>
          </div>
          <div className="side">
            <p className="sub">
              Direct feedback from residence owners, facility managers and project leads
              after their systems were commissioned.
            </p>
            <div className="rating">
              <span className="stars" aria-hidden="true">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </span>
              <span>5.0 average rating</span>
            </div>
            <Link to="/testimonials" className="tlink">
              Read all testimonials
            </Link>
          </div>
        </div>
      </div>

      <div className="rv-marquee">
        <div
          ref={trackRef}
          className="rv-track"
          onTransitionEnd={onTransitionEnd}
          style={{
            transform: `translateX(calc(${-offsetCards} * (var(--rv-w) + var(--rv-gap))))`,
            transition: noAnim ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {track.map(({ item, key, copy }) => (
            <ReviewCard key={key} item={item} hidden={copy > 0} />
          ))}
        </div>
      </div>

      <div className="container-x">
        <div className="rv-controls">
          <button
            type="button"
            className="rv-arrow"
            aria-label="Previous testimonials"
            onClick={goPrev}
          >
            <ChevronLeft />
          </button>

          <div className="rv-dots" role="tablist" aria-label="Testimonial pages">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to testimonials page ${i + 1}`}
                className={`rv-dot${i === active ? ' active' : ''}`}
                onClick={() => goto(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="rv-arrow"
            aria-label="Next testimonials"
            onClick={goNext}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};
