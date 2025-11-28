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
      if (data.success && data.data && data.data.length > 0) {
        setProjects(data.data);
      } else {
        console.warn('No projects data available from API');
        setProjects([]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  };

  // All data comes from MongoDB - no hardcoded fallback

  // Helper function to check if project has category (handles both string and array)
  const hasCategory = (project, category) => {
    if (!project.category) return false;
    if (Array.isArray(project.category)) {
      return project.category.includes(category);
    }
    return project.category === category;
  };

  const categories = [
    { id: "all", name: "All", count: projects.length },
    { id: "web", name: "Web", count: projects.filter(p => hasCategory(p, "web")).length },
    { id: "mobile", name: "Mobile", count: projects.filter(p => hasCategory(p, "mobile")).length },
    { id: "ai", name: "AI/ML", count: projects.filter(p => hasCategory(p, "ai")).length },
    { id: "saas", name: "SaaS", count: projects.filter(p => hasCategory(p, "saas")).length }
  ];

  // Map icon names to components
  const iconMap = {
    Brain, Users, CloudSun, ShoppingCart, Database, FileText, Code, MessageSquare
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (Array.isArray(project.tech) && project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCategory = filterCategory === "all" || hasCategory(project, filterCategory);
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "production":
      case "live":
      case "published":
        return "bg-[#2D2D2D] text-[#4CAF50] border-[#4CAF50]/30";
      case "completed":
        return "bg-[#2D2D2D] text-[#B3B3B3] border-[#3D3D3D]";
      case "in development":
      case "active development":
        return "bg-[#2D2D2D] text-[#E95420] border-[#E95420]/30";
      case "ongoing":
        return "bg-[#2D2D2D] text-[#B3B3B3] border-[#3D3D3D]";
      default:
        return "bg-[#2D2D2D] text-[#808080] border-[#3D3D3D]";
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
                    <Search className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-[#808080] z-10 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="    Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="ubuntu-input pl-8 md:pl-10 text-xs md:text-sm relative z-0"
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
            <div 
                className="flex-1 overflow-auto bg-[#1E1E1E] ubuntu-scrollbar"
                style={{
                    transform: 'translateZ(0)',
                    willChange: 'scroll-position',
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehavior: 'contain'
                }}
            >
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
                  {(() => {
                    // Handle icon - can be component or string
                    const IconComponent = typeof selectedProject.icon === 'string' 
                      ? iconMap[selectedProject.icon] || Code 
                      : selectedProject.icon || Code;
                    return <IconComponent className="w-8 h-8 text-[#E95420]" />;
                  })()}
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
            <div 
                className="flex-1 overflow-auto p-4 ubuntu-scrollbar"
                style={{
                    transform: 'translateZ(0)',
                    willChange: 'scroll-position',
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehavior: 'contain'
                }}
            >
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
                      {selectedProject.features && Array.isArray(selectedProject.features) && selectedProject.features.length > 0 ? (
                        selectedProject.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                            <span className="text-[#B3B3B3] text-xs" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>{feature}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-[#808080] text-xs" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>No features listed</span>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack & Info */}
                  <div className="space-y-4">
                    {/* Tech Stack */}
                    <div className="ubuntu-card">
                      <h3 className="text-sm font-medium text-white mb-3" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Tech Stack</h3>
                      <div className="space-y-1.5">
                        {selectedProject.tech && Array.isArray(selectedProject.tech) && selectedProject.tech.length > 0 ? (
                          selectedProject.tech.map(tech => (
                            <div key={tech} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-[#E95420] rounded-full" />
                              <span className="text-[#B3B3B3] text-xs" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>{tech}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-[#808080] text-xs" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>No tech stack listed</span>
                        )}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="ubuntu-card">
                      <h3 className="text-sm font-medium text-white mb-3" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Links</h3>
                      <div className="space-y-2">
                        {(selectedProject.demoUrl || selectedProject.liveUrl) && (
                          <button 
                            onClick={() => handleLinkClick(selectedProject.demoUrl || selectedProject.liveUrl, 'Demo')}
                            className="ubuntu-button primary w-full flex items-center justify-center space-x-2 text-sm"
                          >
                            <Play className="w-3 h-3" />
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                        {selectedProject.githubUrl && (
                          <button 
                            onClick={() => handleLinkClick(selectedProject.githubUrl, 'GitHub Repository')}
                            className="ubuntu-button w-full flex items-center justify-center space-x-2 text-sm"
                          >
                            <Github className="w-3 h-3" />
                            <span>Source Code</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                        {!selectedProject.demoUrl && !selectedProject.liveUrl && !selectedProject.githubUrl && (
                          <span className="text-[#808080] text-xs" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>No links available</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Industries (for AI Solutions) */}
                {selectedProject.industries && (
                  <div className="ubuntu-card">
                    <h2 className="text-sm font-medium text-white mb-3" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Target Industries</h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.industries && Array.isArray(selectedProject.industries) && selectedProject.industries.length > 0 ? (
                        selectedProject.industries.map(industry => (
                          <span
                            key={industry}
                            className="px-2 py-1 bg-[#2D2D2D] text-[#B3B3B3] border border-[#3D3D3D] text-xs"
                            style={{ fontFamily: "'Ubuntu Mono', monospace" }}
                          >
                            {industry}
                          </span>
                        ))
                      ) : (
                        <span className="text-[#808080] text-xs" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>No industries listed</span>
                      )}
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