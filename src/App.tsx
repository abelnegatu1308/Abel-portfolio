import { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

type Theme = 'dark' | 'light';

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = window.localStorage.getItem('abel-portfolio-theme');
    const initialTheme: Theme =
      savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark';
    return initialTheme;
  });

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('abel-portfolio-theme', theme);
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#f5f7fb' : '#090a0f');
  }, [theme]);

  useEffect(() => {
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const cursor = document.querySelector<HTMLElement>('.cursor-glow');
    if (!cursor) return;

    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.22, ease: 'power3.out' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.22, ease: 'power3.out' });
    const handlePointerMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      gsap.set(cursor, { opacity: 1 });
    };
    const hideCursor = () => gsap.to(cursor, { opacity: 0, duration: 0.18, overwrite: true });

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', hideCursor);
    window.addEventListener('blur', hideCursor);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', hideCursor);
      window.removeEventListener('blur', hideCursor);
      gsap.killTweensOf(cursor);
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="cursor-glow" aria-hidden="true" />
      <Navbar
        isPreloaded
        theme={theme}
        onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
      />
      <main>
        <Hero isPreloaded />
        <About isPreloaded />
        <Skills isPreloaded />
        <Education isPreloaded />
        <Projects isPreloaded />
        <Contact isPreloaded />
      </main>
      <Footer isPreloaded />
    </div>
  );
}
