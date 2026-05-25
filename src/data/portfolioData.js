/**
 * Single source of truth for portfolio content.
 * Keep all text/content here — components consume this file via props.
 */
 
export const personal = {
  name: 'Madhur Pathak',
  firstName: 'Madhur',
  lastName: 'Pathak',
  role: 'Full-Stack Software Developer',
  tagline: 'React / Next.js / Java / AWS',
  location: 'Bangalore, IN',
  email: 'madhurpathak000@gmail.com',
  phone: '+91 89606 29039',
  status: 'Available for new opportunities',
  summary:
    'Full-Stack Developer with hands-on production experience in React.js, Next.js, Java, and AWS — including serverless architecture with Lambda, API Gateway, and DynamoDB (GSI). I build and scale real-world healthcare and energy monitoring platforms, delivering end-to-end features from responsive UI and real-time dashboards to cloud infrastructure — with measurable impact.',
  typewriterPhrases: [
    'Full-Stack Developer',
    'React & Next.js Engineer',
    'Java + AWS Serverless',
    'Real-Time Dashboards',
    'Healthcare & Energy Platforms',
  ],
};
 
export const socials = {
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
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
 
export const aboutCards = [
  {
    label: 'role',
    value: 'Full-Stack Developer',
    accent: 'green',
  },
  {
    label: 'stack',
    value: 'React · Next.js · Java · AWS',
    accent: 'cyan',
  },
  {
    label: 'focus',
    value: 'Healthcare & Energy Platforms',
    accent: 'purple',
  },
  {
    label: 'location',
    value: 'Bangalore, IN',
    accent: 'orange',
  },
];
 
export const devConfig = {
  filename: 'developer.config.js',
  language: 'javascript',
  lines: [
    "const developer = {",
    "  name: 'Madhur Pathak',",
    "  role: 'Full-Stack Software Developer',",
    "  stack: ['React', 'Next.js', 'Java', 'AWS'],",
    "  focus: ['Serverless', 'Real-time UI', 'RBAC'],",
    "  currentlyShipping: 'MedicsAI @ AlgoFlowAI',",
    "  openTo: ['Senior Frontend', 'Full-Stack', 'Remote'],",
    "};",
    "",
    "export default developer;",
  ],
};
 
export const experience = [
  {
    company: 'AlgoFlowAI',
    role: 'Full Stack Software Developer (MedicsAI)',
    period: 'Oct 2025 — Present',
    location: 'Bangalore, IN',
    accent: 'green',
    summary:
      'Building a production-grade healthcare platform end-to-end — modern React/Next.js UI, serverless Java backend on AWS, and real-time analytics.',
    bullets: [
      'Developed and scaled a production-grade healthcare platform using React.js, Next.js (App Router) and Tailwind CSS — improving critical UI workflows by 40% through optimized component architecture and state management.',
      'Designed a reusable frontend architecture with custom hooks + Context API, reducing prop drilling and increasing code reuse by 50% across patient, hospital, and appointment modules.',
      'Built real-time analytics dashboards and complete CRUD flows using Recharts and modern UI patterns — enabling faster clinical and operational insights.',
      'Led development of a serverless backend in Java — architecting 15+ AWS Lambda functions and scalable REST APIs using API Gateway + DynamoDB (GSI), reducing data retrieval latency by up to 50%.',
      'Implemented secure authentication and role-based access control (RBAC) using JWT + Twilio OTP with structured error handling and fallback mechanisms, reducing auth-related failures by 35%.',
      'Deployed and optimized cloud infrastructure on AWS — achieving <1s API response time under concurrent load while ensuring medical data compliance.',
    ],
    tech: ['React', 'Next.js', 'Tailwind', 'Java', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'JWT', 'Twilio'],
  },
  {
    company: 'AlgoFlowAI — Enream Project',
    role: 'Frontend Developer Intern',
    period: 'Jun 2025 — Sep 2025',
    location: 'Remote',
    accent: 'cyan',
    summary:
      'Owned core energy-monitoring features end-to-end — building real-time dashboards for plants, inverters and sensor data.',
    bullets: [
      'Took end-to-end ownership of core energy monitoring features — delivering complete solutions from Next.js/React UI to real-time API integration for plants, inverters, and sensor data.',
      'Engineered performant, asynchronous data flows for real-time dashboards by optimizing API calls, state management, and client-side caching — improving system responsiveness and operational visibility by 30%.',
      'Architected a scalable, modular frontend using modern React patterns, custom hooks, Context API, and utility-first styling with Tailwind CSS — enabling rapid feature delivery across 30+ components.',
    ],
    tech: ['Next.js', 'React', 'Tailwind', 'Context API', 'REST APIs'],
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
    items: ['React.js', 'Next.js', 'Redux', 'Tailwind CSS', 'Material UI', 'Radix UI', 'ShadCN'],
  },
  {
    title: 'Backend & Cloud',
    accent: 'purple',
    icon: 'Server',
    items: ['Java', 'Node.js', 'Spring Boot', 'REST APIs', 'AWS', 'JWT Auth'],
  },
  {
    title: 'Tools',
    accent: 'orange',
    icon: 'Wrench',
    items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Figma'],
  },
];
 
export const projects = [
  {
    title: 'HiredHub — AI-Powered Job Portal',
    accent: 'green',
    description:
      'A comprehensive AI-powered job portal with intelligent candidate shortlisting. Integrates Gemini AI to analyze resumes against job descriptions, reducing screening time by 60%.',
    highlights: [
      'AI-driven resume vs. JD matching using Gemini API',
      'Job listings with advanced search, filtering, and pagination',
      'File uploads (PDF/DOC), rich-text job descriptions',
      'Role-based access with protected routes',
    ],
    tech: ['React', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Gemini AI'],
    links: {
      demo: 'https://example.com',
      github: 'https://github.com/',
    },
  },
  {
    title: 'MedicsAI — Healthcare Platform',
    accent: 'cyan',
    description:
      'Production healthcare platform with patient, hospital, and appointment modules. Real-time analytics, serverless Java backend on AWS, and secure RBAC auth.',
    highlights: [
      'Next.js App Router + reusable hook-based architecture',
      '15+ AWS Lambda functions with API Gateway + DynamoDB (GSI)',
      'JWT + Twilio OTP authentication with RBAC',
      'Real-time dashboards built with Recharts',
    ],
    tech: ['Next.js', 'React', 'Java', 'AWS Lambda', 'DynamoDB', 'Recharts'],
    links: {
      demo: 'https://example.com',
      github: 'https://github.com/',
    },
  },
  {
    title: 'Enream — Energy Monitoring',
    accent: 'purple',
    description:
      'Real-time energy monitoring dashboards for plants, inverters, and sensor networks. Built with a modular React architecture and optimized async data flows.',
    highlights: [
      'Real-time plant + inverter + sensor data visualization',
      'Async data flows with client-side caching',
      '30+ modular components powered by custom hooks',
      '+30% improvement in system responsiveness',
    ],
    tech: ['Next.js', 'React', 'Tailwind', 'REST APIs', 'Context API'],
    links: {
      demo: 'https://example.com',
      github: 'https://github.com/',
    },
  },
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
    href: 'https://www.linkedin.com/',
    icon: 'Linkedin',
    accent: 'purple',
  },
  {
    label: 'GitHub',
    value: 'github.com/madhurpathak',
    href: 'https://github.com/',
    icon: 'Github',
    accent: 'orange',
  },
];
 
export const heroStats = [
  { label: 'Years', value: '1+', accent: 'green' },
  { label: 'Lambdas Shipped', value: '15+', accent: 'cyan' },
  { label: 'Components', value: '30+', accent: 'purple' },
  { label: 'Latency Cut', value: '50%', accent: 'orange' },
];
 
export const floatingBadges = [
  { label: 'React', color: 'cyan' },
  { label: 'Next.js', color: 'green' },
  { label: 'AWS', color: 'orange' },
  { label: 'Java', color: 'purple' },
  { label: 'TypeScript', color: 'cyan' },
  { label: 'Tailwind', color: 'green' },
];
 