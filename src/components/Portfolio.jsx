import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './layout/Navbar';
import Hero from './hero/Hero';
import Divider from './common/Divider';
import About from './about/About';
import Experience from './experience/Experience';
import Skills from './skills/Skills';
import Contact from './contact/Contact';
import Projects from './projects/Projects';
import Education from './education/Education';
import Footer from './layout/Footer';
import PortfolioChat from './PortfolioChat';



export default function Portfolio() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="relative min-h-screen bg-bg text-white/85 font-sans overflow-x-clip">
            <AnimatePresence>
                {loading && <BootLoader key="loader" />}
            </AnimatePresence>

            <Navbar />

            <main className="relative">
                <Hero />
                <Divider />
                <About />
                <Divider />
                <Experience />
                <Divider />
                <Skills />
                <Divider />
                <Projects />
                <Divider />
                <Education />
                <Divider />
                <Contact />
            </main>

            <Footer />
            {!loading && <PortfolioChat/>}
        </div>
    );
}

function BootLoader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
        >
            <div className="relative flex items-center justify-center">
                <span className="absolute h-24 w-24 rounded-full border border-neon-green/30 animate-ping" />
                <span className="absolute h-16 w-16 rounded-full border border-neon-cyan/40 animate-ping [animation-delay:0.15s]" />
                <span className="relative h-3 w-3 rounded-full bg-neon-green shadow-neon-green" />
            </div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-10 font-mono text-xs tracking-[0.4em] uppercase text-neon-green"
            >
                Initializing portfolio
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                >
                    {' '}_
                </motion.span>
            </motion.p>
            <p className="mt-2 font-mono text-[10px] tracking-widest uppercase text-white/40">
                booting modules · loading assets · injecting style
            </p>
        </motion.div>
    );
}