import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

interface RouterProps {
  children: ReactNode;
}

export const Router: React.FC<RouterProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path && path !== '' ? path : '/';
    }
    return '/';
  });
  const isFirstRender = useRef(true);

  const scrollToTop = (targetPath: string) => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Home plays the cinematic intro and locks scroll, so jump straight to the
    // top there; every other route keeps the current position and glides up.
    const instant = reduce || targetPath === '/';
    window.scrollTo({ top: 0, behavior: instant ? 'instant' : 'smooth' });
  };

  const navigate = (path: string) => {
    if (path === currentPath) {
      scrollToTop(path);
      return;
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
    };

    // Start every fresh load at the top
    window.scrollTo({ top: 0, behavior: 'instant' });

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // After the new page has mounted, keep the previous scroll position for a
  // beat and then animate up to the top of the page.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const id = window.requestAnimationFrame(() => scrollToTop(currentPath));
    return () => window.cancelAnimationFrame(id);
  }, [currentPath]);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

export const Link: React.FC<LinkProps> = ({
  to,
  children,
  className = '',
  activeClassName = '',
  onClick,
  ...props
}) => {
  const { currentPath, navigate } = useRouter();
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    // If not external and not modified click (cmd/ctrl)
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !to.startsWith('http') && !to.startsWith('tel:') && !to.startsWith('mailto:')) {
      e.preventDefault();
      navigate(to);
    }
  };

  const combinedClasses = `${className} ${isActive && activeClassName ? activeClassName : ''}`.trim();

  return (
    <a href={to} onClick={handleClick} className={combinedClasses} {...props}>
      {children}
    </a>
  );
};
