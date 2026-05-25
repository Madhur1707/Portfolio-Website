import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, ChevronDown, MapPin } from 'lucide-react';

const accent = {
    green: { text: 'text-neon-green', border: 'border-neon-green/40', bg: 'bg-neon-green/10', shadow: 'shadow-neon-green' },
    cyan: { text: 'text-neon-cyan', border: 'border-neon-cyan/40', bg: 'bg-neon-cyan/10', shadow: 'shadow-neon-cyan' },
    purple: { text: 'text-neon-purple', border: 'border-neon-purple/40', bg: 'bg-neon-purple/10', shadow: 'shadow-neon-purple' },
    orange: { text: 'text-neon-orange', border: 'border-neon-orange/40', bg: 'bg-neon-orange/10', shadow: 'shadow-neon-orange' },
};

export default function ExperienceCard({ item, index, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    const a = accent[item.accent] || accent.green;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative pl-8 sm:pl-12"
        >
            {/* Timeline marker */}
            <div className="absolute left-0 top-3 flex flex-col items-center">
                <span className={`relative h-3 w-3 rounded-full ${a.bg} border ${a.border}`}>
                    <span className={`absolute inset-0 rounded-full ${a.bg} animate-ping opacity-60`} />
                </span>
            </div>

            <div
                className={`group glass rounded-xl overflow-hidden transition-all duration-300 glow-on-hover`}
            >
                <button
                    onClick={() => setOpen((s) => !s)}
                    className="w-full text-left px-5 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
                >
                    <div className="flex items-start gap-4">
                        <span
                            className={`hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-lg border ${a.border} ${a.bg} ${a.text}`}
                        >
                            <Briefcase size={16} />
                        </span>
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-display text-lg sm:text-xl font-semibold text-white">
                                    {item.role}
                                </h3>
                                <span className={`${a.text} font-mono text-xs tracking-widest uppercase`}>
                                    @ {item.company}
                                </span>
                            </div>
                            <div className="mt-1.5 flex items-center gap-4 flex-wrap text-white/55 font-mono text-[11px] tracking-widest uppercase">
                                <span>{item.period}</span>
                                <span className="inline-flex items-center gap-1">
                                    <MapPin size={11} /> {item.location}
                                </span>
                            </div>
                            <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl">
                                {item.summary}
                            </p>
                        </div>
                    </div>

                    <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] ${a.text}`}
                        aria-hidden="true"
                    >
                        <ChevronDown size={16} />
                    </motion.span>
                </button>

                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="overflow-hidden border-t border-white/10"
                        >
                            <div className="px-5 sm:px-6 py-5">
                                <ul className="space-y-3">
                                    {item.bullets.map((b, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex gap-3 text-white/75 text-sm leading-relaxed"
                                        >
                                            <span className={`mt-2 h-1.5 w-1.5 rounded-full ${a.bg} ${a.border} border shrink-0`} />
                                            <span>{b}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {item.tech?.length > 0 && (
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {item.tech.map((t) => (
                                            <span key={t} className="tag">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
