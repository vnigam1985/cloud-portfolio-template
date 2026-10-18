import { motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import config from '../portfolio.config';
import { asset } from '../lib';

const { badge } = config.about;
const name = config.site.logo;

function Barcode({ seed }: { seed: string }) {
  const bars: { x: number; w: number }[] = [];
  let h = 0;
  for (const c of seed + seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  let x = 0;
  while (x < 180) {
    h = (h * 1103515245 + 12345) >>> 0;
    const w = 1 + (h % 3);
    bars.push({ x, w });
    x += w + 1 + ((h >> 8) % 3);
  }
  return (
    <svg viewBox="0 0 180 28" className="h-7 w-full" preserveAspectRatio="none" aria-hidden>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y="0" width={b.w} height="28" fill="currentColor" />
      ))}
    </svg>
  );
}

export function Badge() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const x = useMotionValue(0);
  const swing = useTransform(x, [-160, 160], [-16, 16]);

  // Flip once on its own so visitors know it can flip.
  useEffect(() => {
    if (!inView || reduce) return;
    const a = setTimeout(() => setFlipped(true), 1400);
    const b = setTimeout(() => setFlipped(false), 3600);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [inView, reduce]);

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      {/* Lanyard strap */}
      <motion.div
        style={{ rotate: swing }}
        className="flex origin-top flex-col items-center"
        initial={reduce ? false : { rotate: -8 }}
        animate={inView ? { rotate: [-8, 5, -2, 0] } : undefined}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <div className="relative h-24 w-14">
          <div className="absolute left-0 top-0 h-full w-[18px] origin-top -skew-x-[14deg] bg-ink" />
          <div className="absolute right-0 top-0 h-full w-[18px] origin-top skew-x-[14deg] bg-ink" />
          <div className="absolute inset-x-0 top-0 flex h-full flex-col items-center justify-start gap-3 pt-3 font-mono text-[7px] font-medium uppercase tracking-[0.2em] text-paper/70">
            <span className="-ml-6 rotate-90">cloud</span>
          </div>
        </div>
        <div className="-mt-1 h-5 w-9 rounded-b-md rounded-t-sm border-2 border-[#9a9a96] bg-gradient-to-b from-[#d9d8d3] to-[#a7a6a1]" />
        <div className="-mt-0.5 h-3 w-12 rounded-sm bg-[#bdbcb7]" />

        <motion.button
          type="button"
          drag={reduce ? false : 'x'}
          style={{ x }}
          dragSnapToOrigin
          dragElastic={0.35}
          dragConstraints={{ left: -120, right: 120 }}
          onClick={() => setFlipped((f) => !f)}
          className="relative mt-1 h-[360px] w-[244px] cursor-grab touch-pan-y [perspective:1200px] active:cursor-grabbing"
          aria-label="Flip ID card"
        >
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          >
            {/* Front */}
            <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-line bg-card text-left shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] [backface-visibility:hidden]">
              <div className="flex items-center justify-between bg-ink px-4 pb-3 pt-6 text-paper">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">{badge.org}</span>
                <span className="h-2 w-2 rounded-full bg-accent" />
              </div>
              <div className="mx-auto mt-5 h-[128px] w-[128px] overflow-hidden rounded-xl bg-ghost">
                {badge.photo && (
                  <img src={asset(badge.photo)} alt="" className="h-full w-full object-cover" draggable={false} />
                )}
              </div>
              <div className="mt-4 px-5 text-center">
                <div className="text-[17px] font-bold uppercase tracking-tight">{name}</div>
                <div className="serif-accent mt-0.5 text-[17px] text-muted">{badge.role}</div>
              </div>
              <div className="mt-auto px-5 pb-4">
                <div className="mb-1 flex justify-between font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
                  <span>ID</span>
                  <span>{badge.idNumber}</span>
                </div>
                <Barcode seed={badge.idNumber} />
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 flex flex-col rounded-2xl border border-line bg-ink p-5 text-left text-paper shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">Access card</div>
              <dl className="mt-4 divide-y divide-paper/10">
                {badge.back.map((r) => (
                  <div key={r.label} className="flex justify-between py-2.5 text-[13px]">
                    <dt className="text-paper/55">{r.label}</dt>
                    <dd className="font-medium">{r.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto">
                <div className="serif-accent text-3xl text-accent">{name.split(' ')[0]}</div>
                <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-paper/40">
                  If found, return to {config.contact.email}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.button>
      </motion.div>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Tap to flip. Drag to swing.</p>
    </div>
  );
}
