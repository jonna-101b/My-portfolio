const projects = [
  {
    _id: "64b7f6a2e7d4f23a8c9d1234",
    title: "TaskFlow",
    domains: ["Web Development", "Productivity Tools"],
    description: {
      brief: "Organize tasks efficiently with a drag-and-drop interface.",
      detailed:
        "TaskFlow is a full-featured project management tool inspired by Trello. It allows users to create boards, lists, and cards to manage tasks visually. The platform supports real-time collaboration, task assignments, due dates, and progress tracking."
    },
    image: "/images/taskflow.png",
    features: [
      "Real-time collaboration",
      "Drag-and-drop task management",
      "Deadline reminders",
      "Customizable boards"
    ],
    techStack: [
      { name: "React", label: "Frontend", icon: "react" },
      { name: "Node.js", label: "Backend", icon: "node" },
      { name: "MongoDB", label: "Databases", icon: "mongodb" }
    ],
    projectLink: "https://taskflow.example.com",
    githubLink: "https://github.com/user/taskflow",
    contribution: "personal",
    createdAt: new Date("2025-07-20"),
    updatedAt: "2025-07-20"
  },
  {
    _id: "64b7f6a2e7d4f23a8c9d1235",
    title: "ShopSphere",
    domains: ["Web Development", "E-Commerce"],
    description: {
      brief: "Sell and shop with ease in a sleek, scalable platform.",
      detailed:
        "ShopSphere is an e-commerce solution with a clean interface, advanced filtering, secure payments, and AI-driven personalized recommendations. It integrates with Stripe, PayPal, and has an admin dashboard for inventory management."
    },
    image: "/images/shopsphere.png",
    features: [
      "AI product recommendations",
      "Secure checkout",
      "Responsive design",
      "Admin analytics dashboard"
    ],
    techStack: [
      { name: "Next.js", label: "Frontend", icon: "next" },
      { name: "Express", label: "Backend", icon: "express" },
      { name: "PostgreSQL", label: "Databases", icon: "postgresql" }
    ],
    projectLink: "https://shopsphere.example.com",
    githubLink: "https://github.com/user/shopsphere",
    contribution: "personal",
    createdAt: new Date("2025-07-21"),
    updatedAt: "2025-07-21"
  },
  {
    _id: "64b7f6a2e7d4f23a8c9d1236",
    title: "FoodieFinder",
    domains: ["Mobile Development", "Location-Based Services"],
    description: {
      brief: "Discover the best restaurants around you.",
      detailed:
        "FoodieFinder uses geolocation and a rich restaurant database to suggest nearby dining options. Users can filter by cuisine, ratings, or distance, and save favorites for future visits."
    },
    image: "/images/foodiefinder.png",
    features: [
      "Geolocation-based suggestions",
      "Cuisine filtering",
      "User reviews",
      "Favorites list"
    ],
    techStack: [
      { name: "Vue.js", label: "Frontend", icon: "vue" },
      { name: "Firebase", label: "Databases", icon: "firebase" },
      { name: "Google Maps", label: "Cloud Platforms & Hosting", icon: "googlemaps" }
    ],
    projectLink: "https://foodiefinder.example.com",
    githubLink: "https://github.com/user/foodiefinder",
    contribution: "personal",
    createdAt: new Date("2025-07-22"),
    updatedAt: "2025-07-22"
  },
  {
    _id: "64b7f6a2e7d4f23a8c9d1237",
    title: "FitTrack",
    domains: ["Mobile Development", "Health & Fitness"],
    description: {
      brief: "Track workouts, meals, and progress in one place.",
      detailed:
        "FitTrack allows users to log workouts, monitor nutrition, and visualize progress through analytics dashboards. It integrates with wearable devices and provides personalized workout plans."
    },
    image: "/images/fittrack.png",
    features: [
      "Workout logging",
      "Meal tracking",
      "Progress analytics",
      "Wearable device sync"
    ],
    techStack: [
      { name: "React Native", label: "Mobile Development", icon: "react" },
      { name: "Redux", label: "Frontend", icon: "redux" },
      { name: "AWS Amplify", label: "Cloud Platforms & Hosting", icon: "aws" }
    ],
    projectLink: "https://fittrack.example.com",
    githubLink: "https://github.com/user/fittrack",
    contribution: "personal",
    createdAt: new Date("2025-07-23"),
    updatedAt: "2025-07-23"
  },
  {
    _id: "64b7f6a2e7d4f23a8c9d1238",
    title: "EduStream",
    domains: ["Web Development", "Online Learning"],
    description: {
      brief: "Learn from anywhere with engaging video lessons.",
      detailed:
        "EduStream hosts video courses across various domains. It supports interactive quizzes, discussion forums, and completion certificates, making learning engaging and measurable."
    },
    image: "/images/edustream.png",
    features: [
      "Video streaming",
      "Interactive quizzes",
      "Discussion forums",
      "Completion certificates"
    ],
    techStack: [
      { name: "Angular", label: "Frontend", icon: "angular" },
      { name: "Node.js", label: "Backend", icon: "node" },
      { name: "MySQL", label: "Databases", icon: "mysql" }
    ],
    projectLink: "https://edustream.example.com",
    githubLink: "https://github.com/user/edustream",
    contribution: "personal",
    createdAt: new Date("2025-07-24"),
    updatedAt: "2025-07-24"
  },
  {
    _id: "64b7f6a2e7d4f23a8c9d1239",
    title: "TravelTales",
    domains: ["Web Development", "Mobile Development", "Travel"],
    description: {
      brief: "Plan trips and share travel experiences.",
      detailed:
        "TravelTales allows users to document travel stories with photos, plan detailed itineraries, and discover trips from other travelers. It supports offline access and map integration."
    },
    image: "/images/traveltales.png",
    features: [
      "Itinerary planning",
      "Photo-rich travel stories",
      "Offline access",
      "Interactive maps"
    ],
    techStack: [
      { name: "Svelte", label: "Frontend", icon: "svelte" },
      { name: "Supabase", label: "Databases", icon: "supabase" },
      { name: "Mapbox", label: "UI/UX & Design", icon: "mapbox" }
    ],
    projectLink: "https://traveltales.example.com",
    githubLink: "https://github.com/user/traveltales",
    contribution: "personal",
    createdAt: new Date("2025-07-25"),
    updatedAt: "2025-07-25"
  },
  {
    _id: "64b7f6a2e7d4f23a8c9d1240",
    title: "CodeCollab",
    domains: ["Desktop App", "Collaboration Tools"],
    description: {
      brief: "Pair-program from anywhere with live code sharing.",
      detailed:
        "CodeCollab enables multiple developers to code together in real time with syntax highlighting, integrated chat, and GitHub integration. It supports multiple languages and file sharing."
    },
    image: "/images/codecollab.png",
    features: [
      "Live code sharing",
      "Syntax highlighting",
      "Integrated chat",
      "GitHub integration"
    ],
    techStack: [
      { name: "Electron", label: "Frontend", icon: "electron" },
      { name: "Socket.IO", label: "Backend", icon: "socket.io" },
      { name: "TypeScript", label: "Programming Languages", icon: "typescript" }
    ],
    projectLink: "https://codecollab.example.com",
    githubLink: "https://github.com/user/codecollab",
    contribution: "personal",
    createdAt: new Date("2025-07-26"),
    updatedAt: "2025-07-26"
  },
  {
    _id: "64b7f6a2e7d4f23a8c9d1241",
    title: "GreenCart",
    domains: ["Web Development", "E-Commerce", "Sustainability"],
    description: {
      brief: "Shop eco-friendly products and track your impact.",
      detailed:
        "GreenCart is an online grocery store focusing on sustainable products. It includes carbon footprint tracking, eco-badges, and supplier transparency to help users make informed purchases."
    },
    image: "/images/greencart.png",
    features: [
      "Carbon footprint tracking",
      "Eco-friendly badges",
      "Supplier transparency",
      "Secure checkout"
    ],
    techStack: [
      { name: "Gatsby", label: "Frontend", icon: "gatsby" },
      { name: "GraphQL", label: "Backend", icon: "graphql" },
      { name: "Firebase", label: "Databases", icon: "firebase" }
    ],
    projectLink: "https://greencart.example.com",
    githubLink: "https://github.com/user/greencart",
    contribution: "personal",
    createdAt: new Date("2025-07-27"),
    updatedAt: "2025-07-27"
  },
];

export default projects;