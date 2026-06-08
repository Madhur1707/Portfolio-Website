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

1. AlgoFlowAI - Full-Stack Developer (Oct 2025 - Present) | Bangalore
   Project: CureZ Healthcare Platform
   Stack: Java, React, Next.js, Spring Boot, Microservices, AWS, RDS MySQL, DynamoDB, WebSocket, JWT
   Key achievements:
   - Role-based Spring Boot microservices backend on AWS Lambda, 1000+ concurrent users, 99.9% uptime, sub-200ms response
   - DynamoDB -> RDS MySQL real-time sync pipeline via DynamoDB Streams, cut read costs 35%, improved analytics latency 40%
   - Conflict-free booking + Razorpay payment system with idempotent webhooks, 98%+ booking success rate
   - Real-time admin analytics dashboard (6-domain data model) with sub-300ms load time
   - Search/pagination layer with debouncing + AbortController, reduced server load 42%, sub-150ms across 20,000+ records
   - JWT-based RBAC, dual-token rotation, WhatsApp OTP, reduced auth failures ~35%
   - KYC verification + provider onboarding flow with AWS S3 presigned URL document uploads

2. AlgoFlowAI - Frontend Developer Intern (Jun 2025 - Sep 2025) | Remote
   Project: Enream Energy Monitoring Platform
   Stack: React.js, Next.js, Tailwind CSS, Recharts, D3, Context API, Custom Hooks, AWS S3, CloudFront
   Key achievements:
   - Multi-tenant energy monitoring UI with hierarchical asset management (Plant -> System -> Asset), 9+ modules, 1000+ assets
   - Real-time analytics with Recharts/D3-geo, 8+ parameter filtering, sub-200ms queries
   - AI-powered image analysis + data ingestion pipeline for 50k+ records via XLSX/CSV
   - Custom async hooks (useFetch, useApiRequest) with Axios interceptors for token refresh across 25+ API endpoints

== PROJECTS ==

1. HiredHub - AI-Powered Job Portal
   Stack: React, Tailwind CSS, Supabase (PostgreSQL), Gemini AI API, Clerk Auth, Vercel
   - Full-stack job portal with job listings, search/filtering, PDF/DOC uploads, role-based routes
   - Gemini AI integration for intelligent candidate shortlisting - reduced recruiter screening time ~60%
   - Clerk Auth with RBAC for recruiters and candidates
   Demo + GitHub available

2. Bishops Waltham Pharmacy - UK Client (Live Production Site)
   Stack: Next.js, React, Tailwind CSS, Java, AWS Lambda, DynamoDB, Stripe
   - Production Next.js App Router frontend for a live UK pharmacy client
   - 8+ route-level pages, 30+ reusable components, AuthContext/AppContext/CartContext
   - End-to-end multi-step booking + Stripe payment flow covering 10+ healthcare services
   - Full admin panel for appointment approvals, payment tracking, blog management
   - SEO with SSR, SchemaOrg, Canonical tags - ~40% faster load, 1000+ monthly organic visitors, 100+ monthly real bookings

== TECHNICAL SKILLS ==
Languages: JavaScript, TypeScript, Java
Frontend: React.js, Next.js, Redux, Tailwind CSS, ShadCN UI, Material UI, Recharts, D3.js, Leaflet
Backend: Node.js, Spring Boot, Microservices, REST APIs, WebSockets, JWT, Maven
Database/Cloud: MySQL, DynamoDB, MongoDB, AWS (Lambda, S3, API Gateway, CloudFront, DynamoDB Streams)
Tools: Git, GitHub, Postman, VS Code, Figma, CI/CD

== EDUCATION ==
- MCA - Maharana Pratap College of Technology, Gwalior (Aug 2023 - Jul 2025)
- BCA - Bundelkhand University, Jhansi (Jul 2017 - Jun 2020)

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
- Keep responses concise - 2-4 sentences or a short list unless asked for detail.
- Never make up anything not listed above.`;

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const MAX_CONTEXT_MESSAGES = 8;
const MAX_RETRIES = 3;
const RETRY_DELAYS_MS = [2000, 4000, 8000];
const RETRYABLE_STATUSES = new Set([429, 503]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function sendJson(res, statusCode, payload) {
    res.status(statusCode).json(payload);
}

function normalizeMessages(messages) {
    if (!Array.isArray(messages)) {
        return [];
    }

    return messages
        .filter((message) => {
            const roleIsValid = message?.role === 'user' || message?.role === 'assistant';
            return roleIsValid && typeof message?.content === 'string' && message.content.trim();
        })
        .slice(-MAX_CONTEXT_MESSAGES)
        .map((message) => ({
            role: message.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: message.content.trim() }],
        }));
}

async function readGeminiError(response) {
    const fallback = `Gemini request failed with HTTP ${response.status}`;

    try {
        const data = await response.json();
        return data?.error?.message || fallback;
    } catch {
        return fallback;
    }
}

async function callGemini(messages) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        const error = new Error('GEMINI_API_KEY is not configured.');
        error.statusCode = 500;
        throw error;
    }

    const contents = normalizeMessages(messages);

    if (contents.length === 0) {
        const error = new Error('At least one valid chat message is required.');
        error.statusCode = 400;
        throw error;
    }

    const url = `${GEMINI_API_BASE_URL}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
    let lastRetryableStatus = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
        let response;

        try {
            response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                    contents,
                    generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
                }),
            });
        } catch {
            const error = new Error('Unable to reach Gemini. Please check your connection and try again.');
            error.statusCode = 502;
            throw error;
        }

        if (response.ok) {
            const data = await response.json().catch(() => null);
            const text = data?.candidates?.[0]?.content?.parts
                ?.map((part) => part.text)
                .filter(Boolean)
                .join('')
                .trim();

            if (!text) {
                const error = new Error('Gemini returned an invalid response.');
                error.statusCode = 502;
                throw error;
            }

            return text;
        }

        if (RETRYABLE_STATUSES.has(response.status)) {
            lastRetryableStatus = response.status;

            if (attempt < MAX_RETRIES - 1) {
                await sleep(RETRY_DELAYS_MS[attempt]);
                continue;
            }
        }

        const message = await readGeminiError(response);
        const error = new Error(message);
        error.statusCode = response.status === 429 ? 429 : 502;
        error.geminiStatus = response.status;
        throw error;
    }

    const error = new Error(
        lastRetryableStatus === 429
            ? 'Gemini is rate-limited right now. Please wait a moment and try again.'
            : 'Gemini is unavailable right now. Please try again shortly.',
    );
    error.statusCode = lastRetryableStatus === 429 ? 429 : 503;
    throw error;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        sendJson(res, 405, { error: 'Method not allowed. Use POST.' });
        return;
    }

    try {
        const reply = await callGemini(req.body?.messages);
        sendJson(res, 200, { reply });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        sendJson(res, statusCode, {
            error: error.message || 'Something went wrong while generating a response.',
            retryable: statusCode === 429 || statusCode === 503,
        });
    }
}
