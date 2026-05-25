import { motion } from 'framer-motion';
 
/**
 * Small mono-styled label that sits above a section title.
 * Example: "// 02 — about"
 */
export default function SectionLabel({ index, children, accent = 'green' }) {
  const colors = {
    green: 'text-neon-green',
    cyan: 'text-neon-cyan',
    purple: 'text-neon-purple',
    orange: 'text-neon-orange',
  };
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-[0.25em] uppercase"
    >
      <span className={`${colors[accent]} opacity-90`}>{`//`}</span>
      {index && (
        <span className={`${colors[accent]} opacity-90`}>{index}</span>
      )}
      <span className="text-white/55">{children}</span>
      <span className="ml-2 h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
    </motion.div>
  );
}
 