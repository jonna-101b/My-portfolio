const skills = [
  {
    _id: "650a2f3e5b2c1a7f4d9a1001",
    title: "Frontend Development",
    techStack: [
      { _id: "650a2f3e5b2c1a7f4d9a1101", name: "React", icon: "https://raw.githubusercontent.com/reactjs/reactjs.org/main/src/icons/logo.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1102", name: "Vue.js", icon: "https://raw.githubusercontent.com/vuejs/artwork/master/logo.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1103", name: "Angular", icon: "https://angular.io/assets/images/logos/angular/angular.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1104", name: "Svelte", icon: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1105", name: "Next.js", icon: "https://assets.vercel.com/image/upload/v1595325280/nextjs/Icon_dark_background.svg" },
    ],
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1002",
    title: "Backend Development",
    techStack: [
      { _id: "650a2f3e5b2c1a7f4d9a1201", name: "Node.js", icon: "https://nodejs.org/static/images/logo.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1202", name: "Django", icon: "https://static.djangoproject.com/img/logos/django-logo-positive.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1203", name: "Ruby on Rails", icon: "https://upload.wikimedia.org/wikipedia/commons/6/62/Ruby_On_Rails_Logo.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1204", name: "Spring", icon: "https://spring.io/images/logo-spring-2bae42bbcae39160174fa25b8fe4bb8f.svg" },
    ],
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1003",
    title: "Databases",
    techStack: [
      { _id: "650a2f3e5b2c1a7f4d9a1301", name: "MongoDB", icon: "https://webassets.mongodb.com/_com_assets/global/mongodb-logo-white.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1302", name: "PostgreSQL", icon: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1303", name: "MySQL", icon: "https://www.mysql.com/common/logos/logo-mysql-170x115.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1304", name: "Redis", icon: "https://redis.io/images/redis-white.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1305", name: "SQLite", icon: "https://www.sqlite.org/images/sqlite370_banner.gif" },
    ],
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1004",
    title: "Version Control & CI/CD",
    techStack: [
      { _id: "650a2f3e5b2c1a7f4d9a1401", name: "Git", icon: "https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1402", name: "GitHub", icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1403", name: "GitLab", icon: "https://about.gitlab.com/images/press/logo/png/gitlab-logo-gray-stacked-rgb.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1404", name: "Bitbucket", icon: "https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/bitbucket/favicon.png" },
    ],
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1005",
    title: "Cloud Platforms & Hosting",
    techStack: [
      { _id: "650a2f3e5b2c1a7f4d9a1501", name: "AWS", icon: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1502", name: "Google Cloud", icon: "https://cloud.google.com/images/social-icon-google-cloud-1200-630.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1503", name: "Microsoft Azure", icon: "https://azurecomcdn.azureedge.net/cvt-.../azure-icon.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1504", name: "Heroku", icon: "https://brand.heroku.com/static/media/heroku-logotype-wordmark.16c5fb28.svg" },
    ],
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1006",
    title: "DevOps & Containerization",
    techStack: [
      { _id: "650a2f3e5b2c1a7f4d9a1601", name: "Docker", icon: "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1602", name: "Kubernetes", icon: "https://kubernetes.io/images/kubernetes-horizontal-color.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1603", name: "Terraform", icon: "https://www.terraform.io/assets/images/og-image-747c2d50067dc802a44c2bf9b22af646.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1604", name: "Jenkins", icon: "https://www.jenkins.io/images/jenkins/jenkins.svg" },
    ],
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1007",
    title: "UI/UX & Design",
    techStack: [
      { _id: "650a2f3e5b2c1a7f4d9a1701", name: "Figma", icon: "https://static.figma.com/app/icon/1/favicon.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1702", name: "Adobe XD", icon: "https://upload.wikimedia.org/wikipedia/commons/4/46/Adobe_XD_CC_icon.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1703", name: "Sketch", icon: "https://upload.wikimedia.org/wikipedia/commons/5/59/Sketch_Logo.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1704", name: "InVision", icon: "https://education.invisionapp.com/wp-content/uploads/2020/03/ins-140x140-1.png" },
    ],
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1008",
    title: "Testing & QA",
    techStack: [
      { _id: "650a2f3e5b2c1a7f4d9a1801", name: "Jest", icon: "https://jestjs.io/img/jest-icon.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1802", name: "Mocha", icon: "https://mochajs.org/assets/mocha-logo.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1803", name: "Cypress", icon: "https://www.cypress.io/static/og-image-8c28a04c28c3d0b52e088bf16030ac19.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1804", name: "Selenium", icon: "https://www.selenium.dev/images/selenium_logo_square_green.png" },
    ],
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1009",
    title: "Mobile Development",
    techStack: [
      { _id: "650a2f3e5b2c1a7f4d9a1901", name: "React Native", icon: "https://reactnative.dev/img/header_logo.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1902", name: "Flutter", icon: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1903", name: "Swift", icon: "https://developer.apple.com/swift/images/swift-og.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1904", name: "Kotlin", icon: "https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png" },
    ],
  },
  {
    _id: "650a2f3e5b2c1a7f4d9a1010",
    title: "Programming Languages",
    techStack: [
      { _id: "650a2f3e5b2c1a7f4d9a1a01", name: "JavaScript", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1a02", name: "TypeScript", icon: "https://cdn.worldvectorlogo.com/logos/typescript.svg" },
      { _id: "650a2f3e5b2c1a7f4d9a1a03", name: "Python", icon: "https://www.python.org/static/community_logos/python-logo.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1a04", name: "Go", icon: "https://blog.golang.org/go-brand/Go-Logo/PNG/Go-Logo_Blue.png" },
      { _id: "650a2f3e5b2c1a7f4d9a1a05", name: "Rust", icon: "https://www.rust-lang.org/logos/rust-logo-512x512.png" },
    ],
  },
];

export default skills;