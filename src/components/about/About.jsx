import { motion } from 'framer-motion';
import { Cpu, MapPin, Layers, Sparkles } from 'lucide-react';
import SectionLabel from '../common/SectionLabel';
import SectionTitle from '../common/SectionTitle';
import { aboutCards, devConfig, personal } from '../../data/portfolioData';
 
const ICONS = {
  role: Sparkles,
  stack: Layers,
  focus: Cpu,
  location: MapPin,
};
 
const accentClasses = {
  green: { text: 'text-neon-green', shadow: 'hover:shadow-neon-green', bg: 'bg-neon-green/10', border: 'border-neon-green/30' },
  cyan: { text: 'text-neon-cyan', shadow: 'hover:shadow-neon-cyan', bg: 'bg-neon-cyan/10', border: 'border-neon-cyan/30' },
  purple: { text: 'text-neon-purple', shadow: 'hover:shadow-neon-purple', bg: 'bg-neon-purple/10', border: 'border-neon-purple/30' },
  orange: { text: 'text-neon-orange', shadow: 'hover:shadow-neon-orange', bg: 'bg-neon-orange/10', border: 'border-neon-orange/30' },
};
 
export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="01" accent="green">about_me</SectionLabel>
        <div className="mt-4 mb-12 max-w-3xl">
          <SectionTitle highlight="builds production systems.">
            A senior-minded developer who
          </SectionTitle>
        </div>
 
        <div className="grid md:grid-cols-12 gap-6 lg:gap-8">
          {/* Intro paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 glass rounded-xl p-6 sm:p-8 glow-on-hover"
          >
            <p className="text-white/75 text-base sm:text-lg leading-relaxed">
              I&apos;m <span className="text-white font-medium">{personal.name}</span> — a
              full-stack developer focused on{' '}
              <span className="text-neon-green">React</span>,{' '}
              <span className="text-neon-cyan">Next.js</span>,{' '}
              <span className="text-neon-purple">Java</span>, and{' '}
              <span className="text-neon-orange">AWS serverless</span>. I&apos;ve shipped
              production healthcare and energy platforms — owning the slice from
              real-time UI all the way down to Lambdas, API Gateway and DynamoDB.
            </p>
            <p className="text-white/65 text-base leading-relaxed mt-4">
              I care about latency, clean component architecture, and code that other
              engineers can extend without flinching. Recently: cut data-retrieval
              latency by 50% and shipped 15+ Lambda functions powering a healthcare
              platform with strict compliance requirements.
            </p>
 
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                    <div className={`inline-flex h-7 w-7 items-center justify-center rounded-md border ${a.border} ${a.bg} ${a.text} mb-2`}>
                      <Icon size={14} />
                    </div>
                    <div className="font-mono text-[10px] tracking-widest uppercase text-white/45">
                      {c.label}
                    </div>
                    <div className={`text-sm text-white/90 mt-0.5`}>{c.value}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
 
          {/* Developer config card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="md:col-span-5 glass neon-border rounded-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <span className="font-mono text-[11px] text-white/55 tracking-wider">
                {devConfig.filename}
              </span>
              <span className="font-mono text-[11px] text-neon-cyan/80">
                read-only
              </span>
            </div>
            <pre className="font-mono text-[12.5px] sm:text-[13px] leading-relaxed p-5 overflow-x-auto">
              {devConfig.lines.map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="select-none text-white/25 w-5 text-right">
                    {i + 1}
                  </span>
                  <code className="whitespace-pre text-white/80">
                    {colorize(line)}
                  </code>
                </div>
              ))}
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
 
// Minimal inline highlighter (kept here so this card is fully self-contained).
function colorize(line) {
  const tokens = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === "'") {
      const end = line.indexOf("'", i + 1);
      if (end !== -1) {
        tokens.push(
          <span key={i} className="text-neon-green">{line.slice(i, end + 1)}</span>
        );
        i = end + 1;
        continue;
      }
    }
    if ('{}[]()'.includes(line[i])) {
      tokens.push(<span key={i} className="text-neon-cyan">{line[i]}</span>);
      i += 1;
      continue;
    }
    const m = line.slice(i).match(/^([A-Za-z_][A-Za-z0-9_]*)/);
    if (m) {
      const w = m[1];
      let cls = 'text-white/85';
      if (['const', 'let', 'var', 'export', 'default', 'return', 'import', 'from'].includes(w)) {
        cls = 'text-neon-purple';
      } else if (/^[A-Z]/.test(w)) {
        cls = 'text-neon-cyan';
      }
      tokens.push(<span key={i} className={cls}>{w}</span>);
      i += w.length;
      continue;
    }
    tokens.push(<span key={i} className="text-white/55">{line[i]}</span>);
    i += 1;
  }
  return tokens;
}
 