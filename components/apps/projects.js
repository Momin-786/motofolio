import React, { useState, useEffect } from "react";
import { 
  Code, 
  Database, 
  Globe, 
  Brain, 
  Smartphone, 
  ShoppingCart, 
  MessageSquare, 
  CloudSun,
  FileText,
  Bot,
  Users,
  Search,
  X,
  ExternalLink,
  Github,
  Calendar,
  CheckCircle,
  Play,
  Monitor,
  Filter
} from "lucide-react";

const ProjectsApp = ({ onClose }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Project data with enhanced information
  const projects = [
    {
   id: 1,
      name: "Brain Tumor AI Classifier",
      category: "ai",
      icon: Brain,
      color: "from-red-500 to-rose-500",
      status: "Research Complete",
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
      githubUrl: "#",
      year: "2025"
    },
    {
      id: 2,
      name: "Job Portal System",
      category: "web",
      icon: Users,
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
      demoUrl: "#",
      githubUrl: "#",
      year: "2024"
    },
    {
      id: 3,
      name: "Papi's Feedback App",
      category: "web",
      icon: MessageSquare,
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
      demoUrl: "#",
      githubUrl: "#",
      year: "2025"
    },
    {
      id: 4,
      name: "Weather Forecast App",
      category: "mobile",
      icon: CloudSun,
      color: "from-orange-500 to-yellow-500",
      status: "Published",
      tech: ["PostgreSQL", "Docker", "Spring Boot", "Flutter"],
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
      demoUrl: "#",
      githubUrl: "#",
      year: "2025"
    },
    {
     
            id: 5,
      name: "Fee Submission SaaS",
      category: "saas",
      icon: Database,
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
      demoUrl: "#",
      githubUrl: "#",
      year: "2024"
    },
    {
      id: 6,
      name: "Blog Application",
      category: "mobile",
      icon: FileText,
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
      githubUrl: "#",
      year: "2025"
    },
    {
      id: 7,
      name: "Custom AI Solutions",
      category: "ai",
      icon: Bot,
      color: "from-teal-500 to-cyan-500",
      status: "Ongoing",
      tech: ["Python", "TensorFlow", "OpenCV", "NLP"],
      description: "Tailored AI models for automation and intelligent decision-making across multiple industries.",
      features: [
        "Predictive Analytics",
        "Process Automation",
        "Computer Vision",
        "Natural Language Processing",
        "Recommendation Systems",
        "Anomaly Detection",
        "Custom ML Models"
      ],
      industries: ["Healthcare", "E-commerce", "Finance", "Manufacturing", "Education"],
      screenshots: ["./screenshots/ai-solutions-1.jpg"],
      demoUrl: "#",
      githubUrl: "#",
      year: "2025"
    },
    {
      id: 8,
      name: "E-Commerce Platform",
      category: "web",
      icon: ShoppingCart,
      color: "from-amber-500 to-orange-500",
      status: "In Development",
      tech: ["Next.js", "PostgreSQL", "Stripe", "Redis"],
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
      githubUrl: "#",
      year: "2025"
    }
  ];

  const categories = [
    { id: "all", name: "All", count: projects.length },
    { id: "web", name: "Web", count: projects.filter(p => p.category === "web").length },
    { id: "mobile", name: "Mobile", count: projects.filter(p => p.category === "mobile").length },
    { id: "ai", name: "AI/ML", count: projects.filter(p => p.category === "ai").length },
    { id: "saas", name: "SaaS", count: projects.filter(p => p.category === "saas").length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === "all" || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "production":
      case "live":
      case "published":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "in development":
      case "active development":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "ongoing":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (selectedProject) {
          setSelectedProject(null);
        } else if (onClose) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedProject, onClose]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-mono overflow-hidden">
      <div className="w-full h-full flex flex-col">
        {!selectedProject ? (
          <>
            {/* Controls Bar - Compact for window */}
            <div className="flex-shrink-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 p-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    My Projects
                  </h1>
                  {onClose && (
                    <button
                      onClick={onClose}
                      className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                    />
                  </div>

                  {/* Category Filters - Horizontal scroll */}
                  <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setFilterCategory(category.id)}
                        className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-all flex-shrink-0 ${
                          filterCategory === category.id
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "hover:bg-gray-700/50 text-gray-300 border border-transparent"
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Grid - Modified for single row layout */}
            <div className="flex-1 overflow-auto p-3">
              {filteredProjects.length > 0 ? (
                <div className="space-y-3">
                  {filteredProjects.map(project => {
                    const IconComponent = project.icon;
                    return (
                      <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="group cursor-pointer bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 hover:bg-gray-800/60 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                      >
                        <div className="flex items-center gap-4">
                          {/* Project Icon */}
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${project.color} text-white shadow-lg flex-shrink-0`}>
                            <IconComponent className="w-8 h-8" />
                          </div>

                          {/* Project Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                                {project.name}
                              </h3>
                              <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(project.status)} flex-shrink-0 ml-2`}>
                                {project.status}
                              </span>
                            </div>
                            
                            <p className="text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                              {project.description}
                            </p>

                            <div className="flex items-center justify-between">
                              {/* Tech Stack */}
                              <div className="flex flex-wrap gap-1">
                                {project.tech.slice(0, 3).map(tech => (
                                  <span
                                    key={tech}
                                    className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.tech.length > 3 && (
                                  <span className="text-xs px-2 py-1 bg-gray-700/50 text-gray-400 rounded-full">
                                    +{project.tech.length - 3}
                                  </span>
                                )}
                              </div>

                              {/* Year and Arrow */}
                              <div className="flex items-center gap-3 flex-shrink-0">
                                <div className="flex items-center text-gray-400 text-sm">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {project.year}
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ExternalLink className="w-4 h-4 text-blue-400" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-400 mb-2">No projects found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Project Detail View - Compact for window */
          <div className="h-full flex flex-col overflow-hidden">
            {/* Project Header - Reduced height */}
            <div className="relative flex-shrink-0">
              <div className={`h-32 bg-gradient-to-r ${selectedProject.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center text-white">
                    <div className="mb-2">
                      {React.createElement(selectedProject.icon, { className: "w-10 h-10 mx-auto" })}
                    </div>
                    <h1 className="text-xl font-bold mb-1">{selectedProject.name}</h1>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full border ${getStatusColor(selectedProject.status)} bg-black/20`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-3 right-3 p-1.5 bg-black/20 backdrop-blur-sm rounded-lg hover:bg-black/30 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                {/* Description */}
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                  <h2 className="text-lg font-semibold text-white mb-2">About This Project</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Two Column Layout for better space usage */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Features */}
                  <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h2 className="text-lg font-semibold text-white mb-3">Key Features</h2>
                    <div className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack & Info */}
                  <div className="space-y-4">
                    {/* Tech Stack */}
                    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Tech Stack</h3>
                      <div className="space-y-1.5">
                        {selectedProject.tech.map(tech => (
                          <div key={tech} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                            <span className="text-gray-300 text-xs">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Links</h3>
                      <div className="space-y-2">
                        <button className="w-full flex items-center justify-center space-x-2 p-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors text-sm">
                          <Play className="w-3 h-3" />
                          <span>Live Demo</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 p-2 bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                          <Github className="w-3 h-3" />
                          <span>Source Code</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Industries (for AI Solutions) */}
                {selectedProject.industries && (
                  <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h2 className="text-lg font-semibold text-white mb-3">Target Industries</h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.industries.map(industry => (
                        <span
                          key={industry}
                          className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-500/30"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsApp;

export const displayProjects = (props) => {
  return <ProjectsApp {...props} />;
};