import type { CV } from './types'

export const cvEn: CV = {
  meta: {
    title: 'Víctor César — Full Stack / DevOps Developer',
    description:
      'Résumé of Víctor César: Full Stack / DevOps developer working with TypeScript, NestJS, React, Python, Docker and Nginx.',
  },
  role: 'Full Stack / DevOps Developer',
  location: 'Santo Estêvão, Bahia, Brazil',
  summary:
    'Full Stack / DevOps developer at a telecommunications company, responsible for designing, building and maintaining end to end, from architecture to deployment, systems that support business-critical operations, such as an **app with 3,000 daily users**, online payments, digital contract signing, HR and time tracking, and operational automation. Solid experience with TypeScript (NestJS, Next.js, React) and Python, ERP and third-party API integrations, and running production environments with Docker, Nginx and PM2. Postgraduate degrees in Data Science and Information Security and AWS Certified Cloud Practitioner, focused on delivering secure, stable solutions that eliminate manual work.',
  highlights: [
    { value: '3,000', label: 'daily active users on the app' },
    { value: '~100', label: 'employees on the HR platform' },
    { value: '15', label: 'production apps migrated' },
    { value: '100+', label: 'contracts signed per month' },
  ],
  experience: [
    {
      role: 'Full Stack / DevOps Developer',
      company: 'PowerTelecom',
      location: 'Santo Estêvão, Bahia, Brazil',
      period: 'Jan 2023 — Present',
      items: [
        {
          title: 'Contract Signing',
          description:
            'Electronic signature app with selfie-based facial recognition, on-screen signing and PDF contract generation, integrated with the ERP, which **eliminated paper-based signature collection** and processes hundreds of contracts per month.',
          stack: ['NestJS', 'Prisma', 'Puppeteer', 'Next.js'],
        },
        {
          title: 'HR Platform (SaaS)',
          description:
            'Multi-tenant system **used by around 100 employees**, with group- and permission-based access control, bulk payslips, recruiting and time tracking with period closing, replacing the previous PHP system.',
          stack: ['NestJS', 'Prisma', 'PostgreSQL', 'BullMQ', 'React', 'Docker'],
        },
        {
          title: 'Customer App',
          description:
            'REST API for the Android and iOS app, **with around 3,000 daily active users**, covering invoices, contracts, card payments via Cielo, recurring billing and a Discount Club, plus the backend and dashboard for segmented, scheduled push notifications.',
          stack: ['Express', 'NestJS', 'Prisma', 'PostgreSQL', 'React', 'FlutterFlow'],
        },
        {
          title: 'Servers and Security',
          description:
            "Administration of the production Linux servers, with firewall and fail2ban, HTTPS via Let's Encrypt with automatic renewal, and Nginx as a reverse proxy; **migration of the server running 15 production apps**, planned in phases, with a rollback plan and environment hardening.",
          stack: ['Linux', 'Nginx', 'ufw', 'iptables', 'nftables', 'fail2ban', "Let's Encrypt"],
        },
        {
          title: 'Containers, Backup and Monitoring',
          description:
            'Deployment of every system with **Docker** and Docker Compose, using isolated networks and shared services, with Node processes on PM2; monthly backups of databases and configuration; monitoring with automatic Discord and Telegram alerts whenever a container fails.',
          stack: ['Docker', 'Docker Compose', 'PM2', 'Redis', 'MongoDB'],
        },
        {
          title: 'Mobile Telephony and Sales',
          description:
            'Backend for SIM activation and top-ups with Redis caching, and an activation website with eSIM and payment; lead CRM with a map view and a Benefits Club platform with three permission levels.',
          stack: ['NestJS', 'Express', 'MongoDB', 'Redis', 'React'],
        },
        {
          title: 'Data and Automation',
          description:
            'Churn dashboard with win-back rate and customer-base **Health Score**; digital vehicle checklist that generates a PDF and attaches it to the ERP automatically; scheduled jobs that close tickets, close work orders for customers who settled their debts and sync sales with Google Sheets.',
          stack: ['ERP IXC', 'Google Sheets API'],
        },
        {
          title: 'Bots, Monitoring and Network',
          description:
            "Bots for the company's Discord that post work orders, flag disconnected customers and generate a daily support report; disconnection monitor that notifies customers by SMS and sends Telegram alerts; **automated daily backup of the OLTs** with failure reports.",
          stack: ['Python', 'TypeScript', 'Discord', 'Telegram'],
        },
        {
          title: 'Websites and Campaigns',
          description:
            'Corporate website, telemedicine website and a prize-draw platform that sends codes by SMS, randomly selects participants and masks personal IDs (LGPD compliance).',
          stack: ['PHP', 'JavaScript', 'PostgreSQL'],
        },
      ],
    },
  ],
  skills: [
    { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'SQL'] },
    {
      group: 'Back-end',
      items: ['Node.js', 'NestJS', 'Express', 'Prisma', 'Laravel', 'RESTful APIs', 'JWT', 'BullMQ'],
    },
    {
      group: 'Front-end',
      items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'jQuery', 'FlutterFlow'],
    },
    { group: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
    {
      group: 'Infra and DevOps',
      items: [
        'Linux',
        'Docker',
        'Docker Compose',
        'Nginx',
        'Apache',
        'PM2',
        'ufw',
        'iptables',
        'nftables',
        'fail2ban',
        "Let's Encrypt (Certbot)",
        'Proxmox',
        'AWS',
        'WSL2',
      ],
    },
    {
      group: 'Integrations',
      items: ['ERP IXC', 'Cielo', 'OneSignal', 'Google Sheets API', 'Discord'],
    },
    {
      group: 'Quality',
      items: [
        'Unit and integration testing',
        'PHPUnit',
        'OOP',
        'SOLID',
        'Clean Code',
        'Design Patterns',
        'MVC',
        'Code Review',
        'OWASP',
      ],
    },
    {
      group: 'Tools and methods',
      items: ['Git', 'SVN', 'Postman', 'Jira', 'Trello', 'Scrum', 'Kanban'],
    },
  ],
  education: [
    {
      title: 'Postgraduate Degree in Data Science',
      institution: 'Leonardo da Vinci University Center (UNIASSELVI)',
      status: 'Completed in 2026',
      done: true,
    },
    {
      title: 'Postgraduate Degree in Information Security',
      institution: 'Leonardo da Vinci University Center (UNIASSELVI)',
      status: 'Completed in 2026',
      done: true,
    },
    {
      title: "Bachelor's Degree in Software Engineering",
      institution: 'Leonardo da Vinci University Center (UNIASSELVI)',
      status: 'Expected: Dec 2026',
      done: false,
    },
    {
      title: 'Technical Degree in Computer Networks',
      institution: 'Federal Institute of Bahia (IF Baiano)',
      status: 'Expected: Nov 2026',
      done: false,
    },
    {
      title: 'Associate Degree in Systems Analysis and Development',
      institution: 'Leonardo da Vinci University Center (UNIASSELVI)',
      status: 'Completed in Jul 2025',
      done: true,
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      date: 'Issued August 2024',
      url: 'https://www.credly.com/badges/38536ff0-0526-4694-bea9-d2747fff63fa/public_url',
    },
  ],
  languages: [
    { name: 'English', level: 'B1 — Intermediate', source: 'EF SET certificate' },
    { name: 'Portuguese', level: 'Native', source: '' },
  ],
  ui: {
    sections: {
      summary: 'Summary',
      highlights: 'In numbers',
      experience: 'Experience',
      skills: 'Technical skills',
      education: 'Education',
      certifications: 'Certifications',
      languages: 'Languages',
    },
    commands: {
      contact: 'cat contact.txt',
      summary: 'cat summary.md',
      highlights: 'cat numbers.txt',
      experience: 'cat experience.md',
      skills: 'cat skills.txt',
      education: 'cat education.txt',
      certifications: 'cat certifications.txt',
      languages: 'cat languages.txt',
    },
    downloadPdf: 'Download PDF',
    savePdf: 'Save as PDF',
    toggleTheme: 'Toggle light/dark theme',
    switchLanguage: 'Language',
    viewCredential: 'View credential',
    contact: 'Contact',
    updatedAt: 'Updated September 2026',
    footerNote: 'Built with React, TypeScript and Tailwind CSS.',
  },
}
