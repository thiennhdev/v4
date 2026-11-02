/**
 * All portfolio content lives here.
 * Edit this file to update the site — components only render what's below.
 */

export const profile = {
  name: 'Nguyen Hoang Thien',
  shortName: 'Thien Nguyen',
  role: 'Backend Software Engineer',
  location: 'Ho Chi Minh City, Vietnam',
  timezone: 'UTC+7',
  email: 'thiengk563@gmail.com',
  website: 'https://thiennh.dev',
  resume: '/Nguyen_Hoang_Thien_Software.pdf',
  current: { role: 'Software Engineer', company: 'VinSmart Future' },
  headline: 'I build backend systems that stay correct under load.',
  intro:
    'Backend engineer with 3+ years shipping production services in Go and Java — for high-concurrency, real-time, loyalty, CRM/ERP and SaaS products.',
  about: [
    'Hello! I’m Thien — a software engineer who cares most about the parts of a system nobody sees until they break: state transitions, concurrency, data consistency and the event flows that tie services together.',
    'Over the past few years I’ve built reward systems sustaining 5,000+ simultaneous requests, finance workflows processing $100K+ every month, data pipelines handling 1M+ rows, and real-time chat, voice and video with WebSockets and WebRTC.',
    'I enjoy turning fuzzy product requirements into clear backend designs, tracing production issues down to the root cause, and shipping end-to-end — including the React UI when a feature needs it.',
  ],
};

export type SocialKey = 'github' | 'linkedin' | 'leetcode' | 'facebook';

export const socials: { key: SocialKey; label: string; handle: string; url: string }[] = [
  { key: 'github', label: 'GitHub', handle: 'thiennhdev', url: 'https://github.com/thiennhdev' },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    handle: 'thien-nguyen-web',
    url: 'https://www.linkedin.com/in/thien-nguyen-web/',
  },
  { key: 'leetcode', label: 'LeetCode', handle: 'thiengk563', url: 'https://leetcode.com/thiengk563/' },
  {
    key: 'facebook',
    label: 'Facebook',
    handle: 'Hoangthien004',
    url: 'https://www.facebook.com/Hoangthien004/',
  },
];

export const stats = [
  { value: '3+', label: 'years building production backend services' },
  { value: '5,000+', label: 'simultaneous requests sustained at peak' },
  { value: '$100K+', label: 'monthly transaction value through my workflows' },
  { value: '1M+', label: 'row import/export pipelines optimized' },
];

export const award = {
  title: 'Shining Treasure of the Year 2025',
  issuer: 'Gearment',
  description: 'Recognised for outstanding dedication and contributions throughout 2025.',
};

export type Job = {
  id: string;
  company: string;
  url?: string;
  role: string;
  team: string;
  start: string;
  end: string;
  location: string;
  focus: string;
  metrics: { value: string; label: string }[];
  bullets: string[];
  stack: string[];
  badge?: string;
};

export const jobs: Job[] = [
  {
    id: 'vsf',
    company: 'VinSmart Future',
    url: 'https://vingroup.net/',
    role: 'Software Engineer',
    team: 'Backend · Loyalty & Digital Business',
    start: 'May 2026',
    end: 'Present',
    location: 'Ho Chi Minh City',
    focus:
      'Java and Go backend services for loyalty, member rewards and promotions — business rules and cross-system workflows.',
    metrics: [
      { value: 'Loyalty Biz', label: 'primary ownership' },
      { value: 'Java · Go', label: 'service stack' },
      { value: '2 domains', label: 'loyalty + real estate' },
    ],
    bullets: [
      'Develop and maintain backend services for Loyalty Biz, covering core loyalty, member rewards and promotion workflows.',
      'Implement REST APIs and business rules in Java and Go, translating product requirements into maintainable service components.',
      'Model workflow states, validations and edge cases for reward and promotion operations, focusing on data consistency and predictable behaviour.',
      'Integrate loyalty features with surrounding internal systems and coordinate cross-team delivery of shared business flows.',
      'Work with product and business stakeholders to clarify rules, acceptance criteria and technical trade-offs before implementation.',
      'Contribute to initial backend work for the real-estate business domain while remaining primarily responsible for Loyalty Biz.',
    ],
    stack: ['Java', 'Spring Boot', 'Go', 'REST APIs', 'State modelling'],
  },
  {
    id: 'gearment',
    company: 'Gearment',
    url: 'https://gearment.com/',
    role: 'Software Engineer',
    team: 'CRM/ERP & Back-Office Platform',
    start: 'Dec 2024',
    end: 'May 2026',
    location: 'Ho Chi Minh City',
    focus:
      'Go backend services, order and finance state machines, Kafka integrations, automation and data consistency.',
    metrics: [
      { value: '10K+', label: 'orders / month' },
      { value: '$100K+', label: 'monthly G-Credit volume' },
      { value: '−50%', label: 'incident investigation time' },
      { value: '−45%', label: 'peak memory on 1M-row jobs' },
    ],
    bullets: [
      'Owned the full order lifecycle in Go — creation, hold, modification, cancellation and refund — for back-office teams managing 10,000+ orders a month.',
      'Engineered G-Credit and tiered-pricing workflows processing $100K+ in monthly transaction value, enforcing consistent approval, billing and state transitions.',
      'Translated order and finance requirements from operations and finance teams into APIs, validation rules, state-machine flows and back-office automation.',
      'Implemented structured event logging and order-state traceability, reducing mean incident-investigation time by ~50%.',
      'Built Kafka-backed partner integrations and webhook flows with retry/replay support, improving external communication reliability by ~30%.',
      'Optimised asynchronous import/export pipelines for datasets exceeding 1M rows, cutting peak memory pressure by ~45% and removing timeout failures.',
      'Automated recurring back-office jobs and standardised ERP module patterns, making new workflows easier to extend.',
    ],
    stack: ['Go', 'Kafka', 'Webhooks', 'State machines', 'Structured logging', 'Async pipelines'],
    badge: 'Shining Treasure of the Year 2025',
  },
  {
    id: 'esol',
    company: 'Esol Labs',
    role: 'Software Engineer',
    team: 'Go Backend & React',
    start: 'Jul 2023',
    end: 'Dec 2024',
    location: 'Ho Chi Minh City',
    focus:
      'High-concurrency Go services, real-time messaging, Redis pub/sub, SaaS modules and React interfaces.',
    metrics: [
      { value: '5,000+', label: 'concurrent reward claims' },
      { value: '8+', label: 'SaaS modules shipped' },
      { value: '−35%', label: 'session drop rate' },
      { value: '−60%', label: 'manual reconciliation' },
    ],
    bullets: [
      'Built a high-concurrency reward-claiming backend in Go sustaining 5,000+ simultaneous requests during peak Web3 campaigns and live-stream events — with zero data inconsistency or downtime.',
      'Developed 8+ SaaS management modules across Go services and React interfaces, covering order flows, permissions and transactional operations using Clean Architecture.',
      'Delivered real-time chat, video and user workflows using WebSockets and Redis pub/sub.',
      'Implemented event flows for chat, presence and session synchronisation across backend instances, reducing session drop rate by ~35% and message latency by ~20%.',
      'Integrated Lido and DWF Labs protocols for automated reward distribution, cutting manual reconciliation effort by ~60% through on-chain event handling.',
    ],
    stack: ['Go', 'React', 'WebSockets', 'Redis Pub/Sub', 'Clean Architecture', 'Web3'],
  },
];

export type Project = {
  id: string;
  title: string;
  kind: string;
  year?: string;
  description: string;
  points?: string[];
  stack: string[];
  github?: string;
  external?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'rtc',
    title: 'Real-Time Messaging & Calling Platform',
    kind: 'Chat · Voice · Video',
    year: '2024',
    featured: true,
    description:
      'A communication platform for one-to-one and group chat plus multi-party voice/video calls, with messaging, signaling, presence and media flows cleanly separated.',
    points: [
      'WebSocket APIs for messages, history, typing, presence, delivery/read states and incoming-call notifications.',
      'ion-sfu as the WebRTC media server — rooms, participants, tracks, mute/camera state and call lifecycle.',
      'Signaling for invite/accept/reject, SDP & ICE exchange, reconnection and call-state recovery.',
      'Redis pub/sub keeps messages, presence and call events in sync across backend instances.',
    ],
    stack: ['Go', 'WebRTC', 'ion-sfu', 'WebSockets', 'Redis', 'PostgreSQL', 'React', 'TypeScript'],
  },
  {
    id: 'linkable',
    title: 'Linkable — AI Data Analyst',
    kind: 'Internal AI / BI tool · Hackathon',
    year: '2024',
    featured: true,
    description:
      'A secure internal AI analyst that lets 10+ teams query business data, review sprint progress and track workflows without repeated manual support.',
    points: [
      'MCP integrations with Metabase, ClickUp and internal repositories in one AI-driven workflow.',
      'Isolated execution pods and multi-tenant controls for strict privacy boundaries across teams.',
      'Playwright + Chrome DevTools pipelines for autonomous URL scraping, parsing and analysis.',
      'ClickUp SSO and multi-provider LLM profiles for non-technical adoption.',
    ],
    stack: ['MCP', 'Openclaw', 'Playwright', 'Chrome DevTools', 'Metabase', 'ClickUp'],
  },
  {
    id: 'socket-adapter',
    title: 'Socket.IO Redis Adapter',
    kind: 'Open source',
    description:
      'Horizontally scalable Socket.IO server with a Redis adapter — JWT auth, Redis single & cluster modes, Docker deployment.',
    stack: ['TypeScript', 'Socket.IO', 'Redis', 'Docker'],
    github: 'https://github.com/thiennhdev/socket-adapter',
  },
  {
    id: 'cdc',
    title: 'CDC with Kafka',
    kind: 'Open source',
    description:
      'Change Data Capture pipeline: PostgreSQL logical replication → Debezium → Kafka, streaming row changes in real time.',
    stack: ['PostgreSQL', 'Debezium', 'Kafka', 'Docker'],
    github: 'https://github.com/thiennhdev/simple-cdc',
  },
  {
    id: 'video-streaming',
    title: 'Video Streaming Backend',
    kind: 'Open source',
    description:
      'FastAPI service for video delivery on AWS, with Redis caching and PostgreSQL persistence.',
    stack: ['FastAPI', 'AWS', 'Redis', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/thiennhdev/simple-videos-streaming',
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export type Level = 'core' | 'strong' | 'familiar';

export const levelLabel: Record<Level, string> = {
  core: 'Core — daily driver',
  strong: 'Strong — shipped to production',
  familiar: 'Familiar — comfortable using',
};

export type Skill = {
  name: string;
  level: Level;
  /** ids of jobs / projects where this skill was used */
  usedIn?: string[];
  note?: string;
};

export type SkillGroup = { id: string; title: string; blurb: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    blurb: 'Go and Java for services; TypeScript when the UI needs me.',
    skills: [
      { name: 'Go', level: 'core', usedIn: ['vsf', 'gearment', 'esol', 'rtc'], note: 'My main language — order systems, reward engines, real-time backends.' },
      { name: 'Java', level: 'core', usedIn: ['vsf'], note: 'Loyalty, reward and promotion services at VinSmart Future.' },
      { name: 'TypeScript', level: 'strong', usedIn: ['esol', 'rtc', 'socket-adapter'], note: 'React interfaces and Node real-time servers.' },
      { name: 'Python', level: 'familiar', usedIn: ['video-streaming', 'esol'], note: 'FastAPI services and reward-claim tooling.' },
      { name: 'C', level: 'familiar', note: 'Systems coursework — operating systems, data structures.' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Architecture',
    blurb: 'APIs, concurrency and the state machines behind business flows.',
    skills: [
      { name: 'REST APIs', level: 'core', usedIn: ['vsf', 'gearment', 'esol'] },
      { name: 'Concurrency', level: 'core', usedIn: ['esol', 'gearment'], note: 'Concurrency-safe processing that protects transactional consistency under load.' },
      { name: 'State machines', level: 'core', usedIn: ['gearment', 'vsf'], note: 'Order, finance, reward and promotion lifecycles.' },
      { name: 'Event-driven design', level: 'core', usedIn: ['gearment', 'esol', 'cdc'] },
      { name: 'Clean Architecture', level: 'core', usedIn: ['esol', 'gearment'] },
      { name: 'Spring Boot', level: 'strong', usedIn: ['vsf'] },
      { name: 'gRPC', level: 'strong' },
      { name: 'Async processing', level: 'core', usedIn: ['gearment'], note: 'Background import/export pipelines over 1M+ rows.' },
    ],
  },
  {
    id: 'data',
    title: 'Data & Messaging',
    blurb: 'Durable storage, caching and streams that keep services in sync.',
    skills: [
      { name: 'PostgreSQL', level: 'core', usedIn: ['rtc', 'cdc', 'video-streaming'] },
      { name: 'Redis', level: 'core', usedIn: ['esol', 'rtc', 'socket-adapter', 'video-streaming'], note: 'Caching, pub/sub fan-out and ephemeral presence/call state.' },
      { name: 'Kafka', level: 'core', usedIn: ['gearment', 'cdc'], note: 'Partner integrations with retry/replay and CDC streams.' },
      { name: 'RabbitMQ', level: 'strong' },
      { name: 'MongoDB', level: 'strong' },
      { name: 'Elasticsearch', level: 'familiar' },
      { name: 'Debezium', level: 'familiar', usedIn: ['cdc'] },
    ],
  },
  {
    id: 'realtime',
    title: 'Real-time & Networking',
    blurb: 'Messaging, presence and media — where latency is a feature.',
    skills: [
      { name: 'WebSockets', level: 'core', usedIn: ['esol', 'rtc', 'socket-adapter'] },
      { name: 'Redis Pub/Sub', level: 'core', usedIn: ['esol', 'rtc', 'socket-adapter'], note: 'Cross-instance sync for chat, presence and call events.' },
      { name: 'WebRTC', level: 'strong', usedIn: ['rtc', 'esol'] },
      { name: 'ion-sfu', level: 'strong', usedIn: ['rtc'], note: 'SFU media server for multi-party calls.' },
      { name: 'Signaling · ICE · SDP', level: 'strong', usedIn: ['rtc'] },
      { name: 'Socket.IO', level: 'strong', usedIn: ['socket-adapter'] },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Enough React to ship features end-to-end.',
    skills: [
      { name: 'React', level: 'strong', usedIn: ['esol', 'rtc'], note: 'Real-time UIs, dashboards and in-call controls.' },
      { name: 'Next.js', level: 'familiar' },
      { name: 'Dashboards & internal tools', level: 'strong', usedIn: ['esol'] },
    ],
  },
  {
    id: 'ops',
    title: 'DevOps & Practices',
    blurb: 'Containers, pipelines and the habits that make systems debuggable.',
    skills: [
      { name: 'Docker', level: 'core', usedIn: ['rtc', 'socket-adapter', 'cdc', 'video-streaming'] },
      { name: 'Kubernetes', level: 'strong', note: 'Certified: A Practical Guide to Kubernetes.' },
      { name: 'Structured logging', level: 'core', usedIn: ['gearment'], note: 'Order-state traceability that halved investigation time.' },
      { name: 'Linux', level: 'strong' },
      { name: 'CI/CD', level: 'strong' },
      { name: 'Nginx', level: 'familiar' },
      { name: 'AWS', level: 'familiar', usedIn: ['video-streaming'] },
      { name: 'Agile / Scrum', level: 'strong', usedIn: ['vsf', 'gearment', 'esol'] },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    blurb: 'Agents and tooling that take repetitive work off people’s plates.',
    skills: [
      { name: 'MCP', level: 'strong', usedIn: ['linkable'], note: 'Model Context Protocol integrations with BI and project tools.' },
      { name: 'Playwright', level: 'strong', usedIn: ['linkable'] },
      { name: 'LLM workflows', level: 'strong', usedIn: ['linkable'], note: 'Multi-provider LLM profiles and agentic pipelines.' },
      { name: 'Claude Code', level: 'strong', note: 'Certified: Claude Code in Action.' },
    ],
  },
];

export const education = {
  school: 'FPT University',
  degree: 'B.Sc. Software Engineering',
  period: 'Dec 2020 — Dec 2024',
  coursework: [
    'Data Structures & Algorithms',
    'Operating Systems',
    'Distributed Systems',
    'Computer Networks',
    'Database Systems',
  ],
};

export const certifications: { name: string; issuer?: string }[] = [
  { name: 'A Practical Guide to Kubernetes', issuer: 'Educative' },
  { name: 'MCP Fundamentals for Building AI Agents', issuer: 'Educative' },
  { name: 'The Complete Guide to Spring 6 & Spring Boot 3', issuer: 'Educative' },
  { name: 'Claude Code in Action', issuer: 'Anthropic · Skilljar' },
  { name: 'User Experience Research and Design' },
];

/** Look up a job or project by id — used by the skills explorer. */
export function findContext(id: string): { id: string; title: string; kind: 'job' | 'project'; anchor: string } | undefined {
  const job = jobs.find((j) => j.id === id);
  if (job) return { id, title: job.company, kind: 'job', anchor: '#experience' };
  const project = projects.find((p) => p.id === id);
  if (project) return { id, title: project.title, kind: 'project', anchor: `#project-${project.id}` };
  return undefined;
}
