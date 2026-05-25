import { motion } from 'framer-motion';
import { Code2, Layout, Server, Wrench } from 'lucide-react';
import SkillTag from './SkillTag';

const ICONS = { Code2, Layout, Server, Wrench };

const accent = {
    green: { text: 'text-neon-green', border: 'border-neon-green/30', bg: 'bg-neon-green/10', shadow: 'hover:shadow-neon-green' },
    cyan: { text: 'text-neon-cyan', border: 'border-neon-cyan/30', bg: 'bg-neon-cyan/10', shadow: 'hover:shadow-neon-cyan' },
    purple: { text: 'text-neon-purple', border: 'border-neon-purple/30', bg: 'bg-neon-purple/10', shadow: 'hover:shadow-neon-purple' },
    orange: { text: 'text-neon-orange', border: 'border-neon-orange/30', bg: 'bg-neon-orange/10', shadow: 'hover:shadow-neon-orange' },
};

export default function SkillCard({ group, index }) {
    const Icon = ICONS[group.icon] || Code2;
    const a = accent[group.accent];

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className={`group relative glass rounded-xl p-6 transition-all duration-300 ${a.shadow}`}
        >
            {/* corner glow */}
            <span
                aria-hidden="true"
                className={`pointer-events-none absolute -top-px -right-px h-16 w-16 rounded-bl-2xl ${a.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
            />

            <div className="flex items-center justify-between mb-4">
                <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${a.border} ${a.bg} ${a.text}`}
                >
                    <Icon size={18} />
                </span>
                <span className={`font-mono text-[10px] tracking-widest uppercase ${a.text}`}>
                    0{index + 1}
                </span>
            </div>

            <h3 className="font-display text-lg font-semibold text-white">
                {group.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                    <SkillTag key={item} label={item} accent={group.accent} delay={0.05 * i} />
                ))}
            </div>
        </motion.div>
    );
}
