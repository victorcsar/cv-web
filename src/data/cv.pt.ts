import type { CV } from './types'

export const cvPt: CV = {
  meta: {
    title: 'Víctor César — Desenvolvedor Full Stack / DevOps',
    description:
      'Currículo de Víctor César: desenvolvedor Full Stack / DevOps com TypeScript, NestJS, React, Python, Docker e Nginx.',
  },
  role: 'Desenvolvedor Full Stack / DevOps',
  location: 'Santo Estêvão, Bahia',
  summary:
    'Desenvolvedor Full Stack / DevOps em empresa de telecomunicações, responsável por projetar, desenvolver e manter de ponta a ponta, da arquitetura ao deploy, sistemas que sustentam operações críticas do negócio, como um **aplicativo com 3.000 usuários diários**, pagamentos online, assinatura digital de contratos, gestão de RH e ponto eletrônico e automações operacionais. Experiência sólida em TypeScript (NestJS, Next.js, React) e Python, integração com ERP e APIs de terceiros, e operação de ambientes de produção com Docker, Nginx e PM2. Pós-graduado em Ciência de Dados e Segurança da Informação e certificado AWS Cloud Practitioner, com foco em entregar soluções seguras, estáveis e que eliminam trabalho manual.',
  highlights: [
    { value: '3.000', label: 'usuários ativos por dia no aplicativo' },
    { value: '~100', label: 'colaboradores na plataforma de RH' },
    { value: '15', label: 'aplicações migradas em produção' },
    { value: '100+', label: 'contratos assinados por mês' },
  ],
  experience: [
    {
      role: 'Desenvolvedor Full Stack / DevOps',
      company: 'PowerTelecom',
      location: 'Santo Estêvão, Bahia',
      period: 'Jan 2023 — Atual',
      items: [
        {
          title: 'Assinatura de Contratos',
          description:
            'Aplicação de assinatura eletrônica com reconhecimento facial por selfie, assinatura na tela e geração do contrato em PDF, integrada ao ERP, que **eliminou a coleta de assinaturas em papel** e processa centenas de contratos por mês.',
          stack: ['NestJS', 'Prisma', 'Puppeteer', 'Next.js'],
        },
        {
          title: 'Plataforma de RH (SaaS)',
          description:
            'Sistema multiempresa **usado por cerca de 100 colaboradores**, com controle de acesso por grupos e permissões, contracheques em lote, recrutamento e ponto eletrônico com fechamento, que substituiu o sistema anterior em PHP.',
          stack: ['NestJS', 'Prisma', 'PostgreSQL', 'BullMQ', 'React', 'Docker'],
        },
        {
          title: 'Aplicativo do Cliente',
          description:
            'API REST do aplicativo Android e iOS, **com cerca de 3.000 usuários ativos por dia**, com faturas, contratos, pagamento por cartão via Cielo, cobrança recorrente e Clube de Descontos, além do backend e do painel de notificações push segmentadas e agendadas.',
          stack: ['Express', 'NestJS', 'Prisma', 'PostgreSQL', 'React', 'FlutterFlow'],
        },
        {
          title: 'Servidores e Segurança',
          description:
            "Administração dos servidores Linux de produção, com firewall e fail2ban, HTTPS com Let's Encrypt e renovação automática, e Nginx como proxy reverso; **migração do servidor com 15 aplicações em produção**, planejada em fases, com plano de rollback e endurecimento do ambiente.",
          stack: ['Linux', 'Nginx', 'ufw', 'iptables', 'nftables', 'fail2ban', "Let's Encrypt"],
        },
        {
          title: 'Containers, Backup e Monitoramento',
          description:
            'Deploy de todos os sistemas em **Docker** e Docker Compose, com redes isoladas e serviços compartilhados, e processos Node no PM2; backup mensal dos bancos de dados e das configurações; monitoramento com alertas automáticos no Discord e no Telegram quando algum container apresenta erro.',
          stack: ['Docker', 'Docker Compose', 'PM2', 'Redis', 'MongoDB'],
        },
        {
          title: 'Telefonia Móvel e Comercial',
          description:
            'Backend de ativação e recarga de chips com cache em Redis e site de ativação com eSIM e pagamento; CRM de leads com mapa e plataforma do Clube de Benefícios com três níveis de permissão.',
          stack: ['NestJS', 'Express', 'MongoDB', 'Redis', 'React'],
        },
        {
          title: 'Dados e Automação',
          description:
            'Dashboard de cancelamentos com taxa de reversão e **Health Score** da carteira; checklist veicular digital que gera o PDF e o anexa automaticamente no ERP; rotinas agendadas que finalizam tickets, encerram O.S. de clientes que quitaram as pendências e sincronizam vendas com o Google Sheets.',
          stack: ['ERP IXC', 'Google Sheets API'],
        },
        {
          title: 'Bots, Monitoramento e Rede',
          description:
            'Bots para o Discord da empresa que publicam O.S., alertam clientes desconectados e geram relatório diário de atendimentos; monitor de desconexões com aviso ao cliente por SMS e alertas no Telegram; **backup diário automático das OLTs** com relatório de falhas.',
          stack: ['Python', 'TypeScript', 'Discord', 'Telegram'],
        },
        {
          title: 'Sites e Campanhas',
          description:
            'Site institucional, site de telemedicina e plataforma de sorteios com envio de códigos por SMS, seleção aleatória de participantes e CPF mascarado (LGPD).',
          stack: ['PHP', 'JavaScript', 'PostgreSQL'],
        },
      ],
    },
  ],
  skills: [
    { group: 'Linguagens', items: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'SQL'] },
    {
      group: 'Back-end',
      items: ['Node.js', 'NestJS', 'Express', 'Prisma', 'Laravel', 'APIs RESTful', 'JWT', 'BullMQ'],
    },
    {
      group: 'Front-end',
      items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'jQuery', 'FlutterFlow'],
    },
    { group: 'Bancos de dados', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
    {
      group: 'Infra e DevOps',
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
      group: 'Integrações',
      items: ['ERP IXC', 'Cielo', 'OneSignal', 'Google Sheets API', 'Discord'],
    },
    {
      group: 'Qualidade',
      items: [
        'Testes unitários e de integração',
        'PHPUnit',
        'POO',
        'SOLID',
        'Clean Code',
        'Design Patterns',
        'MVC',
        'Code Review',
        'OWASP',
      ],
    },
    {
      group: 'Ferramentas e métodos',
      items: ['Git', 'SVN', 'Postman', 'Jira', 'Trello', 'Scrum', 'Kanban'],
    },
  ],
  education: [
    {
      title: 'Pós-graduação em Ciência de Dados',
      institution: 'Centro Universitário Leonardo da Vinci (UNIASSELVI)',
      status: 'Concluído em 2026',
      done: true,
    },
    {
      title: 'Pós-graduação em Segurança da Informação',
      institution: 'Centro Universitário Leonardo da Vinci (UNIASSELVI)',
      status: 'Concluído em 2026',
      done: true,
    },
    {
      title: 'Bacharelado em Engenharia de Software',
      institution: 'Centro Universitário Leonardo da Vinci (UNIASSELVI)',
      status: 'Previsão: dez 2026',
      done: false,
    },
    {
      title: 'Técnico em Redes de Computadores',
      institution: 'Instituto Federal Baiano (IF Baiano)',
      status: 'Previsão: nov 2026',
      done: false,
    },
    {
      title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      institution: 'Centro Universitário Leonardo da Vinci (UNIASSELVI)',
      status: 'Concluído em jul 2025',
      done: true,
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      date: 'Emitido em agosto de 2024',
      url: 'https://www.credly.com/badges/38536ff0-0526-4694-bea9-d2747fff63fa/public_url',
    },
  ],
  languages: [{ name: 'Inglês', level: 'B1 — Intermediário', source: 'Certificado EF SET' }],
  ui: {
    sections: {
      summary: 'Resumo',
      highlights: 'Em números',
      experience: 'Experiência',
      skills: 'Habilidades técnicas',
      education: 'Educação',
      certifications: 'Certificações',
      languages: 'Idiomas',
    },
    commands: {
      contact: 'cat contato.txt',
      summary: 'cat resumo.md',
      highlights: 'cat numeros.txt',
      experience: 'cat experiencia.md',
      skills: 'cat habilidades.txt',
      education: 'cat formacao.txt',
      certifications: 'cat certificacoes.txt',
      languages: 'cat idiomas.txt',
    },
    downloadPdf: 'Baixar PDF',
    savePdf: 'Salvar PDF',
    toggleTheme: 'Alternar tema claro/escuro',
    switchLanguage: 'Idioma',
    viewCredential: 'Ver credencial',
    contact: 'Contato',
    updatedAt: 'Atualizado em setembro de 2026',
    footerNote: 'Feito com React, TypeScript e Tailwind CSS.',
  },
}
