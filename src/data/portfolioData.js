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
    'I am a Full-Stack Developer who enjoys building products from idea to production. My experience includes developing healthcare and energy management platforms using React, Next.js, Java, Spring Boot, and AWS. I enjoy creating clean user experiences, scalable backend systems, and solving real-world problems through software.',

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
    "  experience: ['Healthcare', 'Energy Monitoring'],",
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
    role: 'Full-Stack Software Developer — CureZ Healthcare Platform',
    period: 'Oct 2025 — Present',
    location: 'Bangalore, IN',
    accent: 'green',
    summary:
      'Building a production-grade healthcare platform from the ground up — Spring Boot microservices on AWS, real-time admin dashboards, booking engines, and payment pipelines serving 1000+ concurrent users.',
    bullets: [
      'Designed a role-based Spring Boot microservices architecture deployed on AWS Lambda — each domain service independently scaled behind API Gateway, supporting 1000+ concurrent users across Admin, Provider, and Customer roles with 99.9% uptime.',
      'Built a real-time admin analytics dashboard with Next.js and Recharts — tracking bookings, revenue, providers, and payments across 6 domains with memoized 7/30/90-day trends and sub-300ms load times.',
      'Engineered a conflict-free booking and payment system — real-time slot locking, full Razorpay integration with idempotent webhook processing, dynamic commission calculations, and automated refunds achieving 98%+ booking success.',
      'Set up a DynamoDB-to-RDS MySQL sync pipeline using DynamoDB Streams — offloading heavy analytics queries to RDS, cutting read costs by 35% and improving query latency by 40%.',
      'Built a performant search and pagination layer with request debouncing, AbortController cancellation, and multi-select filtering across 12+ columns — reducing server load by 42% across 20,000+ records.',
      'Architected a reusable component system with custom hooks and Context API across patient, hospital, and appointment modules — cutting prop-drilling and improving code reuse by 50%.',
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Java', 'Spring Boot', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'RDS MySQL', 'Recharts', 'Razorpay', 'JWT', 'Maven'],
  },
  {
    company: 'AlgoFlowAI — Enream Project',
    role: 'Frontend Developer Intern',
    period: 'Jun 2025 — Sep 2025',
    location: 'Remote',
    accent: 'cyan',
    summary:
      'Owned the entire frontend of an enterprise energy monitoring platform — real-time dashboards, AI-powered analysis, and a data ingestion pipeline handling 100K+ records, deployed on AWS.',
    bullets: [
      'Architected a multi-tenant energy monitoring UI in Next.js/React with hierarchical asset management (Plant → System → Asset), role-based dashboards, and real-time data across 9+ modules for 1000+ physical assets.',
      'Built a dynamic analytics dashboard with Recharts and D3-geo — 8+ parameter filtering, dynamic severity classification, and sub-200ms query response across 1000+ assets.',
      'Engineered an AI-powered image analysis module with 30–50% compression, severity detection, and structured field extraction — plus a data ingestion pipeline handling 100K+ records via XLSX/CSV with S3 presigned uploads and batch validation.',
      'Deployed the full application on AWS S3 + CloudFront across multiple regions — achieving sub-2-minute CI/CD cycles and consistent global performance.',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'D3.js', 'Context API', 'Custom Hooks', 'AWS S3', 'CloudFront', 'REST APIs'],
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
},
 {
  title: 'HiredHub — AI Recruitment Platform',
  image: './HiredHub.png',
  accent: 'green',

  description:
    'An AI-powered recruitment platform that streamlines the hiring process for both recruiters and candidates. Recruiters can manage job postings, review applications, and leverage AI-assisted candidate shortlisting, while job seekers can discover opportunities and apply through a modern, responsive experience.',

  highlights: [
    'Built a complete hiring workflow with job posting, application management, candidate tracking, and recruitment analytics',
    'Integrated Gemini AI to automatically evaluate and shortlist candidates based on job requirements and submitted resumes',
    'Implemented secure role-based authentication for recruiters and candidates with protected routes and personalized dashboards',
    'Developed advanced job search, filtering, and application management features with a responsive user experience'
  ],

  tech: [
    'React',
    'JavaScript',
    'Tailwind CSS',
    'Shadcn UI',
    'Supabase',
    'Clerk',
    'Gemini AI',
    'Vercel'
  ],

  links: {
    demo: 'https://hired-hub-two.vercel.app/',
    github: 'https://github.com/Madhur1707/HiredHub'
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