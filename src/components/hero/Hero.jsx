import { motion } from 'framer-motion';
import { ArrowDown, Download, Send } from 'lucide-react';
import MatrixBackground from './MatrixBackground';
import Typewriter from './Typewriter';
import CodePanel from './CodePanel';
import { personal, heroStats, floatingBadges } from '../../data/portfolioData';

const accentMap = {
  green: 'border-neon-green/40 text-neon-green',
  cyan: 'border-neon-cyan/40 text-neon-cyan',
  purple: 'border-neon-purple/40 text-neon-purple',
  orange: 'border-neon-orange/40 text-neon-orange',
};

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden scanlines"
    >
      {/* Background layers */}
      <MatrixBackground density={18} opacity={0.45} />
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />

      <div className="relative max-w-7xl mx-auto pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 px-5 sm:px-8 md:px-12 lg:px-20 grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">

        {/* ── Left content ─────────────────────────────────────── */}
        <div className="lg:col-span-7">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-3 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/[0.06]"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-neon-green animate-ping opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
            </span>
            <span className="font-mono text-[11px] tracking-widest uppercase text-neon-green">
              {personal.status}
            </span>
          </motion.div>

          {/* Init line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-mono text-xs sm:text-sm tracking-widest uppercase text-white/55 mb-2 sm:mb-3"
          >
            {`> hello_world.init()`}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="font-display font-bold leading-[0.95] tracking-tight text-white text-4xl sm:text-5xl md:text-7xl xl:text-[5.5rem]"
          >
            {personal.firstName}
            <br />
            <span className="text-gradient-neon">{personal.lastName}</span>
            <span className="text-neon-green">.</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 sm:mt-5 font-mono text-sm sm:text-base md:text-xl text-white/80"
          >
            <span className="text-neon-cyan">{'<'}</span>
            <Typewriter phrases={personal.typewriterPhrases} className="mx-1" />
            <span className="text-neon-cyan">{'/>'}</span>
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-4 sm:mt-6 max-w-xl text-white/65 text-sm sm:text-base md:text-lg leading-relaxed"
          >
            {personal.summary}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => scrollTo('projects')}
              className="btn-neon w-full sm:w-auto justify-center"
            >
              <Send size={14} /> View Projects
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="btn-ghost w-full sm:w-auto justify-center"
            >
              <Download size={14} /> Get in touch
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl"
          >
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-lg px-3 sm:px-4 py-3 glow-on-hover"
              >
                <div
                  className={`font-display text-lg sm:text-xl font-bold ${{
                    green: 'text-neon-green',
                    cyan: 'text-neon-cyan',
                    purple: 'text-neon-purple',
                    orange: 'text-neon-orange',
                  }[s.accent]}`}
                >
                  {s.value}
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-white/55 mt-1 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right side: Code panel + badges ─────────────────── */}
        <div className="lg:col-span-5 relative mt-2 lg:mt-0">
          {/* Code panel — visible on all sizes, constrained height on mobile */}
          <div className="max-h-[280px] sm:max-h-[360px] lg:max-h-none overflow-hidden rounded-xl lg:overflow-visible">
            <CodePanel />
          </div>

          {/* Floating badges — horizontal scroll strip on mobile, absolute on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="mt-4 flex flex-wrap gap-2 lg:hidden"
          >
            {floatingBadges.map((b, i) => (
              <motion.span
                key={b.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.08, duration: 0.3 }}
                className={`tag ${accentMap[b.color]}`}
              >
                {b.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Desktop-only absolute floating badges */}
          <div className="hidden lg:block">
            {floatingBadges.map((b, i) => {
              const positions = [
                'top-2 -left-6',
                'top-16 -right-4',
                '-bottom-2 left-6',
                'bottom-14 -right-6',
                'top-1/2 -left-10',
                'top-1/3 -right-10',
              ];
              return (
                <motion.span
                  key={b.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                  className={`absolute z-10 ${positions[i]} animate-float tag ${accentMap[b.color]}`}
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  {b.label}
                </motion.span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/45 hover:text-neon-green transition-colors"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <ArrowDown size={14} className="animate-float" />
      </motion.button>
    </section>
  );
}