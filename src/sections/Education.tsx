import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CalendarBlank, GraduationCap, SealCheck } from '@phosphor-icons/react';

import { education } from '../data/content';

interface EducationProps {
  isPreloaded: boolean;
}

export default function Education({ isPreloaded }: EducationProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!isPreloaded || !sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      '.education-entry',
      { opacity: 0, x: -18 },
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, { dependencies: [isPreloaded], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="education"
      className="education-section section-shell"
      aria-labelledby="education-title"
    >
      <div className="section-container">
        <div className="section-heading">
          <p className="eyebrow"><span className="eyebrow-dot" /> Learning &amp; growth</p>
          <h2 id="education-title">The path behind <span>the work.</span></h2>
          <p>Formal study and continued learning that inform the way I build.</p>
        </div>

        <div className="education-list">
          {education.map((item, index) => {
            const Icon = item.type === 'Education' ? GraduationCap : SealCheck;

            return (
              <article className="education-entry" key={item.id}>
                <div className="education-marker" aria-hidden="true">
                  <Icon size={20} weight="light" />
                </div>
                <div className="education-content">
                  <div className="education-content-top">
                    <span className="education-type">{item.type}</span>
                    <span className="education-year">
                      <CalendarBlank size={14} weight="light" /> {item.year}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.institution}{'sub' in item && item.sub ? ` · ${item.sub}` : ''}</p>
                </div>
                <span className="education-index" aria-hidden="true">0{index + 1}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
