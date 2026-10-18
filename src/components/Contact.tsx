import { useState } from 'react';
import config from '../portfolio.config';
import { linkProps, Reveal, Rich } from '../lib';

const { contact, site } = config;
const TEMPLATE_URL = 'https://github.com/vnigam1985/cloud-portfolio-template';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-ink pb-10 pt-24 text-paper md:pt-36">
      <Reveal>
        <h2 className="text-[clamp(3.5rem,13vw,12rem)] font-bold leading-[0.88] tracking-[-0.055em]">
          <Rich text={contact.title} />
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-end">
        <Reveal delay={0.1}>
          <p className="max-w-md text-lg leading-relaxed text-paper/65">{contact.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="rounded-full bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              {contact.email}
            </a>
            <button
              onClick={copy}
              className="rounded-full border border-paper/20 px-5 py-3.5 text-sm font-semibold transition-colors hover:border-paper"
            >
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>
          {contact.cta && (
            <a
              {...linkProps(contact.cta.href)}
              className="group mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-accent"
            >
              {contact.cta.label}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          )}
        </Reveal>
        <Reveal delay={0.15}>
          <ul className="border-t border-paper/15">
            {contact.links.map((l) => (
              <li key={l.label}>
                <a
                  {...linkProps(l.href)}
                  className="group flex items-center justify-between border-b border-paper/15 py-4 text-xl font-medium tracking-tight"
                >
                  {l.label}
                  <span className="text-paper/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <footer className="mt-24 flex flex-col gap-3 border-t border-paper/10 pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/40 sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} {site.logo}
        </span>
        {site.showCredit ? (
          <a {...linkProps(TEMPLATE_URL)} className="hover:text-paper">
            Template by Vishal Nigam
          </a>
        ) : (
          <a href="#home" className="hover:text-paper">
            Back to top ↑
          </a>
        )}
      </footer>
    </section>
  );
}
