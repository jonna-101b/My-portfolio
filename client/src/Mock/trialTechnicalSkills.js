const skills = [
  // Frontend
  {
    _id: "650a2f3e5b2c1a7f4d9a1101",
    name: "React",
    label: "Frontend",
    icon: "react",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1102",
    name: "Vue.js",
    label: "Frontend",
    icon: "vuedotjs",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1103",
    name: "Angular",
    label: "Frontend",
    icon: "angular",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1104",
    name: "Svelte",
    label: "Frontend",
    icon: "svelte",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1105",
    name: "Next.js",
    label: "Frontend",
    icon: "nextdotjs",
  },

  // Backend
  {
    _id: "650a2f3e5b2c1a7f4d9a1201",
    name: "Node.js",
    label: "Backend",
    icon: "nodedotjs",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1202",
    name: "Django",
    label: "Backend",
    icon: "django",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1203",
    name: "Ruby on Rails",
    label: "Backend",
    icon: "rubyonrails",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1204",
    name: "Spring",
    label: "Backend",
    icon: "spring",
  },

  // Databases
  {
    _id: "650a2f3e5b2c1a7f4d9a1301",
    name: "MongoDB",
    label: "Databases",
    icon: "mongodb",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1302",
    name: "PostgreSQL",
    label: "Databases",
    icon: "postgresql",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1303",
    name: "MySQL",
    label: "Databases",
    icon: "mysql",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1304",
    name: "Redis",
    label: "Databases",
    icon: "redis",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1305",
    name: "SQLite",
    label: "Databases",
    icon: "sqlite",
  },

  // Version Control & CI/CD
  {
    _id: "650a2f3e5b2c1a7f4d9a1401",
    name: "Git",
    label: "Version Control & CI/CD",
    icon: "git",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1402",
    name: "GitHub",
    label: "Version Control & CI/CD",
    icon: "github",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1403",
    name: "GitLab",
    label: "Version Control & CI/CD",
    icon: "gitlab",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1404",
    name: "Bitbucket",
    label: "Version Control & CI/CD",
    icon: "bitbucket",
  },

  // Cloud Platforms & Hosting
  {
    _id: "650a2f3e5b2c1a7f4d9a1501",
    name: "Google Cloud",
    label: "Cloud Platforms & Hosting",
    icon: "googlecloud",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1502",
    name: "Cloudflare",
    label: "Cloud Platforms & Hosting",
    icon: "cloudflare",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1503",
    name: "DigitalOcean",
    label: "Cloud Platforms & Hosting",
    icon: "digitalocean",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1504",
    name: "Vercel",
    label: "Cloud Platforms & Hosting",
    icon: "vercel",
  },

  // DevOps & Containerization
  {
    _id: "650a2f3e5b2c1a7f4d9a1601",
    name: "Docker",
    label: "DevOps & Containerization",
    icon: "docker",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1602",
    name: "Kubernetes",
    label: "DevOps & Containerization",
    icon: "kubernetes",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1603",
    name: "Terraform",
    label: "DevOps & Containerization",
    icon: "terraform",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1604",
    name: "Jenkins",
    label: "DevOps & Containerization",
    icon: "jenkins",
  },

  // UI/UX & Design
  {
    _id: "650a2f3e5b2c1a7f4d9a1701",
    name: "Figma",
    label: "UI/UX & Design",
    icon: "figma",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1702",
    name: "Sketch",
    label: "UI/UX & Design",
    icon: "sketch",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1703",
    name: "Framer",
    label: "UI/UX & Design",
    icon: "framer",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1704",
    name: "Blender",
    label: "UI/UX & Design",
    icon: "blender",
  },

  // Testing & QA
  {
    _id: "650a2f3e5b2c1a7f4d9a1801",
    name: "Jest",
    label: "Testing & QA",
    icon: "jest",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1802",
    name: "Mocha",
    label: "Testing & QA",
    icon: "mocha",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1803",
    name: "Cypress",
    label: "Testing & QA",
    icon: "cypress",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1804",
    name: "Selenium",
    label: "Testing & QA",
    icon: "selenium",
  },

  // Mobile Development
  {
    _id: "650a2f3e5b2c1a7f4d9a1901",
    name: "Flutter",
    label: "Mobile Development",
    icon: "flutter",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1902",
    name: "Swift",
    label: "Mobile Development",
    icon: "swift",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1903",
    name: "Kotlin",
    label: "Mobile Development",
    icon: "kotlin",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1904",
    name: "Android",
    label: "Mobile Development",
    icon: "android",
  },

  // Programming Languages
  {
    _id: "650a2f3e5b2c1a7f4d9a1a01",
    name: "JavaScript",
    label: "Programming Languages",
    icon: "javascript",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1a02",
    name: "TypeScript",
    label: "Programming Languages",
    icon: "typescript",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1a03",
    name: "Python",
    label: "Programming Languages",
    icon: "python",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1a04",
    name: "Go",
    label: "Programming Languages",
    icon: "go",
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1a05",
    name: "Rust",
    label: "Programming Languages",
    icon: "rust",
  },
];

export default skills;