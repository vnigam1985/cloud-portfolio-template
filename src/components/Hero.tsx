import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import config from '../portfolio.config';
import { asset, ease, linkProps, Rich } from '../lib';

const { hero } = config;

function Placeholder() {
  return (
    <div className="flex h-full flex-col items-center justify-end pb-[18svh]">
      <svg viewBox="0 0 200 420" className="h-[70%] w-auto text-ghost" fill="currentColor" aria-hidden>
        <circle cx="100" cy="62" r="44" />
        <path d="M18 420c0-150 20-250 82-250s82 100 82 250z" />
      </svg>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        Your talking video goes here
      </p>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const wordY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  const letters = hero.backdropWord.split('');

  return (
    <section id="home" ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-paper">
      {/* Giant faded name */}
      <motion.div
        style={{ y: reduce ? 0 : wordY }}
        className="pointer-events-none absolute inset-x-0 top-[13svh] flex select-none justify-center md:top-[9svh]"
        aria-hidden
      >
        <div className="flex text-[clamp(5.5rem,24vw,24rem)] font-extrabold leading-none tracking-[-0.06em] text-ghost">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={reduce ? false : { y: '40%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.15 + i * 0.06, ease }}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Avatar */}
      <motion.div
        style={{ y: reduce ? 0 : mediaY, scale: reduce ? 1 : mediaScale }}
        initial={reduce ? false : { opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.35, ease }}
        className="absolute bottom-0 left-1/2 h-[72svh] w-full max-w-[640px] -translate-x-1/2 origin-bottom md:h-[90svh]"
      >
        {hero.video ? (
          <video
            ref={videoRef}
            className="h-full w-full object-contain object-bottom mix-blend-multiply"
            src={asset(hero.video)}
            poster={hero.poster ? asset(hero.poster) : undefined}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : hero.poster ? (
          <motion.img
            src={asset(hero.poster)}
            alt={config.site.logo}
            className="h-full w-full object-contain object-bottom"
            animate={reduce ? undefined : { y: [0, -6, 0], scale: [1, 1.008, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <Placeholder />
        )}
      </motion.div>

      {/* Fade the bottom of the avatar into the page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58svh] bg-gradient-to-t from-paper from-35% via-paper/90 to-transparent md:h-[30svh] md:via-paper/60" />

      {/* Text */}
      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: fade }}
        className="section-pad absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 pb-8 md:pb-12"
      >
        <div className="max-w-[34rem]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 1, ease }}
            className="text-[clamp(2.6rem,7vw,5.8rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          >
            <Rich text={hero.title} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease }}
            className="mt-4 max-w-md text-[15px] leading-relaxed text-muted md:text-base"
          >
            {hero.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <a
              {...linkProps(hero.primaryCta.href)}
              className="rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.03]"
            >
              {hero.primaryCta.label}
            </a>
            {hero.secondaryCta && (
              <a
                {...linkProps(hero.secondaryCta.href)}
                className="rounded-full border border-ink/15 bg-card/70 px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:border-ink"
              >
                {hero.secondaryCta.label}
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.4, ease }}
          className="hidden flex-col items-end gap-5 text-right lg:flex"
        >
          {hero.quickFacts.map((f) => (
            <div key={f.label}>
              <div className="text-3xl font-bold tracking-tight">{f.value}</div>
              <div className="mt-0.5 max-w-[11rem] text-[13px] leading-snug text-muted">{f.label}</div>
            </div>
          ))}
          {hero.video && (
            <button
              onClick={toggleSound}
              className="mt-2 flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em]"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${muted ? 'bg-muted' : 'bg-accent'}`} />
              {muted ? 'Tap for sound' : 'Sound on'}
            </button>
          )}
        </motion.div>
      </motion.div>

      {hero.video && (
        <button
          onClick={toggleSound}
          className="absolute right-4 top-[42svh] z-10 rounded-full border border-line bg-card/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] backdrop-blur lg:hidden"
        >
          {muted ? 'Sound off' : 'Sound on'}
        </button>
      )}
    </section>
  );
}
