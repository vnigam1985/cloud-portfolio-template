import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import config from './portfolio.config';

/** Resolve a file in /public so it works on GitHub Pages sub-paths too. */
export const asset = (path: string) =>
  !path || /^https?:\/\//.test(path) ? path : import.meta.env.BASE_URL + path.replace(/^\//, '');

export const isExternal = (href: string) => /^https?:\/\//.test(href);

export const linkProps = (href: string) =>
  isExternal(href) ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href };

/** Renders "Hello *world.*" with the starred part in italic serif. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('*') && p.endsWith('*') ? (
          <span key={i} className="serif-accent">
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

/** Section numbers follow the order on the page and skip hidden sections. */
export const sectionIndex = (id: string) => {
  const order = [
    'about',
    config.experience?.jobs.length ? 'experience' : '',
    'skills',
    config.certifications.length ? 'certs' : '',
    'work',
    'moments',
  ].filter(Boolean);
  return String(order.indexOf(id) + 1).padStart(2, '0');
};

export const ease = [0.16, 1, 0.3, 1] as const;

/** Fade and lift into view once. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span>{index}</span>
      <span className="h-px w-8 bg-line" />
      <span>{label}</span>
    </div>
  );
}
