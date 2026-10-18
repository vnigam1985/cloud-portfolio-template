import Lenis from 'lenis';
import { useEffect } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Moments } from './components/Moments';
import { Nav } from './components/Nav';
import { Skills } from './components/Skills';
import { Certifications, Work } from './components/Work';
import config from './portfolio.config';

export default function App() {
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', config.site.accent);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1 });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Smooth-scroll for in-page links like #about
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')!;
      const target = id === '#' ? 0 : document.querySelector<HTMLElement>(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.2 });
      history.replaceState(null, '', id);
    };
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Work />
        <Moments />
        <Contact />
      </main>
    </>
  );
}
