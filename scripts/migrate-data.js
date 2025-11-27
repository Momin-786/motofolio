const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

let uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'motofolio';

// Remove quotes if present
if (uri) {
  uri = uri.replace(/^["']|["']$/g, '');
}

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env.local');
  console.error('Please make sure .env.local exists and contains:');
  console.error('MONGODB_URI=your_connection_string_here');
  console.error('MONGODB_DB=motofolio');
  process.exit(1);
}

// Projects data from components/apps/projects.js
const projectsData = [
  {
    name: "Brain Tumor AI Classifier",
    category: "ai",
    icon: "Brain",
    color: "from-red-500 to-rose-500",
    status: "Completed",
    tech: ["TensorFlow", "Python", "OpenCV", "Deep Learning"],
    description: "A deep learning-based medical image classifier for tumor detection with 94.5% accuracy rate.",
    features: [
      "Automated tumor detection",
      "Multiple tumor type classification",
      "High accuracy prediction (94.5%)",
      "Medical image preprocessing",
      "Result visualization",
      "Clinical report generation"
    ],
    screenshots: ["./screenshots/brain-tumor-1.jpg"],
    demoUrl: "#",
    githubUrl: "https://github.com/Momin-786/",
    year: "2025"
  },
  {
    name: "Job Portal System",
    category: "web",
    icon: "Users",
    color: "from-green-500 to-emerald-500",
    status: "Completed",
    tech: ["MySQL", "Node.js", "React", "Sequelize ORM"],
    description: "A complete job posting and application management system with employer dashboards and applicant tracking.",
    features: [
      "Employer dashboard",
      "Applicant profiles",
      "Job posting management",
      "Application tracking",
      "Secure authentication",
      "Advanced search filters",
      "Resume upload system"
    ],
    screenshots: ["./screenshots/job-portal-1.jpg"],
    demoUrl: "https://job-portal-db-c42r.vercel.app/",
    githubUrl: "https://github.com/Momin-786/JobPortalDB",
    year: "2024"
  },
  {
    name: "Weather Forecast App",
    category: "mobile",
    icon: "CloudSun",
    color: "from-orange-500 to-yellow-500",
    status: "Published",
    tech: ["PostgreSQL", "Docker", "Spring Boot", "Flutter", "Dart", "OpenWeatherMap API", "(React and Nodejs for Web)"],
    description: "A cross-platform weather tracking solution with real-time forecasts and location-based search.",
    features: [
      "Real-time weather forecasts",
      "Multi-day weather view",
      "Location-based search",
      "Weather alerts",
      "Historical data",
      "Cross-platform support",
      "Offline functionality"
    ],
    screenshots: ["./screenshots/weather-app-1.jpg"],
    demoUrl: "https://web-semester-project-brown.vercel.app/",
    githubUrl: "https://github.com/Momin-786/weather_app_flutter",
    year: "2025"
  },
  {
    name: "Ebay",
    category: "mobile",
    icon: "ShoppingCart",
    color: "from-amber-500 to-orange-500",
    status: "In Development",
    tech: ["Flutter", "PostgreSQL", "Docker", "Stripe", "Redis", "Spring Boot"],
    description: "A full-featured e-commerce platform with payment integration and inventory management.",
    features: [
      "Product catalog management",
      "Shopping cart functionality",
      "Payment gateway integration",
      "Order tracking system",
      "Inventory management",
      "Customer reviews",
      "Admin dashboard"
    ],
    screenshots: ["./screenshots/ecommerce-1.jpg"],
    demoUrl: "#",
    githubUrl: "https://github.com/Momin-786/eShop-_Flutter_Project",
    year: "2025"
  },
  {
    name: "Fee Submission SaaS",
    category: "saas",
    icon: "Database",
    color: "from-blue-500 to-cyan-500",
    status: "completed",
    tech: ["React.js", "Spring Boot", "Tailwind CSS", "JWT"],
    description: "A secure, scalable platform for school fee management with multi-school support and automated receipt generation.",
    features: [
      "Role-based access control",
      "Responsive UI design",
      "Real-time payment updates",
      "Multi-school support",
      "Payment history tracking",
      "Automated receipts generation"
    ],
    screenshots: ["./screenshots/fee-system-1.jpg", "./screenshots/fee-system-2.jpg"],
    demoUrl: "https://fee-submission-system-saas-4a5g.vercel.app/",
    githubUrl: "https://github.com/Momin-786/Fee_Submission_System_SAAS",
    year: "2024"
  },
  {
    name: "Blog Application",
    category: "mobile",
    icon: "FileText",
    color: "from-indigo-500 to-purple-500",
    status: "completed",
    tech: ["Flutter", "Firebase", "Cloudinary"],
    description: "A modern blog platform with media management and rich text editing capabilities.",
    features: [
      "Rich text editor",
      "Image upload & optimization",
      "User authentication",
      "Comment system",
      "Social sharing",
      "Responsive design",
      "Offline reading"
    ],
    screenshots: ["./screenshots/blog-app-1.jpg"],
    demoUrl: "#",
    githubUrl: "https://github.com/Momin-786/Blog_App_Flutter",
    year: "2025"
  },
  {
    name: "Modito - Online Code Editor",
    category: "web",
    icon: "Code",
    color: "from-blue-500 to-indigo-500",
    status: "Ongoing",
    tech: ["React", "Vite", "Monaco Editor", "Tailwind CSS", "React Toastify"],
    description: "Lightweight in-browser code editor for real-time HTML, CSS, and JavaScript editing with live preview and project management.",
    features: [
      "Real-time Code Editing",
      "File Renaming and Management",
      "Project Saving to LocalStorage",
      "Copy, Paste, and Reset Content",
      "Live Code Preview",
      "Custom Tab Colors",
      "Toast Notifications",
      "Clipboard API Integration",
      "Syntax Highlighting",
      "Custom Logo and Favicon"
    ],
    industries: ["Education", "Web Development", "Software Development"],
    screenshots: ["./screenshots/modito-1.jpg"],
    demoUrl: "https://web-code-editor-coral.vercel.app/",
    githubUrl: "https://github.com/Momin-786/Web_Code_Edito",
    year: "2025"
  },
  {
    name: "Papi's Feedback App",
    category: "web",
    icon: "MessageSquare",
    color: "from-purple-500 to-pink-500",
    status: "Live",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    description: "A streamlined feedback collection tool for businesses with custom form creation and analytics dashboard.",
    features: [
      "Custom form creation",
      "Real-time feedback collection",
      "Data export capabilities",
      "Analytics dashboard",
      "Multi-format responses",
      "User-friendly interface"
    ],
    screenshots: ["./screenshots/feedback-app-1.jpg"],
    demoUrl: "https://papifeedback.vercel.app/",
    githubUrl: "https://github.com/Momin-786/Feedback_Page",
    year: "2025"
  },
  {
    name: "Auction Website",
    category: "web",
    icon: "Users",
    color: "from-purple-500 to-pink-500",
    status: "Ongoing",
    tech: ["React", "Firebase", "Bootstrap", "GitHub Pages"],
    description: "Simple online auction platform with real-time bidding, hosted on GitHub Pages, using Firebase for authentication and data management.",
    features: [
      "Real-time Bidding",
      "Mobile Responsive UI",
      "Anonymous Username Login",
      "Admin Panel for Auction Management",
      "Detailed Item Listings with Images",
      "Firestore Security Rules",
      "Automatic Deployment via GitHub Pages"
    ],
    industries: ["Charity", "E-commerce", "Fundraising"],
    screenshots: ["./screenshots/auction-website-1.jpg"],
    demoUrl: "https://online-bid-system.vercel.app/",
    githubUrl: "https://github.com/Momin-786/Online_Bid_System",
    year: "2025"
  }
];

// Skills data - flattened from categories
const skillsData = [
  // Programming Languages
  { category: "programming", name: "JavaScript", level: "Expert", years: 4, projects: 15, percentage: 95 },
  { category: "programming", name: "Python", level: "Advanced", years: 3, projects: 8, percentage: 80 },
  { category: "programming", name: "Java", level: "Advanced", years: 3, projects: 6, percentage: 80 },
  { category: "programming", name: "TypeScript", level: "Advanced", years: 2, projects: 10, percentage: 85 },
  { category: "programming", name: "C#", level: "Intermediate", years: 2, projects: 4, percentage: 65 },
  { category: "programming", name: "Dart", level: "Advanced", years: 2, projects: 5, percentage: 75 },
  { category: "programming", name: "SQL", level: "Advanced", years: 3, projects: 12, percentage: 80 },
  { category: "programming", name: "C++", level: "Intermediate", years: 2, projects: 3, percentage: 60 },
  { category: "programming", name: "C", level: "Intermediate", years: 2, projects: 2, percentage: 60 },
  { category: "programming", name: "Kotlin", level: "Beginner", years: 1, projects: 2, percentage: 35 },
  
  // Frontend
  { category: "frontend", name: "React.js", level: "Expert", years: 4, projects: 20, percentage: 95 },
  { category: "frontend", name: "Next.js", level: "Advanced", years: 2, projects: 8, percentage: 85 },
  { category: "frontend", name: "HTML5", level: "Expert", years: 5, projects: 25, percentage: 95 },
  { category: "frontend", name: "Tailwind CSS", level: "Expert", years: 3, projects: 15, percentage: 90 },
  { category: "frontend", name: "Flutter", level: "Advanced", years: 2, projects: 5, percentage: 80 },
  { category: "frontend", name: "Angular", level: "Intermediate", years: 1, projects: 3, percentage: 65 },
  { category: "frontend", name: "Vue.js", level: "Intermediate", years: 1, projects: 4, percentage: 60 },
  { category: "frontend", name: "Vite", level: "Advanced", years: 2, projects: 10, percentage: 75 },
  
  // Backend
  { category: "backend", name: "Node.js", level: "Expert", years: 4, projects: 18, percentage: 95 },
  { category: "backend", name: "Express.js", level: "Expert", years: 4, projects: 15, percentage: 90 },
  { category: "backend", name: "Spring Boot", level: "Advanced", years: 2, projects: 6, percentage: 80 },
  { category: "backend", name: "REST APIs", level: "Expert", years: 4, projects: 20, percentage: 95 },
  { category: "backend", name: "JWT Authentication", level: "Advanced", years: 3, projects: 12, percentage: 85 },
  { category: "backend", name: "Python Flask", level: "Intermediate", years: 2, projects: 4, percentage: 65 },
  
  // Database
  { category: "database", name: "MongoDB", level: "Expert", years: 4, projects: 15, percentage: 90 },
  { category: "database", name: "PostgreSQL", level: "Advanced", years: 3, projects: 10, percentage: 85 },
  { category: "database", name: "MySQL", level: "Advanced", years: 3, projects: 12, percentage: 80 },
  { category: "database", name: "Sequelize ORM", level: "Advanced", years: 3, projects: 8, percentage: 75 },
  { category: "database", name: "Firebase", level: "Intermediate", years: 2, projects: 6, percentage: 70 },
  
  // AI & ML
  { category: "ai", name: "TensorFlow", level: "Advanced", years: 2, projects: 5, percentage: 80 },
  { category: "ai", name: "Deep Learning", level: "Advanced", years: 2, projects: 4, percentage: 75 },
  { category: "ai", name: "Computer Vision", level: "Intermediate", years: 2, projects: 3, percentage: 70 },
  { category: "ai", name: "OpenCV", level: "Intermediate", years: 2, projects: 3, percentage: 65 },
  { category: "ai", name: "Classification Systems", level: "Advanced", years: 2, projects: 4, percentage: 80 },
  { category: "ai", name: "Predictive Modeling", level: "Intermediate", years: 1, projects: 2, percentage: 60 },
  { category: "ai", name: "AI Automation", level: "Intermediate", years: 1, projects: 3, percentage: 65 },
  
  // Mobile
  { category: "mobile", name: "Flutter", level: "Advanced", years: 2, projects: 5, percentage: 80 },
  { category: "mobile", name: "React Native", level: "Intermediate", years: 1, projects: 3, percentage: 65 },
  { category: "mobile", name: "Dart", level: "Advanced", years: 2, projects: 5, percentage: 75 },
  { category: "mobile", name: "Mobile UI/UX", level: "Advanced", years: 2, projects: 8, percentage: 85 },
  { category: "mobile", name: "Firebase Integration", level: "Intermediate", years: 2, projects: 4, percentage: 70 },
  
  // Tools
  { category: "tools", name: "Git", level: "Expert", years: 4, projects: 30, percentage: 95 },
  { category: "tools", name: "Docker", level: "Intermediate", years: 2, projects: 6, percentage: 70 },
  { category: "tools", name: "Postman", level: "Expert", years: 3, projects: 20, percentage: 90 },
  { category: "tools", name: "Vercel", level: "Advanced", years: 2, projects: 15, percentage: 85 },
  { category: "tools", name: "Swagger", level: "Intermediate", years: 2, projects: 8, percentage: 65 },
  { category: "tools", name: "Bruno", level: "Intermediate", years: 1, projects: 5, percentage: 60 },
  { category: "tools", name: "Botpress", level: "Beginner", years: 1, projects: 2, percentage: 40 },
  { category: "tools", name: "n8n", level: "Beginner", years: 1, projects: 1, percentage: 35 }
];

// About data
const aboutData = [
  {
    section: "overview",
    title: "Overview",
    order: 1,
    content: {
      name: "Abdul Momin",
      title: "Full-Stack Developer & AI Enthusiast",
      location: "Gujranwala, Punjab, Pakistan",
      description: "Hello, I'm Momin — a full-stack developer and AI enthusiast with a Bachelor's degree in Software Engineering from COMSATS University Abbottabad in 2026, where I graduated with a 4.0 CGPA.\n\nI've developed solutions for web, mobile, and AI-driven systems, focusing on clean, maintainable code and real-world business impact. My approach blends technical expertise with a client-first mindset, ensuring that every project I deliver is scalable, secure, and intuitive.\n\nI work confidently both as part of agile development teams and as an independent freelancer, delivering results on time without compromising quality. Beyond development, I'm deeply interested in artificial intelligence, having created intelligent solutions like a brain tumor classification system using deep learning."
    }
  },
  {
    section: "education",
    title: "Education",
    order: 2,
    content: {
      degree: "Bachelor's in Software Engineering",
      university: "COMSATS University Abbottabad",
      period: "2022 - 2026",
      cgpa: "4.0",
      achievements: ["Outstanding Academic Performance", "2x Best Result Awards", "25+ Technologies Learned"]
    }
  },
  {
    section: "achievements",
    title: "Achievements",
    order: 3,
    content: {
      items: [
        {
          title: "Best Academic Result Award",
          description: "Awarded twice at COMSATS University (2023 & 2025)"
        },
        {
          title: "Multiple Full-Stack Solutions",
          description: "Delivered AI-powered solutions for clients across various industries"
        },
        {
          title: "Code Quality Recognition",
          description: "Recognized for producing reusable, maintainable code with focus on performance"
        },
        {
          title: "AI Innovation",
          description: "Created brain tumor classification system using deep learning"
        }
      ]
    }
  },
  {
    section: "approach",
    title: "Work Approach",
    order: 4,
    content: {
      steps: [
        {
          step: "01",
          title: "Understanding Requirements",
          description: "Listening carefully to client needs and goals"
        },
        {
          step: "02",
          title: "Designing the Solution",
          description: "Crafting user-focused, scalable architecture"
        },
        {
          step: "03",
          title: "Building with Quality",
          description: "Writing clean, maintainable code with best practices"
        },
        {
          step: "04",
          title: "Testing & Delivery",
          description: "Ensuring stability, security, and user satisfaction"
        }
      ]
    }
  }
];

async function migrateData() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(dbName);
    
    // Migrate Projects
    console.log('\n📦 Migrating Projects...');
    const projectsCollection = db.collection('projects');
    const existingProjects = await projectsCollection.countDocuments();
    
    if (existingProjects > 0) {
      console.log(`⚠️  Found ${existingProjects} existing projects. Clearing collection...`);
      await projectsCollection.deleteMany({});
    }
    
    const projectsWithDates = projectsData.map(project => ({
      ...project,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    const projectsResult = await projectsCollection.insertMany(projectsWithDates);
    console.log(`✅ Inserted ${projectsResult.insertedCount} projects`);
    
    // Migrate Skills
    console.log('\n💻 Migrating Skills...');
    const skillsCollection = db.collection('skills');
    const existingSkills = await skillsCollection.countDocuments();
    
    if (existingSkills > 0) {
      console.log(`⚠️  Found ${existingSkills} existing skills. Clearing collection...`);
      await skillsCollection.deleteMany({});
    }
    
    const skillsWithDates = skillsData.map(skill => ({
      ...skill,
      createdAt: new Date()
    }));
    
    const skillsResult = await skillsCollection.insertMany(skillsWithDates);
    console.log(`✅ Inserted ${skillsResult.insertedCount} skills`);
    
    // Migrate About
    console.log('\n📄 Migrating About sections...');
    const aboutCollection = db.collection('about');
    const existingAbout = await aboutCollection.countDocuments();
    
    if (existingAbout > 0) {
      console.log(`⚠️  Found ${existingAbout} existing about sections. Clearing collection...`);
      await aboutCollection.deleteMany({});
    }
    
    const aboutWithDates = aboutData.map(section => ({
      ...section,
      updatedAt: new Date()
    }));
    
    const aboutResult = await aboutCollection.insertMany(aboutWithDates);
    console.log(`✅ Inserted ${aboutResult.insertedCount} about sections`);
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Projects: ${projectsResult.insertedCount}`);
    console.log(`   - Skills: ${skillsResult.insertedCount}`);
    console.log(`   - About sections: ${aboutResult.insertedCount}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run migration
migrateData();

