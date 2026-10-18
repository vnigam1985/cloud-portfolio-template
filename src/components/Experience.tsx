import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import config from '../portfolio.config';
import type { Job } from '../types';
import { asset, Reveal, Rich, SectionLabel, sectionIndex } from '../lib';

const SHOW = 3;

function JobRow({ job, i }: { job: Job; i: number }) {
  const [open, setOpen] = useState(i === 0);
  const extra = job.highlights.length - SHOW;
  const visible = open ? job.highlights : job.highlights.slice(0, SHOW);

  return (
    <Reveal delay={0.04 * Math.min(i, 4)}>
      <article className="grid gap-4 border-t border-line py-8 md:grid-cols-[200px_1fr] md:gap-10 md:py-10">
        <div className="flex items-start justify-between gap-4 md:block">
          <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted [font-variant-numeric:tabular-nums]">
            {job.start} – {job.end}
          </div>
          {job.location && (
            <div className="text-[13px] text-muted md:mt-2">{job.location}</div>
          )}
          {i === 0 && /present|now|current/i.test(job.end) && (
            <span className="mt-0 inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted md:mt-4">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Now
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="text-[clamp(1.4rem,2.6vw,2rem)] font-bold leading-tight tracking-[-0.025em]">{job.role}</h3>
          <p className="serif-accent mt-0.5 text-xl text-muted">{job.company}</p>
          {job.summary && <p className="mt-4 max-w-2xl leading-relaxed text-ink">{job.summary}</p>}

          <ul className="mt-5 max-w-3xl space-y-3">
            <AnimatePresence initial={false}>
              {visible.map((h) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative pl-5 leading-relaxed text-muted"
                >
                  <span className="absolute left-0 top-[0.7em] h-1 w-2.5 rounded-full bg-ink/25" />
                  {h}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {extra > 0 && (
            <button
              onClick={() => setOpen((o) => !o)}
              className="mt-4 text-sm font-semibold underline decoration-line underline-offset-4 hover:decoration-ink"
              aria-expanded={open}
            >
              {open ? 'Show less' : `Show ${extra} more`}
            </button>
          )}

          {job.stack && job.stack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {job.stack.map((s) => (
                <span key={s} className="rounded-full bg-card px-3 py-1.5 text-[12px] font-medium ring-1 ring-line">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export function Experience() {
  const exp = config.experience;
  if (!exp?.jobs.length) return null;

  return (
    <section id="experience" className="section-pad py-24 md:py-32">
      <SectionLabel index={sectionIndex('experience')} label="Experience" />
      <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <h2 className="text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
            <Rich text={exp.title} />
          </h2>
          {exp.subtitle && <p className="mt-3 max-w-xl text-muted">{exp.subtitle}</p>}
        </Reveal>
        {config.site.resumePdf && (
          <Reveal delay={0.1}>
            <a
              href={asset(config.site.resumePdf)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.03]"
            >
              Download resume
            </a>
          </Reveal>
        )}
      </div>

      <div className="border-b border-line">
        {exp.jobs.map((job, i) => (
          <JobRow key={`${job.company}-${job.start}`} job={job} i={i} />
        ))}
      </div>

      {(exp.earlier?.length || exp.education?.length) && (
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {exp.earlier && exp.earlier.length > 0 && (
            <Reveal>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Earlier career</h3>
              <ul className="mt-4 divide-y divide-line">
                {exp.earlier.map((e) => (
                  <li key={e.role + e.company} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="min-w-0">
                      <span className="font-medium">{e.role}</span>
                      <span className="text-muted">, {e.company}</span>
                    </span>
                    <span className="shrink-0 font-mono text-[12px] text-muted [font-variant-numeric:tabular-nums]">{e.years}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          {exp.education && exp.education.length > 0 && (
            <Reveal delay={0.08}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Education</h3>
              <ul className="mt-4 divide-y divide-line">
                {exp.education.map((e) => (
                  <li key={e.degree} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="min-w-0">
                      <span className="font-medium">{e.degree}</span>
                      <span className="text-muted">, {e.school}</span>
                    </span>
                    <span className="shrink-0 font-mono text-[12px] text-muted [font-variant-numeric:tabular-nums]">{e.years}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      )}
    </section>
  );
}
