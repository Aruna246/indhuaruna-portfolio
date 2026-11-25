import { PortfolioCMSData } from './types';

export const initialPortfolioData: PortfolioCMSData = {
  profile: {
    name: 'Indhu Aruna S',
    initials: 'IA',
    headlinePrefix: "Hi, I'm",
    title: 'B.E. ECE Student | Software Developer',
    statusBadge: 'Open to Software Development Opportunities',
    bio: 'B.E. Electronics and Communication Engineering student with internship experience in MERN Stack, Frontend, and WordPress development. Skilled in Java, Data Structures and Algorithms, JavaScript, React.js, Node.js, Express.js, HTML, CSS, MySQL, and MongoDB. Strong interest in building responsive web applications, developing REST APIs, and solving programming problems using efficient algorithms and Object-Oriented Programming.',
    avatarUrl: '',
    socials: {
      github: 'https://github.com/indhuaruna',
      linkedin: 'https://linkedin.com/in/indhu-aruna',
      email: 'indhus6924@gmail.com',
      location: 'Virudhunagar, Tamil Nadu, India',
      phone: '+91-9363649788',
      twitter: '',
      website: ''
    }
  },
  about: {
    sectionTitle: 'Professional Summary',
    introduction:
      'B.E. Electronics and Communication Engineering student at Thanthai Periyar Government Institute of Technology, Vellore (CGPA: 8.10). Hands-on experience building full-stack MERN applications, responsive web interfaces, and scalable REST APIs with a strong focus on clean architecture, Data Structures, and Object-Oriented Programming.',
    highlights: [
      {
        id: 'h1',
        iconName: 'graduation-cap',
        title: 'Education & Academics',
        description:
          'B.E. Electronics and Communication Engineering at Thanthai Periyar Government Institute of Technology, Vellore (2023 – 2027) with CGPA 8.10.'
      },
      {
        id: 'h2',
        iconName: 'briefcase',
        title: 'Industry Experience',
        description:
          'Internship experience across MERN Stack at Codingrim, Frontend Development at Infeara Secure, and WordPress / WooCommerce at Skeneticdigital.'
      },
      {
        id: 'h3',
        iconName: 'code',
        title: 'Core Engineering',
        description:
          'Solid foundation in Data Structures and Algorithms (DSA), OOP, DBMS, SQL, REST APIs, and system problem-solving in Java & JavaScript.'
      },
      {
        id: 'h4',
        iconName: 'target',
        title: 'Career Objective',
        description:
          'Aiming to join high-impact engineering teams as a Software Developer or Intern to ship robust, scalable, and responsive digital products.'
      }
    ],
    strengths: [
      'Data Structures & Algorithms',
      'MERN Stack Development',
      'Problem Solving',
      'Object-Oriented Programming (OOP)',
      'REST API Design',
      'Clean & Readable Code',
      'Fast Learner',
      'Team Collaboration',
      'Full Stack Ownership'
    ]
  },
  skillsCategories: [
    {
      id: 'languages',
      categoryName: 'LANGUAGES',
      skills: [
        { id: 'l1', name: 'Java', proficiency: 88 },
        { id: 'l2', name: 'JavaScript', proficiency: 90 },
        { id: 'l3', name: 'Python', proficiency: 82 },
        { id: 'l4', name: 'HTML', proficiency: 95 },
        { id: 'l5', name: 'CSS', proficiency: 92 }
      ]
    },
    {
      id: 'core',
      categoryName: 'CORE CS & DSA',
      skills: [
        { id: 'c1', name: 'Data Structures and Algorithms', proficiency: 86 },
        { id: 'c2', name: 'Object-Oriented Programming (OOP)', proficiency: 88 },
        { id: 'c3', name: 'DBMS & Database Architecture', proficiency: 85 },
        { id: 'c4', name: 'SQL & Query Optimization', proficiency: 85 },
        { id: 'c5', name: 'Problem Solving & Logic', proficiency: 90 }
      ]
    },
    {
      id: 'frontend',
      categoryName: 'FRONTEND',
      skills: [
        { id: 'f1', name: 'React.js', proficiency: 90 },
        { id: 'f2', name: 'Tailwind CSS', proficiency: 92 },
        { id: 'f3', name: 'Bootstrap', proficiency: 84 },
        { id: 'f4', name: 'Responsive Web Design', proficiency: 94 }
      ]
    },
    {
      id: 'backend',
      categoryName: 'BACKEND',
      skills: [
        { id: 'b1', name: 'Node.js', proficiency: 86 },
        { id: 'b2', name: 'Express.js', proficiency: 85 },
        { id: 'b3', name: 'REST APIs', proficiency: 90 },
        { id: 'b4', name: 'Flask', proficiency: 76 },
        { id: 'b5', name: 'FastAPI', proficiency: 74 }
      ]
    },
    {
      id: 'database',
      categoryName: 'DATABASE',
      skills: [
        { id: 'd1', name: 'MySQL', proficiency: 86 },
        { id: 'd2', name: 'MongoDB', proficiency: 85 }
      ]
    },
    {
      id: 'tools',
      categoryName: 'TOOLS',
      skills: [
        { id: 't1', name: 'Git', proficiency: 88 },
        { id: 't2', name: 'GitHub', proficiency: 90 },
        { id: 't3', name: 'VS Code', proficiency: 94 },
        { id: 't4', name: 'Postman', proficiency: 85 }
      ]
    },
    {
      id: 'other',
      categoryName: 'WORDPRESS & OTHER',
      skills: [
        { id: 'o1', name: 'WordPress', proficiency: 90 },
        { id: 'o2', name: 'WooCommerce', proficiency: 86 },
        { id: 'o3', name: 'Elementor', proficiency: 92 },
        { id: 'o4', name: 'Basic SEO', proficiency: 82 }
      ]
    }
  ],
  projects: [
    {
      id: 'p1',
      title: 'Academic Management System – MERN Stack',
      category: 'Full Stack',
      featured: true,
      image: '',
      description:
        'A comprehensive full-stack academic management system to manage student records, grades, attendance, and administrative workflows.',
      fullDescription:
        'Developed a full-stack academic management system to manage student, academic, and administrative information. Built robust REST APIs using Node.js and Express.js with MongoDB for data storage and implemented responsive React.js interfaces.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
      githubUrl: 'https://github.com/indhuaruna/academic-management-system',
      liveUrl: 'https://academic-system-demo.example.com',
      keyFeatures: [
        'Developed a full-stack academic management system to manage student, academic, and administrative information',
        'Built REST APIs using Node.js and Express.js with MongoDB for reliable persistent data storage',
        'Implemented responsive React.js interfaces for seamless mobile and desktop navigation',
        'Engineered secure role-based access for students, staff, and administrators'
      ],
      role: 'Full Stack MERN Developer',
      completedDate: '2026'
    },
    {
      id: 'p2',
      title: 'E-Commerce Website – MERN Stack',
      category: 'Full Stack',
      featured: true,
      image: '',
      description:
        'A full-stack e-commerce application featuring product catalog management, interactive shopping cart, and order processing.',
      fullDescription:
        'Developed a full-stack e-commerce application with product management, user interaction, and shopping functionality. Implemented REST APIs, MongoDB database integration, and responsive frontend components using React.js.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      githubUrl: 'https://github.com/indhuaruna/ecommerce-mern-app',
      liveUrl: 'https://ecommerce-demo.example.com',
      keyFeatures: [
        'Developed a full-stack e-commerce application with product management, user interaction, and shopping functionality',
        'Implemented REST APIs, MongoDB database integration, and responsive frontend components using React.js',
        'Engineered dynamic category filtering, cart management, and seamless order checkout flow',
        'Designed scalable database schemas for product inventory and customer orders'
      ],
      role: 'Full Stack Developer',
      completedDate: '2025'
    },
    {
      id: 'p3',
      title: 'Srivi Fresh – WordPress E-Commerce Website',
      category: 'WordPress / E-Commerce',
      featured: true,
      image: '',
      description:
        'Customized e-commerce website for fresh organic products using WordPress, WooCommerce, Elementor, and responsive UI design.',
      fullDescription:
        'Developed and customized an e-commerce website using WordPress, WooCommerce, Elementor, and responsive design techniques. Configured products, layouts, plugins, and website content to provide a user-friendly shopping experience.',
      tags: ['WordPress', 'WooCommerce', 'Elementor', 'SEO', 'Responsive UI'],
      githubUrl: 'https://github.com/indhuaruna/srivi-fresh-ecommerce',
      liveUrl: 'https://srivifresh.example.com',
      keyFeatures: [
        'Developed and customized an e-commerce website using WordPress, WooCommerce, Elementor, and responsive design techniques',
        'Configured products, custom catalog layouts, plugins, and website content to provide a user-friendly shopping experience',
        'Optimized page load speeds, responsive mobile views, and basic search engine optimization (SEO)',
        'Set up automated payment options and simplified customer checkout'
      ],
      role: 'WordPress & WooCommerce Developer',
      completedDate: '2025'
    }
  ],
  education: [
    {
      id: 'edu1',
      degree: 'B.E. Electronics and Communication Engineering',
      institution: 'Thanthai Periyar Government Institute of Technology, Vellore',
      location: 'Vellore, Tamil Nadu',
      department: 'Electronics and Communication Engineering',
      duration: '2023 – 2027',
      cgpa: '8.10',
      coursework:
        'Programming in Java, Data Structures and Algorithms, MERN Stack, Object-Oriented Programming, Database Management Systems, Computer Networks.'
    },
    {
      id: 'edu2',
      degree: 'Higher Secondary Certificate (HSC) – 12th Standard',
      institution: 'Sacred Heart Girls Hr.Sec.School, Srivilliputtur',
      location: 'Srivilliputtur, Tamil Nadu',
      department: 'Bio-Maths / Science Stream',
      duration: '2022 – 2023',
      percentage: '89.6%',
      score: '89.6%'
    }
  ],
  experience: [
    {
      id: 'exp1',
      role: 'MERN Stack Developer Intern',
      company: 'Codingrim Technology Solutions Private Limited',
      location: 'Rajapalayam, Tamil Nadu',
      duration: 'June 2026 – July 2026',
      type: 'Internship',
      description:
        'Developed responsive web application components and REST APIs for full-stack enterprise applications.',
      highlights: [
        'Developed responsive web application components using React.js, JavaScript, HTML, and CSS.',
        'Worked with Node.js, Express.js, MongoDB, and REST APIs for full-stack application development.',
        'Collaborated on backend database integration and frontend state management.'
      ]
    },
    {
      id: 'exp2',
      role: 'Frontend Developer Intern',
      company: 'Infeara Secure Technology',
      location: 'Srivilliputtur, Tamil Nadu',
      duration: 'Jan 2024 – Feb 2024',
      type: 'Internship',
      description:
        'Constructed intuitive client-facing web interfaces with modern frontend technologies and cross-device responsiveness.',
      highlights: [
        'Developed and customized responsive web interfaces using HTML, CSS, JavaScript, and modern frontend practices.',
        'Improved website usability and responsiveness across different screen sizes.',
        'Ensured cross-browser compatibility and optimized page load times.'
      ]
    },
    {
      id: 'exp3',
      role: 'WordPress Development Intern',
      company: 'Skeneticdigital',
      location: 'Srivilliputtur, Tamil Nadu',
      duration: 'June 2025 – July 2025',
      type: 'Internship',
      description:
        'Designed, deployed, and managed customized WordPress & WooCommerce platforms for dynamic client projects.',
      highlights: [
        'Developed and customized WordPress websites using Elementor, WooCommerce, themes, and plugins.',
        'Worked on responsive layouts, product management, website optimization, and basic SEO.',
        'Structured catalog setups and improved digital storefront user conversion.'
      ]
    }
  ],
  awards: [
    {
      id: 'aw1',
      title: 'Code Whizz – 1st Runner-Up',
      year: '2026',
      placement: '1st Runner-Up',
      institution: 'Thanthai Periyar Government Institute of Technology, Vellore',
      description:
        'Secured 1st Runner-Up position in the intra-college hackathon at Thanthai Periyar Government Institute of Technology, Vellore.'
    },
    {
      id: 'aw2',
      title: 'Code Whizz – 2nd Runner-Up',
      year: '2024',
      placement: '2nd Runner-Up',
      institution: 'Thanthai Periyar Government Institute of Technology, Vellore',
      description:
        'Secured 2nd Runner-Up position in the intra-college hackathon at Thanthai Periyar Government Institute of Technology, Vellore.'
    }
  ],
  courseworkList: [
    'Programming in Java',
    'Data Structures and Algorithms',
    'MERN Stack',
    'Object-Oriented Programming (OOP)',
    'DBMS & SQL',
    'Computer Networks'
  ],
  cta: {
    title: 'Looking for a developer who ships?',
    subtitle:
      "I'm open to Software Engineering roles, MERN Stack positions, and developer internships. Let's build impactful web solutions together.",
    primaryButtonText: 'Get in touch',
    secondaryButtonText: 'Download Resume'
  },
  resume: {
    summary:
      'B.E. Electronics and Communication Engineering student with internship experience in MERN Stack, Frontend, and WordPress development. Skilled in Java, Data Structures and Algorithms, JavaScript, React.js, Node.js, Express.js, HTML, CSS, MySQL, and MongoDB. Strong interest in building responsive web applications, developing REST APIs, and solving programming problems using efficient algorithms and Object-Oriented Programming.',
    includeGpa: true,
    includeCoursework: true,
    selectedSkills: [
      'Java',
      'JavaScript',
      'Python',
      'Data Structures and Algorithms',
      'OOP',
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'MySQL',
      'REST APIs',
      'Tailwind CSS',
      'WordPress',
      'WooCommerce',
      'Git & GitHub'
    ],
    customObjective:
      'Seeking a full-time Software Developer or Internship role to apply my MERN stack expertise, DSA problem-solving capabilities, and engineering mindset to build exceptional digital experiences.'
  },
  theme: {
    accentColor: '#4f46e5',
    darkMode: false
  }
};
