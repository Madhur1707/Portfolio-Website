import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import SectionLabel from '../common/SectionLabel';
import SectionTitle from '../common/SectionTitle';
import ContactCard from './ContactCard';
import { contactCards, personal } from '../../data/portfolioData';

export default function Contact() {
    return (
        <section id="contact" className="section-padding relative">
            <div className="max-w-7xl mx-auto">
                <SectionLabel index="06" accent="orange">{`get_in_touch`}</SectionLabel>

                <div className="mt-4 mb-10 max-w-3xl">
                    <SectionTitle highlight="something together.">
                        Let&apos;s build
                    </SectionTitle>
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="mt-4 text-white/65 max-w-2xl text-base sm:text-lg leading-relaxed"
                    >
                        I&apos;m currently open to senior frontend and full-stack roles —
                        remote or on-site in {personal.location}. If you&apos;re shipping
                        something interesting, my inbox is open.
                    </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {contactCards.map((c, i) => (
                        <ContactCard key={c.label} card={c} index={i} />
                    ))}
                </div>

                {/* Big CTA card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-10 relative overflow-hidden glass neon-border rounded-2xl p-8 sm:p-10"
                >
                    <div className="absolute inset-0 bg-radial-fade opacity-60 pointer-events-none" />
                    <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

                    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div>
                            <p className="font-mono text-xs tracking-widest uppercase text-neon-green">
                                {`> ready_to_collaborate.exec()`}
                            </p>
                            <h3 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                                Have a project in mind?
                                <br />
                                <span className="text-gradient-neon">Let&apos;s make it real.</span>
                            </h3>
                        </div>
                        <a href={`mailto:${personal.email}`} className="btn-neon">
                            <Send size={14} /> Send a message
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

