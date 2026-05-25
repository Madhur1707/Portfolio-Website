import { motion } from 'framer-motion';
 
/**
 * Large display title used at the top of every section.
 * Renders an optional gradient-highlighted word at the end.
 */
export default function SectionTitle({ children, highlight, align = 'left' }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-white ${
        align === 'center' ? 'text-center' : ''
      }`}
    >
      {children}{' '}
      {highlight && <span className="text-gradient-neon">{highlight}</span>}
    </motion.h2>
  );
}
 