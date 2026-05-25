import { useEffect, useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { navLinks, personal } from '../../data/portfolioData';
import useActiveSection from '../../hooks/useActiveSection';
import { AnimatePresence, motion } from 'framer-motion';

 
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(navLinks.map((l) => l.id));
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
 
  const handleNav = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
 
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-bg/70 border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-20 h-16">
        {/* Logo */}
        <button
          onClick={() => handleNav('hero')}
          className="flex items-center gap-2 font-display font-bold text-white hover:opacity-90 transition group"
        >
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-neon-green/40 bg-neon-green/10 text-neon-green group-hover:shadow-neon-green transition-shadow">
            <Terminal size={16} />
          </span>
          <span className="tracking-tight">
            {personal.firstName}
            <span className="text-neon-green">   </span>
            {personal.lastName}
          </span>
        </button>
 
        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className={`relative px-3 py-2 font-mono text-xs tracking-widest uppercase transition-colors duration-300 ${
                    isActive ? 'text-neon-green' : 'text-white/65 hover:text-white'
                  }`}
                >
                  <span className="text-white/40 mr-1.5">
                    0{i + 1}.
                  </span>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
 
        {/* CTA */}
        <button
          onClick={() => handleNav('contact')}
          className="hidden md:inline-flex btn-neon py-2 px-4 text-[11px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-neon-green animate-pulse-glow" />
          Let&apos;s talk
        </button>
 
        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((s) => !s)}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-white/10 bg-white/[0.03] text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
 
      {/* Mobile menu */}
    <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10 bg-bg/95 backdrop-blur-xl"
          >
            <ul className="px-5 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className={`w-full text-left px-3 py-3 font-mono text-sm tracking-widest uppercase rounded-md transition-colors ${
                      active === link.id
                        ? 'text-neon-green bg-neon-green/5 border border-neon-green/20'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="text-white/40 mr-2">0{i + 1}.</span>
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => handleNav('contact')}
                  className="btn-neon w-full"
                >
                  Let&apos;s talk
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
 