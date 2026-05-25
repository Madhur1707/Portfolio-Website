import { Mail } from 'lucide-react';
import { personal, socials } from '../../data/portfolioData';

const links = [
    { href: socials.github, icon: '/github.png', label: 'GitHub', isImage: true },
    { href: socials.linkedin, icon: '/linkedin.png', label: 'LinkedIn', isImage: true },
    { href: socials.email, icon: Mail, label: 'Email', isImage: false },
];

export default function Footer() {
    return (
        <footer className="relative border-t border-white/10 mt-10">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <p className="font-mono text-xs text-white/55 uppercase tracking-widest">
                        Designed &amp; built by
                    </p>
                    <p className="font-display text-lg text-white">
                        {personal.name}
                        <span className="text-neon-green">.</span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {links.map(({ href, icon, label, isImage }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="group inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-300 hover:text-neon-green hover:border-neon-green/40 hover:shadow-neon-green"
                        >
                            {isImage ? (
                                <img src={icon} alt={label} className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            ) : (
                                <Mail size={16} className="group-hover:scale-110 transition-transform" />
                            )}
                        </a>
                    ))}
                </div>

                <p className="font-mono text-[11px] text-white/40 tracking-widest uppercase">
                    © {new Date().getFullYear()} — All systems nominal
                </p>
            </div>
        </footer>
    );
}