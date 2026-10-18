import React, { useEffect, useRef } from 'react';

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.16,
  rootMargin: '0px 0px -40px 0px',
};

export const useReveal = <T extends HTMLElement>(once = true) => {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          if (once) obs.unobserve(entry.target);
        }
      });
    }, OBSERVER_OPTIONS);
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);
  return ref;
};

type RevealProps = React.PropsWithChildren<{
  as?: React.ElementType;
  className?: string;
  variant?: 'up' | 'fade' | 'scale' | 'left' | 'right';
  delay?: number;
  once?: boolean;
}> &
  React.HTMLAttributes<HTMLElement>;

export const Reveal: React.FC<RevealProps> = ({ children, as, className = '', variant = 'up', delay = 0, once = true, ...rest }) => {
  const Component = (as || 'div') as any;
  const ref = useReveal<HTMLElement>(once);
  const base = variant === 'fade' ? 'reveal-fade' : variant === 'scale' ? 'reveal-scale' : variant === 'left' ? 'reveal-left' : variant === 'right' ? 'reveal-right' : 'reveal';
  return (
    <Component ref={ref} className={`${base} ${className}`.trim()} data-reveal-delay={delay} {...rest}>
      {children}
    </Component>
  );
};
