import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import config from '../portfolio.config';
import { ease } from '../lib';

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'moments', label: 'Moments' },
  { id: 'contact', label: 'Contact' },
];

export function Nav() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const dark = active === 'contact';
  const initials = config.site.logo
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease }}
      className="section-pad fixed inset-x-0 top-0 z-50 flex items-center justify-between py-4"
    >
      <a href="#home" className="flex items-center gap-2.5" aria-label="Back to top">
        <span className={`grid h-9 w-9 place-items-center rounded-full text-[12px] font-bold transition-colors ${dark ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}>
          {initials}
        </span>
        <span
          className={`hidden text-sm font-semibold tracking-tight transition-opacity sm:block ${
            scrolled ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {config.site.logo}
        </span>
      </a>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 rounded-full border border-line bg-card/80 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md md:flex">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
              active === item.id ? 'text-paper' : 'text-muted hover:text-ink'
            }`}
          >
            {active === item.id && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <a
          href="#contact"
          className={`hidden rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all hover:scale-[1.03] md:block ${dark ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}
        >
          Let's talk
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card/90 backdrop-blur md:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-4">
            <span className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-4 top-16 rounded-3xl border border-line bg-card p-2 shadow-xl md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium ${
                  active === item.id ? 'bg-ink text-paper' : 'text-ink'
                }`}
              >
                {item.label}
                {active === item.id && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
