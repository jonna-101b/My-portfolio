const blogs = [
  {
    _id: "64c1a7b3e7d4f23a8c9d2001",
    author: "Jane Doe",
    title: "The Future of Artificial Intelligence",
    intro: "AI is transforming industries and reshaping how we live and work.",
    description:
      "This blog explores the potential future of artificial intelligence, its applications, ethical concerns, and what it means for humanity in the next decade.",
    tags: ["AI", "Technology", "Future"],
    image: "https://example.com/images/ai-future.jpg",
    links: [
      { title: "AI Ethics Report", url: "https://example.com/ai-ethics" },
      { title: "Latest AI Research", url: "https://example.com/ai-research" }
    ],
    createdAt: new Date("2023-11-10T10:00:00Z"),
    updatedAt: new Date("2023-11-10T10:00:00Z")
  },
  {
    _id: "64c1a7b3e7d4f23a8c9d2002",
    author: "John Smith",
    title: "Climate Change and Renewable Energy",
    intro:
      "The climate crisis is pushing governments to accelerate renewable energy adoption.",
    description:
      "We break down the role of solar, wind, and hydroelectric power in reducing carbon emissions and how innovation is driving clean energy forward.",
    tags: ["Climate Change", "Renewable Energy", "Environment"],
    image: "https://example.com/images/renewable-energy.jpg",
    links: [
      { title: "Solar Power Advances", url: "https://example.com/solar-power" },
      { title: "Wind Energy Insights", url: "https://example.com/wind-energy" }
    ],
    createdAt: new Date("2024-02-05T09:30:00Z"),
    updatedAt: new Date("2024-02-05T09:30:00Z")
  },
  {
    _id: "64c1a7b3e7d4f23a8c9d2003",
    author: "Emily Chen",
    title: "The Rise of Remote Work",
    intro: "Remote work has become the new normal for many industries post-2020.",
    description:
      "This blog examines the cultural shift toward remote work, its benefits, challenges, and long-term implications for businesses and employees.",
    tags: ["Remote Work", "Business", "Productivity"],
    image: "https://example.com/images/remote-work.jpg",
    links: [
      { title: "Remote Tools Guide", url: "https://example.com/remote-tools" },
      { title: "Work From Home Trends", url: "https://example.com/wfh-trends" }
    ],
    createdAt: new Date("2024-06-15T12:15:00Z"),
    updatedAt: new Date("2024-06-15T12:15:00Z")
  },
  {
    _id: "64c1a7b3e7d4f23a8c9d2004",
    author: "Michael Rodriguez",
    title: "Blockchain Beyond Cryptocurrency",
    intro: "Blockchain is more than Bitcoin — it’s reshaping industries.",
    description:
      "An in-depth look at how blockchain is being applied to supply chains, voting systems, digital identity, and secure data sharing.",
    tags: ["Blockchain", "Fintech", "Innovation"],
    image: "https://example.com/images/blockchain.jpg",
    links: [
      { title: "Blockchain in Supply Chains", url: "https://example.com/blockchain-supply" },
      { title: "Future of Digital Identity", url: "https://example.com/digital-identity" }
    ],
    createdAt: new Date("2024-01-20T08:45:00Z"),
    updatedAt: new Date("2024-01-20T08:45:00Z")
  },
  {
    _id: "64c1a7b3e7d4f23a8c9d2005",
    author: "Sarah Lee",
    title: "The Psychology of Social Media",
    intro: "How social media impacts mental health and behavior.",
    description:
      "Exploring the positive and negative psychological effects of social platforms, including addiction, community building, and digital well-being.",
    tags: ["Psychology", "Social Media", "Mental Health"],
    image: "https://example.com/images/social-media.jpg",
    links: [
      { title: "Digital Wellness Tips", url: "https://example.com/wellness" },
      { title: "Social Media Research", url: "https://example.com/social-research" }
    ],
    createdAt: new Date("2023-12-01T14:20:00Z"),
    updatedAt: new Date("2023-12-01T14:20:00Z")
  },
  {
    _id: "64c1a7b3e7d4f23a8c9d2006",
    author: "David Kim",
    title: "Space Exploration in the 21st Century",
    intro: "Private companies are pushing space travel further than ever.",
    description:
      "This blog looks at the role of SpaceX, NASA, and new players in space exploration and colonization.",
    tags: ["Space", "Science", "Technology"],
    image: "https://example.com/images/space.jpg",
    links: [
      { title: "Mars Mission Plans", url: "https://example.com/mars" },
      { title: "SpaceX Updates", url: "https://example.com/spacex" }
    ],
    createdAt: new Date("2024-07-22T16:40:00Z"),
    updatedAt: new Date("2024-07-22T16:40:00Z")
  },
  {
    _id: "64c1a7b3e7d4f23a8c9d2007",
    author: "Amina Hassan",
    title: "The Evolution of E-commerce",
    intro: "From small online shops to global marketplaces.",
    description:
      "A look at how e-commerce has evolved, the role of AI-driven recommendations, and the future of online shopping.",
    tags: ["E-commerce", "Business", "Retail"],
    image: "https://example.com/images/ecommerce.jpg",
    links: [
      { title: "E-commerce Trends", url: "https://example.com/ecommerce-trends" },
      { title: "AI in Retail", url: "https://example.com/ai-retail" }
    ],
    createdAt: new Date("2024-04-18T11:05:00Z"),
    updatedAt: new Date("2024-04-18T11:05:00Z")
  },
  {
    _id: "64c1a7b3e7d4f23a8c9d2008",
    author: "Lucas Fernández",
    title: "The Power of Mindfulness",
    intro: "Mindfulness practices are spreading worldwide.",
    description:
      "Examining how meditation, breathing exercises, and mindfulness improve focus, reduce stress, and enhance productivity.",
    tags: ["Mindfulness", "Health", "Well-being"],
    image: "https://example.com/images/mindfulness.jpg",
    links: [
      { title: "Meditation Guide", url: "https://example.com/meditation" },
      { title: "Mindfulness Research", url: "https://example.com/mindfulness-study" }
    ],
    createdAt: new Date("2023-09-25T07:10:00Z"),
    updatedAt: new Date("2023-09-25T07:10:00Z")
  },
  {
    _id: "64c1a7b3e7d4f23a8c9d2009",
    author: "Priya Patel",
    title: "Cybersecurity in the Digital Age",
    intro:
      "Data breaches are on the rise as digital transformation accelerates.",
    description:
      "How businesses and individuals can protect themselves against cyber threats, ransomware, and data leaks.",
    tags: ["Cybersecurity", "Technology", "Privacy"],
    image: "https://example.com/images/cybersecurity.jpg",
    links: [
      {
        title: "Cybersecurity Best Practices",
        url: "https://example.com/cybersecurity-tips"
      },
      { title: "Ransomware Explained", url: "https://example.com/ransomware" }
    ],
    createdAt: new Date("2024-05-10T13:50:00Z"),
    updatedAt: new Date("2024-05-10T13:50:00Z")
  },
  {
    _id: "64c1a7b3e7d4f23a8c9d2010",
    author: "Tom Becker",
    title: "The Future of Transportation",
    intro:
      "From autonomous cars to hyperloop trains, transportation is evolving.",
    description:
      "An exploration of smart cities, electric vehicles, and futuristic transport systems shaping the way we travel.",
    tags: ["Transportation", "Innovation", "Smart Cities"],
    image: "https://example.com/images/transport.jpg",
    links: [
      {
        title: "Autonomous Cars Explained",
        url: "https://example.com/autonomous-cars"
      },
      { title: "Hyperloop Projects", url: "https://example.com/hyperloop" }
    ],
    createdAt: new Date("2024-08-30T18:25:00Z"),
    updatedAt: new Date("2024-08-30T18:25:00Z")
  },
  {
    _id: "64c1a7b3e7d4f23a8c9d2011",
    author: "Nina Müller",
    title: "The Food Tech Revolution",
    intro: "Technology is transforming how we grow, cook, and eat food.",
    description:
      "From lab-grown meat to AI-powered recipe generators, food tech is reshaping our kitchens and farms.",
    tags: ["Food Tech", "Innovation", "Sustainability"],
    image: "https://example.com/images/food-tech.jpg",
    links: [
      { title: "Lab-grown Meat Explained", url: "https://example.com/lab-meat" },
      { title: "Smart Kitchens", url: "https://example.com/smart-kitchen" }
    ],
    createdAt: new Date("2024-03-08T15:55:00Z"),
    updatedAt: new Date("2024-03-08T15:55:00Z")
  }
];

export default blogs;