const TS = [
  {
    concept: "Frontend Development",
    _id: 1,
    techStack: [
      { name: "React", icon: "🔵" },
      { name: "Vue.js", icon: "🟢" },
      { name: "Svelte", icon: "🟥" },
      { name: "Tailwind CSS", icon: "🌬️" },
      { name: "TypeScript", icon: "📘" },
    ],
  },
  {
    concept: "Backend Development",
    _id: 2,
    techStack: [
      { name: "Node.js", icon: "🟩" },
      { name: "Express", icon: "🚂" },
      { name: "Django", icon: "🐍" },
      { name: "Ruby on Rails", icon: "💎" },
      { name: "Go", icon: "🐹" },
    ],
  },
  {
    concept: "Databases",
    _id: 3,
    techStack: [
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MongoDB", icon: "🍃" },
      { name: "MySQL", icon: "🐬" },
      { name: "Redis", icon: "🟥" },
      { name: "SQLite", icon: "📦" },
    ],
  },
  {
    concept: "DevOps & Deployment",
    _id: 4,
    techStack: [
      { name: "Docker", icon: "🐳" },
      { name: "Kubernetes", icon: "☸️" },
      { name: "Vercel", icon: "▲" },
      { name: "Netlify", icon: "🌐" },
      { name: "GitHub Actions", icon: "⚙️" },
    ],
  },
  {
    concept: "APIs & Integration",
    _id: 5,
    techStack: [
      { name: "GraphQL", icon: "🧬" },
      { name: "REST", icon: "🔗" },
      { name: "WebSockets", icon: "🌐" },
      { name: "OAuth", icon: "🔒" },
    ],
  },
];


const CS = [
  {
    icon: "⚙️",
    title: "Problem Solving",
    description: "The ability to break down complex problems and implement scalable, logical solutions.",
  },
  {
    icon: "🧱",
    title: "System Design",
    description: "Designing robust and scalable architectures for both frontend and backend systems.",
  },
  {
    icon: "♻️",
    title: "Version Control",
    description: "Using tools like Git to track changes and collaborate effectively on codebases.",
  },
  {
    icon: "📦",
    title: "Component Reusability",
    description: "Creating modular UI components and backend services that can be reused across projects.",
  },
  {
    icon: "📈",
    title: "Performance Optimization",
    description: "Techniques to improve loading times, reduce render bottlenecks, and optimize API calls.",
  },
  {
    icon: "🧪",
    title: "Testing & Debugging",
    description: "Writing unit, integration, and end-to-end tests while also mastering debugging tools.",
  },
  {
    icon: "🔐",
    title: "Security Best Practices",
    description: "Ensuring web apps are secure from common vulnerabilities like XSS, CSRF, and SQL injection.",
  },
];


const pro = [
  {
    title: "DevLink",
    concept: "A portfolio platform for developers to showcase their projects and skills.",
    name: "devlink",
    description: "DevLink allows developers to create customizable profiles, showcase GitHub projects, write blogs, and connect with recruiters.",
    image: "https://example.com/images/devlink.png",
    functions: "Authentication, Markdown blog editor, GitHub API integration, Profile themes.",
    techStack: [
      { name: "React", icon: "https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png" },
      { name: "Node.js", icon: "https://cdn.iconscout.com/icon/free/png-256/nodejs-2-226035.png" },
      { name: "MongoDB", icon: "https://cdn.iconscout.com/icon/free/png-256/mongodb-4-1175139.png" }
    ],
    projectLink: "https://devlink.app",
    githubLink: "https://github.com/username/devlink"
  },
  {
    title: "TaskZen",
    concept: "A collaborative task management tool for remote teams.",
    name: "taskzen",
    description: "TaskZen helps remote teams assign tasks, manage progress via Kanban boards, and get real-time updates.",
    image: "https://example.com/images/taskzen.png",
    functions: "Real-time task sync, Role-based permissions, Drag-and-drop boards, Notifications.",
    techStack: [
      { name: "Vue.js", icon: "https://cdn.iconscout.com/icon/free/png-256/vuejs-1175052.png" },
      { name: "Express.js", icon: "https://cdn.iconscout.com/icon/free/png-256/express-8-1175029.png" },
      { name: "MongoDB", icon: "https://cdn.iconscout.com/icon/free/png-256/mongodb-4-1175139.png" },
      { name: "Socket.io", icon: "https://cdn.iconscout.com/icon/free/png-256/socket-io-1-1175003.png" }
    ],
    projectLink: "https://taskzen.app",
    githubLink: "https://github.com/username/taskzen"
  },
  {
    title: "InspoAI",
    concept: "An AI-powered writing assistant for content creators and bloggers.",
    name: "inspoai",
    description: "InspoAI offers grammar suggestions, idea generation, tone adjustment, and content planning using GPT integration.",
    image: "https://example.com/images/inspoai.png",
    functions: "Content suggestions, Tone and mood sliders, GPT integration, Save drafts.",
    techStack: [
      { name: "Next.js", icon: "https://cdn.iconscout.com/icon/free/png-256/nextjs-2-1174935.png" },
      { name: "TailwindCSS", icon: "https://cdn.iconscout.com/icon/free/png-256/tailwindcss-1175254.png" },
      { name: "OpenAI API", icon: "https://cdn.iconscout.com/icon/free/png-256/openai-1-1175211.png" }
    ],
    projectLink: "https://inspoai.com",
    githubLink: "https://github.com/username/inspoai"
  },
  {
    title: "FinTrack",
    concept: "A personal finance and budgeting dashboard.",
    name: "fintrack",
    description: "Track income, expenses, create monthly budgets, and visualize financial data in real time.",
    image: "https://example.com/images/fintrack.png",
    functions: "Bank sync, Budget planning, Graphs & analytics, Daily spend limit alerts.",
    techStack: [
      { name: "Angular", icon: "https://cdn.iconscout.com/icon/free/png-256/angular-3-226070.png" },
      { name: "Node.js", icon: "https://cdn.iconscout.com/icon/free/png-256/nodejs-2-226035.png" },
      { name: "MongoDB", icon: "https://cdn.iconscout.com/icon/free/png-256/mongodb-4-1175139.png" },
      { name: "Chart.js", icon: "https://cdn.iconscout.com/icon/free/png-256/chartjs-3-1175091.png" }
    ],
    projectLink: "https://fintrack.me",
    githubLink: "https://github.com/username/fintrack"
  },
  {
    title: "FitBuddy",
    concept: "A virtual fitness trainer app with personalized workout plans and diet tracking.",
    name: "fitbuddy",
    description: "FitBuddy provides customized training programs, video workouts, and calorie counters integrated with wearable devices.",
    image: "https://example.com/images/fitbuddy.png",
    functions: "Workout planner, Diet tracker, Progress graphs, Device syncing.",
    techStack: [
      { name: "React Native", icon: "https://cdn.iconscout.com/icon/free/png-256/react-3-1175109.png" },
      { name: "Firebase", icon: "https://cdn.iconscout.com/icon/free/png-256/firebase-1-282796.png" },
      { name: "Node.js", icon: "https://cdn.iconscout.com/icon/free/png-256/nodejs-2-226035.png" }
    ],
    projectLink: "https://fitbuddy.app",
    githubLink: "https://github.com/username/fitbuddy"
  }
];

const articles = [
  {
    author: "Jane Doe",
    title: "Understanding React Server Components",
    introText: "A brief look at how React Server Components are shaping the future of frontend development.",
    description: "React Server Components (RSCs) allow you to build modern applications with better performance by moving the rendering process to the server. In this article, we’ll explore what RSCs are, why they matter, and how to integrate them into your workflow.",
    datePublished: "2024-12-05",
    tags: ["react", "javascript", "web development", "server components"],
    image: "https://example.com/images/react-server-components.png",
    links: [
      {
        title: "React Server Components Guide",
        url: "https://react.dev/learn/server-components"
      },
      {
        title: "GitHub RSC Discussions",
        url: "https://github.com/reactwg/server-components/discussions"
      }
    ]
  },
  {
    author: "Emily Tran",
    title: "The Psychology of Color in UI Design",
    introText: "Colors do more than make your UI look pretty — they influence perception and action.",
    description: "This article delves into how color psychology impacts user behavior in digital interfaces. Learn how to choose color palettes that align with your brand and improve user experience.",
    datePublished: "2025-02-15",
    tags: ["UI/UX", "design", "psychology", "colors"],
    image: "https://example.com/images/color-psychology-ui.jpg",
    links: [
      {
        title: "UX Design on Color Psychology",
        url: "https://uxdesign.cc/color-psychology-in-ui-design-937e4f6a1cd1"
      }
    ]
  },
  {
    author: "Dr. Amir Hassan",
    title: "Ethical Dilemmas in AI: What Developers Should Know",
    introText: "As AI evolves, so do the ethical questions developers must face.",
    description: "From facial recognition to bias in language models, the ethical implications of AI technologies are increasingly complex. This article provides a roadmap for ethical thinking in AI development and deployment.",
    datePublished: "2025-06-01",
    tags: ["AI", "ethics", "machine learning", "technology"],
    image: "https://example.com/images/ai-ethics.jpg",
    links: [
      {
        title: "AI Ethics Guide by MIT Tech Review",
        url: "https://www.technologyreview.com/2024/11/17/ai-ethics-guide"
      },
      {
        title: "AI Ethics Organization",
        url: "https://aiethics.org"
      }
    ]
  }
];

const testimonies = [
  {
    name: "Emily Carter",
    position: "Product Manager",
    image: "https://example.com/images/emily.jpg",
    testimony: "Working with you was a breeze. Your attention to detail, clear communication, and proactive mindset made the entire process seamless and genuinely enjoyable. I always felt like the project was in good hands.",
    company: "TechNova Inc.",
    companyLink: "https://technova.io"
  },
  {
    name: "Liam Jackson",
    position: "Senior Developer",
    image: "https://example.com/images/liam.jpg",
    testimony: "Your code quality is exceptional, and you always deliver ahead of schedule. You not only met the technical requirements, but often improved on them with thoughtful suggestions. A fantastic collaborator I’d work with again any day.",
    company: "CodeForge",
    companyLink: "https://codeforge.dev"
  },
  {
    name: "Sofia Patel",
    position: "UX Designer",
    image: "https://example.com/images/sofia.jpg",
    testimony: "You brought our vision to life with clean, elegant execution. Your technical skills combined with a deep understanding of user experience made a huge difference. You truly elevated the final product.",
    company: "DesignLoop",
    companyLink: "https://designloop.studio"
  },
  {
    name: "Noah Kim",
    position: "CTO",
    image: "https://example.com/images/noah.jpg",
    testimony: "You consistently delivered scalable, well-structured solutions—even under tight deadlines. Your reliability, creativity, and technical depth have set a new benchmark for the kind of developer every team needs.",
    company: "Vertex Systems",
    companyLink: "https://vertexsys.com"
  },
  {
    name: "Ava Rodriguez",
    position: "Marketing Director",
    image: "https://example.com/images/ava.jpg",
    testimony: "From start to finish, your professionalism and work ethic were outstanding. You were always one step ahead, and the final result exceeded expectations. I wouldn’t hesitate to collaborate again.",
    company: "BrightBrand",
    companyLink: "https://brightbrand.co"
  }
];

const qualifications = [
  {
    fieldOfStudy: "Computer Science",
    institution: "Massachusetts Institute of Technology",
    description:
      "Focused on software engineering, data structures, artificial intelligence, and systems programming. Participated in research projects and developed real-world applications through team-based assignments and internships.",
    duration: "2015 - 2019",
    active: false,
    type: "education"
  },
  {
    jobTitle: "Frontend Developer",
    company: "TechNova Inc.",
    description:
      "Developed user interfaces using React.js, optimized performance for web applications, and collaborated with backend teams to integrate RESTful APIs. Played a key role in redesigning the user experience for the company's flagship product.",
    duration: "2020 - 2022",
    active: false,
    type: "experience"
  },
  {
    fieldOfStudy: "Business Administration",
    institution: "Harvard Business School",
    description:
      "Specialized in marketing strategies, leadership development, and business operations. Participated in case studies, simulations, and entrepreneurial projects with a focus on real-world business problem solving.",
    duration: "2019 - 2021",
    active: false,
    type: "education"
  },
  {
    jobTitle: "Marketing Manager",
    company: "GrowthEdge Corp.",
    description:
      "Led a team of six marketing professionals in creating and launching cross-platform digital campaigns. Oversaw content strategy, campaign analytics, and market segmentation efforts to drive brand engagement and lead generation.",
    duration: "2021 - Present",
    active: true,
    type: "experience"
  },
  {
    fieldOfStudy: "Data Science",
    institution: "Coursera - Johns Hopkins University",
    description:
      "Completed a rigorous online specialization covering statistical analysis, data visualization, machine learning, and big data tools. Applied concepts in hands-on projects using Python, R, and cloud-based data platforms.",
    duration: "2022 - 2023",
    active: false,
    type: "education"
  },
  {
    jobTitle: "Data Analyst",
    company: "InsightWorks Ltd.",
    description:
      "Analyzed large and complex datasets to generate actionable insights for clients across multiple industries. Built automated reporting tools, visual dashboards, and presented findings to stakeholders to support data-driven decision-making.",
    duration: "2023 - Present",
    active: true,
    type: "experience"
  }
];





export { TS, CS, pro, articles, testimonies, qualifications }