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

const ProjectsApp = ({ onClose, projectsData = [] }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [projects, setProjects] = useState(projectsData);

  // Use provided data or fetch from API
  useEffect(() => {
    if (projectsData && projectsData.length > 0) {
      setProjects(projectsData);
    } else {
      // Fallback to hardcoded data if API not available
      fetchProjects();
    }
  }, [projectsData]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to hardcoded data
      setProjects([
    {
   id: 1,
      name: "Brain Tumor AI Classifier",
      category: "ai",
      icon: Brain,
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
      demoUrl: "https://job-portal-db-c42r.vercel.app/",
      githubUrl: "https://github.com/Momin-786/JobPortalDB",
      year: "2024"
    },
    {
        id: 3,
      name: "Weather Forecast App",
      category: "mobile",
      icon: CloudSun,
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
       id: 4,
      name: "Ebay",
      category: "mobile",
      icon: ShoppingCart,
      color: "from-amber-500 to-orange-500",
      status: "In Development",
      tech: ["Flutter", "PostgreSQL","Docker", "Stripe", "Redis", "Spring Boot"],
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
      demoUrl: "https://fee-submission-system-saas-4a5g.vercel.app/",
      githubUrl: "https://github.com/Momin-786/Fee_Submission_System_SAAS",
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
      githubUrl: "https://github.com/Momin-786/Blog_App_Flutter",
      year: "2025"
    },
{
  id: 7,
  name: "Modito - Online Code Editor",
  category: "web",
  icon: Code,
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
      id: 8,
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
      demoUrl: "https://papifeedback.vercel.app/",
      githubUrl: "https://github.com/Momin-786/Feedback_Page",
      year: "2025"
    },
    {
  id: 9,
  name: "Auction Website",
  category: "web",
  icon: Users,
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
      ]);
    }
  };

  const categories = [
    { id: "all", name: "All", count: projects.length },
    { id: "web", name: "Web", count: projects.filter(p => p.category === "web").length },
    { id: "mobile", name: "Mobile", count: projects.filter(p => p.category === "mobile").length },
    { id: "ai", name: "AI/ML", count: projects.filter(p => p.category === "ai").length },
    { id: "saas", name: "SaaS", count: projects.filter(p => p.category === "saas").length }
  ];

  // Map icon names to components
  const iconMap = {
    Brain, Users, CloudSun, ShoppingCart, Database, FileText, Code, MessageSquare
  };

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

  const handleLinkClick = (url, type) => {
    if (url === "#") {
      alert(`${type} not available yet - Coming soon!`);
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
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
    <div className="w-full h-full bg-[#1E1E1E] font-['Ubuntu_Mono',monospace] overflow-hidden ubuntu-scrollbar">
      <div className="w-full h-full flex flex-col">
        {!selectedProject ? (
          <>
            {/* Ubuntu-style Header */}
            <div className="flex-shrink-0 bg-[#2D2D2D] border-b border-[#3D3D3D] p-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h1 className="text-base font-medium text-white" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                    Projects
                  </h1>
                  {onClose && (
                    <button
                      onClick={onClose}
                      className="ubuntu-button p-1.5"
                      style={{ padding: '4px 8px', minWidth: 'auto' }}
                    >
                      <X className="w-4 h-4 text-[#B3B3B3]" />
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  {/* Search Bar - Ubuntu style */}
                  <div className="relative flex-1">
                    <Search className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-[#808080]" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="ubuntu-input pl-8 md:pl-10 text-xs md:text-sm"
                    />
                  </div>

                  {/* Category Filters - Ubuntu tabs style - Scrollable on mobile */}
                  <div className="flex items-center space-x-1 md:space-x-2 overflow-x-auto ubuntu-scrollbar">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setFilterCategory(category.id)}
                        className={`ubuntu-tab whitespace-nowrap flex-shrink-0 ${
                          filterCategory === category.id ? 'active' : ''
                        }`}
                        style={{ padding: '4px 8px', fontSize: '11px' }}
                      >
                        <span className="hidden sm:inline">{category.name} </span>
                        <span>({category.count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Projects List - Nautilus-style */}
            <div className="flex-1 overflow-auto bg-[#1E1E1E]">
              {filteredProjects.length > 0 ? (
                <div>
                  {filteredProjects.map(project => {
                    // Handle icon - can be component or string
                    const IconComponent = typeof project.icon === 'string' 
                      ? iconMap[project.icon] || Code 
                      : project.icon || Code;
                    return (
                      <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="ubuntu-list-item cursor-pointer p-2 md:p-3"
                      >
                        {/* Project Icon - Minimal */}
                        <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center mr-2 md:mr-3 flex-shrink-0">
                          <IconComponent className="w-4 h-4 md:w-6 md:h-6 text-[#E95420]" />
                        </div>

                        {/* Project Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                            <h3 className="text-xs md:text-sm font-medium text-white truncate" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                              {project.name}
                            </h3>
                            <span className={`px-1.5 md:px-2 py-0.5 text-xs border flex-shrink-0 self-start sm:self-auto ${
                              project.status.toLowerCase() === 'completed' || project.status.toLowerCase() === 'live' 
                                ? 'bg-[#4CAF50]/20 text-[#4CAF50] border-[#4CAF50]/30'
                                : 'bg-[#2D2D2D] text-[#B3B3B3] border-[#3D3D3D]'
                            }`} style={{ fontSize: '10px' }}>
                              {project.status}
                            </span>
                          </div>
                          
                          <p className="text-[#B3B3B3] text-xs mb-2 line-clamp-2 md:line-clamp-1" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                            {project.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs text-[#808080]">
                            <span className="hidden sm:inline">{project.tech.slice(0, 2).join(', ')}</span>
                            <span className="sm:hidden">{project.tech[0]}</span>
                            {project.tech.length > 2 && <span className="hidden sm:inline">+{project.tech.length - 2}</span>}
                            {project.tech.length > 1 && <span className="hidden sm:inline mx-1">•</span>}
                            <Calendar className="w-3 h-3" />
                            <span>{project.year}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10 md:py-20">
                  <Search className="w-8 h-8 md:w-12 md:h-12 text-[#808080] mx-auto mb-4" />
                  <h3 className="text-sm md:text-base font-medium text-[#B3B3B3] mb-2" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>No projects found</h3>
                  <p className="text-[#808080] text-xs md:text-sm" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Project Detail View - Ubuntu style */
          <div className="h-full flex flex-col overflow-hidden bg-[#1E1E1E]">
            {/* Project Header - Ubuntu style */}
            <div className="relative flex-shrink-0 bg-[#2D2D2D] border-b border-[#3D3D3D] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {React.createElement(IconComponent, { className: "w-8 h-8 text-[#E95420]" })}
                  <div>
                    <h1 className="text-base font-medium text-white mb-1" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                      {selectedProject.name}
                    </h1>
                    <span className={`inline-block px-2 py-0.5 text-xs border ${
                      selectedProject.status.toLowerCase() === 'completed' || selectedProject.status.toLowerCase() === 'live' 
                        ? 'bg-[#4CAF50]/20 text-[#4CAF50] border-[#4CAF50]/30'
                        : 'bg-[#2D2D2D] text-[#B3B3B3] border-[#3D3D3D]'
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="ubuntu-button p-1.5"
                  style={{ padding: '4px 8px', minWidth: 'auto' }}
                >
                  <X className="w-4 h-4 text-[#B3B3B3]" />
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-auto p-4 ubuntu-scrollbar">
              <div className="space-y-4">
                {/* Description */}
                <div className="ubuntu-card">
                  <h2 className="text-sm font-medium text-white mb-2" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>About This Project</h2>
                  <p className="text-[#B3B3B3] text-xs leading-relaxed" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>{selectedProject.description}</p>
                </div>

                {/* Two Column Layout - Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                  {/* Features */}
                  <div className="ubuntu-card">
                    <h2 className="text-sm font-medium text-white mb-3" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Key Features</h2>
                    <div className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-3 h-3 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                          <span className="text-[#B3B3B3] text-xs" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack & Info */}
                  <div className="space-y-4">
                    {/* Tech Stack */}
                    <div className="ubuntu-card">
                      <h3 className="text-sm font-medium text-white mb-3" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Tech Stack</h3>
                      <div className="space-y-1.5">
                        {selectedProject.tech.map(tech => (
                          <div key={tech} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#E95420] rounded-full" />
                            <span className="text-[#B3B3B3] text-xs" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="ubuntu-card">
                      <h3 className="text-sm font-medium text-white mb-3" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Links</h3>
                      <div className="space-y-2">
                        <button 
                          onClick={() => handleLinkClick(selectedProject.demoUrl, 'Demo')}
                          className="ubuntu-button primary w-full flex items-center justify-center space-x-2 text-sm"
                        >
                          <Play className="w-3 h-3" />
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => handleLinkClick(selectedProject.githubUrl, 'GitHub Repository')}
                          className="ubuntu-button w-full flex items-center justify-center space-x-2 text-sm"
                        >
                          <Github className="w-3 h-3" />
                          <span>Source Code</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Industries (for AI Solutions) */}
                {selectedProject.industries && (
                  <div className="ubuntu-card">
                    <h2 className="text-sm font-medium text-white mb-3" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Target Industries</h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.industries.map(industry => (
                        <span
                          key={industry}
                          className="px-2 py-1 bg-[#2D2D2D] text-[#B3B3B3] border border-[#3D3D3D] text-xs"
                          style={{ fontFamily: "'Ubuntu Mono', monospace" }}
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

// For SSR - fetch projects data
export async function getProjectsData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
    const response = await fetch(`${baseUrl}/projects`, { cache: 'no-store' });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}