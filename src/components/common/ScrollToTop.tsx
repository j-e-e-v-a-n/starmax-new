import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const R = 20;
const C = 2 * Math.PI * R;

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const update = () => {
      frame.current = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(C * (1 - progress));
      }
      setVisible(doc.scrollTop > 420);
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      className={`stt${visible ? ' is-visible' : ''}`}
      onClick={toTop}
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <svg className="stt-ring" viewBox="0 0 44 44" aria-hidden="true">
        <circle className="stt-track" cx="22" cy="22" r={R} />
        <circle
          ref={ringRef}
          className="stt-fill"
          cx="22"
          cy="22"
          r={R}
          strokeDasharray={C}
          strokeDashoffset={C}
        />
      </svg>
      <ArrowUp className="stt-arrow" />
    </button>
  );
};
