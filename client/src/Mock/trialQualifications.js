const qualifications = [
  {
    _id: "64f7c3e8a4b1c2d3e4f5a601",
    discipline: "Computer Science",
    organization: "Massachusetts Institute of Technology",
    description:
      "Focused on software engineering, data structures, artificial intelligence, and systems programming. Participated in research projects and developed real-world applications through team-based assignments and internships.",
    duration: {
      from: new Date("2015-01-01"),
      to: new Date("2019-12-31"),
    },
    active: false,
    type: "education",
    createdAt: new Date("2015-01-01"),
    updatedAt: new Date("2019-12-31"),
  },
  {
    _id: "64f7c3e8a4b1c2d3e4f5a602",
    discipline: "Frontend Developer",
    organization: "TechNova Inc.",
    description:
      "Developed user interfaces using React.js, optimized performance for web applications, and collaborated with backend teams to integrate RESTful APIs. Played a key role in redesigning the user experience for the organization's flagship product.",
    duration: {
      from: new Date("2020-01-01"),
      to: new Date("2022-12-31"),
    },
    active: false,
    type: "experience",
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2022-12-31"),
  },
  {
    _id: "64f7c3e8a4b1c2d3e4f5a603",
    discipline: "Business Administration",
    organization: "Harvard Business School",
    description:
      "Specialized in marketing strategies, leadership development, and business operations. Participated in case studies, simulations, and entrepreneurial projects with a focus on real-world business problem solving.",
    duration: {
      from: new Date("2019-01-01"),
      to: new Date("2021-12-31"),
    },
    active: false,
    type: "education",
    createdAt: new Date("2019-01-01"),
    updatedAt: new Date("2021-12-31"),
  },
  {
    _id: "64f7c3e8a4b1c2d3e4f5a604",
    discipline: "Marketing Manager",
    organization: "GrowthEdge Corp.",
    description:
      "Led a team of six marketing professionals in creating and launching cross-platform digital campaigns. Oversaw content strategy, campaign analytics, and market segmentation efforts to drive brand engagement and lead generation.",
    duration: {
      from: new Date("2021-01-01"),
      to: new Date(), // still active
    },
    active: true,
    type: "experience",
    createdAt: new Date("2021-01-01"),
    updatedAt: new Date(),
  },
  {
    _id: "64f7c3e8a4b1c2d3e4f5a605",
    discipline: "Data Science",
    organization: "Coursera - Johns Hopkins University",
    description:
      "Completed a rigorous online specialization covering statistical analysis, data visualization, machine learning, and big data tools. Applied concepts in hands-on projects using Python, R, and cloud-based data platforms.",
    duration: {
      from: new Date("2022-01-01"),
      to: new Date("2023-12-31"),
    },
    active: false,
    type: "education",
    createdAt: new Date("2022-01-01"),
    updatedAt: new Date("2023-12-31"),
  },
  {
    _id: "64f7c3e8a4b1c2d3e4f5a606",
    discipline: "Data Analyst",
    organization: "InsightWorks Ltd.",
    description:
      "Analyzed large and complex datasets to generate actionable insights for clients across multiple industries. Built automated reporting tools, visual dashboards, and presented findings to stakeholders to support data-driven decision-making.",
    duration: {
      from: new Date("2023-01-01"),
      to: new Date(), // still active
    },
    active: true,
    type: "experience",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date(),
  }
];

export default qualifications;