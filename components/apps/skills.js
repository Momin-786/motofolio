import React, { useState, useEffect } from "react";
import { 
  Code, 
  Database, 
  Globe, 
  Brain, 
  Smartphone, 
  Server, 
  Settings,
  Search,
  X,
  Star,
  TrendingUp,
  Award,
  Calendar,
  Target,
  Activity
} from "lucide-react";

const SkillsApp = ({ onClose, skillsData: propsSkillsData = [] }) => {
  const [activeCategory, setActiveCategory] = useState("programming");
  const [searchQuery, setSearchQuery] = useState("");
  const [skills, setSkills] = useState({});

  // Use provided data or fetch from API
  useEffect(() => {
    if (propsSkillsData && propsSkillsData.length > 0) {
      // Transform database data to match component structure
      const transformedSkills = transformSkillsData(propsSkillsData);
      setSkills(transformedSkills);
    } else {
      fetchSkills();
    }
  }, [propsSkillsData]);

  const transformSkillsData = (data) => {
    // Group skills by category
    const grouped = {};
    data.forEach(skill => {
      if (!grouped[skill.category]) {
        grouped[skill.category] = {
          name: skill.category,
          icon: Code,
          skills: []
        };
      }
      grouped[skill.category].skills.push(skill);
    });
    return grouped;
  };

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const data = await response.json();
      if (data.success) {
        const transformed = transformSkillsData(data.data);
        setSkills(transformed);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  // Hardcoded skills data organized by categories (fallback)
  const hardcodedSkillsData = {
    programming: {
      name: "Programming Languages",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      description: "Core programming languages I use for development",
      skills: [
        { name: "JavaScript", level: "Expert", years: 4, projects: 15, percentage: 95 },
        { name: "Python", level: "Advanced", years: 3, projects: 8, percentage: 80 },
        { name: "Java", level: "Advanced", years: 3, projects: 6, percentage: 80 },
        { name: "TypeScript", level: "Advanced", years: 2, projects: 10, percentage: 85 },
        { name: "C#", level: "Intermediate", years: 2, projects: 4, percentage: 65 },
        { name: "Dart", level: "Advanced", years: 2, projects: 5, percentage: 75 },
        { name: "SQL", level: "Advanced", years: 3, projects: 12, percentage: 80 },
        { name: "C++", level: "Intermediate", years: 2, projects: 3, percentage: 60 },
        { name: "C", level: "Intermediate", years: 2, projects: 2, percentage: 60 },
        { name: "Kotlin", level: "Beginner", years: 1, projects: 2, percentage: 35 }
      ]
    },
    frontend: {
      name: "Frontend Development",
      icon: Globe,
      color: "from-green-500 to-emerald-500",
      description: "Creating responsive and interactive user interfaces",
      skills: [
        { name: "React.js", level: "Expert", years: 4, projects: 20, percentage: 95 },
        { name: "Next.js", level: "Advanced", years: 2, projects: 8, percentage: 85 },
        { name: "HTML5", level: "Expert", years: 5, projects: 25, percentage: 95 },
        { name: "Tailwind CSS", level: "Expert", years: 3, projects: 15, percentage: 90 },
        { name: "Flutter", level: "Advanced", years: 2, projects: 5, percentage: 80 },
        { name: "Angular", level: "Intermediate", years: 1, projects: 3, percentage: 65 },
        { name: "Vue.js", level: "Intermediate", years: 1, projects: 4, percentage: 60 },
        { name: "Vite", level: "Advanced", years: 2, projects: 10, percentage: 75 }
      ]
    },
    backend: {
      name: "Backend Development",
      icon: Server,
      color: "from-purple-500 to-pink-500",
      description: "Building robust server-side applications and APIs",
      skills: [
        { name: "Node.js", level: "Expert", years: 4, projects: 18, percentage: 95 },
        { name: "Express.js", level: "Expert", years: 4, projects: 15, percentage: 90 },
        { name: "Spring Boot", level: "Advanced", years: 2, projects: 6, percentage: 80 },
        { name: "REST APIs", level: "Expert", years: 4, projects: 20, percentage: 95 },
        { name: "JWT Authentication", level: "Advanced", years: 3, projects: 12, percentage: 85 },
        { name: "Python Flask", level: "Intermediate", years: 2, projects: 4, percentage: 65 }
      ]
    },
    database: {
      name: "Databases",
      icon: Database,
      color: "from-orange-500 to-red-500",
      description: "Data storage and management solutions",
      skills: [
        { name: "MongoDB", level: "Expert", years: 4, projects: 15, percentage: 90 },
        { name: "PostgreSQL", level: "Advanced", years: 3, projects: 10, percentage: 85 },
        { name: "MySQL", level: "Advanced", years: 3, projects: 12, percentage: 80 },
        { name: "Sequelize ORM", level: "Advanced", years: 3, projects: 8, percentage: 75 },
        { name: "Firebase", level: "Intermediate", years: 2, projects: 6, percentage: 70 }
      ]
    },
    ai: {
      name: "AI & Machine Learning",
      icon: Brain,
      color: "from-indigo-500 to-purple-500",
      description: "Artificial intelligence and machine learning technologies",
      skills: [
        { name: "TensorFlow", level: "Advanced", years: 2, projects: 5, percentage: 80 },
        { name: "Deep Learning", level: "Advanced", years: 2, projects: 4, percentage: 75 },
        { name: "Computer Vision", level: "Intermediate", years: 2, projects: 3, percentage: 70 },
        { name: "OpenCV", level: "Intermediate", years: 2, projects: 3, percentage: 65 },
        { name: "Classification Systems", level: "Advanced", years: 2, projects: 4, percentage: 80 },
        { name: "Predictive Modeling", level: "Intermediate", years: 1, projects: 2, percentage: 60 },
        { name: "AI Automation", level: "Intermediate", years: 1, projects: 3, percentage: 65 }
      ]
    },
    mobile: {
      name: "Mobile Development",
      icon: Smartphone,
      color: "from-teal-500 to-cyan-500",
      description: "Cross-platform mobile application development",
      skills: [
        { name: "Flutter", level: "Advanced", years: 2, projects: 5, percentage: 80 },
        { name: "React Native", level: "Intermediate", years: 1, projects: 3, percentage: 65 },
        { name: "Dart", level: "Advanced", years: 2, projects: 5, percentage: 75 },
        { name: "Mobile UI/UX", level: "Advanced", years: 2, projects: 8, percentage: 85 },
        { name: "Firebase Integration", level: "Intermediate", years: 2, projects: 4, percentage: 70 }
      ]
    },
    tools: {
      name: "DevOps & Tools",
      icon: Settings,
      color: "from-yellow-500 to-orange-500",
      description: "Development tools and deployment technologies",
      skills: [
        { name: "Git", level: "Expert", years: 4, projects: 30, percentage: 95 },
        { name: "Docker", level: "Intermediate", years: 2, projects: 6, percentage: 70 },
        { name: "Postman", level: "Expert", years: 3, projects: 20, percentage: 90 },
        { name: "Vercel", level: "Advanced", years: 2, projects: 15, percentage: 85 },
        { name: "Swagger", level: "Intermediate", years: 2, projects: 8, percentage: 65 },
        { name: "Bruno", level: "Intermediate", years: 1, projects: 5, percentage: 60 },
        { name: "Botpress", level: "Beginner", years: 1, projects: 2, percentage: 40 },
        { name: "n8n", level: "Beginner", years: 1, projects: 1, percentage: 35 }
      ]
    }
  };

  // Use transformed data or fallback to hardcoded
  const skillsDataStructure = Object.keys(skills).length > 0 ? skills : hardcodedSkillsData;
  const categories = Object.keys(skillsDataStructure);
  const currentCategory = skillsDataStructure[activeCategory] || hardcodedSkillsData.programming || {
    name: "Programming Languages",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    description: "Core programming languages",
    skills: []
  };

  const filteredSkills = (currentCategory.skills || []).filter(skill =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "expert":
        return "bg-[#4CAF50]/20 text-[#4CAF50] border-[#4CAF50]/30";
      case "advanced":
        return "bg-[#2D2D2D] text-[#B3B3B3] border-[#3D3D3D]";
      case "intermediate":
        return "bg-[#2D2D2D] text-[#B3B3B3] border-[#3D3D3D]";
      case "beginner":
        return "bg-[#2D2D2D] text-[#808080] border-[#3D3D3D]";
      default:
        return "bg-[#2D2D2D] text-[#B3B3B3] border-[#3D3D3D]";
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="w-full h-full bg-[#1E1E1E] font-['Ubuntu_Mono',monospace] overflow-hidden ubuntu-scrollbar">
      <div className="w-full h-full flex flex-col">
        
        {/* Ubuntu-style Header */}
        <div className="flex-shrink-0 bg-[#2D2D2D] border-b border-[#3D3D3D] p-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-base font-medium text-white" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
              Skills & Expertise
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

          {/* Category Tabs - Ubuntu style - Responsive */}
          <div className="flex gap-1 md:gap-2 overflow-x-auto ubuntu-scrollbar pb-2">
            {categories.map(categoryKey => {
              const category = skillsDataStructure[categoryKey] || currentCategory;
              const IconComponent = category.icon || Code;
              return (
                <button
                  key={categoryKey}
                  onClick={() => setActiveCategory(categoryKey)}
                  className={`ubuntu-tab whitespace-nowrap flex-shrink-0 ${
                    activeCategory === categoryKey ? 'active' : ''
                  }`}
                  style={{ padding: '4px 8px', fontSize: '11px' }}
                >
                  <IconComponent className="w-3 h-3 inline mr-1" />
                  <span className="hidden sm:inline">{category.name || categoryKey}</span>
                  <span className="sm:hidden">{categoryKey}</span>
                  {category.skills && (
                    <span className="ml-1 opacity-75">
                      ({category.skills.length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar - Ubuntu style */}
        <div className="flex-shrink-0 p-3 bg-[#2D2D2D] border-b border-[#3D3D3D]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#808080]" />
            <input
              type="text"
              placeholder={`Search in ${currentCategory.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ubuntu-input pl-10"
            />
          </div>
        </div>

        {/* Category Header - Ubuntu style */}
        <div className="flex-shrink-0 bg-[#2D2D2D] border-b border-[#3D3D3D] p-3">
          <div className="flex items-center gap-3 text-white">
            {React.createElement(currentCategory.icon || Code, { className: "w-5 h-5 text-[#E95420]" })}
            <div>
              <h2 className="text-sm font-medium" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                {currentCategory.name}
              </h2>
              <p className="text-xs text-[#B3B3B3]" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                {currentCategory.description}
              </p>
            </div>
          </div>
        </div>

        {/* Skills List - Ubuntu style */}
        <div className="flex-1 overflow-auto bg-[#1E1E1E] ubuntu-scrollbar">
          {filteredSkills.length > 0 ? (
            <div>
              {filteredSkills.map((skill, index) => (
                <div
                  key={index}
                  className="ubuntu-list-item"
                >
                  <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-[#E95420] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                        <h3 className="text-xs md:text-sm font-medium text-white truncate" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                          {skill.name}
                        </h3>
                        <span className={`px-1.5 md:px-2 py-0.5 text-xs border flex-shrink-0 self-start sm:self-auto ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 md:gap-3 text-xs text-[#808080]">
                        <span>{skill.years}y</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">{skill.projects} projects</span>
                        <span className="sm:hidden">{skill.projects}p</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{skill.percentage}%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar - Ubuntu style */}
                  <div className="mt-2">
                    <div className="ubuntu-progress">
                      <div 
                        className="ubuntu-progress-bar"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-[#808080] mx-auto mb-4" />
              <h3 className="text-base font-medium text-[#B3B3B3] mb-2" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>No skills found</h3>
              <p className="text-[#808080] text-sm" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsApp;
export const displaySkills = (props) => {
  return <SkillsApp {...props} />;
}