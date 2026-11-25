import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, List, Moon, RocketLaunch, Sun, X } from '@phosphor-icons/react';

import { navSections } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavbarProps {
  isPreloaded: boolean;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const sectionIds = navSections.map(({ id }) => id);

export default function Navbar({ isPreloaded, theme, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const activeSection = useActiveSection(sectionIds, 100);

  const closeMobileAndRestoreFocus = useCallback(() => {
    setIsMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstMobileLinkRef.current?.focus();
    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileAndRestoreFocus();
        return;
      }

      if (event.key === 'Tab' && mobilePanelRef.current) {
        const focusable = mobilePanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleMenuKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleMenuKeyDown);
    };
  }, [isMobileOpen, closeMobileAndRestoreFocus]);

  useGSAP(() => {
    if (!isPreloaded || !headerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      '.navbar-brand, .navbar-links a, .btn-hire, .theme-toggle, .mobile-menu-toggle',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.045, ease: 'power2.out' }
    );
  }, { dependencies: [isPreloaded], scope: headerRef });

  useGSAP(() => {
    if (!isMobileOpen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      '.mobile-nav-link',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.045, ease: 'power2.out' }
    );
  }, { dependencies: [isMobileOpen], scope: headerRef });

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <header
      ref={headerRef}
      className={`site-header${isScrolled || isMobileOpen ? ' site-header--scrolled' : ''}`}
    >
      <div className="site-header-inner">
        <a
          href="#home"
          className="navbar-brand"
          aria-label="Abel Negatu, home"
          onClick={closeMobile}
        >
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>ABEL <strong>NEGATU</strong></span>
        </a>

        <nav className="navbar-links" aria-label="Primary navigation">
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={activeSection === section.id ? 'is-active' : undefined}
              aria-current={activeSection === section.id ? 'location' : undefined}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'light'}
            onClick={onToggleTheme}
          >
            {theme === 'dark'
              ? <Sun size={18} weight="light" />
              : <Moon size={18} weight="light" />}
          </button>
          <a className="btn-hire" href="#contact">
            <RocketLaunch size={16} weight="light" />
            <span>Hire Me</span>
          </a>
          <button
            ref={menuButtonRef}
            className="mobile-menu-toggle"
            type="button"
            aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileOpen((open) => !open)}
          >
            {isMobileOpen
              ? <X size={21} weight="light" />
              : <List size={21} weight="light" />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className="mobile-navigation" id="mobile-navigation">
          <button
            className="mobile-navigation-backdrop"
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileAndRestoreFocus}
          />
          <div
            ref={mobilePanelRef}
            className="mobile-navigation-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
          >
            <div className="mobile-navigation-heading">
              <p className="mobile-navigation-label" id="mobile-navigation-title">Navigate</p>
              <button
                className="mobile-navigation-close"
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMobileAndRestoreFocus}
              >
                <X size={20} weight="light" />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {navSections.map((section, index) => (
                <a
                  key={section.id}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  className="mobile-nav-link"
                  href={`#${section.id}`}
                  onClick={closeMobile}
                >
                  <span aria-hidden="true">0{index + 1}</span>
                  {section.label}
                  <ArrowRight size={18} weight="light" />
                </a>
              ))}
              <a className="mobile-navigation-cta" href="#contact" onClick={closeMobile}>
                Start a conversation <ArrowRight size={18} weight="light" />
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
