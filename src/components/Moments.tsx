import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import config from '../portfolio.config';
import type { Moment } from '../types';
import { Reveal, Rich, SectionLabel, sectionIndex } from '../lib';

const { moments } = config;
const index = sectionIndex('moments');

function Card({ m, i }: { m: Moment; i: number }) {
  return (
    <div className="flex h-[360px] w-[78vw] shrink-0 snap-start flex-col justify-between rounded-3xl border border-line bg-card p-6 sm:w-[340px] md:h-[440px] md:w-[400px] md:p-8">
      <div className="flex items-center justify-between font-mono text-[11px] text-muted">
        <span>{String(i + 1).padStart(2, '0')}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-[clamp(4rem,9vw,6.5rem)] font-bold leading-none tracking-[-0.05em]">{m.value}</span>
          {m.unit && <span className="serif-accent text-3xl text-muted">{m.unit}</span>}
        </div>
        <div className="mt-6 text-xl font-semibold tracking-tight">{m.title}</div>
        <p className="mt-2 leading-relaxed text-muted">{m.detail}</p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="section-pad">
      <SectionLabel index={index} label="Moments" />
      <h2 className="text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
        <Rich text={moments.title} />
      </h2>
      <p className="mt-3 text-muted">{moments.subtitle}</p>
    </div>
  );
}

export function Moments() {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setDesktop(mq.matches && !reduce);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduce]);

  useLayoutEffect(() => {
    if (!desktop) return;
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (!desktop) {
    return (
      <section id="moments" className="py-24">
        <Reveal>
          <Header />
        </Reveal>
        <div ref={track} className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scroll-px-4">
          {moments.items.map((m, i) => (
            <Card key={m.title} m={m} i={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="moments" ref={section} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-12 overflow-hidden">
        <Header />
        <motion.div ref={track} style={{ x }} className="flex w-max gap-5 pl-[clamp(16px,5vw,72px)] pr-[clamp(16px,5vw,72px)]">
          {moments.items.map((m, i) => (
            <Card key={m.title} m={m} i={i} />
          ))}
        </motion.div>
        <div className="section-pad">
          <div className="h-px w-full bg-line">
            <motion.div style={{ width: bar }} className="h-px bg-ink" />
          </div>
        </div>
      </div>
    </section>
  );
}
