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

1. AlgoFlowAI - Full-Stack Developer (Oct 2025 - Present) | Remote
   Project: CureZ Healthcare Platform
   Stack: Java 21, Spring Boot, Microservices, AWS Lambda, API Gateway, DynamoDB, RDS MySQL, React, Next.js, Tailwind CSS, JWT
   Key achievements:
   - Built 30+ serverless REST APIs (Java 21, Spring Boot, AWS Lambda, API Gateway, DynamoDB) powering core healthcare workflows
   - Event-driven DynamoDB Streams pipeline mirroring 10 tables to Amazon RDS, cut report latency from 2-3s to 150ms
   - Custom JWT Lambda Authorizer with OTP-based login and role-based access control across 3 user roles
   - Led the CureZ Admin Dashboard (Next.js, React, Tailwind CSS) delivering 7 operational modules
   - Optimized data fetching across 20+ REST APIs with Axios interceptors, server-side pagination, AbortController

2. AlgoFlowAI - Full-Stack Developer Intern (Jun 2025 - Sep 2025) | Remote
   Project: Bishops Waltham Pharmacy (Live UK Production Site)
   Stack: Next.js, React, Tailwind CSS, Java, AWS Lambda, DynamoDB, Stripe, REST APIs
   Key achievements:
   - Co-designed a serverless healthcare booking platform with secure Stripe payments, OTP notifications, JWT authentication
   - Built a 5-step appointment booking flow with real-time OTP verification (Next.js, React, AWS REST APIs)
   - Deployed 13 optimized static pages to AWS S3 + CloudFront with JSON-LD, dynamic sitemaps, and canonical tags for SEO
   - Reduced duplicate requests via request deduplication + localStorage-backed React Context preserving booking progress

== PROJECTS ==

1. Vivran.ai - AI Meeting Intelligence Platform
   Stack: Next.js, FastAPI, Python, Supabase, Deepgram, Groq, Cerebras, Chrome Extension
   - Full-stack AI platform automating meeting capture via a web app, FastAPI backend, and custom Chrome Extension
   - Deepgram STT transcription + speaker diarization, with Groq LLMs generating summaries and action items
   - Map-reduce text processing pipeline with retries to handle transcripts exceeding LLM context limits
   - Hybrid vector + keyword search with chunked indexing for fast semantic retrieval across workspaces
   Live + GitHub available

2. Localoom - AI-Powered Real-Time Collaboration Editor
   Stack: Next.js, React, TypeScript, Yjs (CRDT), Node.js WebSockets, PostgreSQL, Prisma, Auth.js
   - Local-first editor with Yjs CRDTs + IndexedDB for real-time multi-user editing, live cursors, and offline sync
   - Node.js WebSocket sync server with delta-based reconnection + log compaction for reliable PostgreSQL persistence
   - Three-layer security with RBAC (Owner/Editor/Viewer) using Auth.js, signed JWTs, and Zod validation
   - Embedded Groq-powered AI assistant with streaming responses for generation, summarization, and version history
   Live + GitHub available

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
