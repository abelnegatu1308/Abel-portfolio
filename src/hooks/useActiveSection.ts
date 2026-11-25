import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: readonly string[], offset = 80) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + offset;
        let current = sectionIds[0] ?? '';

        for (const id of sectionIds) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
            current = id;
          }
        }

        setActiveSection(current);
        frameId = 0;
      });
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
