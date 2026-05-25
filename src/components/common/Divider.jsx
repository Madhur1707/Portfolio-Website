import { motion } from 'framer-motion';
 
/**
 * Animated section divider — a thin gradient line with a pulsing center dot.
 */
export default function Divider({ className = '' }) {
  return (
    <div
      className={`relative w-full flex items-center justify-center py-10 ${className}`}
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="divider-line origin-center"
      />
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
        className="absolute h-2 w-2 rounded-full bg-neon-green animate-pulse-glow"
        style={{ boxShadow: '0 0 14px 2px rgba(0,255,136,0.6)' }}
      />
    </div>
  );
}
 