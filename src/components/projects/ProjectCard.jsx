import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, CheckCircle2 } from 'lucide-react';

const accent = {
    green: {
        text: 'text-neon-green',
        border: 'border-neon-green/30',
        bg: 'bg-neon-green/10',
        shadow: 'hover:shadow-neon-green',
        grad: 'from-neon-green/30 via-transparent to-transparent',
    },
    cyan: {
        text: 'text-neon-cyan',
        border: 'border-neon-cyan/30',
        bg: 'bg-neon-cyan/10',
        shadow: 'hover:shadow-neon-cyan',
        grad: 'from-neon-cyan/30 via-transparent to-transparent',
    },
    purple: {
        text: 'text-neon-purple',
        border: 'border-neon-purple/30',
        bg: 'bg-neon-purple/10',
        shadow: 'hover:shadow-neon-purple',
        grad: 'from-neon-purple/30 via-transparent to-transparent',
    },
    orange: {
        text: 'text-neon-orange',
        border: 'border-neon-orange/30',
        bg: 'bg-neon-orange/10',
        shadow: 'hover:shadow-neon-orange',
        grad: 'from-neon-orange/30 via-transparent to-transparent',
    },
};

export default function ProjectCard({ project, index }) {
    const a = accent[project.accent] || accent.green;

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className={`group relative glass rounded-xl overflow-hidden transition-all duration-300 ${a.shadow}`}
        >
            {/* Top accent bar */}
            <div className={`relative h-32 sm:h-36 overflow-hidden border-b border-white/10`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${a.grad}`} />
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        className={`font-display font-bold text-5xl sm:text-6xl ${a.text} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                    >
                        0{index + 1}
                    </span>
                </div>
                <span
                    className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-md border ${a.border} ${a.bg} ${a.text} font-mono text-[10px] tracking-widest uppercase`}
                >
                    <span className={`h-1.5 w-1.5 rounded-full bg-current animate-pulse-glow`} />
                    Featured
                </span>
                <ArrowUpRight
                    className={`absolute top-3 right-3 ${a.text} opacity-50 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300`}
                    size={18}
                />
            </div>

            <div className="p-5 sm:p-6">
                <h3 className="font-display text-xl font-semibold text-white group-hover:text-gradient-neon transition-colors">
                    {project.title}
                </h3>
                <p className="mt-3 text-white/65 text-sm leading-relaxed">
                    {project.description}
                </p>

                <ul className="mt-4 space-y-2">
                    {project.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-white/70 text-sm">
                            <CheckCircle2 size={14} className={`${a.text} shrink-0 mt-0.5`} />
                            <span>{h}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <span key={t} className="tag">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                    {project.links?.demo && (
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-neon py-2 px-3 text-[11px]"
                        >
                            <ExternalLink size={12} /> Live demo
                        </a>
                    )}
                    {project.links?.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost py-2 px-3 text-[11px] flex items-center gap-2"
                        >
                            <img src="/github.png" alt="GitHub" className="w-3 h-3" /> GitHub
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
