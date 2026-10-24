const techs = [
    {
        label: "Frontend",
        options: [
            { name: "React", label: "React", icon: "react", value: "React" },
            { name: "Vue.js", label: "Vue.js", icon: "vuedotjs", value: "Vue.js" },
            { name: "Angular", label: "Angular", icon: "angular", value: "Angular" },
            { name: "Svelte", label: "Svelte", icon: "svelte", value: "Svelte" },
            { name: "Next.js", label: "Next.js", icon: "nextdotjs", value: "Next.js" },
            { name: "Nuxt.js", label: "Nuxt.js", icon: "nuxtdotjs", value: "Nuxt.js" },
            { name: "Redux", label: "Redux", icon: "redux", value: "Redux" },
            { name: "Bootstrap", label: "Bootstrap", icon: "bootstrap", value: "Bootstrap" },
            { name: "TailwindCSS", label: "TailwindCSS", icon: "tailwindcss", value: "TailwindCSS" },
            { name: "Material UI", label: "Material UI", icon: "mui", value: "Material UI" },
            { name: "jQuery", label: "jQuery", icon: "jquery", value: "jQuery"  }
        ]
    },
    {
        label: "Backend",
        options: [
            { name: "Node.js", label: "Node.js", icon: "nodedotjs", value: "Node.js" },
            { name: "Express.js", label: "Express.js", icon: "express", value: "Express.js" },
            { name: "Django", label: "Django", icon: "django", value: "Django" },
            { name: "Flask", label: "Flask", icon: "flask", value: "Flask" },
            { name: "Spring", label: "Spring", icon: "spring", value: "Spring" },
            { name: "Ruby on Rails", label: "Ruby on Rails", icon: "rubyonrails", value: "Ruby on Rails" },
            { name: "Laravel", label: "Laravel", icon: "laravel", value: "Laravel" },
            { name: "ASP.NET Core", label: "ASP.NET Core", icon: "dotnet", value: "ASP.NET Core" },
            { name: "FastAPI", label: "FastAPI", icon: "fastapi", value: "FastAPI"  }
        ]
    },
    {
        label: "Databases",
        options: [
            { name: "PostgreSQL", label: "PostgreSQL", icon: "postgresql", value: "PostgreSQL" },
            { name: "MySQL", label: "MySQL", icon: "mysql", value: "MySQL" },
            { name: "MariaDB", label: "MariaDB", icon: "mariadb", value: "MariaDB" },
            { name: "MongoDB", label: "MongoDB", icon: "mongodb", value: "MongoDB" },
            { name: "Redis", label: "Redis", icon: "redis", value: "Redis" },
            { name: "SQLite", label: "SQLite", icon: "sqlite", value: "SQLite" },
            { name: "Firebase", label: "Firebase", icon: "firebase", value: "Firebase" },
            { name: "Supabase", label: "Supabase", icon: "supabase", value: "Supabase" },
            { name: "Cassandra", label: "Cassandra", icon: "apachecassandra", value: "Cassandra"  }
        ]
    },
    {
        label: "Programming Languages",
        options: [
            { name: "JavaScript", label: "JavaScript", icon: "javascript", value: "JavaScript" },
            { name: "TypeScript", label: "TypeScript", icon: "typescript", value: "TypeScript" },
            { name: "Python", label: "Python", icon: "python", value: "Python" },
            { name: "Java", label: "Java", icon: "java", value: "Java" },
            { name: "C", label: "C", icon: "c", value: "C" },
            { name: "C++", label: "C++", icon: "cplusplus", value: "C++" },
            { name: "C#", label: "C#", icon: "csharp", value: "C#" },
            { name: "Go", label: "Go", icon: "go", value: "Go" },
            { name: "PHP", label: "PHP", icon: "php", value: "PHP" },
            { name: "Ruby", label: "Ruby", icon: "ruby", value: "Ruby" },
            { name: "Rust", label: "Rust", icon: "rust", value: "Rust" },
            { name: "Kotlin", label: "Kotlin", icon: "kotlin", value: "Kotlin" },
            { name: "Swift", label: "Swift", icon: "swift", value: "Swift" },
            { name: "Dart", label: "Dart", icon: "dart", value: "Dart"  }
        ]
    },
    {
        label: "DevOps / Cloud",
        options: [
            { name: "Docker", label: "Docker", icon: "docker", value: "Docker" },
            { name: "Kubernetes", label: "Kubernetes", icon: "kubernetes", value: "Kubernetes" },
            { name: "AWS", label: "AWS", icon: "amazonaws", value: "AWS" },
            { name: "Google Cloud", label: "Google Cloud", icon: "googlecloud", value: "Google Cloud" },
            { name: "Azure", label: "Azure", icon: "microsoftazure", value: "Azure" },
            { name: "Heroku", label: "Heroku", icon: "heroku", value: "Heroku" },
            { name: "Netlify", label: "Netlify", icon: "netlify", value: "Netlify" },
            { name: "Vercel", label: "Vercel", icon: "vercel", value: "Vercel" },
            { name: "Terraform", label: "Terraform", icon: "terraform", value: "Terraform" },
            { name: "Ansible", label: "Ansible", icon: "ansible", value: "Ansible" },
            { name: "Puppet", label: "Puppet", icon: "puppet", value: "Puppet" },
            { name: "Chef", label: "Chef", icon: "chef", value: "Chef"  }
        ]
    },
    {
        label: "Design / UI",
        options: [
            { name: "Figma", label: "Figma", icon: "figma", value: "Figma" },
            { name: "Sketch", label: "Sketch", icon: "sketch", value: "Sketch" },
            { name: "Framer", label: "Framer", icon: "framer", value: "Framer" },
            { name: "Blender", label: "Blender", icon: "blender", value: "Blender" },
            { name: "Inkscape", label: "Inkscape", icon: "inkscape", value: "Inkscape" },
            { name: "GIMP", label: "GIMP", icon: "gimp", value: "GIMP" }
        ]
    },
    {
        label: "AI / Machine Learning",
        options: [
            { name: "TensorFlow", label: "TensorFlow", icon: "tensorflow", value: "TensorFlow" },
            { name: "PyTorch", label: "PyTorch", icon: "pytorch", value: "PyTorch" },
            { name: "Keras", label: "Keras", icon: "keras", value: "Keras" },
            { name: "Scikit-learn", label: "Scikit-learn", icon: "scikitlearn", value: "Scikit-learn" },
            { name: "Pandas", label: "Pandas", icon: "pandas", value: "Pandas" },
            { name: "NumPy", label: "NumPy", icon: "numpy", value: "NumPy" },
            { name: "Jupyter", label: "Jupyter", icon: "jupyter", value: "Jupyter" },
            { name: "OpenCV", label: "OpenCV", icon: "opencv", value: "OpenCV"  }
        ]
    },
    {
        label: "Big Data & Analytics",
        options: [
            { name: "Apache Spark", label: "Apache Spark", icon: "apachespark", value: "Apache Spark" },
            { name: "Apache Kafka", label: "Apache Kafka", icon: "apachekafka", value: "Apache Kafka" },
            { name: "Elasticsearch", label: "Elasticsearch", icon: "elasticsearch", value: "Elasticsearch" },
            { name: "Logstash", label: "Logstash", icon: "logstash", value: "Logstash" },
            { name: "Kibana", label: "Kibana", icon: "kibana", value: "Kibana" },
            { name: "RabbitMQ", label: "RabbitMQ", icon: "rabbitmq", value: "RabbitMQ"  }
        ]
    },
    {
        label: "Testing",
        options: [
            { name: "Jest", label: "Jest", icon: "jest", value: "Jest" },
            { name: "Mocha", label: "Mocha", icon: "mocha", value: "Mocha" },
            { name: "Cypress", label: "Cypress", icon: "cypress", value: "Cypress" },
            { name: "Selenium", label: "Selenium", icon: "selenium", value: "Selenium"  }
        ]
    }
];

export default techs;