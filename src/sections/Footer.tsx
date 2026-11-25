import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, GithubLogo, Mailbox } from '@phosphor-icons/react';

import { contact, navSections } from '../data/content';

interface FooterProps {
  isPreloaded: boolean;
}

const currentYear = new Date().getFullYear();

export default function Footer({ isPreloaded }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!isPreloaded || !footerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      '.footer-content',
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 92%',
          once: true,
        },
      }
    );
  }, { dependencies: [isPreloaded], scope: footerRef });

  return (
    <footer ref={footerRef} className="site-footer">
      <div className="section-container">
        <div className="footer-grid">
          <div className="footer-brand footer-content">
            <a href="#home" className="footer-logo">
              <span className="brand-mark" aria-hidden="true">A</span>
              <span>ABEL <strong>NEGATU</strong></span>
            </a>
            <p>Thoughtful software, built with purpose.</p>
            <span className="footer-location">Addis Ababa, Ethiopia</span>
          </div>

          <nav className="footer-navigation footer-content" aria-label="Footer navigation">
            <h2>Explore</h2>
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>{section.label}</a>
            ))}
          </nav>

          <div className="footer-connect footer-content">
            <h2>Let&apos;s connect</h2>
            <p>Have an idea or opportunity? I&apos;d love to hear about it.</p>
            <a className="footer-email-link" href={`mailto:${contact.email}`}>
              <Mailbox size={16} weight="light" /> {contact.email}
            </a>
            <div className="footer-social-links">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
              >
                <GithubLogo size={18} weight="light" />
                GitHub
                <ArrowUpRight size={14} weight="light" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} Abel Negatu</span>
          <a href="#home">Back to top <ArrowUpRight size={14} weight="light" /></a>
          <span>Designed &amp; built with care.</span>
        </div>
      </div>
    </footer>
  );
}
