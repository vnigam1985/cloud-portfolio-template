import config from '../portfolio.config';
import { linkProps, Reveal, Rich, SectionLabel, sectionIndex } from '../lib';
import { Badge } from './Badge';

const { about } = config;

export function About() {
  return (
    <section id="about" className="section-pad relative py-24 md:py-36">
      <SectionLabel index={sectionIndex('about')} label="About" />
      <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_auto_0.85fr] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="text-[clamp(2.8rem,6.5vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
              <Rich text={about.greeting} />
            </h2>
          </Reveal>
          <div className="mt-8 max-w-xl space-y-4">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className={`leading-relaxed ${i === 0 ? 'text-lg text-ink md:text-xl' : 'text-muted md:text-[17px]'}`}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            {about.buttons.map((b, i) => (
              <a
                key={b.label}
                {...linkProps(b.href)}
                className={
                  i === 0
                    ? 'rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.03]'
                    : 'rounded-full border border-ink/15 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-ink'
                }
              >
                {b.label}
              </a>
            ))}
          </Reveal>
        </div>

        <div className="-mt-6 flex justify-center lg:-mt-20">
          <Badge />
        </div>

        <Reveal delay={0.1}>
          <dl className="border-t border-line">
            {about.facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{f.label}</dt>
                <dd className="text-right text-[15px] font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
