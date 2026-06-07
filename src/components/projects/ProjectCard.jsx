import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowUpRight,
    ExternalLink,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';

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
    const [showDetails, setShowDetails] = useState(false);

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
            {/* Fixed Height Top Section */}
            <div className="relative h-56 border-b border-white/10 overflow-hidden">
                <AnimatePresence mode="wait">
                    {!showDetails ? (
                        <motion.div
                            key="image"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                            <span
                                className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-md border ${a.border} ${a.bg} ${a.text} font-mono text-[10px] tracking-widest uppercase`}
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-glow" />
                                Featured
                            </span>

                            <ArrowUpRight
                                className={`absolute top-3 right-3 ${a.text} opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300`}
                                size={18}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 p-5 overflow-y-auto"
                        >
                            <h4 className={`font-semibold mb-3 ${a.text}`}>
                                Project Overview
                            </h4>

                            <p className="text-white/70 text-sm leading-relaxed">
                                {project.description}
                            </p>

                            <ul className="mt-4 space-y-2">
                                {project.highlights.map((h) => (
                                    <li
                                        key={h}
                                        className="flex gap-2 text-white/70 text-sm"
                                    >
                                        <CheckCircle2
                                            size={14}
                                            className={`${a.text} shrink-0 mt-0.5`}
                                        />
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Card Content */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-white">
                        {project.title}
                    </h3>

                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className={`flex items-center gap-1 text-xs font-medium ${a.text} hover:opacity-80 transition`}
                    >
                        {showDetails ? (
                            <>
                                Back <ChevronUp size={14} />
                            </>
                        ) : (
                            <>
                                Details <ChevronDown size={14} />
                            </>
                        )}
                    </button>
                </div>

                {/* Tech Stack */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <span key={t} className="tag">
                            {t}
                        </span>
                    ))}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex items-center gap-3">
                    {project.links?.demo && (
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-neon py-2 px-3 text-[11px]"
                        >
                            <ExternalLink size={12} />
                            Live Demo
                        </a>
                    )}

                    {project.links?.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost py-2 px-3 text-[11px] flex items-center gap-2"
                        >
                            <img
                                src="/github.png"
                                alt="GitHub"
                                className="w-3 h-3"
                            />
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}