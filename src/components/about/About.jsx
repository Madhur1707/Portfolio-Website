'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, MapPin, Layers, Sparkles, ChevronDown } from 'lucide-react';
import SectionLabel from '../common/SectionLabel';
import SectionTitle from '../common/SectionTitle';
import { aboutCards, personal } from '../../data/portfolioData';

const ICONS = {
  role: Sparkles,
  stack: Layers,
  focus: Cpu,
  location: MapPin,
};

const accentClasses = {
  green: {
    text: 'text-neon-green',
    shadow: 'hover:shadow-neon-green',
    bg: 'bg-neon-green/10',
    border: 'border-neon-green/30',
    dot: 'border-neon-green',
    chevron: 'text-neon-green',
  },
  cyan: {
    text: 'text-neon-cyan',
    shadow: 'hover:shadow-neon-cyan',
    bg: 'bg-neon-cyan/10',
    border: 'border-neon-cyan/30',
    dot: 'border-neon-cyan',
    chevron: 'text-neon-cyan',
  },
  purple: {
    text: 'text-neon-purple',
    shadow: 'hover:shadow-neon-purple',
    bg: 'bg-neon-purple/10',
    border: 'border-neon-purple/30',
    dot: 'border-neon-purple',
    chevron: 'text-neon-purple',
  },
  orange: {
    text: 'text-neon-orange',
    shadow: 'hover:shadow-neon-orange',
    bg: 'bg-neon-orange/10',
    border: 'border-neon-orange/30',
    dot: 'border-neon-orange',
    chevron: 'text-neon-orange',
  },
};

const timelineItems = [
  {
    accent: 'green',
    date: 'Jun 2025 — Sep 2025',
    title: 'Frontend Developer Intern',
    company: 'AlgoFlowAI • Enream Energy Platform',
    description:
      'Built real-time energy monitoring dashboards, analytics systems, and scalable frontend architecture for industrial energy platforms.',
  },
  {
    accent: 'purple',
    date: 'Oct 2025 — Present',
    title: 'Full-Stack Software Developer',
    company: 'AlgoFlowAI • CureZ Healthcare',
    description:
      'Building healthcare products across frontend, backend, databases, cloud infrastructure, analytics, payments, and scalable APIs.',
  },
  {
    accent: 'orange',
    date: 'Current Focus',
    title: 'AI Engineering',
    company: 'Learning & Building',
    description:
      'Exploring AI agents, LLM applications, MCP architecture, and modern SaaS products while strengthening full-stack expertise.',
  },
];

function TimelineItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const a = accentClasses[item.accent];

  return (
    <div className="relative pl-8">
      {/* Dot */}
      <div
        className={`absolute left-0 top-1 h-4 w-4 rounded-full border-2 ${a.dot} bg-background`}
      />

      {/* Clickable header row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left group focus:outline-none"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <span className={`text-xs font-mono ${a.text}`}>{item.date}</span>
            <h4 className="text-white font-semibold mt-1 text-sm leading-snug">
              {item.title}
            </h4>
            <p className="text-neon-cyan text-xs mt-0.5">{item.company}</p>
          </div>

          {/* Chevron */}
          <span
            className={`mt-1 flex-shrink-0 transition-transform duration-300 ${a.chevron} ${open ? 'rotate-180' : 'rotate-0'
              }`}
          >
            <ChevronDown size={15} />
          </span>
        </div>
      </button>

      {/* Expandable description */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-white/60 text-sm mt-2 leading-relaxed pb-1">
              {item.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="01" accent="green">
          about_me
        </SectionLabel>

        <div className="mt-4 mb-12 max-w-3xl">
          <SectionTitle highlight="builds production systems.">
            A senior-minded developer who
          </SectionTitle>
        </div>

        <div className="grid md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 glass rounded-xl p-6 sm:p-8 glow-on-hover h-full flex flex-col"
          >
            <p className="text-white/75 text-base sm:text-lg leading-relaxed">
              I&apos;m{' '}
              <span className="text-white font-medium">{personal.name}</span>{' '}
              — a full-stack developer focused on{' '}
              <span className="text-neon-green">React</span>,{' '}
              <span className="text-neon-cyan">Next.js</span>,{' '}
              <span className="text-neon-purple">Java</span>, and{' '}
              <span className="text-neon-orange">AWS serverless</span>.
              I&apos;ve shipped production healthcare and energy platforms —
              owning the slice from real-time UI all the way down to Lambdas,
              API Gateway and DynamoDB.
            </p>

            <p className="text-white/65 text-base leading-relaxed mt-4">
              I care about latency, clean component architecture, and code that
              other engineers can extend without flinching. Recently: cut
              data-retrieval latency by 50% and shipped 15+ Lambda functions
              powering a healthcare platform with strict compliance requirements.
            </p>

            <div className="mt-auto pt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {aboutCards.map((c, i) => {
                const Icon = ICONS[c.label] || Sparkles;
                const a = accentClasses[c.accent];

                return (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className={`group glass rounded-lg p-3 transition-all duration-300 ${a.shadow} hover:-translate-y-0.5`}
                  >
                    <div
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-md border ${a.border} ${a.bg} ${a.text} mb-2`}
                    >
                      <Icon size={14} />
                    </div>

                    <div className="font-mono text-[10px] tracking-widest uppercase text-white/45">
                      {c.label}
                    </div>

                    <div className="text-sm text-white/90 mt-0.5">{c.value}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side - My Journey */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="md:col-span-5 glass neon-border rounded-xl p-6 sm:p-8 h-full"
          >
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white">My Journey</h3>
              <p className="text-white/50 text-sm mt-1">
                From frontend development to full-stack engineering.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-0 w-px bg-white/10" />

              <div className="space-y-7">
                {timelineItems.map((item, i) => (
                  <TimelineItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}