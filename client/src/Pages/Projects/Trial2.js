const projects = [
  {
    title: "Portfolio Website",
    concept: "Web Development",
    description: {
      brief: "A responsive portfolio website to showcase personal projects and skills.",
      detailed: "This is a single-page application built with React and styled-components that serves as a personal portfolio. It highlights a curated list of personal and collaborative projects, technical skills, and work experiences. Features include a responsive layout, smooth scroll, custom components, and a contact form powered by EmailJS, enabling visitors to reach out directly from the site without backend infrastructure."
    },
    image: "https://your‑host.com/screenshots/portfolio‑site.png",
    features: [
      "Fully responsive layout",
      "Smooth scroll and animated transitions",
      "Email contact form powered by EmailJS",
      "Custom component-based architecture"
    ],
    techStack: [
      { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
      { name: "styled-components", icon: "https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" },
      { name: "EmailJS", icon: "https://cdn.worldvectorlogo.com/logos/emailjs.svg" }
    ],
    projectLink: "https://yourportfolio.com",
    githubLink: "https://github.com/yourusername/portfolio"
  },
  {
    title: "E-Commerce Store",
    concept: "Web Development",
    description: {
      brief: "A full-stack e-commerce store with user authentication and payment integration.",
      detailed: "This application is a fully functional e-commerce platform built using the MERN stack. Users can register, log in, browse through product listings, add items to their cart, and proceed to a secure checkout with Stripe. Admins have access to a dashboard to manage inventory, orders, and user data. Backend services support order history, payment confirmations, and inventory updates in real-time."
    },
    image: "https://your‑host.com/screenshots/ecommerce‑store.png",
    features: [
      "User authentication with JWT",
      "Secure payment processing with Stripe",
      "Admin dashboard for product and order management",
      "Real-time inventory and order tracking"
    ],
    techStack: [
      { name: "MongoDB", icon: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" },
      { name: "Express", icon: "https://raw.githubusercontent.com/expressjs/expressjs.com/gh-pages/images/express-facebook-share.png" },
      { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
      { name: "Node.js", icon: "https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg" },
      { name: "Stripe", icon: "https://stripe.com/img/v3/home/social.png" }
    ],
    projectLink: "https://mystore.com",
    githubLink: "https://github.com/yourusername/ecommerce-store"
  },
  {
    title: "JHipster Scaffolded App",
    concept: "Web Development",
    description: {
      brief: "A full-stack web app scaffolded with JHipster.",
      detailed: "This project leverages JHipster to generate a complete monolithic architecture with Spring Boot for the backend and React for the frontend. It includes user authentication (JWT/OAuth2), CRUD operations for multiple entities, Docker support for containerization, and Kubernetes configuration for production deployment. Ideal for rapidly bootstrapping enterprise applications."
    },
    image: "https://your-host.com/screenshots/jhipster-app.png",
    features: [
      "Full-stack generation in minutes",
      "Spring Boot + React with JWT-based authentication",
      "Pre-configured Docker and Kubernetes support",
      "Admin dashboard and built-in entity management"
    ],
    techStack: [
      { name: "JHipster", icon: "https://www.jhipster.tech/images/logo/jhipster-icon.png" },
      { name: "Spring Boot", icon: "https://www.jhipster.tech/images/logo/jhipster-icon.png" },
      { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
      { name: "Docker", icon: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg" },
      { name: "Kubernetes", icon: "https://kubernetes.io/images/kubernetes-horizontal-color.png" }
    ],
    projectLink: "https://example-jhipster-app.com",
    githubLink: "https://github.com/yourusername/jhipster-app"
  },
  {
    title: "GraphQL API Service",
    concept: "Backend Development",
    description: {
      brief: "Node.js-based GraphQL service with Apollo.",
      detailed: "This is a high-performance API built with Apollo Server and Express, offering a schema-first GraphQL implementation. The service supports queries, mutations, and real-time subscriptions via WebSocket. It's connected to a MongoDB database with support for authentication, input validation, and pagination. Ideal for frontend teams requiring precise and efficient data fetching."
    },
    image: "https://your-host.com/screenshots/graphql-service.png",
    features: [
      "GraphQL queries and mutations",
      "WebSocket-based subscriptions",
      "Schema-first design with validation",
      "MongoDB integration and pagination support"
    ],
    techStack: [
      { name: "Node.js", icon: "https://logo.svgcdn.com/d/nodejs-original.svg" },
      { name: "Express", icon: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" },
      { name: "Apollo GraphQL", icon: "https://www.jhipster.tech/images/logo/jhipster-icon.png" },
      { name: "MongoDB", icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" }
    ],
    projectLink: "https://graphql-service.example.com",
    githubLink: "https://github.com/yourusername/graphql-service"
  },
  {
    title: "DevOps Monitoring Dashboard",
    concept: "DevOps",
    description: {
      brief: "Centralized live monitoring dashboard.",
      detailed: "This project is a DevOps-focused monitoring platform integrating Prometheus and Grafana within a React frontend. It collects, visualizes, and alerts on real-time metrics from containerized microservices. Kubernetes is used for service orchestration, while Grafana provides powerful visual dashboards and alerting rules."
    },
    image: "https://your-host.com/screenshots/monitoring-dashboard.png",
    features: [
      "Live metrics visualization with Grafana",
      "Alerting and threshold monitoring",
      "Integration with Kubernetes and Prometheus",
      "Customizable dashboard panels"
    ],
    techStack: [
      { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
      { name: "Grafana", icon: "https://www.jhipster.tech/images/logo/jhipster-icon.png" },
      { name: "Prometheus", icon: "https://www.jhipster.tech/images/logo/jhipster-icon.png" },
      { name: "Kubernetes", icon: "https://kubernetes.io/images/kubernetes-horizontal-color.png" }
    ],
    projectLink: "https://monitoring-dashboard.example.com",
    githubLink: "https://github.com/yourusername/monitoring-dashboard"
  },

  // 🔽 New Projects
  {
    title: "Mobile News App",
    concept: "iOS/Android Development",
    description: {
      brief: "A cross-platform news app built with Flutter.",
      detailed: "This mobile app delivers personalized news feeds using the NewsAPI and is developed using Flutter for both iOS and Android platforms. It supports dark mode, offline caching, topic-based filtering, and push notifications for breaking news. It uses Firebase for authentication and cloud messaging."
    },
    image: "https://your-host.com/screenshots/news-app.png",
    features: [
      "Cross-platform (iOS & Android) with Flutter",
      "Offline caching for blogs",
      "Topic filtering and user personalization",
      "Push notifications via Firebase"
    ],
    techStack: [
      { name: "Flutter", icon: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png" },
      { name: "Firebase", icon: "https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png" },
      { name: "Dart", icon: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Dart_programming_language_logo.svg" },
      { name: "NewsAPI", icon: "https://newsapi.org/images/n-logo-border.png" }
    ],
    projectLink: "https://playstore.example.com/newsapp",
    githubLink: "https://github.com/yourusername/flutter-news-app"
  },
  {
    title: "Cloud File Sync Service",
    concept: "Cloud Development",
    description: {
      brief: "A cloud-based file syncing and backup solution.",
      detailed: "A distributed file synchronization system built with AWS services including S3, Lambda, and DynamoDB. It provides users with automatic backup of files to the cloud, file versioning, and conflict resolution mechanisms. Admin tools enable file access tracking and usage analytics via AWS CloudWatch."
    },
    image: "https://your-host.com/screenshots/cloud-sync.png",
    features: [
      "Automatic file backup and versioning",
      "AWS-powered serverless architecture",
      "Conflict resolution system",
      "Access logging and metrics tracking"
    ],
    techStack: [
      { name: "AWS Lambda", icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/awslambda.svg" },
      { name: "Amazon S3", icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/amazons3.svg" },
      { name: "DynamoDB", icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/amazondynamodb.svg" },
      { name: "CloudWatch", icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/amazoncloudwatch.svg" }
    ],
    projectLink: "https://cloudsync.example.com",
    githubLink: "https://github.com/yourusername/cloud-file-sync"
  },
  {
  title: "Smart Expense Tracker",
  concept: "Android Development",
  description: {
    brief: "An Android app to track daily expenses and categorize spending.",
    detailed: "A native Android application that helps users track their daily expenses with intuitive charts and categorization features. Users can set monthly budgets, receive spending alerts, and analyze trends over time. Data is stored locally using Room DB, and Google Drive integration is available for backup and sync."
  },
  image: "https://your-host.com/screenshots/expense-tracker.png",
  features: [
    "Budget tracking and category-wise breakdown",
    "Data visualization with Pie and Bar Charts",
    "Local database with Room and LiveData",
    "Backup to Google Drive"
  ],
  techStack: [
    { name: "Kotlin", icon: "https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png" },
    { name: "Android SDK", icon: "https://developer.android.com/images/brand/Android_Robot.png" },
    { name: "Room DB", icon: "https://developer.android.com/images/topic/libraries/architecture/room.svg" },
    { name: "Google Drive API", icon: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Drive_logo.png" }
  ],
  projectLink: "https://play.google.com/store/apps/details?id=com.example.expensetracker",
  githubLink: "https://github.com/yourusername/smart-expense-tracker"
},

{
  title: "iOS Fitness Coach",
  concept: "iOS Development",
  description: {
    brief: "An iOS personal fitness and workout tracking app.",
    detailed: "This native Swift iOS application acts as a personal fitness coach. It includes daily workout plans, goal tracking, health analytics integration with Apple HealthKit, and progress tracking with visuals. It provides voice coaching and customizable routines tailored to user goals such as weight loss, strength, or flexibility."
  },
  image: "https://your-host.com/screenshots/fitness-coach.png",
  features: [
    "Customizable workout plans",
    "Apple HealthKit integration",
    "Voice coaching and workout reminders",
    "Progress charts and activity logging"
  ],
  techStack: [
    { name: "Swift", icon: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg" },
    { name: "Xcode", icon: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Xcode_14_icon.png" },
    { name: "HealthKit", icon: "https://developer.apple.com/assets/elements/icons/healthkit/healthkit-96x96_2x.png" },
    { name: "Core Data", icon: "https://developer.apple.com/assets/elements/icons/core-data/core-data-96x96_2x.png" }
  ],
  projectLink: "https://apps.apple.com/us/app/fitness-coach/id123456789",
  githubLink: "https://github.com/yourusername/ios-fitness-coach"
},

{
  title: "Collaborative Whiteboard",
  concept: "Real-time Applications",
  description: {
    brief: "A browser-based real-time collaborative drawing whiteboard.",
    detailed: "A WebSocket-powered whiteboard that allows multiple users to draw, write, and collaborate on a shared canvas in real time. Includes undo/redo, shape tools, and chat integration. Built for both desktop and tablet experiences and secured with temporary session tokens for private rooms."
  },
  image: "https://your-host.com/screenshots/collab-whiteboard.png",
  features: [
    "Multi-user real-time collaboration",
    "WebSocket-based live drawing sync",
    "Session rooms with URL sharing",
    "Built-in chat and user presence indicators"
  ],
  techStack: [
    { name: "WebSockets", icon: "https://upload.wikimedia.org/wikipedia/commons/9/96/WebSocket.svg" },
    { name: "Canvas API", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/HTML5_logo_and_wordmark.svg" },
    { name: "Node.js", icon: "https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg" },
    { name: "Socket.IO", icon: "https://socket.io/images/logo.svg" }
  ],
  projectLink: "https://whiteboard.example.com",
  githubLink: "https://github.com/yourusername/collaborative-whiteboard"
},

{
  title: "Serverless Image Optimizer",
  concept: "Cloud/Serverless",
  description: {
    brief: "A serverless image compression and delivery tool built with AWS.",
    detailed: "This project provides an on-demand image optimization service using AWS Lambda, S3, and CloudFront. Uploaded images are automatically compressed, resized, and cached at the edge for fast delivery. It's ideal for integrating with CMS platforms or frontends to serve responsive images on the fly."
  },
  image: "https://your-host.com/screenshots/image-optimizer.png",
  features: [
    "Auto compression and resizing on upload",
    "CDN delivery via CloudFront",
    "Lambda-based processing with S3 triggers",
    "Supports WebP, AVIF, and JPEG formats"
  ],
  techStack: [
    { name: "AWS Lambda", icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/awslambda.svg" },
    { name: "Amazon S3", icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/amazons3.svg" },
    { name: "CloudFront", icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/amazoncloudfront.svg" },
    { name: "Sharp.js", icon: "https://avatars.githubusercontent.com/u/1743820?s=200&v=4" }
  ],
  projectLink: "https://imageoptimizer.example.com",
  githubLink: "https://github.com/yourusername/serverless-image-optimizer"
},

{
  title: "Blockchain Voting DApp",
  concept: "Blockchain / Web3",
  description: {
    brief: "A decentralized voting system built on Ethereum.",
    detailed: "A fully decentralized application (DApp) for secure and transparent online voting. Built with Solidity smart contracts deployed on the Ethereum testnet. The frontend is built with React and connects via Web3.js. Includes Metamask wallet integration and IPFS for vote data storage, ensuring tamper-proof results."
  },
  image: "https://your-host.com/screenshots/blockchain-voting.png",
  features: [
    "Ethereum smart contracts for vote security",
    "React frontend with Web3 integration",
    "Wallet-based identity verification via MetaMask",
    "Vote data stored on IPFS"
  ],
  techStack: [
    { name: "Solidity", icon: "https://upload.wikimedia.org/wikipedia/commons/9/98/Solidity_logo.svg" },
    { name: "Web3.js", icon: "https://seeklogo.com/images/W/web3-logo-69D1F719D4-seeklogo.com.png" },
    { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
    { name: "IPFS", icon: "https://ipfs.tech/images/ipfs-logo.svg" }
  ],
  projectLink: "https://blockvote.example.com",
  githubLink: "https://github.com/yourusername/blockchain-voting-dapp"
}

];



export { projects }