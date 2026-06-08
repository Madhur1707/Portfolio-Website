import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Send, Loader2, Minimize2,
    Phone, Mail, Globe,
    Briefcase, Code2, GraduationCap, FolderGit2,
    ChevronRight, Sparkles,
    Computer,
    Link,
} from 'lucide-react';

// ─── Madhur's system prompt ──────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an AI assistant embedded in Madhur Pathak's personal portfolio website.
Your ONLY job is to answer questions about Madhur. Be concise, friendly, and conversational.
If someone asks something unrelated to Madhur, politely redirect them.

== ABOUT MADHUR ==
Name: Madhur Pathak
Title: Full-Stack Developer (also strong as Frontend Developer)
Location: Bangalore, India
Email: madhurpathak000@gmail.com
Phone: +91 8960629039
GitHub: github.com (search Madhur Pathak)
LinkedIn / Portfolio available on request

== SUMMARY ==
Full-Stack Developer with 1+ year of production experience building performant, scalable web applications.
Expert in React.js, Next.js, TypeScript on the frontend and Java / Spring Boot on the backend.
Strong AWS experience (Lambda, S3, API Gateway, DynamoDB, CloudFront).
Known for real-time dashboards, microservices architecture, and clean API design.

== WORK EXPERIENCE ==

1. AlgoFlowAI — Full-Stack Developer (Oct 2025 – Present) | Bangalore
   Project: CureZ Healthcare Platform
   Stack: Java, React, Next.js, Spring Boot, Microservices, AWS, RDS MySQL, DynamoDB, WebSocket, JWT
   Key achievements:
   - Role-based Spring Boot microservices backend on AWS Lambda, 1000+ concurrent users, 99.9% uptime, sub-200ms response
   - DynamoDB → RDS MySQL real-time sync pipeline via DynamoDB Streams, cut read costs 35%, improved analytics latency 40%
   - Conflict-free booking + Razorpay payment system with idempotent webhooks, 98%+ booking success rate
   - Real-time admin analytics dashboard (6-domain data model) with sub-300ms load time
   - Search/pagination layer with debouncing + AbortController, reduced server load 42%, sub-150ms across 20,000+ records
   - JWT-based RBAC, dual-token rotation, WhatsApp OTP, reduced auth failures ~35%
   - KYC verification + provider onboarding flow with AWS S3 presigned URL document uploads

2. AlgoFlowAI — Frontend Developer Intern (Jun 2025 – Sep 2025) | Remote
   Project: Enream Energy Monitoring Platform
   Stack: React.js, Next.js, Tailwind CSS, Recharts, D3, Context API, Custom Hooks, AWS S3, CloudFront
   Key achievements:
   - Multi-tenant energy monitoring UI with hierarchical asset management (Plant → System → Asset), 9+ modules, 1000+ assets
   - Real-time analytics with Recharts/D3-geo, 8+ parameter filtering, sub-200ms queries
   - AI-powered image analysis + data ingestion pipeline for 50k+ records via XLSX/CSV
   - Custom async hooks (useFetch, useApiRequest) with Axios interceptors for token refresh across 25+ API endpoints

== PROJECTS ==

1. HiredHub — AI-Powered Job Portal
   Stack: React, Tailwind CSS, Supabase (PostgreSQL), Gemini AI API, Clerk Auth, Vercel
   - Full-stack job portal with job listings, search/filtering, PDF/DOC uploads, role-based routes
   - Gemini AI integration for intelligent candidate shortlisting — reduced recruiter screening time ~60%
   - Clerk Auth with RBAC for recruiters and candidates
   Demo + GitHub available

2. Bishops Waltham Pharmacy — UK Client (Live Production Site)
   Stack: Next.js, React, Tailwind CSS, Java, AWS Lambda, DynamoDB, Stripe
   - Production Next.js App Router frontend for a live UK pharmacy client
   - 8+ route-level pages, 30+ reusable components, AuthContext/AppContext/CartContext
   - End-to-end multi-step booking + Stripe payment flow covering 10+ healthcare services
   - Full admin panel for appointment approvals, payment tracking, blog management
   - SEO with SSR, SchemaOrg, Canonical tags — ~40% faster load, 1000+ monthly organic visitors, 100+ monthly real bookings

== TECHNICAL SKILLS ==
Languages: JavaScript, TypeScript, Java
Frontend: React.js, Next.js, Redux, Tailwind CSS, ShadCN UI, Material UI, Recharts, D3.js, Leaflet
Backend: Node.js, Spring Boot, Microservices, REST APIs, WebSockets, JWT, Maven
Database/Cloud: MySQL, DynamoDB, MongoDB, AWS (Lambda, S3, API Gateway, CloudFront, DynamoDB Streams)
Tools: Git, GitHub, Postman, VS Code, Figma, CI/CD

== EDUCATION ==
- MCA — Maharana Pratap College of Technology, Gwalior (Aug 2023 – Jul 2025)
- BCA — Bundelkhand University, Jhansi (Jul 2017 – Jun 2020)

== PERSONALITY / TONE NOTES ==
- Madhur is professional, detail-oriented, and performance-focused
- He takes pride in measurable results (latency numbers, cost savings, uptime)
- He is open to new opportunities and collaborations
- Always end responses about contact with his email: madhurpathak000@gmail.com

FORMAT RULES (strictly follow):
- Use **bold** for names, titles, company names, tech names
- Use bullet lines starting with "- " for lists
- For contact info always use these exact prefixes on their own lines:
    PHONE: +91 8960629039
    EMAIL: madhurpathak000@gmail.com
    GITHUB: github.com/madhurpathak
    LINKEDIN: linkedin.com/in/madhurpathak
- For section headers use ## like: ## Work Experience
- Keep responses concise — 2-4 sentences or a short list unless asked for detail.
- Never make up anything not listed above.`;

// ─── Gemini API call with auto-retry on 503 ───────────────────────────────────
const GEMINI_URL = (key) =>
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;

async function callGemini(apiKey, messages, retries = 3, delayMs = 2000) {
    const contents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
    }));

    for (let attempt = 1; attempt <= retries; attempt++) {
        const res = await fetch(GEMINI_URL(apiKey), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                contents,
                generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
            }),
        });

        if (res.ok) {
            const data = await res.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
        }

        const err = await res.json().catch(() => ({}));
        const code = err?.error?.code;
        const msg = err?.error?.message || `HTTP ${res.status}`;

        if (code === 503 && attempt < retries) {
            await new Promise((r) => setTimeout(r, delayMs * attempt));
            continue;
        }
        if (code === 429) throw new Error("Rate-limited. Please wait a moment and try again.");
        throw new Error(msg);
    }
    throw new Error("Gemini is overloaded right now. Please try again in a few seconds.");
}

// ─── Suggested questions ──────────────────────────────────────────────────────
const SUGGESTIONS = [
    { label: 'Who is Madhur?', icon: '👤' },
    { label: 'What tech does he use?', icon: '⚡' },
    { label: 'Tell me about projects', icon: '🚀' },
    { label: 'How to contact him?', icon: '📬' },
];

// ─── Formatted message renderer ──────────────────────────────────────────────
const CONTACT_ICONS = {
    PHONE: { icon: Phone, color: 'text-neon-green', label: 'Phone', href: (v) => `tel:${v.replace(/\s/g, '')}` },
    EMAIL: { icon: Mail, color: 'text-neon-cyan', label: 'Email', href: (v) => `mailto:${v}` },
    GITHUB: { icon: Computer, color: 'text-white/80', label: 'GitHub', href: (v) => `https://${v}` },
    LINKEDIN: { icon: Link, color: 'text-blue-400', label: 'LinkedIn', href: (v) => `https://${v}` },
    WEBSITE: { icon: Globe, color: 'text-neon-purple', label: 'Website', href: (v) => `https://${v}` },
};

const SECTION_ICONS = {
    'work experience': Briefcase,
    'experience': Briefcase,
    'skills': Code2,
    'education': GraduationCap,
    'projects': FolderGit2,
    'contact': Mail,
    'about': Sparkles,
};

function FormattedMessage({ content }) {
    const lines = content.split('\n');

    const renderLine = (line, idx) => {
        // ## Section header
        if (line.startsWith('## ')) {
            const title = line.slice(3).trim();
            const key = title.toLowerCase();
            const Icon = Object.entries(SECTION_ICONS).find(([k]) => key.includes(k))?.[1];
            return (
                <div key={idx} className="flex items-center gap-1.5 mt-3 mb-1 first:mt-0">
                    {Icon && <Icon size={13} className="text-neon-green shrink-0" />}
                    <span className="font-mono text-[11px] font-bold text-neon-green tracking-widest uppercase">
                        {title}
                    </span>
                </div>
            );
        }

        // Contact line: PHONE: / EMAIL: / GITHUB: / LINKEDIN:
        const contactMatch = line.match(/^(PHONE|EMAIL|GITHUB|LINKEDIN|WEBSITE):\s*(.+)$/i);
        if (contactMatch) {
            const type = contactMatch[1].toUpperCase();
            const value = contactMatch[2].trim();
            const def = CONTACT_ICONS[type];
            if (def) {
                const Icon = def.icon;
                return (
                    <a
                        key={idx}
                        href={def.href(value)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 py-1.5 px-2.5 my-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-neon-green/30 hover:bg-white/[0.07] transition-all group"
                    >
                        <Icon size={13} className={`${def.color} shrink-0`} />
                        <span className="font-mono text-[11px] text-white/70 group-hover:text-white/90 transition-colors break-all">
                            {value}
                        </span>
                    </a>
                );
            }
        }

        // Bullet line: "- text"
        if (line.match(/^[-•]\s/)) {
            const text = line.replace(/^[-•]\s/, '');
            return (
                <div key={idx} className="flex items-start gap-1.5 my-0.5">
                    <ChevronRight size={11} className="text-neon-green/60 mt-[3px] shrink-0" />
                    <span className="font-mono text-[12px] text-white/80 leading-relaxed">{renderInline(text)}</span>
                </div>
            );
        }

        // Empty line → small gap
        if (line.trim() === '') return <div key={idx} className="h-1" />;

        // Normal paragraph
        return (
            <p key={idx} className="font-mono text-[12px] text-white/85 leading-relaxed">
                {renderInline(line)}
            </p>
        );
    };

    // Inline **bold** renderer
    const renderInline = (text) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) =>
            part.startsWith('**') && part.endsWith('**')
                ? <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                : part
        );
    };

    return <div className="space-y-0.5">{lines.map(renderLine)}</div>;
}

// ─── Custom chat icon SVG ─────────────────────────────────────────────────────

function ChatIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="7"
                width="14"
                height="11"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <circle cx="9" cy="12" r="1.2" fill="currentColor" />
            <circle cx="15" cy="12" r="1.2" fill="currentColor" />
            <path
                d="M10 15H14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M12 3V7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <circle cx="12" cy="3" r="1" fill="currentColor" />
        </svg>
    );
}


// ─── Main component ───────────────────────────────────────────────────────────
export default function PortfolioChat({ geminiApiKey }) {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hey! 👋 I'm **Madhur's AI** assistant.\nAsk me anything about his experience, skills, or projects!",
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [retrying, setRetrying] = useState(false);
    const [error, setError] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(true);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 300);
    }, [open]);

    const sendMessage = async (text) => {
        const content = (text || input).trim();
        if (!content || loading) return;

        setInput('');
        setError('');
        setRetrying(false);
        setShowSuggestions(false);

        // Reset textarea height
        if (textareaRef.current) textareaRef.current.style.height = 'auto';

        const userMsg = { role: 'user', content };
        const nextMessages = [...messages, userMsg];
        setMessages(nextMessages);
        setLoading(true);

        const retryTimer = setTimeout(() => setRetrying(true), 2200);

        try {
            const key = geminiApiKey || import.meta.env?.VITE_GEMINI_API_KEY;
            if (!key) throw new Error('No API key. Add VITE_GEMINI_API_KEY to .env');
            const reply = await callGemini(key, nextMessages);
            setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
        } catch (e) {
            setError(e.message);
        } finally {
            clearTimeout(retryTimer);
            setLoading(false);
            setRetrying(false);
        }
    };

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* ── Floating bubble ──────────────────────────────────── */}
            <motion.button
                onClick={() => setOpen((v) => !v)}
                className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl flex items-center justify-center text-black"
                style={{
                    background: 'linear-gradient(135deg, #4ade80 0%, #22d3ee 100%)',
                    boxShadow: '0 0 24px rgba(74,222,128,0.45)',
                }}
                whileHover={{ scale: 1.08, boxShadow: '0 0 36px rgba(74,222,128,0.65)' }}
                whileTap={{ scale: 0.94 }}
                aria-label="Open chat"
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.div key="x"
                            initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                            <X size={20} strokeWidth={2.5} />
                        </motion.div>
                    ) : (
                        <motion.div key="chat"
                            initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.18 }}>
                            <ChatIcon />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulse ring — only when closed */}
                {!open && (
                    <motion.span
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ border: '2px solid rgba(74,222,128,0.5)' }}
                        animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                    />
                )}
            </motion.button>

            {/* ── Chat panel ───────────────────────────────────────── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="panel"
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        className="fixed z-50 flex flex-col rounded-2xl overflow-hidden"
                        style={{
                            /* Vertical: sits above the bubble with a fixed gap, grows upward to a max */
                            bottom: '5.5rem',
                            right: '1rem',
                            /* Responsive width */
                            width: 'min(calc(100vw - 2rem), 380px)',
                            /* KEY FIX: use dvh so it never overflows viewport on mobile */
                            maxHeight: 'min(560px, calc(100dvh - 7rem))',
                            background: 'rgba(10,10,15,0.97)',
                            border: '1px solid rgba(74,222,128,0.22)',
                            boxShadow: '0 0 40px rgba(74,222,128,0.1), 0 20px 48px rgba(0,0,0,0.65)',
                        }}
                    >
                        {/* Header — fixed height, never shrinks */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02] shrink-0">
                            <div className="flex items-center gap-2.5">
                                <div className="relative">
                                    <div
                                        className="h-8 w-8 rounded-xl flex items-center justify-center text-black"
                                        style={{ background: 'linear-gradient(135deg,#4ade80,#22d3ee)' }}
                                    >
                                        <ChatIcon />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-mono text-xs font-bold text-white tracking-wide">Madhur Pathak</p>
                                    <p className="font-mono text-[10px] text-neon-green/70 tracking-widest uppercase">● Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="h-7 w-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <Minimize2 size={14} />
                            </button>
                        </div>

                        {/* Messages — flex-1 + min-h-0 is the KEY to vertical scroll working */}
                        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.22 }}
                                    className={`flex items-end gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    {/* Avatar */}
                                    <div className={`shrink-0 h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${m.role === 'user'
                                        ? 'bg-neon-cyan/15 border border-neon-cyan/30 text-neon-cyan'
                                        : 'text-black'
                                        }`}
                                        style={m.role === 'assistant' ? { background: 'linear-gradient(135deg,#4ade80,#22d3ee)' } : {}}
                                    >
                                        {m.role === 'user' ? 'U' : <ChatIcon />}
                                    </div>

                                    {/* Bubble */}
                                    <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${m.role === 'user'
                                        ? 'bg-neon-cyan/10 border border-neon-cyan/20 text-white rounded-br-sm font-mono text-[12px] leading-relaxed'
                                        : 'bg-white/[0.04] border border-white/[0.08] text-white/90 rounded-bl-sm'
                                        }`}>
                                        {m.role === 'user'
                                            ? m.content
                                            : <FormattedMessage content={m.content} />
                                        }
                                    </div>
                                </motion.div>
                            ))}

                            {/* Loading dots */}
                            {loading && (
                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2">
                                    <div className="shrink-0 h-6 w-6 rounded-lg text-black flex items-center justify-center"
                                        style={{ background: 'linear-gradient(135deg,#4ade80,#22d3ee)' }}>
                                        <ChatIcon />
                                    </div>
                                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                                        {[0, 1, 2].map((i) => (
                                            <span key={i} className="h-1.5 w-1.5 rounded-full bg-neon-green/60 animate-bounce"
                                                style={{ animationDelay: `${i * 0.15}s` }} />
                                        ))}
                                        {retrying && (
                                            <span className="font-mono text-[10px] text-neon-orange/70 animate-pulse ml-1">retrying…</span>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Error */}
                            {error && (
                                <div className="font-mono text-[11px] text-red-400/80 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                                    ⚠ {error}
                                </div>
                            )}

                            {/* Suggested questions */}
                            {showSuggestions && messages.length === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                    className="flex flex-wrap gap-2 pt-1"
                                >
                                    {SUGGESTIONS.map((s) => (
                                        <button key={s.label} onClick={() => sendMessage(s.label)}
                                            className="flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1.5 rounded-full border border-neon-green/25 bg-neon-green/[0.06] text-neon-green/80 hover:bg-neon-green/15 hover:text-neon-green hover:border-neon-green/40 transition-all">
                                            <span>{s.icon}</span>{s.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            <div ref={bottomRef} />
                        </div>

                        {/* Input — fixed height, never shrinks */}
                        <div className="px-3 py-3 border-t border-white/10 bg-white/[0.02] shrink-0">
                            <div className="flex items-end gap-2">
                                <textarea
                                    ref={(el) => { inputRef.current = el; textareaRef.current = el; }}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKey}
                                    placeholder="Ask about Madhur…"
                                    rows={1}
                                    disabled={loading}
                                    className="flex-1 resize-none bg-white/[0.06] border border-white/10 rounded-xl px-3.5 py-2.5 font-mono text-[12px] text-white placeholder-white/30 focus:outline-none focus:border-neon-green/40 focus:bg-white/[0.08] transition-all disabled:opacity-50 leading-relaxed max-h-20"
                                    style={{ scrollbarWidth: 'none' }}
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
                                    }}
                                />
                                <button
                                    onClick={() => sendMessage()}
                                    disabled={!input.trim() || loading}
                                    className="h-10 w-10 rounded-xl flex items-center justify-center text-black disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all shrink-0"
                                    style={{ background: 'linear-gradient(135deg,#4ade80,#22d3ee)' }}
                                >
                                    {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} strokeWidth={2.5} />}
                                </button>
                            </div>
                            <p className="font-mono text-[10px] text-white/20 text-center mt-2 tracking-wider">
                                Powered by Gemini • Madhur Pathak's AI Assistant
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}