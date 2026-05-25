import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';

const accent = {
    green: { text: 'text-neon-green', border: 'border-neon-green/30', bg: 'bg-neon-green/10', shadow: 'hover:shadow-neon-green' },
    cyan: { text: 'text-neon-cyan', border: 'border-neon-cyan/30', bg: 'bg-neon-cyan/10', shadow: 'hover:shadow-neon-cyan' },
    purple: { text: 'text-neon-purple', border: 'border-neon-purple/30', bg: 'bg-neon-purple/10', shadow: 'hover:shadow-neon-purple' },
    orange: { text: 'text-neon-orange', border: 'border-neon-orange/30', bg: 'bg-neon-orange/10', shadow: 'hover:shadow-neon-orange' },
};

export default function ContactCard({ card, index }) {
    const isImage = card.icon?.startsWith('/');
    const IconComponent = !isImage ? (card.icon === 'Mail' ? Mail : card.icon === 'Phone' ? Phone : Mail) : null;
    const a = accent[card.accent] || accent.green;

    return (
        <motion.a
            href={card.href}
            target={card.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className={`group relative glass rounded-xl p-5 sm:p-6 transition-all duration-300 ${a.shadow} flex flex-col gap-4`}
        >
            <div className="flex items-start justify-between">
                <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border ${a.border} ${a.bg} ${a.text}`}
                >
                    {isImage ? (
                        <img src={card.icon} alt={card.label} className="w-6 h-6" />
                    ) : (
                        <IconComponent size={18} />
                    )}
                </span>
                <ArrowUpRight
                    size={16}
                    className={`${a.text} opacity-40 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300`}
                />
            </div>
            <div>
                <p className="font-mono text-[11px] tracking-widest uppercase text-white/45">
                    {card.label}
                </p>
                <p className="mt-1 text-white text-sm break-all group-hover:text-white">
                    {card.value}
                </p>
            </div>
        </motion.a>
    );
}

