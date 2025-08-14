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

const SkillsApp = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState("programming");
  const [searchQuery, setSearchQuery] = useState("");

  // Skills data organized by categories
  const skillsData = {
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

  const categories = Object.keys(skillsData);
  const currentCategory = skillsData[activeCategory];

  const filteredSkills = currentCategory.skills.filter(skill =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "expert":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "advanced":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "beginner":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
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
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-mono overflow-hidden">
      <div className="w-full h-full flex flex-col">
        
        {/* Header */}
        <div className="flex-shrink-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 p-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              My Skills & Expertise
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

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2">
            {categories.map(categoryKey => {
              const category = skillsData[categoryKey];
              const IconComponent = category.icon;
              return (
                <button
                  key={categoryKey}
                  onClick={() => setActiveCategory(categoryKey)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap flex-shrink-0 ${
                    activeCategory === categoryKey
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs opacity-75">
                    ({category.skills.length})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-shrink-0 p-3 bg-gray-900/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search in ${currentCategory.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>

        {/* Category Header */}
        <div className={`flex-shrink-0 bg-gradient-to-r ${currentCategory.color} p-4`}>
          <div className="flex items-center gap-3 text-white">
            {React.createElement(currentCategory.icon, { className: "w-6 h-6" })}
            <div>
              <h2 className="text-xl font-bold">{currentCategory.name}</h2>
              <p className="text-sm opacity-90">{currentCategory.description}</p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="flex-1 overflow-auto p-4">
          {filteredSkills.length > 0 ? (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 text-center">
                  <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">
                    {currentCategory.skills.filter(s => s.level === "Expert").length}
                  </div>
                  <div className="text-xs text-gray-400">Expert</div>
                </div>
                
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 text-center">
                  <TrendingUp className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">
                    {currentCategory.skills.filter(s => s.level === "Advanced").length}
                  </div>
                  <div className="text-xs text-gray-400">Advanced</div>
                </div>

                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 text-center">
                  <Calendar className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">
                    {Math.round(currentCategory.skills.reduce((sum, skill) => sum + skill.years, 0) / currentCategory.skills.length)}
                  </div>
                  <div className="text-xs text-gray-400">Avg Years</div>
                </div>

                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 text-center">
                  <Award className="w-5 h-5 text-green-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">
                    {currentCategory.skills.reduce((sum, skill) => sum + skill.projects, 0)}
                  </div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {filteredSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 hover:bg-gray-800/60 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentCategory.color}`} />
                        <h3 className="text-white font-semibold text-lg">{skill.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{skill.years}y</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          <span>{skill.projects} projects</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          <span>{skill.percentage}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative">
                      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${currentCategory.color} transition-all duration-1000 ease-out rounded-full`}
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium text-white drop-shadow-lg">
                          {skill.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-400 mb-2">No skills found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
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