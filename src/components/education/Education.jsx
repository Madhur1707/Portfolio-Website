import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import SectionLabel from '../common/SectionLabel';
import SectionTitle from '../common/SectionTitle';
import { education } from '../../data/portfolioData';

const accent = {
    green: { text: 'text-neon-green', border: 'border-neon-green/30', bg: 'bg-neon-green/10' },
    cyan: { text: 'text-neon-cyan', border: 'border-neon-cyan/30', bg: 'bg-neon-cyan/10' },
    purple: { text: 'text-neon-purple', border: 'border-neon-purple/30', bg: 'bg-neon-purple/10' },
    orange: { text: 'text-neon-orange', border: 'border-neon-orange/30', bg: 'bg-neon-orange/10' },
};

export default function Education() {
    return (
        <section id="education" className="section-padding relative">
            <div className="max-w-7xl mx-auto">
                <SectionLabel index="05" accent="green">academics</SectionLabel>
                <div className="mt-4 mb-12 max-w-3xl">
                    <SectionTitle highlight="foundation.">
                        Education &amp; the
                    </SectionTitle>
                </div>

                <div className="relative">
                    <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-green/40 via-neon-cyan/30 to-transparent" />
                    <div className="space-y-5">
                        {education.map((e, i) => {
                            const a = accent[e.accent] || accent.green;
                            return (
                                <motion.div
                                    key={e.school}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className="relative pl-8 sm:pl-12"
                                >
                                    <span
                                        className={`absolute left-0 top-4 h-3 w-3 rounded-full ${a.bg} border ${a.border}`}
                                    >
                                        <span className={`absolute inset-0 rounded-full ${a.bg} animate-ping opacity-50`} />
                                    </span>

                                    <div className="glass rounded-xl p-5 sm:p-6 glow-on-hover flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <span
                                                className={`hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-lg border ${a.border} ${a.bg} ${a.text}`}
                                            >
                                                <GraduationCap size={18} />
                                            </span>
                                            <div>
                                                <h3 className="font-display text-lg font-semibold text-white">
                                                    {e.degree}
                                                </h3>
                                                <p className={`${a.text} font-mono text-xs tracking-widest uppercase mt-1`}>
                                                    {e.school}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-white/55">
                                            <Calendar size={12} />
                                            {e.period}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
