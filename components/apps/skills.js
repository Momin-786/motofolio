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
      if (data.success && data.data && data.data.length > 0) {
        const transformed = transformSkillsData(data.data);
        setSkills(transformed);
      } else {
        console.warn('No skills data available from API');
        setSkills({});
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      setSkills({});
    }
  };

  // All data comes from MongoDB - no hardcoded fallback

  // Use transformed data from MongoDB only
  const skillsDataStructure = Object.keys(skills).length > 0 ? skills : {};
  const categories = Object.keys(skillsDataStructure);
  const currentCategory = skillsDataStructure[activeCategory] || {
    name: categories.length > 0 ? categories[0] : "No Category",
    icon: Code,
    color: "",
    description: "No skills available",
    skills: []
  };

  const filteredSkills = (currentCategory.skills || []).filter(skill =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "expert":
        return "bg-[#2D2D2D] text-[#4CAF50] border-[#4CAF50]/30";
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
        <div 
            className="flex-1 overflow-auto bg-[#1E1E1E] ubuntu-scrollbar"
            style={{
                transform: 'translateZ(0)',
                willChange: 'scroll-position',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
            }}
        >
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