/**
 * Single source of truth for portfolio content.
 * Keep all text/content here — components consume this file via props.
 */
export const personal = {
  name: 'Madhur Pathak',
  firstName: 'Madhur',
  lastName: 'Pathak',

  role: 'Full-Stack Software Developer',

  tagline: 'React • Next.js • Java • AWS',

  location: 'Bangalore, India',

  email: 'madhurpathak000@gmail.com',

  phone: '+918960629039',

  status: 'Available for Opportunities',

  summary:
    'Full-Stack Developer with 1+ years engineering scalable web platforms, serverless microservices, and AI-driven products with Java, Spring Boot, React, and Next.js. I build healthcare systems end-to-end — from real-time dashboards to secure AWS cloud APIs — obsessing over performance, low latency, and clean architecture.',

  typewriterPhrases: [
    'Full-Stack Developer',
    'Frontend Enthusiast',
    'React & Next.js',
    'Java & Spring Boot',
    'AWS Cloud',
  ],
};

export const socials = {
  github: 'https://github.com/Madhur1707',
  linkedin: 'https://www.linkedin.com/in/madhurpathak/',
  email: 'mailto:madhurpathak000@gmail.com',
  portfolio: '#hero',
};

export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const devConfig = {
  filename: 'developer.config.js',
  language: 'javascript',

  lines: [
    "const developer = {",
    "  name: 'Madhur Pathak',",
    "  role: 'Full-Stack Developer',",
    "  stack: ['React', 'Next.js', 'Java', 'AWS'],",
    "  building: 'Scalable Web Applications',",
    "  experience: ['Healthcare', 'AI Platforms'],",
    "  interests: ['AI', 'Cloud', 'System Design'],",
    "  favouriteThing: 'Turning Ideas Into Products',",
    "  status: 'Available For Opportunities',",
    "};",
    "",
    "export default developer;",
  ],
};

export const experience = [
  {
    company: 'AlgoFlowAI',
    role: 'Full-Stack Developer — CureZ Healthcare Platform',
    period: 'Oct 2025 — Present',
    location: 'Remote',
    accent: 'green',
    summary:
      'Engineering a production healthcare platform end-to-end — Java 21 & Spring Boot serverless microservices on AWS, real-time admin dashboards, and low-latency data pipelines.',
    bullets: [
      'Shipped 30+ serverless REST APIs with Java 21, Spring Boot, AWS Lambda, API Gateway, and DynamoDB to power core healthcare workflows.',
      'Designed an event-driven DynamoDB Streams pipeline that mirrors 10 tables into Amazon RDS — collapsing report latency from 2–3 seconds down to 150ms.',
      'Built a custom JWT Lambda Authorizer with OTP-based login and role-based access control, enforcing stateless authorization across 3 user roles.',
      'Led the CureZ Admin Dashboard in Next.js, React, and Tailwind CSS — delivering 7 operational modules for day-to-day healthcare operations.',
      'Tuned data fetching across 20+ REST APIs with Axios interceptors, JWT auth, server-side pagination, and AbortController-based request cancellation.',
    ],
    tech: ['Java', 'Spring Boot', 'Microservices', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'RDS MySQL', 'React', 'Next.js', 'Tailwind CSS', 'JWT', 'Axios'],
  },
  {
    company: 'AlgoFlowAI',
    role: 'Full-Stack Developer Intern — Bishops Waltham Pharmacy',
    period: 'Jun 2025 — Sep 2025',
    location: 'Remote',
    accent: 'cyan',
    summary:
      'Co-built a live serverless booking platform for a UK pharmacy — secure payments, real-time OTP verification, and an SEO-first frontend deployed on AWS S3 + CloudFront.',
    bullets: [
      'Co-designed and shipped a serverless healthcare booking platform with secure Stripe payments, OTP notifications, and JWT authentication.',
      'Built a smooth 5-step appointment booking flow with real-time OTP verification using Next.js, React, and AWS REST APIs.',
      'Deployed 13 optimized static pages to AWS S3 and CloudFront — layering in JSON-LD, dynamic sitemaps, and canonical tags for strong organic SEO.',
      'Cut duplicate submissions with request deduplication and a localStorage-backed React Context that preserved booking progress across steps.',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Java', 'AWS Lambda', 'DynamoDB', 'Stripe', 'REST APIs'],
  },
];


export const skillGroups = [
  {
    title: 'Languages',
    accent: 'green',
    icon: 'Code2',
    items: ['JavaScript', 'TypeScript', 'Java'],
  },
  {
    title: 'Frontend',
    accent: 'cyan',
    icon: 'Layout',
    items: ['React.js', 'Next.js', 'Redux', 'Tailwind CSS', 'ShadCN UI', 'Material UI', 'Recharts', 'D3.js', 'Leaflet'],
  },
  {
    title: 'Backend',
    accent: 'purple',
    icon: 'Server',
    items: ['Spring Boot', 'Microservices', 'Node.js', 'REST APIs', 'WebSockets', 'JWT', 'Maven'],
  },
  {
    title: 'Database & Cloud',
    accent: 'blue',
    icon: 'Cloud',
    items: ['MySQL', 'DynamoDB', 'MongoDB', 'PostgreSQL', 'AWS Lambda', 'API Gateway', 'S3', 'CloudFront', 'DynamoDB Streams'],
  },
  {
    title: 'Integrations',
    accent: 'orange',
    icon: 'Plug',
    items: ['Stripe', 'Razorpay', 'Firebase FCM', 'WhatsApp API', 'Twilio', 'Supabase', 'OpenAI API'],
  },
  {
    title: 'Tools',
    accent: 'yellow',
    icon: 'Wrench',
    items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Figma', 'CI/CD'],
  },
];



export const projects = [
  {
  title: 'Vivran.ai — AI Meeting Intelligence Platform',
  image: './vivranai.png',
  accent: 'cyan',

  description:
    'A full-stack AI platform that automates meeting capture, transcription, and knowledge retrieval. Combines a Next.js web app, a FastAPI backend, and a custom Chrome Extension to turn live meetings into searchable summaries, action items, and semantic insights.',

  highlights: [
    'Built a full-stack AI platform with Next.js, FastAPI, Supabase, and a custom Chrome Extension to automate meeting capture workflows',
    'Integrated Deepgram for speech-to-text transcription and speaker diarization, with Groq LLMs generating meeting summaries and action items',
    'Engineered a robust map-reduce text processing pipeline with retry mechanisms to reliably handle transcripts exceeding LLM context limits',
    'Implemented hybrid vector and keyword search with chunked indexing for rapid, semantic retrieval across meeting workspaces'
  ],

  tech: [
    'Next.js',
    'FastAPI',
    'Python',
    'Supabase',
    'Deepgram',
    'Groq',
    'Cerebras',
    'Chrome Extension'
  ],

  links: {
    demo: 'https://vivran-ai.vercel.app/',
    github: 'https://github.com/Madhur1707/Vivran-AI'
  }
},
{
  title: 'Localoom — AI-Powered Real-Time Collaboration Editor',
  image: './localoom.png',
  accent: 'purple',

  description:
    'A local-first, real-time collaborative document editor built for seamless multi-user editing with live cursors and offline sync. Backed by CRDTs and a custom WebSocket sync server, it delivers reliable persistence, granular access control, and an embedded AI writing assistant.',

  highlights: [
    'Engineered a local-first editor with Yjs CRDTs and IndexedDB, enabling real-time multi-user editing, live cursors, and offline sync',
    'Developed a Node.js WebSocket sync server with delta-based reconnection and log compaction for reliable PostgreSQL persistence',
    'Enforced a strict three-layer security model with RBAC (Owner/Editor/Viewer) using Auth.js, signed JWTs, and Zod schema validation',
    'Embedded a Groq-powered AI assistant with streaming responses for text generation, contextual summarization, and version history'
  ],

  tech: [
    'Next.js',
    'React',
    'TypeScript',
    'Yjs (CRDT)',
    'Node.js',
    'WebSockets',
    'PostgreSQL',
    'Prisma',
    'Auth.js'
  ],

  links: {
    demo: 'https://localoom-rho.vercel.app/',
    github: 'https://github.com/Madhur1707/Localoom'
  }
},
  {
  title: 'CureZ Healthcare Platform',
  image: './curez.png',
  accent: 'green',

  description:
    'A scalable healthcare marketplace connecting patients, providers, and administrators through a unified platform. Built to handle appointments, payments, provider onboarding, analytics, and healthcare operations with a seamless real-time experience.',

  highlights: [
    'Designed a complete healthcare ecosystem for patients, providers, and administrators',
    'Built a real-time appointment and payment workflow with secure booking management',
    'Developed advanced analytics dashboards for revenue tracking, provider performance, and business insights',
    'Implemented provider onboarding, KYC verification, and role-based access control for secure operations'
  ],

  tech: [
    'Java',
    'Spring Boot',
    'AWS Lambda',
    'Next.js',
    'React',
    'DynamoDB',
    'MySQL',
    'WebSocket',
    'JWT'
  ],

  links: {
    demo: 'https://admin.curezindia.com/'
  }
},
  {
  title: 'Bishops Waltham Pharmacy',
  image: './bishops.png',
  accent: 'cyan',

  description:
    'A production healthcare platform built for a UK pharmacy, enabling patients to book consultations, vaccinations, and healthcare services through a seamless online experience. Designed to handle real appointments, secure payments, and streamlined healthcare workflows.',

  highlights: [
    'Built a complete patient booking journey from service selection to appointment confirmation',
    'Integrated secure phone verification and Stripe payments for healthcare bookings',
    'Developed an admin portal for appointment management, payments, and content updates',
    'Optimized SEO and performance to improve visibility and drive organic patient bookings'
  ],

  tech: [
    'Next.js',
    'React',
    'framer-motion',
    'Tailwind CSS',
    'Java',
    'AWS Lambda',
    'DynamoDB',
    'Stripe'
  ],

  links: {
    demo: 'https://bishopswalthampharmacy.co.uk/',
  }
},
{
  title: 'ASWRA Health Monitoring Platform',
  image: './aswra.png',
  accent: 'purple',

  description:
    'A cloud-native healthcare monitoring platform built on AWS serverless infrastructure. Designed to manage patient health data, connected medical devices, real-time alerts, and role-based healthcare operations while delivering secure, scalable, and highly available services.',

  highlights: [
    'Built a serverless backend architecture with 10+ AWS Lambda services powering authentication, user management, device monitoring, and healthcare workflows',
    'Developed a secure role-based access system supporting administrators, vendors, and end users with JWT authentication and granular permissions',
    'Implemented real-time notification and alert pipelines for health vitals, device events, and operational updates using asynchronous event-driven patterns',
    'Created analytics and aggregation services for healthcare metrics, enabling advanced search, reporting, and operational insights across large datasets'
  ],

  tech: [
    'Java',
    'AWS Lambda',
    'DynamoDB',
    'RDS MySQL',
    'API Gateway',
    'JWT',
    'REST APIs',
    'Maven',
    'Firebase FCM'
  ],

  links: {
    demo: 'http://aswra-prod.s3-website.ap-south-1.amazonaws.com/login/',
  }
},
{
  title: 'MyVault — AI-Powered Finance Platform',
  image: './vault.png',
  accent: 'orange',

  description:
    'A full-stack personal finance platform that combines AI-powered expense tracking, intelligent receipt processing, and real-time financial insights. Designed to help users manage transactions, monitor spending habits, and make smarter financial decisions through an intuitive dashboard experience.',

  highlights: [
    'Built an AI-powered receipt scanner that automatically extracts transaction details from uploaded receipts using Gemini AI',
    'Developed a complete finance management system with transaction tracking, expense categorization, and income monitoring',
    'Created interactive analytics dashboards with spending trends, category breakdowns, and real-time financial insights',
    'Implemented secure authentication, background job processing, and protected APIs for a scalable production-ready experience'
  ],

  tech: [
    'Next.js',
    'React',
    'TypeScript',
    'Supabase',
    'Prisma',
    'Tailwind CSS',
    'Shadcn UI',
    'Gemini AI',
    'Inngest',
    'ArcJet'
  ],

  links: {
    demo: 'https://my-vault-two.vercel.app/',
    github: 'https://github.com/Madhur1707/MyVault'
  }
}
];

export const education = [
  {
    school: 'Maharana Pratap College of Technology, Gwalior',
    degree: 'Master of Computer Applications (MCA)',
    period: 'Aug 2023 — Jul 2025',
    accent: 'green',
  },
  {
    school: 'Bundelkhand University, Jhansi',
    degree: 'Bachelor of Computer Applications (BCA)',
    period: 'Jul 2017 — Jun 2020',
    accent: 'cyan',
  },
];

export const contactCards = [
  {
    label: 'Email',
    value: 'madhurpathak000@gmail.com',
    href: 'mailto:madhurpathak000@gmail.com',
    icon: 'Mail',
    accent: 'green',
  },
  {
    label: 'Phone',
    value: '+91 89606 29039',
    href: 'tel:+918960629039',
    icon: 'Phone',
    accent: 'cyan',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/madhurpathak',
    href: 'https://www.linkedin.com/in/madhurpathak/',
    icon: '/linkedin.png',
    accent: 'purple',
  },
  {
    label: 'GitHub',
    value: 'github.com/madhurpathak',
    href: 'https://github.com/Madhur1707',
    icon: '/github.png',
    accent: 'orange',
  },
];

export const heroStats = [
  {
    label: 'Experience',
    value: '1+ Year',
    accent: 'green',
  },
  {
    label: 'Projects',
    value: '10+',
    accent: 'cyan',
  },
  {
    label: 'Focus',
    value: 'AI & SaaS',
    accent: 'purple',
  },
  {
    label: 'Speciality',
    value: 'Full-Stack',
    accent: 'orange',
  },
];

export const floatingBadges = [
  { label: 'React', color: 'cyan' },
  { label: 'Next.js', color: 'green' },
  { label: 'AWS', color: 'orange' },
  { label: 'Java', color: 'purple' },
  { label: 'TypeScript', color: 'cyan' },
  { label: 'Node.js', color: 'green' },
];


export const aboutCards = [
  {
    label: 'Current Role',
    value: 'Full-Stack Developer',
    accent: 'green',
  },
  {
    label: 'Industry',
    value: 'Healthcare',
    accent: 'cyan',
  },
  {
    label: 'Exploring',
    value: 'AI Engineering',
    accent: 'purple',
  },
  {
    label: 'Location',
    value: 'Bangalore, India',
    accent: 'orange',
  },
];