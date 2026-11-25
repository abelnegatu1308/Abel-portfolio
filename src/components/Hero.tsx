import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';

interface HeroProps {
  isPreloaded: boolean;
}

export default function Hero({ isPreloaded }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!isPreloaded || !sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro
      .fromTo('.hero-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 })
      .fromTo(
        '.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.75 },
        '-=0.15'
      )
      .fromTo(
        '.hero-copy',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55 },
        '-=0.3'
      )
      .fromTo(
        '.hero-actions',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45 },
        '-=0.2'
      )
      .fromTo(
        '.hero-footnote',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.2'
      );

    gsap.to('.hero-orb--blue', {
      y: -16,
      duration: 5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
    gsap.to('.hero-orb--violet', {
      y: 14,
      duration: 6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, { dependencies: [isPreloaded], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-section"
      aria-labelledby="hero-title"
    >
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-grid-pattern" />
        <div className="hero-orb hero-orb--blue" />
        <div className="hero-orb hero-orb--violet" />
      </div>

      <div className="hero-layout">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">
            <span className="eyebrow-dot" />
            Software Engineer <span className="eyebrow-divider">/</span> Addis Ababa, Ethiopia
          </p>
          <h1 className="hero-title" id="hero-title">
            Hi, I&apos;m Abel <span>Negatu.</span>
          </h1>
          <p className="hero-role">Full-Stack &amp; Mobile Developer</p>
          <p className="hero-copy">
            I build modern digital experiences, scalable web applications, and cross-platform
            mobile solutions that turn ideas into reality.
          </p>

          <div className="hero-actions">
            <a className="button-primary" href="#contact">
              Let&apos;s talk <ArrowRight size={18} weight="light" />
            </a>
            <a className="button-secondary" href="#projects">
              Explore my work <ArrowUpRight size={17} weight="light" />
            </a>
          </div>

          <div className="hero-footnote">
            <span className="hero-footnote-line" />
            <span>Software Engineering · Web · Cross-platform Mobile</span>
            <span className="hero-footnote-line" />
          </div>
        </div>
      </div>

      <a className="hero-scroll" href="#about" aria-label="Scroll to About">
        <span />
      </a>
    </section>
  );
}
