import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import config from '../portfolio.config';
import type { Element } from '../types';
import { Reveal, Rich, SectionLabel } from '../lib';

const { skills } = config;
const numbered = skills.elements.map((e, i) => ({ ...e, n: i + 1 }));
type Numbered = Element & { n: number };
const groupLabel = (id: string) => skills.groups.find((g) => g.id === id)?.label ?? id;

function Tile({ el, dim, onHover }: { el: Numbered; dim: boolean; onHover: (e: Numbered) => void }) {
  return (
    <motion.button
      type="button"
      layout
      onMouseEnter={() => onHover(el)}
      onFocus={() => onHover(el)}
      onClick={() => onHover(el)}
      animate={{ opacity: dim ? 0.18 : 1, scale: dim ? 0.95 : 1 }}
      transition={{ duration: 0.35 }}
      className="group relative flex aspect-square w-full flex-col md:aspect-auto md:h-[104px] justify-between rounded-xl border border-line bg-card p-2 text-left transition-colors hover:border-ink hover:bg-ink hover:text-paper md:p-2.5"
    >
      <span className="font-mono text-[9px] text-muted group-hover:text-paper/60 md:text-[10px]">{el.n}</span>
      <span className="text-[clamp(1.1rem,2.2vw,1.9rem)] font-bold leading-none tracking-tight">{el.symbol}</span>
      <span className="truncate text-[9px] text-muted group-hover:text-paper/70 md:text-[10.5px]">{el.name}</span>
    </motion.button>
  );
}

export function Skills() {
  const [filter, setFilter] = useState('all');
  const [focus, setFocus] = useState<Numbered>(numbered[0]);
  const isDim = (el: Element) => filter !== 'all' && el.group !== filter;

  return (
    <section id="skills" className="section-pad relative py-24 md:py-32">
      <SectionLabel index="02" label="Skills" />
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <h2 className="text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
            <Rich text={skills.title} />
          </h2>
          <p className="mt-3 text-muted">{skills.subtitle}</p>
        </Reveal>

        {/* Detail card */}
        <Reveal delay={0.1} className="w-full lg:w-[360px]">
          <div className="flex items-center gap-5 rounded-2xl border border-line bg-card p-4">
            <div className="relative grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-ink text-paper">
              <span className="absolute left-2 top-1.5 font-mono text-[10px] text-paper/50">{focus.n}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={focus.symbol}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-4xl font-bold tracking-tight"
                >
                  {focus.symbol}
                </motion.span>
              </AnimatePresence>
              <span className="absolute bottom-1.5 right-2 h-1.5 w-1.5 rounded-full bg-accent" />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{groupLabel(focus.group)}</div>
              <div className="mt-1 text-xl font-bold tracking-tight">{focus.name}</div>
              <div className="serif-accent mt-0.5 text-[17px] text-muted">{focus.note ?? 'In the toolkit.'}</div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Filter tabs */}
      <div className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {[{ id: 'all', label: 'All' }, ...skills.groups].map((g) => (
          <button
            key={g.id}
            onClick={() => setFilter(g.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
              filter === g.id ? 'border-ink bg-ink text-paper' : 'border-line bg-card text-muted hover:text-ink'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Desktop: one column per group, like the groups of a periodic table */}
      <div
        className="mt-8 hidden gap-2 md:grid"
        style={{ gridTemplateColumns: `repeat(${skills.groups.length}, minmax(0, 1fr))` }}
      >
        {skills.groups.map((g, gi) => (
          <div key={g.id} className="flex flex-col gap-2">
            <div className="mb-1 truncate font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
              {String(gi + 1).padStart(2, '0')} {g.label}
            </div>
            {numbered
              .filter((e) => e.group === g.id)
              .map((el, i) => (
                <Reveal key={el.symbol} delay={0.03 * (gi + i)} y={14}>
                  <Tile el={el} dim={isDim(el)} onHover={setFocus} />
                </Reveal>
              ))}
          </div>
        ))}
      </div>

      {/* Mobile: compact grid */}
      <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6 md:hidden">
        {numbered.map((el) => (
          <Tile key={el.symbol} el={el} dim={isDim(el)} onHover={setFocus} />
        ))}
      </div>
    </section>
  );
}
