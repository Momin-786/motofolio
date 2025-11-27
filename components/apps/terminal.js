import React, { useState, useEffect, useRef } from "react";

const Terminal = ({ addFolder, openApp }) => {
  const [history, setHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState("/home/momin");
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // File system structure with Momin's data
  const fileSystem = {
    "/": {
      type: "directory",
      children: ["home", "usr", "var", "etc"],
    },
    "/home": {
      type: "directory",
      children: ["momin"],
    },
    "/home/momin": {
      type: "directory",
      children: [
        "about.txt",
        "skills",
        "projects",
        "achievements.txt",
        "contact",
        ".bashrc",
      ],
    },
    "/home/momin/about.txt": {
      type: "file",
      content: `About Me
=========

Hello, I'm Momin — a full-stack developer and AI enthusiast with a Bachelor's 
degree in Software Engineering from COMSATS University Abbottabad in 2026, 
where I graduated with a 4.0 CGPA.

I've developed solutions for web, mobile, and AI-driven systems, focusing on 
clean, maintainable code and real-world business impact. My approach blends 
technical expertise with a client-first mindset, ensuring that every project 
I deliver is scalable, secure, and intuitive.

I work confidently both as part of agile development teams and as an independent 
freelancer, delivering results on time without compromising quality. Beyond 
development, I'm deeply interested in artificial intelligence, having created 
intelligent solutions like a brain tumor classification system using deep learning.`,
    },
    "/home/momin/skills": {
      type: "directory",
      children: [
        "programming-languages.txt",
        "frontend.txt",
        "backend.txt",
        "databases.txt",
        "ai-ml.txt",
        "tools.txt",
      ],
    },
    "/home/momin/skills/programming-languages.txt": {
      type: "file",
      content: `Programming Languages
====================

• C# - Enterprise applications & backend development
• Java - Spring Boot & enterprise solutions  
• Python - AI/ML, automation & backend services
• JavaScript - Full-stack web development
• SQL - Database design & optimization
• Dart - Flutter mobile development
• Kotlin - Android native development
• TypeScript - Type-safe web applications
• C++ - System programming & algorithms
• C - Low-level programming & embedded systems`,
    },
    "/home/momin/skills/frontend.txt": {
      type: "file",
      content: `Frontend Technologies
====================

• React.js - Component-based UI development
• Next.js - Full-stack React framework
• Angular - Enterprise web applications
• Vue.js - Progressive web apps
• HTML5 - Modern web markup
• Flutter - Cross-platform mobile apps
• Vite - Fast build tool
• Tailwind CSS - Utility-first styling
• JavaScript ES6+ - Modern web development`,
    },
    "/home/momin/skills/backend.txt": {
      type: "file",
      content: `Backend Technologies
===================

• Node.js - JavaScript runtime environment
• Express.js - Fast web framework
• Spring Boot - Java enterprise framework
• Python - Server-side development
• REST APIs - Web service architecture
• JWT Authentication - Secure token-based auth
• Microservices - Scalable system architecture`,
    },
    "/home/momin/skills/databases.txt": {
      type: "file",
      content: `Database Technologies
====================

• MongoDB - NoSQL document database
• PostgreSQL - Advanced relational database
• MySQL - Popular relational database
• Sequelize ORM - Database abstraction layer
• Firebase - Real-time cloud database
• Database Design - Schema optimization
• Query Optimization - Performance tuning`,
    },
    "/home/momin/skills/ai-ml.txt": {
      type: "file",
      content: `AI & Machine Learning
====================

• TensorFlow - Deep learning framework
• Deep Learning - Neural network architectures
• Classification Systems - Pattern recognition
• Predictive Modeling - Data-driven predictions
• AI-driven Automation - Intelligent workflows
• Computer Vision - Image processing & analysis
• Medical AI - Healthcare applications
• OpenCV - Computer vision library`,
    },
    "/home/momin/skills/tools.txt": {
      type: "file",
      content: `Tools & Technologies
===================

• Docker - Containerization platform
• Git - Version control system
• Firebase - Backend-as-a-Service
• Botpress - Conversational AI platform
• n8n - Workflow automation
• Postman - API testing tool
• Vercel - Deployment platform
• Bruno - API client
• Swagger - API documentation
• Cloudinary - Image & video management`,
    },
    "/home/momin/projects": {
      type: "directory",
      children: [
        "fee-submission-saas.txt",
        "job-portal.txt",
        "feedback-app.txt",
        "weather-app.txt",
        "brain-tumor-ai.txt",
        "blog-app.txt",
        "ai-solutions.txt",
      ],
    },
    "/home/momin/projects/fee-submission-saas.txt": {
      type: "file",
      content: `Fee Submission SaaS System
==========================

A secure, scalable platform for school fee management.

Tech Stack:
• React.js - Frontend user interface
• Spring Boot - Backend API services
• Tailwind CSS - Modern styling
• JWT Authentication - Secure user access

Key Features:
• Role-based access control
• Responsive UI design
• Real-time payment updates
• Multi-school support
• Payment history tracking
• Automated receipts generation

Status: Production Ready`,
    },
    "/home/momin/projects/job-portal.txt": {
      type: "file",
      content: `Job Portal Database System
==========================

A complete job posting and application management system.

Tech Stack:
• MySQL - Relational database
• Node.js - Backend runtime
• React - Frontend framework
• Sequelize ORM - Database abstraction

Key Features:
• Employer dashboard
• Applicant profiles
• Job posting management
• Application tracking
• Secure authentication
• Advanced search filters
• Resume upload system

Status: Completed`,
    },
    "/home/momin/projects/feedback-app.txt": {
      type: "file",
      content: `Papi's Feedback Application
===========================

A streamlined feedback collection tool for businesses.

Tech Stack:
• MongoDB - Document database
• Express.js - Web framework
• React.js - User interface
• Node.js - Backend runtime
• React Hook Form - Form management

Key Features:
• Custom form creation
• Real-time feedback collection
• Data export capabilities
• Analytics dashboard
• Multi-format responses
• User-friendly interface

Status: Live & Operational`,
    },
    "/home/momin/projects/weather-app.txt": {
      type: "file",
      content: `Weather Forecast Application
============================

A cross-platform weather tracking solution.

Tech Stack:
• PostgreSQL - Data storage
• Docker - Containerization
• Spring Boot - Backend services
• Flutter - Mobile frontend

Key Features:
• Real-time weather forecasts
• Multi-day weather view
• Location-based search
• Weather alerts
• Historical data
• Cross-platform support
• Offline functionality

Status: Published`,
    },
    "/home/momin/projects/brain-tumor-ai.txt": {
      type: "file",
      content: `Brain Tumor Classification System (AI)
======================================

A deep learning-based medical image classifier for tumor detection.

Tech Stack:
• TensorFlow - ML framework
• Python - Core programming
• OpenCV - Image processing
• Deep Learning - Neural networks

Key Features:
• Automated tumor detection
• Multiple tumor type classification
• High accuracy prediction
• Medical image preprocessing
• Result visualization
• Clinical report generation

Performance:
• 94.5% accuracy rate
• Fast inference time
• Reliable medical insights

Status: Research Complete`,
    },
    "/home/momin/projects/blog-app.txt": {
      type: "file",
      content: `Blog Application
===============

A modern blog platform with media management.

Tech Stack:
• Flutter - Cross-platform frontend
• Firebase - Backend services
• Cloudinary - Image hosting

Key Features:
• Rich text editor
• Image upload & optimization
• User authentication
• Comment system
• Social sharing
• Responsive design
• Offline reading

Status: Active Development`,
    },
    "/home/momin/projects/ai-solutions.txt": {
      type: "file",
      content: `Custom AI Solutions
===================

Tailored AI models for automation and intelligent decision-making.

Services Provided:
• Predictive Analytics - Data-driven insights
• Process Automation - Intelligent workflows  
• Computer Vision - Image analysis systems
• Natural Language Processing - Text analysis
• Recommendation Systems - Personalized suggestions
• Anomaly Detection - Pattern recognition
• Custom ML Models - Domain-specific solutions

Client Industries:
• Healthcare
• E-commerce
• Finance
• Manufacturing
• Education

Status: Ongoing Client Work`,
    },
    "/home/momin/achievements.txt": {
      type: "file",
      content: `Achievements & Recognition
=========================

🏆 Best Academic Result Award (2023)
   COMSATS University Abbottabad
   
🏆 Best Academic Result Award (2025)  
   COMSATS University Abbottabad

📊 4.0 CGPA Achievement
   Bachelor's in Software Engineering
   
💼 Multiple Client Success Stories
   Full-stack & AI solutions across industries
   
⭐ Code Quality Recognition
   Reusable, maintainable code with focus on performance
   
🚀 Scalable Architecture Design
   Built systems serving thousands of users
   
🤖 AI Innovation
   Pioneered medical AI classification systems
   
📱 Cross-platform Expertise
   Delivered web, mobile & desktop solutions`,
    },
    "/home/momin/contact": {
      type: "directory",
      children: ["email.txt", "phone.txt", "social.txt", "portfolio.txt"],
    },
    "/home/momin/contact/email.txt": {
      type: "file",
      content: "📧 momina7863@gmail.com",
    },
    "/home/momin/contact/phone.txt": {
      type: "file",
      content: "📱 (+92) 319 424 3124",
    },
    "/home/momin/contact/social.txt": {
      type: "file",
      content: `Social Links
============

🔗 GitHub: github.com/Momin-786
🔗 LinkedIn: linkedin.com/in/abdul-momin7863/
🔗 Portfolio: mosol.infy.uk`,
    },
    "/home/momin/contact/portfolio.txt": {
      type: "file",
      content: "🌐 Portfolio: https://mosol.infy.uk",
    },
    "/home/momin/.bashrc": {
      type: "file",
      content: `# Momin's Terminal Configuration
# ================================

echo "Welcome to Momin's Professional Terminal!"
echo "Type 'help' for available commands"
echo "Current system: Ubuntu 22.04 LTS"`,
    },
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const getCurrentDirectory = () => {
    const parts = currentPath.split("/").filter(Boolean);
    return parts.length === 0 ? "/" : parts[parts.length - 1];
  };

  const addToHistory = (command, output, isError = false) => {
    setHistory((prev) => [
      ...prev,
      {
        command,
        output,
        path: currentPath,
        timestamp: new Date(),
        isError,
      },
    ]);
  };

  const resolvePath = (path) => {
    if (path.startsWith("/")) {
      return path;
    }

    if (path === ".") {
      return currentPath;
    }

    if (path === "..") {
      const parts = currentPath.split("/").filter(Boolean);
      parts.pop();
      return parts.length === 0 ? "/" : "/" + parts.join("/");
    }

    return currentPath === "/" ? `/${path}` : `${currentPath}/${path}`;
  };

  const listDirectory = (path) => {
    try {
      const item = fileSystem[path];
      if (!item || item.type !== "directory") {
        return null;
      }

      if (!item.children || !Array.isArray(item.children)) {
        return [];
      }

      return item.children.map((child) => {
        const childPath = path === "/" ? `/${child}` : `${path}/${child}`;
        const childItem = fileSystem[childPath];
        const isDir = childItem && childItem.type === "directory";

        return {
          name: child,
          type: isDir ? "directory" : "file",
          color: isDir
            ? "text-blue-400"
            : child.endsWith(".txt")
            ? "text-green-400"
            : "text-gray-300",
        };
      });
    } catch (error) {
      console.error('Error listing directory:', error);
      return null;
    }
  };

  const executeCommand = (cmd) => {
    try {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const [command, ...args] = trimmed.split(" ");

      switch (command) {
      case "help":
        addToHistory(
          trimmed,
          `Available Commands:
        
Navigation:
  ls [path]     - List directory contents
  cd [path]     - Change directory  
  pwd           - Print working directory
  tree          - Show directory structure
  
File Operations:
  cat [file]    - Display file contents
  find [name]   - Search for files
  grep [text]   - Search within files
  mkdir [name]  - Create directory
  
Applications:
  
System Info:
  whoami        - Current user info
  uname         - System information
  ps            - Show processes
  df            - Disk usage
  
Utilities:
  clear         - Clear terminal
  history       - Command history
  echo [text]   - Display text
  date          - Current date/time
  help          - This help message
  
Personal:
  resume        - Quick resume overview
  contact       - Contact information
  portfolio     - Open portfolio link`
        );
        break;

      case "ls":
        const lsPath = args.length > 0 ? resolvePath(args[0]) : currentPath;
        const items = listDirectory(lsPath);

        if (items === null) {
          addToHistory(
            trimmed,
            `ls: cannot access '${args[0]}': No such file or directory`,
            true
          );
        } else {
          const output = items
            .map(
              (item) =>
                `<span class="${item.color}">${item.name}${
                  item.type === "directory" ? "/" : ""
                }</span>`
            )
            .join("  ");
          addToHistory(trimmed, output);
        }
        break;

      case "cd":
        if (args.length === 0) {
          setCurrentPath("/home/momin");
        } else {
          const newPath = resolvePath(args[0]);
          if (fileSystem[newPath] && fileSystem[newPath].type === "directory") {
            setCurrentPath(newPath);
          } else {
            addToHistory(
              trimmed,
              `cd: ${args[0]}: No such file or directory`,
              true
            );
          }
        }
        break;

      case "pwd":
        addToHistory(trimmed, currentPath);
        break;

      case "cat":
        if (args.length === 0) {
          addToHistory(trimmed, "cat: missing file operand", true);
        } else {
          const filePath = resolvePath(args[0]);
          const file = fileSystem[filePath];

          if (!file) {
            addToHistory(
              trimmed,
              `cat: ${args[0]}: No such file or directory`,
              true
            );
          } else if (file.type === "directory") {
            addToHistory(trimmed, `cat: ${args[0]}: Is a directory`, true);
          } else {
            addToHistory(trimmed, file.content.replace(/\n/g, "<br>"));
          }
        }
        break;

      case "whoami":
        addToHistory(trimmed, "momin");
        break;

      case "uname":
        const flag = args[0];
        if (flag === "-a") {
          addToHistory(
            trimmed,
            "Linux momin-terminal 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux"
          );
        } else {
          addToHistory(trimmed, "Linux");
        }
        break;

      case "date":
        addToHistory(trimmed, new Date().toString());
        break;

      case "echo":
        addToHistory(trimmed, args.join(" "));
        break;

      case "clear":
        setHistory([]);
        break;

      case "history":
        const historyOutput = commandHistory
          .map((cmd, index) => `  ${index + 1}  ${cmd}`)
          .join("<br>");
        addToHistory(trimmed, historyOutput);
        break;

      case "ps":
        addToHistory(
          trimmed,
          `  PID TTY          TIME CMD
 1234 pts/0    00:00:01 terminal
 1235 pts/0    00:00:00 node
 1236 pts/0    00:00:00 react`
        );
        break;

      case "df":
        addToHistory(
          trimmed,
          `Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/sda1       20971520 8388608  12582912  40% /
tmpfs            2097152       0   2097152   0% /tmp
/dev/sda2       10485760 3145728   7340032  30% /home`
        );
        break;

      case "tree":
        addToHistory(
          trimmed,
          `${currentPath}
├── about.txt
├── achievements.txt  
├── contact/
│   ├── email.txt
│   ├── phone.txt
│   ├── social.txt
│   └── portfolio.txt
├── projects/
│   ├── fee-submission-saas.txt
│   ├── job-portal.txt
│   ├── feedback-app.txt
│   ├── weather-app.txt
│   ├── brain-tumor-ai.txt
│   ├── blog-app.txt
│   └── ai-solutions.txt
└── skills/
    ├── programming-languages.txt
    ├── frontend.txt
    ├── backend.txt
    ├── databases.txt
    ├── ai-ml.txt
    └── tools.txt`
        );
        break;

      case "find":
        if (args.length === 0) {
          addToHistory(trimmed, "find: missing search term", true);
        } else {
          const searchTerm = args[0].toLowerCase();
          const results = [];

          const searchInPath = (path) => {
            const item = fileSystem[path];
            if (!item) return;

            if (path.toLowerCase().includes(searchTerm)) {
              results.push(path);
            }

            if (item.type === "directory" && item.children) {
              item.children.forEach((child) => {
                const childPath =
                  path === "/" ? `/${child}` : `${path}/${child}`;
                searchInPath(childPath);
              });
            }
          };

          searchInPath("/home/momin");
          addToHistory(
            trimmed,
            results.length > 0 ? results.join("<br>") : "No files found"
          );
        }
        break;

      case "grep":
        if (args.length < 2) {
          addToHistory(trimmed, "grep: missing search term or file", true);
        } else {
          const searchTerm = args[0].toLowerCase();
          const fileName = args[1];
          const filePath = resolvePath(fileName);
          const file = fileSystem[filePath];

          if (!file || file.type === "directory") {
            addToHistory(trimmed, `grep: ${fileName}: No such file`, true);
          } else {
            const lines = file.content.split("\n");
            const matches = lines.filter((line) =>
              line.toLowerCase().includes(searchTerm)
            );
            addToHistory(
              trimmed,
              matches.length > 0 ? matches.join("<br>") : "No matches found"
            );
          }
        }
        break;

      case "mkdir":
        if (args.length === 0) {
          addToHistory(trimmed, "mkdir: missing operand", true);
        } else {
          if (addFolder) {
            addFolder(args[0]);
            addToHistory(
              trimmed,
              `Directory '${args[0]}' created successfully`
            );
          } else {
            addToHistory(
              trimmed,
              "mkdir: operation not supported in this context",
              true
            );
          }
        }
        break;
        
      case "gedit":
        if (openApp) {
          openApp("gedit");
          addToHistory(trimmed, "Opening gedit...");
        } else {
          addToHistory(
            trimmed,
            "gedit: application launcher not available",
            true
          );
        }
        break;


      case "resume":
        addToHistory(
          trimmed,
          `<span class="text-cyan-400 font-bold">Use bot to see resume. MOMIN - Full-Stack Developer & AI Enthusiast</span>

🎓 <span class="text-yellow-400">Education:</span> B.S Software Engineering, COMSATS (4.0 CGPA)
💼 <span class="text-green-400">Expertise:</span> Full-stack development, AI/ML, Mobile apps
🏆 <span class="text-blue-400">Awards:</span> Best Academic Result (2023, 2025)
📧 <span class="text-pink-400">Contact:</span> momina7863@gmail.com

<span class="text-gray-400">Type 'cat about.txt' for detailed information</span>`
        );
        break;

      case "contact":
        addToHistory(
          trimmed,
          `<span class="text-cyan-400 font-bold">Contact Information</span>

📧 Email: <span class="text-blue-400">momina7863@gmail.com</span>
📱 Phone: <span class="text-green-400">(+92) 319 424 3124</span>
🔗 GitHub: <span class="text-purple-400">github.com/Momin-786</span>
🔗 LinkedIn: <span class="text-blue-400">linkedin.com/in/abdul-momin7863/</span>
🌐 Portfolio: <span class="text-yellow-400">mosol.infy.uk</span>`
        );
        break;

      case "portfolio":
        addToHistory(
          trimmed,
          `<span class="text-green-400">Opening portfolio...</span> 🌐
        
Portfolio URL: <span class="text-blue-400 underline cursor-pointer" onclick="window.open('https://mosol.infy.uk', '_blank')">https://mosol.infy.uk</span>

<span class="text-gray-400">Click the link above or visit manually</span>`
        );
        break;
      case "sudo":
        addToHistory(
          trimmed,
          `<img class='w-2/5' src='./images/memes/used-sudo-command.webp' alt='sudo meme' />`
        );
        break;

      default:
        addToHistory(
          trimmed,
          `${command}: command not found\nType 'help' to see available commands`,
          true
        );
        break;
      }
    } catch (error) {
      console.error('Terminal command error:', error);
      addToHistory(
        cmd.trim(),
        `Error executing command: ${error.message}`,
        true
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = [
        "ls",
        "cd",
        "cat",
        "help",
        "clear",
        "pwd",
        "whoami",
        "contact",
        "resume",
      ];
      const matches = commands.filter((cmd) => cmd.startsWith(currentInput));
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      }
    }
  };

  const getPrompt = () => {
    const user = "momin";
    const host = "ubuntu";
    const dir =
      currentPath === "/home/momin"
        ? "~"
        : currentPath.replace("/home/momin", "~");
    return `${user}@${host}:${dir}$`;
  };
  
  return (
    <div className="w-full h-full bg-black text-green-400 font-mono text-sm overflow-hidden" style={{ position: 'relative', zIndex: 10 }}>
      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="w-full h-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500/50 scrollbar-track-transparent"
        style={{
          transform: 'translateZ(0)',
          willChange: 'scroll-position',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Welcome Message */}
        <div className="mb-4 text-cyan-400">
          <div>Welcome to Momin's Professional Terminal!</div>
          <div>Ubuntu 22.04 LTS - Type 'help' for available commands</div>
          <div className="text-gray-400 text-xs">
            Full-Stack Developer & AI Enthusiast
          </div>
        </div>

        {/* Command History */}
        {history.map((entry, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center">
              <span className="text-green-400 font-bold">{getPrompt()}</span>
              <span className="ml-2 text-white">{entry.command}</span>
            </div>
            {entry.output && (
              <div
                className={`mt-1 whitespace-pre-wrap ${
                  entry.isError ? "text-red-400" : "text-gray-300"
                }`}
                dangerouslySetInnerHTML={{ __html: entry.output }}
              />
            )}
          </div>
        ))}

        {/* Current Input Line */}
        <div className="flex items-center">
          <span className="text-green-400 font-bold">{getPrompt()}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="ml-2 bg-transparent border-none outline-none text-white flex-1 font-mono"
            spellCheck={false}
            autoFocus
          />
          <span className="animate-pulse text-green-400">█</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;

export const displayTerminal = (addFolder, openApp) => {
  return <Terminal addFolder={addFolder} openApp={openApp} />;
};