import React, { useState, useEffect } from "react";
import { 
  User, 
  GraduationCap, 
  Award, 
  MapPin, 
  Calendar, 
  Code, 
  Briefcase,
  Star,
  Target,
  TrendingUp,
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
  X,
  ChevronRight,
  Building,
  Clock,
  Zap,
  Download
} from "lucide-react";

const AboutApp = ({ onClose, aboutData: propsAboutData = [] }) => {
  const [activeSection, setActiveSection] = useState("overview");
  const [animateStats, setAnimateStats] = useState(false);
  const [aboutData, setAboutData] = useState(null);

  // Fetch about data from API
  useEffect(() => {
    if (propsAboutData && propsAboutData.length > 0) {
      // Transform API data to component structure
      const transformed = transformAboutData(propsAboutData);
      setAboutData(transformed);
    } else {
      fetchAboutData();
    }
  }, [propsAboutData]);

  const transformAboutData = (data) => {
    // Transform MongoDB data to component structure
    const result = {
      overview: null,
      education: null,
      achievements: [],
      approach: [],
      stats: []
    };

    data.forEach(section => {
      // MongoDB uses 'section' field, not 'type'
      const sectionType = section.section || section.type;

      if (sectionType === 'overview') {
        // Merge content object into section for easier access
        const sectionData = section.content 
          ? { ...section, ...section.content }
          : section;
        result.overview = sectionData;
      } else if (sectionType === 'education') {
        // Merge content object into section for easier access
        const sectionData = section.content 
          ? { ...section, ...section.content }
          : section;
        result.education = sectionData;
      } else if (sectionType === 'achievement' || sectionType === 'achievements') {
        // Achievements section has content.items array
        if (section.content && section.content.items && Array.isArray(section.content.items)) {
          // Add each item from the items array
          section.content.items.forEach(item => {
            result.achievements.push({
              title: item.title,
              description: item.description,
              ...item
            });
          });
        } else {
          // Fallback: treat section itself as achievement
          const sectionData = section.content 
            ? { ...section, ...section.content }
            : section;
          result.achievements.push(sectionData);
        }
      } else if (sectionType === 'approach') {
        // Approach section has content.steps array
        if (section.content && section.content.steps && Array.isArray(section.content.steps)) {
          // Add each step from the steps array
          section.content.steps.forEach(step => {
            result.approach.push({
              step: step.step,
              title: step.title,
              description: step.description,
              order: parseInt(step.step) || step.order,
              ...step
            });
          });
        } else {
          // Fallback: treat section itself as approach step
          const sectionData = section.content 
            ? { ...section, ...section.content }
            : section;
          result.approach.push(sectionData);
        }
      } else if (sectionType === 'stat' || sectionType === 'stats') {
        const sectionData = section.content 
          ? { ...section, ...section.content }
          : section;
        result.stats.push(sectionData);
      }
    });

    return result;
  };

  const fetchAboutData = async () => {
    try {
      const response = await fetch('/api/about');
      const data = await response.json();
      if (data.success && data.data && data.data.length > 0) {
        const transformed = transformAboutData(data.data);
        setAboutData(transformed);
      } else {
        console.warn('No about data available from API');
        setAboutData(null);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
      setAboutData(null);
    }
  };

  // Sections configuration - static UI structure
  const sections = {
    overview: {
      name: "Overview",
      icon: User,
      color: ""
    },
    education: {
      name: "Education",
      icon: GraduationCap,
      color: ""
    },
    achievements: {
      name: "Achievements",
      icon: Award,
      color: ""
    },
    approach: {
      name: "Work Approach",
      icon: Target,
      color: ""
    }
  };

  // Use data from MongoDB or empty defaults
  const stats = aboutData?.stats || [];
  const workApproach = aboutData?.approach || [];
  const achievements = aboutData?.achievements || [];
  const education = aboutData?.education || null;
  const overview = aboutData?.overview || null;

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const renderOverview = () => (
    <div className="space-y-4">
      {/* Hero Section - Ubuntu style */}
      <div className="ubuntu-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {overview?.imageUrl ? (
              <div className="w-12 h-12 bg-[#2D2D2D] border border-[#3D3D3D] rounded overflow-hidden flex items-center justify-center">
                <img 
                  src={overview.imageUrl} 
                  alt={overview.name || overview.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-12 h-12 bg-[#2D2D2D] border border-[#3D3D3D] rounded flex items-center justify-center"><svg class="w-6 h-6 text-[#E95420]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>';
                  }}
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-[#2D2D2D] border border-[#3D3D3D] rounded flex items-center justify-center">
                <User className="w-6 h-6 text-[#E95420]" />
              </div>
            )}
            <div>
              <h2 className="text-base font-medium text-white" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                {overview?.name || overview?.title || "Abdul Momin"}
              </h2>
              <p className="text-xs text-[#B3B3B3]" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                {overview?.subtitle || overview?.role || "Full-Stack Developer & AI Enthusiast"}
              </p>
            </div>
          </div>
          
          {/* Download Resume Button */}
          <button
            onClick={async () => {
              try {
                const res = await fetch('/api/about/resume');
                const data = await res.json();
                if (data.success && data.data) {
                  const link = document.createElement('a');
                  link.href = data.data.path || '/resumes/resume.pdf';
                  link.download = data.data.filename || 'Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                } else {
                  // Fallback to public resume
                  const link = document.createElement('a');
                  link.href = '/resumes/resume.pdf';
                  link.download = 'Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              } catch (error) {
                console.error('Error fetching resume:', error);
                // Fallback
                const link = document.createElement('a');
                link.href = '/resumes/resume.pdf';
                link.download = 'Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            }}
            className="ubuntu-button primary flex items-center gap-2 text-xs"
            style={{ padding: '6px 12px' }}
          >
            <Download className="w-3 h-3" />
            <span>Resume</span>
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#B3B3B3]" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
          <MapPin className="w-3 h-3" />
          <span>Gujranwala, Punjab, Pakistan</span>
        </div>
      </div>

      {/* Stats Grid - Ubuntu style */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, index) => {
            const iconMap = { Clock, Briefcase, Code, Star };
            const IconComponent = typeof stat.icon === 'string' 
              ? iconMap[stat.icon] || Clock 
              : (stat.icon || Clock);

            return (
              <div key={index} className="ubuntu-card p-3 text-center">
                <IconComponent className={`w-5 h-5 ${stat.color === 'text-blue-400' ? 'text-[#E95420]' : stat.color || 'text-[#B3B3B3]'} mx-auto mb-2`} />
                <div className={`text-lg font-medium text-white transition-all duration-1000 ${
                  animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`} style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                  {stat.value || stat.content}
                </div>
                <div className="text-xs text-[#808080]" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                  {stat.label || stat.name}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* About Text - Ubuntu style */}
      {overview && (
        <div className="ubuntu-card p-4">
          <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
            <User className="w-4 h-4 text-[#E95420]" />
            <span>{overview.title || "About Me"}</span>
          </h3>
          <div className="space-y-3 text-[#B3B3B3] text-xs leading-relaxed" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
            {overview.content && typeof overview.content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: overview.content.replace(/\n/g, '<br>') }} />
            ) : (
              <p>{overview.description || "No information available."}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderEducation = () => {
    if (!education) {
      return (
        <div className="text-center py-10">
          <p className="text-[#808080]" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>No education data available</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="ubuntu-card p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#2D2D2D] border border-[#3D3D3D] rounded flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-[#E95420]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{education.title || "Education Background"}</h3>
              <p className="text-[#808080] text-sm" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>{education.description || "Academic achievements and qualifications"}</p>
            </div>
          </div>

          <div className="bg-[#2D2D2D] border border-[#3D3D3D] rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">{education.degree || education.institution || "Education"}</h4>
                <p className="text-[#B3B3B3] font-medium">{education.university || education.institution || education.school || ""}</p>
                {education.period && (
                  <div className="flex items-center gap-2 mt-1 text-sm text-[#808080]">
                    <Calendar className="w-4 h-4" />
                    <span>{education.period}</span>
                  </div>
                )}
              </div>
              {education.cgpa && (
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-5 h-5 text-[#E95420]" />
                    <span className="text-2xl font-bold text-white">{education.cgpa}</span>
                  </div>
                  <p className="text-sm text-[#808080]" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>CGPA</p>
                </div>
              )}
            </div>
            
            {education.achievements && education.achievements.length > 0 && (
              <div className="mt-6">
                <h5 className="text-sm font-medium text-white mb-3" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Achievements</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {education.achievements.map((achievement, index) => (
                    <div key={index} className="text-center">
                      <TrendingUp className="w-6 h-6 text-[#B3B3B3] mx-auto mb-2" />
                      <div className="text-sm text-white" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>{achievement}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {education.highlights && education.highlights.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {education.highlights.map((highlight, index) => (
                  <div key={index} className="text-center">
                    <TrendingUp className="w-6 h-6 text-[#B3B3B3] mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{highlight.value || highlight}</div>
                    <div className="text-xs text-[#808080]">{highlight.label || ""}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAchievements = () => {
    if (!achievements || achievements.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-[#808080]" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>No achievements data available</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {achievements.map((achievement, index) => {
          // Map icon names to components
          const iconMap = {
            Award, Code, Star, TrendingUp, User, GraduationCap
          };
          const IconComponent = typeof achievement.icon === 'string' 
            ? iconMap[achievement.icon] || Award 
            : (achievement.icon || Award);

          // Extract title and description directly from achievement object
          const achievementTitle = achievement.title || achievement.name || "";
          const achievementDescription = achievement.description || "";

          return (
            <div key={index} className="ubuntu-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#2D2D2D] border border-[#3D3D3D] rounded flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-[#E95420]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{achievementTitle}</h4>
                  <p className="text-[#808080] text-sm leading-relaxed" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                    {achievementDescription}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderApproach = () => {
    if (!workApproach || workApproach.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-[#808080]" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>No work approach data available</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-white mb-2">My Development Process</h3>
          <p className="text-[#808080] text-sm" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>I believe in combining creativity with technical precision</p>
        </div>

        <div className="space-y-4">
          {workApproach.map((step, index) => {
            const iconMap = { Target, Code, Building, Zap };
            const IconComponent = typeof step.icon === 'string' 
              ? iconMap[step.icon] || Target 
              : (step.icon || Target);

            // Extract step data directly from step object
            const stepTitle = step.title || step.name || "";
            const stepDescription = step.description || "";
            const stepOrder = step.step || step.order || index + 1;

            return (
              <div key={index} className="group ubuntu-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2D2D2D] border border-[#3D3D3D] rounded flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-[#E95420]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold px-2 py-1 rounded border bg-[#2D2D2D] text-[#B3B3B3] border-[#3D3D3D]">
                        {stepOrder < 10 ? `0${stepOrder}` : stepOrder}
                      </span>
                      <h4 className="text-lg font-bold text-white">{stepTitle}</h4>
                    </div>
                    <p className="text-[#808080] text-sm leading-relaxed" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                      {stepDescription}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#808080] group-hover:text-[#B3B3B3] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };


  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "education":
        return renderEducation();
      case "achievements":
        return renderAchievements();
      case "approach":
        return renderApproach();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="w-full h-full bg-[#1E1E1E] font-['Ubuntu_Mono',monospace] overflow-hidden ubuntu-scrollbar">
      <div className="w-full h-full flex flex-col">
        
        {/* Ubuntu-style Header */}
        <div className="flex-shrink-0 bg-[#2D2D2D] border-b border-[#3D3D3D] p-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-base font-medium text-white" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
              About
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

          {/* Section Tabs - Ubuntu style - Responsive */}
          <div className="flex gap-1 md:gap-2 overflow-x-auto ubuntu-scrollbar pb-2">
            {Object.entries(sections).map(([sectionKey, section]) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={sectionKey}
                  onClick={() => setActiveSection(sectionKey)}
                  className={`ubuntu-tab whitespace-nowrap flex-shrink-0 ${
                    activeSection === sectionKey ? 'active' : ''
                  }`}
                  style={{ padding: '4px 8px', fontSize: '11px' }}
                >
                  <IconComponent className="w-3 h-3 inline mr-1" />
                  <span className="hidden sm:inline">{section.name}</span>
                  <span className="sm:hidden">{section.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div 
            className="flex-1 overflow-auto p-4 bg-[#1E1E1E] ubuntu-scrollbar"
            style={{
                transform: 'translateZ(0)',
                willChange: 'scroll-position',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
            }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AboutApp;
export const displayAbout = (props) => {
  return <AboutApp {...props} />;
};