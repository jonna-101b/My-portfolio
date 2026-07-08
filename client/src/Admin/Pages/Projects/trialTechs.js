const techs = [
    {
        label: "Frontend",
        options: [
            { name: "React", label: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", value: "React" },
            { name: "Vue.js", label: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", value: "Vue.js" },
            { name: "Angular", label: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", value: "Angular" },
            { name: "Svelte", label: "Svelte", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg", value: "Svelte" },
            { name: "Next.js", label: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", value: "Next.js" },
            { name: "Nuxt.js", label: "Nuxt.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg", value: "Nuxt.js" },
            { name: "Redux", label: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", value: "Redux" },
            { name: "Bootstrap", label: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", value: "Bootstrap" },
            { name: "TailwindCSS", label: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", value: "TailwindCSS" },
            { name: "Material UI", label: "Material UI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg", value: "Material UI" },
            { name: "jQuery", label: "jQuery", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg", value: "jQuery"  }
        ]
    },
    {
        label: "Backend",
        options: [
            { name: "Node.js", label: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", value: "Node.js" },
            { name: "Express.js", label: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", value: "Express.js" },
            { name: "Django", label: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", value: "Django" },
            { name: "Flask", label: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", value: "Flask" },
            { name: "Spring", label: "Spring", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", value: "Spring" },
            { name: "Ruby on Rails", label: "Ruby on Rails", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg", value: "Ruby on Rails" },
            { name: "Laravel", label: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", value: "Laravel" },
            { name: "ASP.NET Core", label: "ASP.NET Core", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg", value: "ASP.NET Core" },
            { name: "FastAPI", label: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", value: "FastAPI"  }
        ]
    },
    {
        label: "Databases",
        options: [
            { name: "PostgreSQL", label: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", value: "PostgreSQL" },
            { name: "MySQL", label: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", value: "MySQL" },
            { name: "MariaDB", label: "MariaDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg", value: "MariaDB" },
            { name: "MongoDB", label: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", value: "MongoDB" },
            { name: "Redis", label: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", value: "Redis" },
            { name: "SQLite", label: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", value: "SQLite" },
            { name: "Firebase", label: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", value: "Firebase" },
            { name: "Supabase", label: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", value: "Supabase" },
            { name: "Cassandra", label: "Cassandra", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cassandra/cassandra-original.svg", value: "Cassandra"  }
        ]
    },
    {
        label: "Programming Languages",
        options: [
            { name: "JavaScript", label: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", value: "JavaScript" },
            { name: "TypeScript", label: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", value: "TypeScript" },
            { name: "Python", label: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", value: "Python" },
            { name: "Java", label: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", value: "Java" },
            { name: "C", label: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", value: "C" },
            { name: "C++", label: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", value: "C++" },
            { name: "C#", label: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", value: "C#" },
            { name: "Go", label: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", value: "Go" },
            { name: "PHP", label: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", value: "PHP" },
            { name: "Ruby", label: "Ruby", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg", value: "Ruby" },
            { name: "Rust", label: "Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg", value: "Rust" },
            { name: "Kotlin", label: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", value: "Kotlin" },
            { name: "Swift", label: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", value: "Swift" },
            { name: "Dart", label: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", value: "Dart"  }
        ]
    },
    {
        label: "DevOps / Cloud",
        options: [
            { name: "Docker", label: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", value: "Docker" },
            { name: "Kubernetes", label: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", value: "Kubernetes" },
            { name: "AWS", label: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg", value: "AWS" },
            { name: "Google Cloud", label: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", value: "Google Cloud" },
            { name: "Azure", label: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", value: "Azure" },
            { name: "Heroku", label: "Heroku", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg", value: "Heroku" },
            { name: "Netlify", label: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg", value: "Netlify" },
            { name: "Vercel", label: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", value: "Vercel" },
            { name: "Terraform", label: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg", value: "Terraform" },
            { name: "Ansible", label: "Ansible", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg", value: "Ansible" },
            { name: "Puppet", label: "Puppet", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/puppet/puppet-original.svg", value: "Puppet" },
            { name: "Chef", label: "Chef", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chef/chef-original.svg", value: "Chef"  }
        ]
    },
    {
        label: "Design / UI",
        options: [
            { name: "Figma", label: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", value: "Figma" },
            { name: "Sketch", label: "Sketch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg", value: "Sketch" },
            { name: "Adobe XD", label: "Adobe XD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg", value: "Adobe XD" },
            { name: "Photoshop", label: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg", value: "Photoshop" },
            { name: "Illustrator", label: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg", value: "Illustrator" },
            { name: "Inkscape", label: "Inkscape", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/inkscape/inkscape-plain.svg", value: "Inkscape" },
            { name: "Canva", label: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg", value: "Canva"  }
        ]
    },
    {
        label: "AI / Machine Learning",
        options: [
            { name: "TensorFlow", label: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", value: "TensorFlow" },
            { name: "PyTorch", label: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", value: "PyTorch" },
            { name: "Keras", label: "Keras", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg", value: "Keras" },
            { name: "Scikit-learn", label: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg", value: "Scikit-learn" },
            { name: "Pandas", label: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", value: "Pandas" },
            { name: "NumPy", label: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", value: "NumPy" },
            { name: "Matplotlib", label: "Matplotlib", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg", value: "Matplotlib" },
            { name: "Jupyter", label: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg", value: "Jupyter" },
            { name: "OpenCV", label: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", value: "OpenCV"  }
        ]
    },
    {
        label: "Big Data & Analytics",
        options: [
            { name: "Hadoop", label: "Hadoop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg", value: "Hadoop" },
            { name: "Apache Spark", label: "Apache Spark", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg", value: "Apache Spark" },
            { name: "Apache Kafka", label: "Apache Kafka", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg", value: "Apache Kafka" },
            { name: "Elasticsearch", label: "Elasticsearch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg", value: "Elasticsearch" },
            { name: "Logstash", label: "Logstash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/logstash/logstash-original.svg", value: "Logstash" },
            { name: "Kibana", label: "Kibana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kibana/kibana-original.svg", value: "Kibana" },
            { name: "RabbitMQ", label: "RabbitMQ", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg", value: "RabbitMQ"  }
        ]
    },
    {
        label: "Testing",
        options: [
            { name: "Jest", label: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg", value: "Jest" },
            { name: "Mocha", label: "Mocha", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg", value: "Mocha" },
            { name: "Cypress", label: "Cypress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg", value: "Cypress" },
            { name: "Selenium", label: "Selenium", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg", value: "Selenium"  }
        ]
    }
];


export default techs;