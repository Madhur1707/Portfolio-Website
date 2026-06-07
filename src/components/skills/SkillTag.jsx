import { motion } from 'framer-motion';

const accent = {
    green: { text: 'text-neon-green', border: 'border-neon-green/30', bg: 'bg-neon-green/10', shadow: 'hover:shadow-neon-green' },
    cyan: { text: 'text-neon-cyan', border: 'border-neon-cyan/30', bg: 'bg-neon-cyan/10', shadow: 'hover:shadow-neon-cyan' },
    purple: { text: 'text-neon-purple', border: 'border-neon-purple/30', bg: 'bg-neon-purple/10', shadow: 'hover:shadow-neon-purple' },
    orange: { text: 'text-neon-orange', border: 'border-neon-orange/30', bg: 'bg-neon-orange/10', shadow: 'hover:shadow-neon-orange' },
    blue: { text: 'text-neon-blue', border: 'border-neon-blue/30', bg: 'bg-neon-blue/10', shadow: 'hover:shadow-neon-blue' },
    yellow: { text: 'text-neon-yellow', border: 'border-neon-yellow/30', bg: 'bg-neon-yellow/10', shadow: 'hover:shadow-neon-yellow' },
};
export default function SkillTag({ label, accent: a = 'green', delay = 0 }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay }}
            whileHover={{ y: -2 }}
            className={`tag transition-all duration-300 cursor-default ${accent[a]}`}
        >
            {label}
        </motion.span>
    );
}
