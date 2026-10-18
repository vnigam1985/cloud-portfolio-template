import config from '../portfolio.config';
import { linkProps, Reveal, Rich, SectionLabel } from '../lib';

export function Certifications() {
  if (!config.certifications.length) return null;
  return (
    <section id="certs" className="section-pad py-24 md:py-32">
      <SectionLabel index="03" label="Certifications" />
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
            <Rich text="Always *learning.*" />
          </h2>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {config.certifications.map((c, i) => (
            <Reveal key={c.name} delay={0.05 * i}>
              <a
                {...(c.href ? linkProps(c.href) : {})}
                className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-line bg-card p-5 transition-colors hover:border-ink"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                  <span>{c.issuer}</span>
                  <span>{c.year}</span>
                </div>
                <div className="text-lg font-semibold leading-snug tracking-tight">{c.name}</div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work() {
  const idx = config.certifications.length ? '04' : '03';
  return (
    <section id="work" className="section-pad py-24 md:py-32">
      <SectionLabel index={idx} label="Work" />
      <Reveal>
        <h2 className="text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
          <Rich text="Selected *work.*" />
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {config.projects.map((p, i) => {
          const Wrapper = p.link ? 'a' : 'div';
          return (
            <Reveal key={p.title} delay={0.06 * (i % 2)}>
              <Wrapper
                {...(p.link ? linkProps(p.link.href) : {})}
                className="group flex h-full flex-col rounded-3xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.25)] md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {p.status}
                  </span>
                </div>
                <h3 className="mt-10 text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-tight tracking-[-0.03em]">
                  {p.title}
                </h3>
                <p className="serif-accent mt-1 text-xl text-muted">{p.tagline}</p>
                <p className="mt-4 leading-relaxed text-muted">{p.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full bg-paper px-3 py-1.5 text-[12px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
                {p.link && (
                  <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold">
                    {p.link.label}
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                )}
              </Wrapper>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
