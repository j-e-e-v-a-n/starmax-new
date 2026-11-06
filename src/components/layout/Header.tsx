import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../../router';
import { StarmaxLogo } from '../common/StarmaxLogo';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Top Clients', href: '/clients' },
  // { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact Us', href: '/contact' },
];

interface HeaderProps {
  onOpenCallbackModal?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { currentPath } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === '/' ? currentPath === '/' || currentPath === '' : currentPath.startsWith(href);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`} id="site-header">
      <div className="container-x header-inner">
        <Link to="/" className="brand" aria-label="Starmax Systems home">
          <StarmaxLogo />
        </Link>

        <nav className={`nav${menuOpen ? ' open' : ''}`} id="nav" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="head-right">
          <Link to="/contact" className="btn solid">
            Get In Touch
          </Link>
          <button
            type="button"
            className="menu-btn"
            id="menu"
            aria-expanded={menuOpen}
            aria-controls="nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
};
