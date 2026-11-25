import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight,
  Code,
  MapPin,
} from '@phosphor-icons/react';

import { about } from '../data/content';

interface AboutProps {
  isPreloaded: boolean;
}

export default function About({ isPreloaded }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!isPreloaded || !sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      '.about-reveal',
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      }
    );
  }, { dependencies: [isPreloaded], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section section-shell"
      aria-labelledby="about-title"
    >
      <div className="section-container">
        <div className="section-heading about-reveal">
          <p className="eyebrow"><span className="eyebrow-dot" /> A little about me</p>
          <h2 id="about-title">Beyond the <span>Code.</span></h2>
          <p>Building useful things with curiosity, care, and a love for thoughtful design.</p>
        </div>

        <div className="about-grid">
          <div className="profile-card about-reveal">
            <div className="profile-image-frame">
              <img
                src="/profile.webp"
                alt="Abel Negatu, Software Engineer"
                width="597"
                height="600"
                loading="lazy"
                decoding="async"
              />
              <div className="profile-image-shade" />
              <div className="profile-caption">
                <div>
                  <span className="profile-caption-label">Based in</span>
                  <span className="profile-caption-value">Addis Ababa, Ethiopia</span>
                </div>
                <span className="profile-mark" aria-hidden="true">AN</span>
              </div>
            </div>
            <div className="profile-stats">
              {about.stats.map((stat) => (
                <div className="profile-stat glass" key={stat.label}>
                  <span className="profile-stat-value">{stat.value}</span>
                  <span className="profile-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-copy">
            <p className="about-intro about-reveal">
              I&apos;m Abel Negatu, a Software Engineer and Full-Stack &amp; Mobile Developer
              based in Addis Ababa, Ethiopia.
            </p>
            <p className="about-description about-reveal">
              I enjoy transforming complex ideas into practical digital products. My work spans
              responsive web applications, cross-platform mobile development, backend
              integrations, and modern software engineering workflows. I focus on building
              experiences that are useful, scalable, and a pleasure to use.
            </p>

            <div className="about-details about-reveal">
              <div className="about-detail">
                <span className="about-detail-icon"><Code size={18} weight="light" /></span>
                <span><strong>{about.position}</strong><small>{about.summary}</small></span>
              </div>
              <div className="about-detail">
                <span className="about-detail-icon"><MapPin size={18} weight="light" /></span>
                <span><strong>{about.location}</strong><small>Home base</small></span>
              </div>
              <div className="about-detail">
                <span className="about-detail-icon"><Code size={18} weight="light" /></span>
                <span><strong>Web &amp; mobile</strong><small>Responsive products and cross-platform apps</small></span>
              </div>
            </div>

            <a className="text-link about-reveal" href="#contact">
              Let&apos;s work together <ArrowRight size={17} weight="light" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
