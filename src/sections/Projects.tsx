import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Briefcase, GithubLogo } from '@phosphor-icons/react';

import { projects } from '../data/content';

interface ProjectsProps {
  isPreloaded: boolean;
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const projectUrl = project.live ?? project.github ?? '#contact';

  return (
    <article className={`project-card project-card--${project.id}`}>
      <a
        className="project-preview"
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}${project.live ? ' live website' : ' GitHub repository'}`}
      >
        <img
          src={project.screenshot}
          alt={`${project.title} project screenshot`}
          width={index === 0 ? 590 : 1280}
          height={index === 0 ? 1232 : 620}
          loading={index === 0 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          decoding="async"
        />
        <span className="project-category">{project.category}</span>
        <span className="project-open" aria-hidden="true">
          View project <ArrowUpRight size={17} weight="light" />
        </span>
      </a>

      <div className="project-card-content">
        <div className="project-card-heading">
          <div>
            <p className="project-index">0{index + 1} <span>/ 05</span></p>
            <h3>{project.title}</h3>
            <p className="project-tagline">{project.tagline}</p>
          </div>
          <span className="project-title-mark" aria-hidden="true">
            <Briefcase size={18} weight="light" />
          </span>
        </div>
        <p className="project-description">{project.description}</p>
        <ul className="project-tech" aria-label={`${project.title} technologies`}>
          {project.tech.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <div className="project-actions">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              Visit live site <ArrowUpRight size={17} weight="light" />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <GithubLogo size={17} weight="light" /> Source code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects({ isPreloaded }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!isPreloaded || !sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      '.project-card',
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
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
      id="projects"
      className="projects-section section-shell"
      aria-labelledby="projects-title"
    >
      <div className="section-container">
        <div className="section-heading">
          <p className="eyebrow"><span className="eyebrow-dot" /> Selected work</p>
          <h2 id="projects-title">Ideas into <span>Experiences.</span></h2>
          <p>
            Five real projects, from cross-platform tools to web products built for people and
            businesses.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
