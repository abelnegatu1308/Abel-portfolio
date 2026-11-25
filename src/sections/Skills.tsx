import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ArrowsClockwise,
  ArrowUpRight,
  Code,
  Database,
  DeviceMobile,
  LockKey,
  PlugsConnected,
  SquaresFour,
} from '@phosphor-icons/react';
import {
  SiCplusplus,
  SiDart,
  SiFirebase,
  SiFlutter,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiGit,
} from 'react-icons/si';
import { FaCss3Alt, FaJava } from 'react-icons/fa6';
import { VscVscode } from 'react-icons/vsc';

import { skills } from '../data/content';

interface SkillsProps {
  isPreloaded: boolean;
}

const skillIcons: Record<string, ReactNode> = {
  JavaScript: <SiJavascript />,
  'C++': <SiCplusplus />,
  Java: <FaJava />,
  Python: <SiPython />,
  PHP: <SiPhp />,
  SQL: <Database weight="light" />,
  React: <SiReact />,
  'Next.js': <SiNextdotjs />,
  HTML5: <SiHtml5 />,
  CSS3: <FaCss3Alt />,
  'Responsive Web Design': <DeviceMobile weight="light" />,
  'State Management': <ArrowsClockwise weight="light" />,
  Flutter: <SiFlutter />,
  Dart: <SiDart />,
  Firebase: <SiFirebase />,
  Firestore: <Database weight="light" />,
  Authentication: <LockKey weight="light" />,
  'RESTful APIs': <PlugsConnected weight="light" />,
  'Relational SQL': <Database weight="light" />,
  Git: <SiGit />,
  GitHub: <SiGithub />,
  'VS Code': <VscVscode />,
  'Agile Development': <SquaresFour weight="light" />,
};

function SkillCard({ name }: { name: string }) {
  return (
    <div className="skill-card">
      <span className="skill-icon" aria-hidden="true">
        {skillIcons[name] ?? <Code weight="light" />}
      </span>
      <span className="skill-name">{name}</span>
      <span className="skill-card-arrow" aria-hidden="true">
        <ArrowUpRight size={14} weight="light" />
      </span>
    </div>
  );
}

export default function Skills({ isPreloaded }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!isPreloaded || !sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      '.skill-card',
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.035,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
          once: true,
        },
      }
    );
  }, { dependencies: [isPreloaded], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="skills-section section-shell"
      aria-labelledby="skills-title"
    >
      <div className="section-container">
        <div className="section-heading">
          <p className="eyebrow"><span className="eyebrow-dot" /> Tools I build with</p>
          <h2 id="skills-title">My Technical <span>Arsenal.</span></h2>
          <p>
            A practical toolkit for designing, building, and shipping responsive web and mobile
            experiences.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((category, categoryIndex) => (
            <section className="skills-category" key={category.category} aria-label={category.category}>
              <div className="skills-category-heading">
                <span className="skills-category-number">0{categoryIndex + 1}</span>
                <h3>{category.category}</h3>
              </div>
              <div className="skills-cards">
                {category.skills.map((skill) => (
                  <SkillCard
                    key={skill}
                    name={skill}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="skills-note">
          <span className="skills-note-indicator" aria-hidden="true" />
          Continuously learning and expanding my technical range
        </p>
      </div>
    </section>
  );
}
