import { motion } from 'framer-motion';
 
const accent = {
  green: 'hover:text-neon-green hover:border-neon-green/40 hover:shadow-neon-green',
  cyan: 'hover:text-neon-cyan hover:border-neon-cyan/40 hover:shadow-neon-cyan',
  purple: 'hover:text-neon-purple hover:border-neon-purple/40 hover:shadow-neon-purple',
  orange: 'hover:text-neon-orange hover:border-neon-orange/40 hover:shadow-neon-orange',
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
 