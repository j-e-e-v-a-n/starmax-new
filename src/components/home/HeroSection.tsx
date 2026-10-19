import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from '../../router';
import { HeroArt } from '../common/Icons';
import { HeroIntro } from './HeroIntro';

const T = {
  draw: 1400,
  swing: 3600,
  settle: 6200,
  slide: 7800,
  copy: 9100,
  done: 11000,
} as const;

type Phase = 'logo' | 'draw' | 'swing' | 'settle' | 'slide' | 'copy' | 'done';

const INTRO_LINK_KEY = 'starmax:play-home-intro';

const hasIntroRequest = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return window.sessionStorage.getItem(INTRO_LINK_KEY) === '1';
  } catch {
    return false;
  }
};

const clearIntroRequest = (): void => {
  try {
    window.sessionStorage.removeItem(INTRO_LINK_KEY);
  } catch {
    // Ignore disabled browser storage.
  }
};

const CONES = [
  { apex: [362, 222], base1: [540, 440], base2: [330, 440] },
  { apex: [62, 304], base1: [14, 440], base2: [150, 440] },
  { apex: [606, 338], base1: [446, 440], base2: [594, 440] },
];

const smooth = (x: number): number => {
  const c = Math.min(Math.max(x, 0), 1);
  return c * c * (3 - 2 * c);
};

export const HeroSection: React.FC = () => {
  const [phase, setPhase] = useState<Phase>(() => (hasIntroRequest() ? 'logo' : 'done'));
  const timers = useRef<number[]>([]);
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    clearIntroRequest();
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const hero = figureRef.current?.closest('.hero') as HTMLElement | null;
      const svg = figureRef.current?.querySelector('.art');
      if (!hero || !svg) return;
      const r = svg.getBoundingClientRect();
      if (r.width < 1) return;
      const dx = window.innerWidth / 2 - (r.left + r.width / 2);
      const dy = window.innerHeight / 2 - (r.top + r.height / 2);
      const up = Math.max(1, Math.min(1.14, (window.innerWidth * 0.92) / r.width, (window.innerHeight * 0.86) / r.height));
      hero.style.setProperty('--art-dx', `${dx}px`);
      hero.style.setProperty('--art-dy', `${dy}px`);
      hero.style.setProperty('--art-up', up.toFixed(3));
    };
    measure();
    if (typeof document !== 'undefined' && (document as any).fonts?.ready) {
      (document as any).fonts.ready.then(measure).catch(() => { });
    }
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (phase === 'done' || phase === 'copy') {
      document.body.classList.remove('intro-active');
    } else {
      document.body.classList.add('intro-active');
    }
    return () => document.body.classList.remove('intro-active');
  }, [phase]);

  useEffect(() => {
    if (phase === 'done') return;
    const schedule = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms));
    };
    schedule(() => setPhase('draw'), T.draw);
    schedule(() => setPhase('swing'), T.swing);
    schedule(() => setPhase('settle'), T.settle);
    schedule(() => setPhase('slide'), T.slide);
    schedule(() => setPhase('copy'), T.copy);
    schedule(() => setPhase('done'), T.done);
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  useEffect(() => {
    if (phase !== 'swing') return;
    const cones = document.querySelectorAll<SVGPolygonElement>('.hero .cone');
    if (cones.length === 0) return;
    const duration = 2500;
    const start = performance.now();
    let raf = 0;
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      let s: number;
      if (t < 0.3) {
        s = smooth(t / 0.3);
      } else if (t < 0.42) {
        s = 1;
      } else if (t < 0.75) {
        s = 1 - 2 * smooth((t - 0.42) / 0.33);
      } else if (t < 0.86) {
        s = -1;
      } else {
        s = -1 + smooth((t - 0.86) / 0.14);
      }
      const swing = s * 0.24;
      cones.forEach((cone, i) => {
        const c = CONES[i];
        if (!c) return;
        const w = Math.abs(c.base2[0] - c.base1[0]);
        const dx = swing * w;
        cone.setAttribute(
          'points',
          `${c.apex[0]},${c.apex[1]} ${c.base1[0] + dx},${c.base1[1]} ${c.base2[0] + dx},${c.base2[1]}`
        );
      });
      if (t < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      cones.forEach((cone, i) => {
        const c = CONES[i];
        if (!c) return;
        cone.setAttribute(
          'points',
          `${c.apex[0]},${c.apex[1]} ${c.base1[0]},${c.base1[1]} ${c.base2[0]},${c.base2[1]}`
        );
      });
    };
  }, [phase]);

  return (
    <section
      className={`hero p-${phase}`}
      id="home"
      data-phase={phase}
      data-animate-art={phase !== 'done' ? 'true' : undefined}
    >
      {phase !== 'done' && <HeroIntro />}
      <div className="container-x">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>Smart security. Seamless connectivity. Safer tomorrow.</h1>
            <p className="lead">
              Starmax Systems provides reliable security and network solutions for homes,
              businesses and industries across Kerala.
            </p>
            <div className="actions">
              <Link to="/services" className="btn solid">Explore Our Services</Link>
              <Link to="/about" className="btn ghost">About Starmax</Link>
            </div>
            <div className="presence">
              <b>Our presence</b>
              <span>Kochi, Kerala</span>
            </div>
          </div>
          <figure className="hero-art-wrap" ref={figureRef}>
            <HeroArt />
          </figure>
        </div>
      </div>
    </section>
  );
};
