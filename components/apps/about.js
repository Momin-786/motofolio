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

const AboutApp = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState("overview");
  const [animateStats, setAnimateStats] = useState(false);

  const sections = {
    overview: {
      name: "Overview",
      icon: User,
      color: "from-blue-500 to-cyan-500"
    },
    education: {
      name: "Education",
      icon: GraduationCap,
      color: "from-green-500 to-emerald-500"
    },
    achievements: {
      name: "Achievements",
      icon: Award,
      color: "from-purple-500 to-pink-500"
    },
    approach: {
      name: "Work Approach",
      icon: Target,
      color: "from-orange-500 to-red-500"
    },
    contact: {
      name: "Contact",
      icon: Mail,
      color: "from-teal-500 to-cyan-500"
    }
  };

  const stats = [
    { label: "Years Experience", value: "4+", icon: Clock, color: "text-blue-400" },
    { label: "Projects Completed", value: "20+", icon: Briefcase, color: "text-green-400" },
    { label: "Technologies", value: "25+", icon: Code, color: "text-purple-400" },
    { label: "CGPA", value: "4.0", icon: Star, color: "text-yellow-400" }
  ];

  const contactInfo = [
    { 
      label: "Email", 
      value: "momina7863@gmail.com", 
      icon: Mail, 
      href: "mailto:momina7863@gmail.com",
      color: "from-red-500 to-pink-500"
    },
    { 
      label: "Phone", 
      value: "(+92) 319 424 3124", 
      icon: Phone, 
      href: "tel:+923194243124",
      color: "from-green-500 to-emerald-500"
    },
    { 
      label: "GitHub", 
      value: "github.com/Momin-786", 
      icon: Github, 
      href: "https://github.com/Momin-786",
      color: "from-gray-600 to-gray-800"
    },
    { 
      label: "Portfolio", 
      value: "mosol.infy.uk", 
      icon: Globe, 
      href: "motofolio.vercel.app",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      label: "LinkedIn", 
      value: "/in/abdul-momin7863/", 
      icon: Linkedin, 
      href: "https://linkedin.com/in/abdul-momin7863/",
      color: "from-blue-600 to-blue-700"
    }
  ];

  const workApproach = [
    {
      step: "01",
      title: "Understanding Requirements",
      description: "Listening carefully to client needs and goals",
      icon: Target,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "02",
      title: "Designing the Solution",
      description: "Crafting user-focused, scalable architecture",
      icon: Code,
      color: "from-green-500 to-emerald-500"
    },
    {
      step: "03",
      title: "Building with Quality",
      description: "Writing clean, maintainable code with best practices",
      icon: Building,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "04",
      title: "Testing & Delivery",
      description: "Ensuring stability, security, and user satisfaction",
      icon: Zap,
      color: "from-orange-500 to-red-500"
    }
  ];

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
            <div className="w-12 h-12 bg-[#2D2D2D] border border-[#3D3D3D] rounded flex items-center justify-center">
              <User className="w-6 h-6 text-[#E95420]" />
            </div>
            <div>
              <h2 className="text-base font-medium text-white" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Abdul Momin</h2>
              <p className="text-xs text-[#B3B3B3]" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Full-Stack Developer & AI Enthusiast</p>
            </div>
          </div>
          
          {/* Download Resume Button */}
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/resume.pdf';
              link.download = 'Abdul_Momin_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="ubuntu-card p-3 text-center">
            <stat.icon className={`w-5 h-5 ${stat.color === 'text-blue-400' ? 'text-[#E95420]' : stat.color} mx-auto mb-2`} />
            <div className={`text-lg font-medium text-white transition-all duration-1000 ${
              animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
              {stat.value}
            </div>
            <div className="text-xs text-[#808080]" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* About Text - Ubuntu style */}
      <div className="ubuntu-card p-4">
        <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
          <User className="w-4 h-4 text-[#E95420]" />
          About Me
        </h3>
        <div className="space-y-3 text-[#B3B3B3] text-xs leading-relaxed" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
          <p>
            Hello, I'm Momin — a full-stack developer and AI enthusiast with a Bachelor's degree in 
            Software Engineering from COMSATS University Abbottabad in 2026, where I graduated with a 4.0 CGPA.
          </p>
          <p>
            I've developed solutions for web, mobile, and AI-driven systems, focusing on clean, maintainable 
            code and real-world business impact. My approach blends technical expertise with a client-first 
            mindset, ensuring that every project I deliver is scalable, secure, and intuitive.
          </p>
          <p>
            I work confidently both as part of agile development teams and as an independent freelancer, 
            delivering results on time without compromising quality. Beyond development, I'm deeply 
            interested in artificial intelligence, having created intelligent solutions like a brain tumor 
            classification system using deep learning.
          </p>
        </div>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Education Background</h3>
            <p className="text-gray-400 text-sm">Academic achievements and qualifications</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-white">Bachelor's in Software Engineering</h4>
              <p className="text-green-400 font-medium">COMSATS University Abbottabad</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>2022 - 2026</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-white">4.0</span>
              </div>
              <p className="text-sm text-gray-400">CGPA</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">Outstanding</div>
              <div className="text-xs text-gray-400">Academic Performance</div>
            </div>
            <div className="text-center">
              <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">2x</div>
              <div className="text-xs text-gray-400">Best Result Awards</div>
            </div>
            <div className="text-center">
              <Code className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">25+</div>
              <div className="text-xs text-gray-400">Technologies Learned</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-4">
      {[
        {
          title: "Best Academic Result Award",
          description: "Awarded twice at COMSATS University (2023 & 2025)",
          icon: Award,
          color: "from-yellow-500 to-orange-500"
        },
        {
          title: "Multiple Full-Stack Solutions",
          description: "Delivered AI-powered solutions for clients across various industries",
          icon: Code,
          color: "from-blue-500 to-cyan-500"
        },
        {
          title: "Code Quality Recognition",
          description: "Recognized for producing reusable, maintainable code with focus on performance",
          icon: Star,
          color: "from-green-500 to-emerald-500"
        },
        {
          title: "AI Innovation",
          description: "Created brain tumor classification system using deep learning",
          icon: TrendingUp,
          color: "from-purple-500 to-pink-500"
        }
      ].map((achievement, index) => (
        <div key={index} className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-full flex items-center justify-center flex-shrink-0`}>
              <achievement.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">{achievement.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{achievement.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderApproach = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-white mb-2">My Development Process</h3>
        <p className="text-gray-400 text-sm">I believe in combining creativity with technical precision</p>
      </div>

      <div className="space-y-4">
        {workApproach.map((step, index) => (
          <div key={index} className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                <step.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-sm font-bold px-2 py-1 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                    {step.step}
                  </span>
                  <h4 className="text-lg font-bold text-white">{step.title}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-4">
      {contactInfo.map((contact, index) => (
        <a
          key={index}
          href={contact.href}
          target={contact.label !== "Email" && contact.label !== "Phone" ? "_blank" : undefined}
          rel={contact.label !== "Email" && contact.label !== "Phone" ? "noopener noreferrer" : undefined}
          className="block group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 hover:bg-gray-800/60 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${contact.color} rounded-full flex items-center justify-center`}>
              <contact.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-white mb-1">{contact.label}</h4>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{contact.value}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors" />
          </div>
        </a>
      ))}
    </div>
  );

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
      case "contact":
        return renderContact();
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
        <div className="flex-1 overflow-auto p-4 bg-[#1E1E1E] ubuntu-scrollbar">
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