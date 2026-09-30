export interface SkillItem {
  name: string;
  level: number;
  description: string;
  isPrimary?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: 'Code' | 'Layout' | 'Server' | 'Database' | 'Wrench' | 'Users';
  tagline: string;
  skills: SkillItem[];
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack MERN' | 'Backend & APIs';
  badge: 'FINAL YEAR PROJECT' | 'PERSONAL PROJECT';
  tags: string[];
  description: string;
  highlights: string[];
  techStack: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    tools?: string[];
  };
  metrics: {
    label: string;
    value: string;
  }[];
  githubUrl: string;
  liveUrl?: string;
  architectureDetails: {
    overview: string;
    keyModules: { title: string; desc: string }[];
    endpoints: { method: 'GET' | 'POST' | 'PUT' | 'DELETE'; path: string; desc: string }[];
    schemaHighlights: string[];
  };
}

export const PROFILE = {
  name: 'Jawad Ur Rehman',
  shortName: 'Jawad',
  title: 'MERN Stack Developer',
  subtitles: [
    'MERN Stack Developer',
    'Full-Stack Web Architect',
    'MongoDB · Express · React · Node',
    'RESTful API & Responsive UI Specialist'
  ],
  phone: '0332-5896253',
  phoneClean: '+923325896253',
  email: 'nerogeo720@gmail.com',
  location: 'Pakistan',
  github: 'https://github.com/jawadnero',
  githubDisplay: 'github.com/jawadnero',
  linkedin: 'https://linkedin.com/in/jawad-ur-rehman-0623343a3',
  linkedinDisplay: 'linkedin.com/in/jawad-ur-rehman-0623343a3',
  summary:
    'Fresher MERN Stack Developer with strong hands-on practice building full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Skilled in developing RESTful APIs, responsive user interfaces, and end-to-end project workflows through extensive self-driven and academic projects. Quick learner with solid problem-solving skills, strong communication, and a collaborative, team-oriented mindset, ready to contribute effectively to a professional development team.',
  aboutDetailed:
    'I specialize in engineering end-to-end web applications that balance robust backend architectures with fluid, responsive user interfaces. Driven by a deep curiosity for scalable systems and modern JavaScript ecosystems, I focus on crafting clean RESTful APIs, modular React components, and optimized database models. With a foundational Computer Science degree from KUST and hands-on capstone leadership on ShopNest and Banking Transaction systems, I am prepared to deliver real engineering value from day one.',
  education: {
    degree: "Bachelor's Degree",
    timeframe: '2021 – 2025',
    institution: 'Kohat University of Science and Technology (KUST)',
    status: 'Fresh Graduate / Ready for Full-Stack Developer Roles',
    location: 'Kohat, Pakistan',
    highlights: [
      'Comprehensive focus on full-stack web architectures, REST APIs, and database engineering',
      'Hands-on expertise in MERN stack (MongoDB, Express.js, React.js, Node.js) and modern web patterns',
      'Rigorous academic coursework in Data Structures, Algorithms, Software Engineering, and Database Systems',
      'Developed ShopNest — a full-featured MERN e-commerce platform as the Final Year Project capstone'
    ]
  },
  stats: [
    { value: '2', label: 'Featured Projects' },
    { value: 'MERN', label: 'Primary Specialization' },
    { value: '100%', label: 'Stack Ownership' },
    { value: '2021-25', label: 'KUST Bachelor’s' }
  ]
};

export const PROJECTS: ProjectData[] = [
  {
    id: 'shopnest',
    title: 'ShopNest',
    tagline: 'Full-Stack MERN E-Commerce Web Application (Final Year Project)',
    category: 'Full-Stack MERN',
    badge: 'FINAL YEAR PROJECT',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'RESTful APIs', 'Git'],
    description:
      'A complete, production-ready full-stack e-commerce web platform engineered with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features seamless product discovery, responsive category filtering, a real-time shopping cart, secure user authentication, and order lifecycle management.',
    highlights: [
      'Built a full-stack e-commerce platform using the MERN stack (MongoDB, Express.js, React.js, Node.js) covering product listing, cart, and order management.',
      'Designed and implemented RESTful APIs for core features including user authentication, product management, and order processing.',
      'Developed a responsive, mobile-friendly user interface with React.js and Tailwind CSS for a smooth shopping experience across all mobile devices.',
      'Structured backend logic with Express.js and Node.js and modeled application data using MongoDB for scalable data handling.',
      'Managed source code and version history using Git and GitHub throughout the development lifecycle.'
    ],
    techStack: {
      frontend: ['React.js', 'Tailwind CSS', 'Mobile-Responsive UI', 'State Management'],
      backend: ['Node.js', 'Express.js', 'RESTful APIs', 'Authentication Middleware'],
      database: ['MongoDB', 'Mongoose ODM', 'Product & Order Data Models'],
      tools: ['Git & GitHub', 'Postman API Testing', 'Vite Bundler']
    },
    metrics: [
      { label: 'Scope', value: 'Complete E-Commerce Flow' },
      { label: 'Architecture', value: 'Decoupled MERN Stack' },
      { label: 'Design', value: '100% Mobile Responsive' },
      { label: 'Status', value: 'Final Year Capstone' }
    ],
    githubUrl: 'https://github.com/jawadnero',
    architectureDetails: {
      overview:
        'ShopNest is structured around a decoupled MERN architecture with an Express.js REST API serving a high-performance React frontend. The database utilizes MongoDB for schema flexibility and relational document referencing between users, products, carts, and order receipts.',
      keyModules: [
        {
          title: 'Catalog & Dynamic Filtering',
          desc: 'Fast querying of product catalogs with pagination, keyword search, price range filtering, and real-time stock levels.'
        },
        {
          title: 'Cart & Session Synchronizer',
          desc: 'Client-side cart state synchronized with backend persistence, ensuring cart contents remain intact across user sessions.'
        },
        {
          title: 'Auth & Order Processing',
          desc: 'Protected checkout routes with session/token authorization, order status tracking (Pending, Processing, Shipped), and order history.'
        }
      ],
      endpoints: [
        { method: 'POST', path: '/api/auth/login', desc: 'Authenticates user and returns authorization credentials' },
        { method: 'GET', path: '/api/products', desc: 'Retrieves catalog with pagination, search, and category filters' },
        { method: 'POST', path: '/api/cart', desc: 'Adds items to user cart with quantity validation' },
        { method: 'POST', path: '/api/orders', desc: 'Creates order record, reserves stock, and generates order summary' }
      ],
      schemaHighlights: [
        'User Schema: credentials, shipping addresses, profile metadata',
        'Product Schema: title, sku, pricing, inventory count, categories, images',
        'Order Schema: user reference, line items snapshot, payment status, delivery timeline'
      ]
    }
  },
  {
    id: 'banking-system',
    title: 'Banking Transaction System',
    tagline: 'High-Integrity Financial Transaction & Account Management Engine',
    category: 'Backend & APIs',
    badge: 'PERSONAL PROJECT',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'RESTful APIs', 'Security', 'ACID Transactions'],
    description:
      'A dedicated backend banking transaction system engineered to execute critical financial operations including account creation, deposits, withdrawals, and inter-account fund transfers with bulletproof data consistency and auditing.',
    highlights: [
      'Developed a banking transaction management system using Node.js, Express.js, and MongoDB to handle account operations and transaction records.',
      'Implemented secure user authentication and authorization flows to protect account and transaction data.',
      'Built RESTful APIs with Node.js and Express.js to process transactions such as deposits, withdrawals, and transfers.',
      'Designed database schemas and backend logic to let users view balances and track transaction history in real time.',
      'Used MongoDB for persistent storage of user, account, and transaction data with a focus on data consistency.'
    ],
    techStack: {
      backend: ['Node.js', 'Express.js', 'REST API Architecture', 'JWT Authorization'],
      database: ['MongoDB', 'Mongoose Schemas', 'Transaction Consistency & Indexing'],
      tools: ['Git & GitHub', 'Postman Automated Tests', 'Environment Isolation']
    },
    metrics: [
      { label: 'Operations', value: 'Deposit · Withdraw · Transfer' },
      { label: 'Security', value: 'Auth & Authorization Flows' },
      { label: 'Consistency', value: 'Data Integrity Focused' },
      { label: 'Audit', value: 'Real-Time Transaction Log' }
    ],
    githubUrl: 'https://github.com/jawadnero',
    architectureDetails: {
      overview:
        'The system is engineered for transactional accuracy and security. Every fund movement executes within controlled validation blocks preventing negative balances, race conditions, or unverified recipient transfers.',
      keyModules: [
        {
          title: 'Account Ledger Engine',
          desc: 'Maintains isolated customer accounts, account numbers, routing tags, and atomic balance updates.'
        },
        {
          title: 'Transaction Pipeline',
          desc: 'Processes deposits, cash withdrawals, and inter-account transfers with comprehensive input sanitization and verification.'
        },
        {
          title: 'Audit & History Ledger',
          desc: 'Stores immutable transaction log entries with timestamps, transaction IDs, before/after balances, and counterpart details.'
        }
      ],
      endpoints: [
        { method: 'POST', path: '/api/accounts', desc: 'Creates new bank account with verified owner credentials' },
        { method: 'GET', path: '/api/accounts/:id/balance', desc: 'Securely returns real-time account balance' },
        { method: 'POST', path: '/api/transactions/transfer', desc: 'Executes atomic fund transfer between two valid accounts' },
        { method: 'GET', path: '/api/transactions/history', desc: 'Fetches paginated, chronologically ordered transaction records' }
      ],
      schemaHighlights: [
        'Account Schema: accountNumber (unique index), ownerId, balance, accountType, status',
        'Transaction Schema: transactionId, senderAccount, receiverAccount, amount, type, timestamp, status'
      ]
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Languages & Markup',
    iconName: 'Code',
    tagline: 'Core building blocks of modern full-stack web applications',
    skills: [
      {
        name: 'JavaScript (ES6+)',
        level: 95,
        description: 'Modern ES6+ syntax, asynchronous programming (Promises, async/await), closures, DOM API, and array/object transformations',
        isPrimary: true
      },
      {
        name: 'HTML5',
        level: 95,
        description: 'Semantic page structure, modern accessibility (ARIA), SEO meta hygiene, and rich web forms',
        isPrimary: true
      },
      {
        name: 'CSS3',
        level: 92,
        description: 'Flexbox, CSS Grid, media queries, CSS variables, transitions, and fluid responsive styling',
        isPrimary: true
      }
    ]
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    iconName: 'Layout',
    tagline: 'Modular, high-performance, and responsive user experiences',
    skills: [
      {
        name: 'React.js',
        level: 94,
        description: 'Functional components, hooks (useState, useEffect, useMemo, useCallback), state management, modular architecture, and custom hooks',
        isPrimary: true
      },
      {
        name: 'Tailwind CSS',
        level: 95,
        description: 'Utility-first CSS, custom design tokens, dark/light styling, and fluid responsive layouts for mobile and desktop screens',
        isPrimary: true
      },
      {
        name: 'Responsive UI Design',
        level: 94,
        description: 'Mobile-first design principles, touch-friendly interfaces, cross-browser compatibility, and viewport ergonomics',
        isPrimary: true
      }
    ]
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    iconName: 'Server',
    tagline: 'Scalable services, secure REST endpoints, and business logic',
    skills: [
      {
        name: 'Node.js',
        level: 92,
        description: 'Event-driven asynchronous I/O, server architecture, npm package ecosystem, and backend process lifecycle',
        isPrimary: true
      },
      {
        name: 'Express.js',
        level: 94,
        description: 'RESTful routing, middleware pipelines, route controllers, error handling, and request validation',
        isPrimary: true
      },
      {
        name: 'REST API Development',
        level: 95,
        description: 'Idempotency, HTTP status codes, structured JSON payloads, query parameters, pagination, and clean endpoint contracts',
        isPrimary: true
      },
      {
        name: 'Authentication & Authorization',
        level: 90,
        description: 'Secure token authentication, password hashing, route protection middleware, and role access control',
        isPrimary: true
      }
    ]
  },
  {
    id: 'database',
    name: 'Database & Storage',
    iconName: 'Database',
    tagline: 'Data persistence, schema design, and transactional consistency',
    skills: [
      {
        name: 'MongoDB',
        level: 94,
        description: 'Document data modeling, collections, indexing, queries, aggregation pipelines, and persistent storage with high consistency',
        isPrimary: true
      },
      {
        name: 'Mongoose ODM',
        level: 92,
        description: 'Schema definition, data type validation, pre/post middleware hooks, and document relationship referencing',
        isPrimary: true
      },
      {
        name: 'Data Consistency & Modeling',
        level: 90,
        description: 'Designing normalized & denormalized structures, maintaining referential integrity, and atomic update safety',
        isPrimary: true
      }
    ]
  },
  {
    id: 'tools',
    name: 'Tools & Methodologies',
    iconName: 'Wrench',
    tagline: 'Version control, AI workflows, and developer productivity',
    skills: [
      {
        name: 'Git',
        level: 92,
        description: 'Distributed version control, branching strategies, commit cleanliness, merge conflict resolution, and history hygiene',
        isPrimary: true
      },
      {
        name: 'GitHub',
        level: 92,
        description: 'Repository hosting, pull requests, issue tracking, project boards, and collaborative open-source workflows',
        isPrimary: true
      },
      {
        name: 'Prompt Engineering',
        level: 90,
        description: 'Leveraging AI-assisted engineering workflows, structured prompt formulation, code generation, and rapid prototyping',
        isPrimary: true
      },
      {
        name: 'Postman / API Testing',
        level: 90,
        description: 'API endpoint verification, request parameter validation, authorization headers testing, and mock responses',
        isPrimary: false
      }
    ]
  },
  {
    id: 'professional',
    name: 'Professional Skills',
    iconName: 'Users',
    tagline: 'Workplace collaboration, clear articulation, and problem solving',
    skills: [
      {
        name: 'Problem Solving',
        level: 95,
        description: 'Structured root-cause analysis, debugging full-stack bottlenecks, and breaking complex problems into clean technical steps',
        isPrimary: true
      },
      {
        name: 'Communication',
        level: 92,
        description: 'Articulating technical architectural decisions clearly to team members, writing clean documentation, and active listening',
        isPrimary: true
      },
      {
        name: 'Teamwork & Collaboration',
        level: 94,
        description: 'Collaborative, team-oriented mindset, welcoming constructive code reviews, and contributing effectively to group milestones',
        isPrimary: true
      }
    ]
  }
];
