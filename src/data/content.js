export const profile = {
  name: 'Yufei Huang',
  tagline: 'CS + Math @ NYU · originally from Vancouver, BC',
  location: 'New York, NY (from Vancouver, BC)',
  email: 'yufeixyhuang@hotmail.com',
  linkedin: 'http://linkedin.com/in/yufeihuang-yh',
  github: 'https://github.com/yufeiihuang',
  githubUser: 'yufeiihuang',
  bio: "I'm a Computer Science & Mathematics student at NYU (minoring in Economics), building full-stack features, AI tooling, and the occasional Swift app. Grew up in Vancouver, BC — this whole site is a tiny pixel map of home. Click a landmark to explore.",
  skills: [
    'Python', 'JavaScript', 'C/C++', 'Java', 'Swift', 'AWS', 'SQL',
    'React', 'Node.js', 'Docker', 'Git', 'HTML/CSS', 'NumPy', 'LLM APIs', 'Prompt Eng.',
  ],
}

export const education = {
  school: 'New York University',
  location: 'New York, NY',
  degree: 'B.A. Computer Science & Mathematics, Minor in Economics',
  dates: 'September 2023 – May 2027',
  gpa: '3.88 / 4.0',
}

export const experience = [
  {
    org: 'Outset',
    role: 'Engineering Intern',
    location: 'San Francisco, CA',
    dates: 'May 2026 – August 2026',
    bullets: [
      'Implemented a full-stack question randomization feature for the prod app and resolved bugs across the stack',
      'Authored 5 technical design specs, translating product requirements into scalable system architectures',
      'Developed 3 AI-powered internal tools and automation workflows while provisioning infra with Terraform',
    ],
  },
  {
    org: 'CyQuant',
    role: 'Software Engineering Intern',
    location: 'Paris, France',
    dates: 'February 2026 – April 2026',
    bullets: [
      'Built a data pipeline to extract normalized cybersecurity controls and auto-generate 100+ insurer-specific forms',
      "Implemented frontend and backend updates in the company's production codebase, improving user workflow",
      'Deployed and configured TLS certificates on Linux servers, restoring secure HTTPS communication',
    ],
  },
  {
    org: 'NYU Tandon VIP: AI in Education',
    role: 'Researcher',
    location: 'New York, NY',
    dates: 'September 2025 – Present',
    bullets: [
      'Participate in a for-credit, interdisciplinary research group applying AI to educational technology',
      'Perform prompt engineering across multiple LLMs; contribute to weekly literature reviews and discussions',
      'Authored a product proposal for an AI platform guiding students through CS coursework with structured feedback',
    ],
  },
  {
    org: 'NYU Residential Life & Housing Services',
    role: 'Resident Assistant',
    location: 'New York, NY',
    dates: 'May 2025 – Present',
    bullets: [
      'Foster wellbeing for 750 residents through data-informed programming and proactive conflict resolution',
      'Document incidents and escalate resident concerns through university-wide residential life workflows',
    ],
  },
  {
    org: 'Eagor',
    role: 'Software Engineering Intern',
    location: 'Remote',
    dates: 'April 2025 – October 2025',
    bullets: [
      'Worked with founders to ship 7+ features weekly in Agile sprints, demonstrating product viability to investors',
      'Developed iOS UI/UX (toasts, profile personalization) improving experience for 100+ users',
      'Built a Firebase-based backend tool to auto-generate test data, streamlining 5+ PR reviews per week',
    ],
  },
  {
    org: 'NYU College of Arts & Science',
    role: 'IT Support Specialist Assistant',
    location: 'New York, NY',
    dates: 'October 2024 – May 2025',
    bullets: [
      'Supported MacOS environments — testing, deploying, and troubleshooting applications with Jamf',
      'Led migration of ticketing infrastructure from FreshService to ServiceNow with minimal downtime',
    ],
  },
  {
    org: 'NYU Courant',
    role: 'Grader — Discrete Math & Linear Algebra',
    location: 'New York, NY',
    dates: 'September 2024 – Present',
    bullets: [
      'Provide detailed feedback for 220 students weekly, identifying patterns in student misunderstandings',
    ],
  },
]

export const projects = [
  {
    name: 'Sorora',
    stack: 'React, CSS',
    dates: 'Fall 2025',
    description:
      'A matching app that streamlines the Big-Little pairing process for Greek life and clubs. Guarantees mutual first-choice pairs, then runs deferred-acceptance (the same stable-matching algorithm the NRMP uses for medical residents) so no pair would both rather be matched with each other. Includes Excel export via SheetJS.',
    link: 'https://sorora.vercel.app',
    linkLabel: 'sorora.vercel.app',
  },
  {
    name: 'VioletLaundry',
    stack: 'Swift, iOS',
    dates: 'Spring 2025',
    description:
      'An iOS app tracking laundry machine availability across NYU residence halls — real-time status updates, in-app notifications, and 18 views supporting dorm-level navigation.',
    link: null,
    linkLabel: null,
  },
]
