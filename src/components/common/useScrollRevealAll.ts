import { useEffect } from 'react';

export const useScrollRevealAll = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      document.querySelectorAll('.reveal,.reveal-fade,.reveal-scale,.reveal-left,.reveal-right').forEach((el) => el.classList.add('in'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal,.reveal-fade,.reveal-scale,.reveal-left,.reveal-right').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};
