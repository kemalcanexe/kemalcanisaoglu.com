export type Lang = 'en' | 'tr';

export const LINKS = {
  email: 'kisaoglu22@ku.edu.tr',
  linkedin: 'https://www.linkedin.com/in/kemalcanisaoglu',
  portakasa: 'https://www.linkedin.com/company/portakasa',
  cv: '/cv.pdf',
};

export type KeyId =
  | 'insider' | 'portakasa' | 'icron' | 'ai' | 'about'
  | 'education' | 'leadership' | 'skills' | 'cv' | 'linkedin'
  | 'contact';

export interface Stat { n: string; label: string }
export interface Block { title?: string; items: string[] }
export interface Modal {
  title: string;
  meta?: string;
  lead: string;
  stats?: Stat[];
  blocks: Block[];
  tags?: string[];
  links?: { label: string; href: string; external?: boolean; download?: boolean }[];
}

export interface KeyText { label: string; screen: string; desc: string }

interface Dict {
  meta: { title: string; description: string; ogAlt: string };
  nav: { work: string; about: string; experience: string; contact: string; talk: string; sound: string; soundOn: string; soundOff: string; lang: string; langHref: string; langLabel: string; skip: string; menu: string };
  hero: { hi: string; name: string; sub: string };
  screen: { meta: string; title: string; desc: string; typing: string; ready: string; prompt: string; hint: string };
  device: { label: string };
  strip: string[];
  work: {
    heading: string;
    insider: { name: string; role: string; when: string; line: string; stats: Stat[]; points: string[]; cta: string };
    portakasa: { name: string; role: string; when: string; line: string; stats: Stat[]; points: string[]; cta: string };
  };
  timeline: { heading: string; items: { when: string; what: string; where: string; key?: KeyId }[] };
  contact: { heading: string; text: string; copy: string; copied: string; linkedin: string; cv: string };
  dialog: { close: string; open: string };
  footer: string;
  keys: Record<KeyId, KeyText>;
  modals: Partial<Record<KeyId, Modal>>;
  term: { help: string; unknown: string; whoami: string; hire: string };
}

const en: Dict = {
  meta: {
    title: 'Kemal Can İsaoğlu — Product Manager',
    description:
      'Product management intern at Insider One working on data and integration products, and founder of Portakasa, a pre-accounting SaaS. Industrial Engineering and Computer Science at Koç University.',
    ogAlt: 'Kemal Can İsaoğlu’s portfolio console: a graphite case with colourful mechanical keys.',
  },
  nav: {
    work: 'Work', about: 'About', experience: 'Experience', contact: 'Contact', talk: 'Let’s talk',
    sound: 'Key sound', soundOn: 'Key sound on', soundOff: 'Key sound off',
    lang: 'TR', langHref: '/tr/', langLabel: 'Türkçe', skip: 'Skip to content', menu: 'Main',
  },
  hero: {
    hi: 'Hi, I’m',
    name: 'Kemal',
    sub: 'Product manager in the making. I build data and integration products at Insider One, and my own startup, Portakasa.',
  },
  screen: {
    meta: 'KEMAL CAN / PRODUCT INDEX',
    title: 'Kemal’s console',
    desc: 'Integrations, data and a startup of my own.',
    typing: 'TYPING', ready: 'READY',
    prompt: 'type a command', hint: 'type help',
  },
  device: { label: 'Portfolio console. Each key opens a section.' },
  strip: ['Insider One', 'Portakasa', 'ICRON Technologies', 'Koç University', 'Turkish Education Association'],
  work: {
    heading: 'Selected work',
    insider: {
      name: 'Insider One',
      role: 'Product Management Intern',
      when: 'Jul 2026 – now · Remote',
      line: 'I run product work for external integrations on a global B2B customer-experience platform: data warehouses, zero-copy data sharing and ad platforms.',
      stats: [
        { n: '25+', label: 'development-ready Jira tasks' },
        { n: '20+', label: 'help-center updates' },
        { n: '7', label: 'AI workflow automations' },
      ],
      points: [
        'Writing the product vision for a new ad-platform lead-import integration',
        'Running UAT before every release I own',
        'Using Salesforce and Jira data to steer the roadmap',
      ],
      cta: 'Open Insider One',
    },
    portakasa: {
      name: 'Portakasa',
      role: 'Founder',
      when: 'Aug 2026 – now · Istanbul',
      line: 'A pre-accounting SaaS for small businesses. I founded it and built the product end to end with Claude Code.',
      stats: [
        { n: '1st', label: 'customer in development beta' },
        { n: 'e-Invoice', label: 'and e-Archive built in' },
        { n: '0 → 1', label: 'discovery, design, delivery' },
      ],
      points: [
        'Collections, customer accounts and a self-serve customer portal',
        'An assistant that drafts reminders and matches receipts; the user approves',
        'Roadmap shaped directly by beta feedback',
      ],
      cta: 'Open Portakasa',
    },
  },
  timeline: {
    heading: 'Experience',
    items: [
      { when: 'Aug 2026 – now', what: 'Founder', where: 'Portakasa', key: 'portakasa' },
      { when: 'Jul 2026 – now', what: 'Product Management Intern', where: 'Insider One', key: 'insider' },
      { when: 'Jun 2025 – Jul 2026', what: 'Technical Product Management Intern', where: 'ICRON Technologies', key: 'icron' },
      { when: 'May 2025 – May 2026', what: 'President, Student Union', where: 'Turkish Education Association', key: 'leadership' },
      { when: '2022 – 2027', what: 'B.S. Industrial Engineering + Computer Science', where: 'Koç University', key: 'education' },
    ],
  },
  contact: {
    heading: 'Good products start with hello.',
    text: 'Hiring for a product role, or want to talk integrations, data or startups? My inbox is open.',
    copy: 'Copy email', copied: 'Copied',
    linkedin: 'LinkedIn', cv: 'Download CV',
  },
  dialog: { close: 'Close', open: 'Open' },
  footer: 'Kemal Can İsaoğlu · Istanbul',
  keys: {
    insider: { label: 'Insider One', screen: 'Insider One', desc: 'PM intern. Integrations, data and ad platforms.' },
    portakasa: { label: 'Portakasa', screen: 'Portakasa', desc: 'My startup. Pre-accounting SaaS, built end to end.' },
    icron: { label: 'ICRON', screen: 'ICRON', desc: 'Technical PM intern. Built a forecasting service solo.' },
    ai: { label: 'AI workflows', screen: 'AI workflows', desc: '7 automations built with Claude Code.' },
    about: { label: 'About', screen: 'About me', desc: 'Industrial engineer, computer scientist, builder.' },
    education: { label: 'Education', screen: 'Education', desc: 'Koç University. IE + CS double major.' },
    leadership: { label: 'Leadership', screen: 'Leadership', desc: 'Student union president and mentor.' },
    skills: { label: 'Skills', screen: 'Skills', desc: 'Product, data and tooling.' },
    cv: { label: 'CV', screen: 'Download CV', desc: 'One page PDF, always current.' },
    linkedin: { label: 'LinkedIn', screen: 'LinkedIn', desc: 'linkedin.com/in/kemalcanisaoglu' },
    contact: { label: 'Let’s talk', screen: 'Let’s talk', desc: 'Email, LinkedIn and CV in one place.' },
  },
  modals: {
    insider: {
      title: 'Insider One',
      meta: 'Product Management Intern · Jul 2026 – now · Remote',
      lead: 'I manage product work for external platform integrations on a global B2B customer-experience platform, with engineering, design and customer success.',
      stats: [
        { n: '25+', label: 'Jira tasks, scoped and development-ready' },
        { n: '20+', label: 'help-center updates' },
        { n: '7', label: 'AI workflow automations' },
      ],
      blocks: [
        {
          title: 'What I own',
          items: [
            'Integrations for data warehouse import and export, zero-copy data sharing and ad platforms.',
            'Discovery and the product vision document for a new ad-platform lead-import integration.',
            'Triage and prioritisation of customer requests into tasks with clear acceptance criteria.',
            'User acceptance testing before each release.',
          ],
        },
        {
          title: 'How I decide and ship',
          items: [
            'Salesforce and Jira analysis of integration demand, churn and quality.',
            'Sprint reviews, feature announcements and help-center updates with Product Education.',
            'Claude Code automations for ticket triage, release-readiness checks and documentation audits.',
          ],
        },
      ],
      tags: ['Integrations', 'Discovery', 'Product vision', 'Prioritisation', 'UAT', 'Salesforce', 'Jira', 'Go-to-market'],
    },
    portakasa: {
      title: 'Portakasa',
      meta: 'Founder · Aug 2026 – now · Istanbul',
      lead: 'A pre-accounting SaaS for small businesses in Turkey. I founded it and built the product end to end with Claude Code, from discovery to delivery.',
      stats: [
        { n: '1st', label: 'customer in a development beta' },
        { n: 'End to end', label: 'built with Claude Code' },
      ],
      blocks: [
        {
          title: 'The product',
          items: [
            'e-Invoice and e-Archive built in, so there is no separate invoicing tool.',
            'Customer accounts and collection tracking in one place.',
            'A portal where each customer sees their own statement.',
            'An assistant that times payment reminders and matches incoming receipts to sales. The user approves every action.',
            'Expenses, incoming invoices, cheques and notes.',
            'Excel import with automatic column matching.',
          ],
        },
        {
          title: 'My role',
          items: [
            'Product discovery, roadmap, design and delivery.',
            'Running the beta with the first customer and shaping the roadmap from their feedback.',
          ],
        },
      ],
      tags: ['0 → 1', 'B2B SaaS', 'Fintech', 'Claude Code', 'Customer discovery'],
      links: [{ label: 'Portakasa on LinkedIn', href: LINKS.portakasa, external: true }],
    },
    icron: {
      title: 'ICRON Technologies',
      meta: 'Technical Product Management Intern · Jun 2025 – Jul 2026 · Istanbul',
      lead: 'Supply chain planning for enterprise clients including Şişecam, Tüpraş and Akbank.',
      blocks: [
        {
          items: [
            'Wrote technical design documents, API documentation and UAT plans for the Demand Planning and Workforce Management modules.',
            'Supported implementation of demand forecasting, supply-demand matching and S&OP.',
            'Defined acceptance criteria and test scenarios; ran engineering and business follow-ups in Azure DevOps.',
          ],
        },
        {
          title: 'Built solo: ForecastTaskGenerator',
          items: [
            'A service I designed, built and handed over on my own. It is in use in ICRON’s Workforce Management product.',
            'Listens to a RabbitMQ queue, forecasts 7 days of hourly demand per store with LightGBM, then turns the forecast into workforce tasks using SLA, template and schedule rules.',
            'Shipped with a Windows runner, per-run audit trail and a 9-part handover pack: architecture, message contract, runbook and test checklist.',
          ],
        },
      ],
      stats: [
        { n: '~5k', label: 'lines of Python and C#, written solo' },
        { n: '7 × 24', label: 'hourly forecast per store' },
      ],
      tags: ['Demand planning', 'S&OP', 'LightGBM', 'RabbitMQ', 'Python', 'C#', 'API docs', 'Azure DevOps'],
    },
    ai: {
      title: 'AI workflows',
      meta: 'Claude Code · Codex · MCP',
      lead: 'I use AI agents to take repetitive product work off the team’s plate, and to build products myself.',
      stats: [{ n: '7', label: 'workflow automations at Insider One' }],
      blocks: [
        {
          title: 'Automations',
          items: [
            'Ticket triage: incoming requests sorted and summarised before grooming.',
            'Release-readiness checks: a checklist run against each release.',
            'Documentation audits: help-center pages compared with what actually shipped.',
          ],
        },
        {
          title: 'Building',
          items: ['Portakasa was built end to end with Claude Code. So was this site.'],
        },
      ],
      tags: ['Claude Code', 'Codex', 'MCP', 'Automation'],
    },
    about: {
      title: 'About me',
      meta: 'Istanbul · Turkish and English',
      lead: 'Industrial Engineering and Computer Science double major at Koç University, graduating in 2027, with two product management internships in B2B SaaS.',
      blocks: [
        {
          items: [
            'I work best between engineering and the business: discovery, requirements, prioritisation, UAT and cross-functional delivery.',
            'Data and integration products are where I have spent most of my time.',
            'Outside work, I lead student communities and mentor younger students.',
            'Turkish is my native language. English is my daily working language in a global team.',
          ],
        },
      ],
    },
    education: {
      title: 'Education',
      lead: 'Two degrees, one way of thinking: systems from the industrial side, software from the computer science side.',
      blocks: [
        {
          title: 'Koç University · 2022 – 2027 (expected)',
          items: ['B.S. Industrial Engineering and B.S. Computer Science and Engineering, double major.', 'Full merit scholarship.'],
        },
        {
          title: 'TED Konya College · 2018 – 2022',
          items: ['High school diploma, full education scholarship.'],
        },
      ],
    },
    leadership: {
      title: 'Leadership',
      lead: 'Communities I have led and people I have mentored.',
      blocks: [
        { title: 'President, Student Union · Turkish Education Association · 2023 – 2026', items: ['Led union strategy and every committee as president, after serving as vice president and finance board member.'] },
        { title: 'Head of MarketTalks and External Affairs · Marketing Club of Koç University · 2023 – 2025', items: ['Ran the seminar series end to end and coordinated the Kamp’24 and Kamp’25 operations.'] },
        { title: 'Career Ambassador · Koç University · Oct 2026 – now', items: ['One-on-one mentoring on internship search, CVs and career planning.'] },
        { title: 'Resident Assistant · Koç University · Sep 2025 – now', items: ['Floor operations and conflict resolution for undergraduate residents.'] },
        { title: 'Freshman Student Mentor · Koç University · 2024 – 2025', items: ['Guided first-year engineering students through planning and campus life.'] },
      ],
    },
    skills: {
      title: 'Skills',
      lead: 'What I use day to day.',
      blocks: [
        { title: 'Product', items: ['Discovery, requirements, user stories, acceptance criteria, prioritisation, backlog grooming, UAT, stakeholder management, Scrum.'] },
        { title: 'Data', items: ['SQL (PostgreSQL, MySQL, SQL Server), Python (Pandas, NumPy, Matplotlib), Excel, Google Sheets, Salesforce.'] },
        { title: 'Tools', items: ['Jira, Confluence, Azure DevOps, REST APIs, Java, Claude Code, Codex, MCP automation.'] },
        { title: 'Languages', items: ['Turkish (native), English (professional working proficiency).'] },
      ],
    },
    contact: {
      title: 'Let’s talk',
      lead: 'Hiring for a product role, or want to talk integrations, data or startups? Email is the fastest way to reach me.',
      blocks: [],
      links: [
        { label: LINKS.email, href: `mailto:${LINKS.email}` },
        { label: 'LinkedIn', href: LINKS.linkedin, external: true },
        { label: 'Download CV', href: LINKS.cv, download: true },
      ],
    },
  },
  term: {
    help: 'try: insider portakasa icron ai skills cv contact whoami',
    unknown: 'command not found. type help',
    whoami: 'kemal: PM intern @ Insider One, founder @ Portakasa',
    hire: 'permission granted. opening contact…',
  },
};

const tr: Dict = {
  meta: {
    title: 'Kemal Can İsaoğlu — Ürün Yöneticisi',
    description:
      'Insider One’da veri ve entegrasyon ürünleri üzerinde çalışan ürün yönetimi stajyeri; ön muhasebe SaaS’ı Portakasa’nın kurucusu. Koç Üniversitesi Endüstri ve Bilgisayar Mühendisliği.',
    ogAlt: 'Kemal Can İsaoğlu’nun portfolyo konsolu: renkli mekanik tuşları olan grafit bir kasa.',
  },
  nav: {
    work: 'İşler', about: 'Hakkımda', experience: 'Deneyim', contact: 'İletişim', talk: 'Konuşalım',
    sound: 'Tuş sesi', soundOn: 'Tuş sesi açık', soundOff: 'Tuş sesi kapalı',
    lang: 'EN', langHref: '/', langLabel: 'English', skip: 'İçeriğe geç', menu: 'Ana menü',
  },
  hero: {
    hi: 'Merhaba, ben',
    name: 'Kemal',
    sub: 'Ürün yöneticisi adayıyım. Insider One’da veri ve entegrasyon ürünleri geliştiriyor, kendi girişimim Portakasa’yı büyütüyorum.',
  },
  screen: {
    meta: 'KEMAL CAN / ÜRÜN DİZİNİ',
    title: 'Kemal’in konsolu',
    desc: 'Entegrasyonlar, veri ve kendi girişimim.',
    typing: 'YAZIYOR', ready: 'HAZIR',
    prompt: 'bir komut yazın', hint: 'help yazın',
  },
  device: { label: 'Portfolyo konsolu. Her tuş bir bölüm açar.' },
  strip: ['Insider One', 'Portakasa', 'ICRON Technologies', 'Koç Üniversitesi', 'Türk Eğitim Derneği'],
  work: {
    heading: 'Öne çıkan işler',
    insider: {
      name: 'Insider One',
      role: 'Ürün Yönetimi Stajyeri',
      when: 'Tem 2026 – devam · Uzaktan',
      line: 'Global bir B2B müşteri deneyimi platformunda dış entegrasyonların ürün tarafını yürütüyorum: veri ambarları, sıfır kopya veri paylaşımı ve reklam platformları.',
      stats: [
        { n: '25+', label: 'geliştirmeye hazır Jira görevi' },
        { n: '20+', label: 'yardım merkezi güncellemesi' },
        { n: '7', label: 'yapay zekâ iş akışı otomasyonu' },
      ],
      points: [
        'Yeni bir reklam platformu lead aktarım entegrasyonunun ürün vizyonunu yazıyorum',
        'Sorumlu olduğum her sürümden önce UAT yürütüyorum',
        'Yol haritasını Salesforce ve Jira verisiyle yönlendiriyorum',
      ],
      cta: 'Insider One’ı aç',
    },
    portakasa: {
      name: 'Portakasa',
      role: 'Kurucu',
      when: 'Ağu 2026 – devam · İstanbul',
      line: 'Küçük işletmeler için bir ön muhasebe SaaS’ı. Şirketi kurdum, ürünü Claude Code ile uçtan uca geliştirdim.',
      stats: [
        { n: '1.', label: 'müşteriyle geliştirme betası' },
        { n: 'e-Fatura', label: 've e-Arşiv dahil' },
        { n: '0 → 1', label: 'keşif, tasarım, teslim' },
      ],
      points: [
        'Tahsilat, cari hesap ve müşterilerin kendi ekstrelerini gördüğü portal',
        'Hatırlatma zamanlayan ve dekont eşleştiren asistan; son onay kullanıcıda',
        'Yol haritası doğrudan beta geri bildirimiyle şekilleniyor',
      ],
      cta: 'Portakasa’yı aç',
    },
  },
  timeline: {
    heading: 'Deneyim',
    items: [
      { when: 'Ağu 2026 – devam', what: 'Kurucu', where: 'Portakasa', key: 'portakasa' },
      { when: 'Tem 2026 – devam', what: 'Ürün Yönetimi Stajyeri', where: 'Insider One', key: 'insider' },
      { when: 'Haz 2025 – Tem 2026', what: 'Teknik Ürün Yönetimi Stajyeri', where: 'ICRON Technologies', key: 'icron' },
      { when: 'May 2025 – May 2026', what: 'Öğrenci Birliği Başkanı', where: 'Türk Eğitim Derneği', key: 'leadership' },
      { when: '2022 – 2027', what: 'Endüstri + Bilgisayar Mühendisliği (çift anadal)', where: 'Koç Üniversitesi', key: 'education' },
    ],
  },
  contact: {
    heading: 'İyi ürünler bir merhabayla başlar.',
    text: 'Ürün rolü için aday mı arıyorsunuz, yoksa entegrasyonlar, veri ya da girişimler üzerine mi konuşmak istiyorsunuz? Bana e-postayla ulaşabilirsiniz.',
    copy: 'E-postayı kopyala', copied: 'Kopyalandı',
    linkedin: 'LinkedIn', cv: 'CV’yi indir',
  },
  dialog: { close: 'Kapat', open: 'Aç' },
  footer: 'Kemal Can İsaoğlu · İstanbul',
  keys: {
    insider: { label: 'Insider One', screen: 'Insider One', desc: 'PM stajyeri. Entegrasyonlar, veri, reklam platformları.' },
    portakasa: { label: 'Portakasa', screen: 'Portakasa', desc: 'Girişimim. Uçtan uca geliştirilmiş ön muhasebe SaaS’ı.' },
    icron: { label: 'ICRON', screen: 'ICRON', desc: 'Teknik PM stajyeri. Tahmin servisini tek başıma geliştirdim.' },
    ai: { label: 'YZ akışları', screen: 'YZ iş akışları', desc: 'Claude Code ile kurulan 7 otomasyon.' },
    about: { label: 'Hakkımda', screen: 'Hakkımda', desc: 'Endüstri mühendisi, bilgisayar bilimci, üretici.' },
    education: { label: 'Eğitim', screen: 'Eğitim', desc: 'Koç Üniversitesi. Endüstri + Bilgisayar çift anadal.' },
    leadership: { label: 'Liderlik', screen: 'Liderlik', desc: 'Öğrenci birliği başkanı ve mentor.' },
    skills: { label: 'Yetkinlikler', screen: 'Yetkinlikler', desc: 'Ürün, veri ve araçlar.' },
    cv: { label: 'CV', screen: 'CV’yi indir', desc: 'Tek sayfalık güncel PDF.' },
    linkedin: { label: 'LinkedIn', screen: 'LinkedIn', desc: 'linkedin.com/in/kemalcanisaoglu' },
    contact: { label: 'Konuşalım', screen: 'Konuşalım', desc: 'E-posta, LinkedIn ve CV tek yerde.' },
  },
  modals: {
    insider: {
      title: 'Insider One',
      meta: 'Ürün Yönetimi Stajyeri · Tem 2026 – devam · Uzaktan',
      lead: 'Global bir B2B müşteri deneyimi platformunda dış platform entegrasyonlarının ürün işlerini mühendislik, tasarım ve müşteri başarısı ekipleriyle birlikte yürütüyorum.',
      stats: [
        { n: '25+', label: 'kapsamı net, geliştirmeye hazır Jira görevi' },
        { n: '20+', label: 'yardım merkezi güncellemesi' },
        { n: '7', label: 'yapay zekâ iş akışı otomasyonu' },
      ],
      blocks: [
        {
          title: 'Sorumlu olduklarım',
          items: [
            'Veri ambarı içe ve dışa aktarım, sıfır kopya veri paylaşımı ve reklam platformu entegrasyonları.',
            'Yeni bir reklam platformu lead aktarım entegrasyonu için keşif ve ürün vizyonu dokümanı.',
            'Müşteri taleplerini önceliklendirip kabul kriterleri net görevlere dönüştürmek.',
            'Her sürümden önce kullanıcı kabul testi (UAT).',
          ],
        },
        {
          title: 'Nasıl karar verip yayına alıyorum',
          items: [
            'Entegrasyon talebi, kayıp ve kalite üzerine Salesforce ve Jira analizi.',
            'Ürün Eğitimi ekibiyle sprint değerlendirmeleri, özellik duyuruları ve yardım merkezi güncellemeleri.',
            'Talep triyajı, sürüm hazırlık kontrolü ve doküman denetimi için Claude Code otomasyonları.',
          ],
        },
      ],
      tags: ['Entegrasyonlar', 'Keşif', 'Ürün vizyonu', 'Önceliklendirme', 'UAT', 'Salesforce', 'Jira', 'Pazara çıkış'],
    },
    portakasa: {
      title: 'Portakasa',
      meta: 'Kurucu · Ağu 2026 – devam · İstanbul',
      lead: 'Türkiye’deki küçük işletmeler için bir ön muhasebe SaaS’ı. Şirketi kurdum, ürünü keşiften teslime kadar Claude Code ile uçtan uca geliştirdim.',
      stats: [
        { n: '1.', label: 'müşteriyle geliştirme betası' },
        { n: 'Uçtan uca', label: 'Claude Code ile geliştirildi' },
      ],
      blocks: [
        {
          title: 'Ürün',
          items: [
            'e-Fatura ve e-Arşiv dahil; ayrı bir fatura programına gerek kalmaz.',
            'Cari hesaplar ve tahsilat takibi tek yerde.',
            'Her müşterinin kendi ekstresini gördüğü bir portal.',
            'Ödeme hatırlatmalarını zamanlayan, gelen dekontları satışlarla eşleştiren bir asistan. Her işlemi kullanıcı onaylar.',
            'Giderler, gelen faturalar, çek ve senetler.',
            'Sütunları otomatik eşleştiren Excel aktarımı.',
          ],
        },
        {
          title: 'Rolüm',
          items: [
            'Ürün keşfi, yol haritası, tasarım ve teslim.',
            'İlk müşteriyle betayı yürütmek ve yol haritasını geri bildirimlerine göre şekillendirmek.',
          ],
        },
      ],
      tags: ['0 → 1', 'B2B SaaS', 'Fintech', 'Claude Code', 'Müşteri keşfi'],
      links: [{ label: 'LinkedIn’de Portakasa', href: LINKS.portakasa, external: true }],
    },
    icron: {
      title: 'ICRON Technologies',
      meta: 'Teknik Ürün Yönetimi Stajyeri · Haz 2025 – Tem 2026 · İstanbul',
      lead: 'Şişecam, Tüpraş ve Akbank gibi kurumsal müşteriler için tedarik zinciri planlama.',
      blocks: [
        {
          items: [
            'Talep Planlama ve İşgücü Yönetimi modülleri için teknik tasarım dokümanları, API dokümantasyonu ve UAT planları yazdım.',
            'Talep tahmini, arz-talep eşleştirme ve S&OP uygulamalarına destek verdim.',
            'Kabul kriterleri ve test senaryoları tanımladım; mühendislik ve iş birimi takiplerini Azure DevOps’ta yürüttüm.',
          ],
        },
        {
          title: 'Tek başıma geliştirdim: ForecastTaskGenerator',
          items: [
            'Tek başıma tasarlayıp geliştirdiğim ve devrettiğim bir servis. ICRON’un İşgücü Yönetimi ürününde kullanılıyor.',
            'RabbitMQ kuyruğunu dinliyor, LightGBM ile her mağaza için 7 günlük saatlik talep tahmini üretiyor ve bu tahmini SLA, şablon ve çalışma saati kurallarıyla işgücü görevlerine dönüştürüyor.',
            'Windows çalıştırıcısı, her çalıştırma için denetim izi ve 9 parçalı devir paketiyle devredildi: mimari, mesaj sözleşmesi, operasyon rehberi ve test kontrol listesi.',
          ],
        },
      ],
      stats: [
        { n: '~5 bin', label: 'satır Python ve C#, tek başıma' },
        { n: '7 × 24', label: 'mağaza başına saatlik tahmin' },
      ],
      tags: ['Talep planlama', 'S&OP', 'LightGBM', 'RabbitMQ', 'Python', 'C#', 'API dokümantasyonu', 'Azure DevOps'],
    },
    ai: {
      title: 'YZ iş akışları',
      meta: 'Claude Code · Codex · MCP',
      lead: 'Yapay zekâ ajanlarını hem ekibin tekrar eden ürün işlerini azaltmak hem de kendi ürünlerimi geliştirmek için kullanıyorum.',
      stats: [{ n: '7', label: 'Insider One’da iş akışı otomasyonu' }],
      blocks: [
        {
          title: 'Otomasyonlar',
          items: [
            'Talep triyajı: gelen talepler grooming öncesi ayrıştırılıp özetlenir.',
            'Sürüm hazırlık kontrolü: her sürüm bir kontrol listesinden geçer.',
            'Doküman denetimi: yardım merkezi sayfaları yayına alınan özelliklerle karşılaştırılır.',
          ],
        },
        {
          title: 'Geliştirme',
          items: ['Portakasa, Claude Code ile uçtan uca geliştirildi. Bu site de öyle.'],
        },
      ],
      tags: ['Claude Code', 'Codex', 'MCP', 'Otomasyon'],
    },
    about: {
      title: 'Hakkımda',
      meta: 'İstanbul · Türkçe ve İngilizce',
      lead: 'Koç Üniversitesi’nde Endüstri ve Bilgisayar Mühendisliği çift anadal öğrencisiyim; 2027’de mezun oluyorum. B2B SaaS’ta iki ürün yönetimi stajım var.',
      blocks: [
        {
          items: [
            'En iyi mühendislik ile iş tarafının kesiştiği yerde çalışıyorum: keşif, gereksinimler, önceliklendirme, UAT ve ekipler arası teslim.',
            'Zamanımın çoğunu veri ve entegrasyon ürünlerinde geçirdim.',
            'İş dışında öğrenci topluluklarına liderlik ediyor, öğrencilere mentorluk yapıyorum.',
            'Ana dilim Türkçe. İngilizce, global bir ekipte her gün kullandığım çalışma dilim.',
          ],
        },
      ],
    },
    education: {
      title: 'Eğitim',
      lead: 'İki bölüm, tek bakış açısı: sistemleri endüstri mühendisliğinden, yazılımı bilgisayar mühendisliğinden öğreniyorum.',
      blocks: [
        {
          title: 'Koç Üniversitesi · 2022 – 2027 (beklenen)',
          items: ['Endüstri Mühendisliği ve Bilgisayar Mühendisliği, çift anadal.', 'Tam başarı bursu.'],
        },
        {
          title: 'TED Konya Koleji · 2018 – 2022',
          items: ['Lise diploması, tam eğitim bursu.'],
        },
      ],
    },
    leadership: {
      title: 'Liderlik',
      lead: 'Liderlik ettiğim topluluklar ve mentorluk yaptığım öğrenciler.',
      blocks: [
        { title: 'Öğrenci Birliği Başkanı · Türk Eğitim Derneği · 2023 – 2026', items: ['Başkan yardımcılığı ve finans kurulu üyeliğinin ardından başkan olarak birliğin stratejisini ve tüm komitelerini yönettim.'] },
        { title: 'MarketTalks ve Dış İlişkiler Sorumlusu · Koç Üniversitesi Pazarlama Kulübü · 2023 – 2025', items: ['Seminer serisini baştan sona yürüttüm; Kamp’24 ve Kamp’25 operasyonlarını koordine ettim.'] },
        { title: 'Kariyer Elçisi · Koç Üniversitesi · Eki 2026 – devam', items: ['Staj arayışı, CV ve kariyer planlaması üzerine birebir mentorluk.'] },
        { title: 'Yurt Asistanı · Koç Üniversitesi · Eyl 2025 – devam', items: ['Lisans öğrencileri için kat operasyonları ve anlaşmazlık çözümü.'] },
        { title: 'Birinci Sınıf Mentoru · Koç Üniversitesi · 2024 – 2025', items: ['Birinci sınıf mühendislik öğrencilerine ders planlaması ve kampüse uyum konusunda rehberlik ettim.'] },
      ],
    },
    skills: {
      title: 'Yetkinlikler',
      lead: 'Her gün kullandıklarım.',
      blocks: [
        { title: 'Ürün', items: ['Keşif, gereksinimler, kullanıcı hikâyeleri, kabul kriterleri, önceliklendirme, backlog grooming, UAT, paydaş yönetimi, Scrum.'] },
        { title: 'Veri', items: ['SQL (PostgreSQL, MySQL, SQL Server), Python (Pandas, NumPy, Matplotlib), Excel, Google Sheets, Salesforce.'] },
        { title: 'Araçlar', items: ['Jira, Confluence, Azure DevOps, REST API’ler, Java, Claude Code, Codex, MCP otomasyonu.'] },
        { title: 'Diller', items: ['Türkçe (ana dil), İngilizce (profesyonel çalışma yetkinliği).'] },
      ],
    },
    contact: {
      title: 'Konuşalım',
      lead: 'Ürün rolü için aday mı arıyorsunuz, yoksa entegrasyonlar, veri ya da girişimler üzerine mi konuşmak istiyorsunuz? Bana en hızlı e-postayla ulaşabilirsiniz.',
      blocks: [],
      links: [
        { label: LINKS.email, href: `mailto:${LINKS.email}` },
        { label: 'LinkedIn', href: LINKS.linkedin, external: true },
        { label: 'CV’yi indir', href: LINKS.cv, download: true },
      ],
    },
  },
  term: {
    help: 'deneyin: insider portakasa icron ai skills cv contact whoami',
    unknown: 'komut bulunamadı. help yazın',
    whoami: 'kemal: Insider One’da PM stajyeri, Portakasa’nın kurucusu',
    hire: 'izin verildi. iletişim açılıyor…',
  },
};

export const dict: Record<Lang, Dict> = { en, tr };
export type { Dict };
