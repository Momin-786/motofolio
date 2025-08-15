import React, { Component } from "react";
import BackgroundImage from "../util components/background-image";
import apps from "../../apps.config";
import Window from "../base/window";
import UbuntuApp from "../base/ubuntu_app";
import DesktopMenu from "../context menus/desktop-menu";
import DefaultMenu from "../context menus/default";
import $ from "jquery";
import ReactGA from "react-ga4";

export class Desktop extends Component {
  constructor() {
    super();

    // Load saved theme or default to green
    let savedTheme = "blue";
    let savedOpacity = 100; // Default opacity

    try {
      const stored = localStorage.getItem("selectedTheme");
      if (
        stored &&
        ["blue", "green", "purple", "orange", "pink", "cyan"].includes(stored)
      ) {
        savedTheme = stored;
      }

      // Load saved opacity
      const storedOpacity = localStorage.getItem("backgroundOpacity");
      if (storedOpacity) {
        savedOpacity = parseInt(storedOpacity);
      }
    } catch (e) {
      console.warn("Could not load preferences:", e);
    }

    this.app_stack = [];
    this.initFavourite = {};
    this.allWindowClosed = false;
    
    this.state = {
      focused_windows: {},
      closed_windows: {},
      allAppsView: false,
      showThemeMenu: false,
      overlapped_windows: {},
      disabled_apps: {},
      favourite_apps: {},
      hideSideBar: false,
      minimized_windows: {},
      desktop_apps: [],
      context_menus: {
        desktop: false,
        default: false,
      },
      showNameBar: false,
      currentTheme: savedTheme,
      backgroundOpacity: savedOpacity, // Add this line
      availableThemes: [
        { id: "blue", name: "Cream", color: "#a09f92" },
        { id: "green", name: "Emerald", color: "#10b981" },
        { id: "purple", name: "Violet", color: "#8b5cf6" },
        { id: "orange", name: "Amber", color: "#f59e0b" },
        { id: "pink", name: "Pink", color: "#ec4899" },
        { id: "cyan", name: "Cyan", color: "#06b6d4" },
      ],
    };
  }
  changeBackgroundOpacity = (opacity) => {
  this.setState({ backgroundOpacity: opacity });
  // Save to localStorage
  try {
    localStorage.setItem("backgroundOpacity", opacity.toString());
  } catch (e) {
    console.warn("Could not save opacity preference:", e);
  }
};

  componentDidMount() {
    // google analytics
    ReactGA.send({
      hitType: "pageview",
      page: "/desktop",
      title: "Custom Title",
    });

    // IMPORTANT: Apply initial theme immediately
    this.applyThemeToDOM(this.state.currentTheme);

    this.fetchAppsData();
    this.setContextListeners();
    this.checkForNewFolders();
  }

  componentWillUnmount() {
    this.removeContextListeners();
  }

  checkForNewFolders = () => {
    var new_folders = localStorage.getItem("new_folders");
    if (new_folders === null && new_folders !== undefined) {
      localStorage.setItem("new_folders", JSON.stringify([]));
    } else {
      new_folders = JSON.parse(new_folders);
      new_folders.forEach((folder) => {
        apps.push({
          id: `new-folder-${folder.id}`,
          title: folder.name,
          icon: "./themes/Yaru/system/mc-home-logo.png",
          disabled: true,
          favourite: false,
          desktop_shortcut: true,
          screen: () => {},
        });
      });
      this.updateAppsData();
    }
  };
  renderThemeSelector = () => {
  return (
    <div className="relative">
      {/* Enhanced Current Theme Button */}
      <button
        onClick={() => this.toggleThemeMenu()}
        className="w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-125 relative overflow-hidden group"
        style={{
          backgroundColor: `var(--accent-primary)`,
          borderColor: `var(--accent-primary)`,
          boxShadow: `0 0 20px var(--accent-glow)/60, 0 4px 15px rgba(0,0,0,0.2)`,
        }}
        title="Change theme"
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 30px var(--accent-glow), 0 6px 20px rgba(0,0,0,0.3)`;
          e.currentTarget.style.transform = "scale(1.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 20px var(--accent-glow)/60, 0 4px 15px rgba(0,0,0,0.2)`;
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {/* Animated ring effect */}
        <div 
          className="absolute inset-0 rounded-full border-2 opacity-50 animate-ping"
          style={{ borderColor: 'var(--accent-primary)' }}
        />
      </button>

      {/* Enhanced Theme Menu with smooth entrance */}
      {this.state.showThemeMenu && (
        <div
          className="absolute bottom-full right-0 mb-2 backdrop-blur-xl border rounded-xl shadow-2xl p-3 flex space-x-2 animate-in slide-in-from-bottom-2 duration-300"
          style={{
            backgroundColor: `var(--bg-secondary)`,
            borderColor: `var(--border)`,
            animation: "slideUp 0.3s ease-out",
          }}
        >
          {this.state.availableThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => this.selectTheme(theme.id)}
              className={`w-6 h-6 rounded-full border-2 transition-all duration-300 hover:scale-125 relative overflow-hidden ${
                this.state.currentTheme === theme.id ? "scale-110" : ""
              }`}
              style={{
                backgroundColor: theme.color,
                borderColor: theme.color,
                boxShadow:
                  this.state.currentTheme === theme.id
                    ? `0 0 15px ${theme.color}, 0 4px 10px rgba(0,0,0,0.3)`
                    : `0 2px 8px rgba(0,0,0,0.2)`,
              }}
              title={theme.name}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px ${theme.color}, 0 6px 15px rgba(0,0,0,0.4)`;
                e.currentTarget.style.transform = "scale(1.25)";
              }}
              onMouseLeave={(e) => {
                const isSelected = this.state.currentTheme === theme.id;
                e.currentTarget.style.boxShadow = isSelected
                  ? `0 0 15px ${theme.color}, 0 4px 10px rgba(0,0,0,0.3)`
                  : `0 2px 8px rgba(0,0,0,0.2)`;
                e.currentTarget.style.transform = isSelected ? "scale(1.1)" : "scale(1)";
              }}
            >
              {/* Selection indicator */}
              {this.state.currentTheme === theme.id && (
                <div className="absolute inset-0 rounded-full animate-pulse" 
                     style={{ backgroundColor: `${theme.color}20` }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
  toggleThemeMenu = () => {
    this.setState({ showThemeMenu: !this.state.showThemeMenu });
  };

  selectTheme = (themeId) => {
    this.changeTheme(themeId);
    this.setState({ showThemeMenu: false });
  };


applyThemeToDOM = (themeId) => {
    const html = document.documentElement;

    // Remove all existing theme classes
    html.classList.remove(
      "theme-blue",
      "theme-green",
      "theme-purple",
      "theme-orange",
      "theme-pink",
      "theme-cyan"
    );

    // Add the new theme class
    html.classList.add(`theme-${themeId}`);

    console.log(`Theme applied: theme-${themeId}`); // Debug log
    console.log("Current classes:", html.className); // Debug log
  };

  changeTheme = (themeId) => {
    this.setState({ currentTheme: themeId });
    this.applyThemeToDOM(themeId);

    // Save theme preference
    try {
      localStorage.setItem("selectedTheme", themeId);
    } catch (e) {
      console.warn("Could not save theme preference:", e);
    }
  };
renderGlassyTaskbar = () => {
  return (
    <div className="h-25 flex items-center justify-center px-8 pb-6 relative z-40">
      <div
        className="flex items-center justify-between backdrop-blur-xl border rounded-2xl shadow-2xl px-5 py-2 w-2/3 max-w-4xl relative overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          backgroundColor: "rgba(31, 41, 55, 0.15)",
          backdropFilter: "blur(24px)",
          borderColor: "var(--border)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--accent-primary)/10",
        }}
      >
        {/* Animated theme gradient background with smoother animation */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `linear-gradient(135deg, var(--accent-primary) 0%, transparent 30%, var(--accent-secondary, var(--accent-primary)) 70%, transparent 100%)`,
            backgroundSize: "300% 300%",
            animation: "gradientFlow 12s ease-in-out infinite",
          }}
        ></div>

        {/* Enhanced theme border glow with pulse effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-1000"
          style={{
            boxShadow: `inset 0 1px 0 var(--accent-primary)/20, 0 0 30px var(--accent-glow)/20`,
            animation: "borderPulse 4s ease-in-out infinite",
          }}
        ></div>

        {/* Left: Active Windows */}
        <div className="flex items-center space-x-2 flex-1 relative z-10">
          {this.renderActiveWindows()}
        </div>

        {/* Center: App Icons */}
        <div className="flex items-center space-x-3 px-4 relative z-10">
          {this.renderGlassyTaskbarApps()}
        </div>

        {/* Right: Clock + Theme Selector */}
        <div className="flex items-center justify-end flex-1 space-x-3 relative z-10">
          {/* Enhanced Clock with glow effect */}
          <div
            className="text-sm font-medium relative transition-all duration-300"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--text-primary)",
              textShadow: "0 0 15px var(--accent-glow)/40, 0 1px 3px rgba(0,0,0,0.3)",
              filter: "brightness(1.1)",
            }}
          >
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>

          {/* Theme Selector */}
          {this.renderThemeSelector()}
        </div>
      </div>
    </div>
  );
};

  renderGlassyTaskbarApps = () => {
  const essentialApps = ["terminal", "chrome", "projects","skills","contacts","about", "settings"];

  let taskbarApps = [];
  apps.forEach((app) => {
    if (essentialApps.includes(app.id)) {
      const isOpen = this.state.closed_windows[app.id] === false;
      const isFocused = this.state.focused_windows[app.id];

      taskbarApps.push(
        <button
          key={app.id}
          onClick={() => {
            this.openApp(app.id);
            // If app is already open, bring to focus and maximize if needed
            if (isOpen) {
              this.focus(app.id);
              // Add full-screen effect
              const windowElement = document.getElementById(app.id);
              if (windowElement) {
                windowElement.style.transform = 'translate(0, 0) scale(1)';
                windowElement.style.width = '100vw';
                windowElement.style.height = '100vh';
                windowElement.style.top = '0';
                windowElement.style.left = '0';
                windowElement.style.zIndex = '1000';
              }
            }
          }}
          className={`relative p-2 rounded-xl transition-all duration-500 ease-out transform hover:scale-110 backdrop-blur-sm group ${
            isOpen && isFocused
              ? "border shadow-lg"
              : isOpen 
                ? "border opacity-80"
                : "bg-gray-700/10 border border-gray-600/20 hover:bg-gray-600/20 hover:border-gray-500/40"
          }`}
          style={
            isOpen && isFocused
              ? {
                  backgroundColor: "var(--accent-light)",
                  borderColor: "var(--accent-primary)",
                  boxShadow: "0 8px 25px var(--accent-glow)/60, 0 0 0 1px var(--accent-primary)/30",
                  transform: "scale(1.05)",
                }
              : isOpen
                ? {
                    backgroundColor: "var(--accent-light)/60",
                    borderColor: "var(--accent-primary)/70",
                    boxShadow: "0 4px 15px var(--accent-glow)/30",
                  }
                : {}
          }
          onMouseEnter={(e) => {
            if (!isOpen) {
              e.currentTarget.style.borderColor = "var(--accent-primary)/80";
              e.currentTarget.style.backgroundColor = "var(--accent-light)/40";
              e.currentTarget.style.boxShadow = "0 6px 20px var(--accent-glow)/40";
              e.currentTarget.style.transform = "scale(1.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isOpen) {
              e.currentTarget.style.borderColor = "rgba(75, 85, 99, 0.2)";
              e.currentTarget.style.backgroundColor = "rgba(55, 65, 81, 0.1)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "scale(1)";
            }
          }}
        >
          {/* Enhanced icon container with glow effect */}
          <div className="w-10 h-10 flex items-center justify-center relative">
            <img
              width="40px"
              height="40px"
              src={app.icon}
              alt={app.title}
              className="w-full h-full object-contain transition-all duration-300 group-hover:drop-shadow-lg"
              style={{
                filter: isOpen 
                  ? isFocused 
                    ? "brightness(1.1) drop-shadow(0 0 8px var(--accent-primary))" 
                    : "brightness(1.05)"
                  : "brightness(0.9)",
                transition: "filter 0.3s ease, transform 0.3s ease",
              }}
            />
            
            {/* Enhanced glow effect for focused apps */}
            {isOpen && isFocused && (
              <div 
                className="absolute inset-0 rounded-lg animate-pulse"
                style={{
                  background: `radial-gradient(circle, var(--accent-primary)/20 0%, transparent 70%)`,
                  animation: "iconGlow 3s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* Enhanced active indicator with animation */}
          {isOpen && (
            <div
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 transition-all duration-300"
              style={{
                width: isFocused ? '16px' : '8px',
                height: '3px',
                borderRadius: '2px',
                backgroundColor: "var(--accent-primary)",
                boxShadow: `0 0 ${isFocused ? '12px' : '6px'} var(--accent-primary)/80`,
                animation: isFocused ? "activeIndicator 2s ease-in-out infinite" : "none",
              }}
            ></div>
          )}

          {/* App tooltip on hover */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm pointer-events-none whitespace-nowrap z-50">
            {app.title}
          </div>
        </button>
      );
    }
  });
  return taskbarApps;
};
  renderActiveWindows = () => {
    let activeWindows = [];
    let windowCount = 0;

    apps.forEach((app) => {
      if (
        this.state.closed_windows[app.id] === false &&
        !this.state.minimized_windows[app.id] &&
        windowCount < 3
      ) {
        const isFocused = this.state.focused_windows[app.id];

        activeWindows.push(
          <button
            key={`window-${app.id}`}
            onClick={() => this.focus(app.id)}
            className={`
                        px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 transform hover:scale-105
                        ${
                          isFocused
                            ? "bg-blue-500/40 text-blue-100 border border-blue-400/50 shadow-md shadow-blue-500/20"
                            : "bg-gray-700/40 text-gray-300 border border-gray-600/30 hover:bg-gray-600/50"
                        }
                        backdrop-blur-sm max-w-32 truncate
                    `}
            title={app.title}
          >
            {app.title}
          </button>
        );
        windowCount++;
      }
    });

    // If no windows, show placeholder
    if (activeWindows.length === 0) {
      activeWindows.push(
        <div
          key="no-windows"
          className="text-white-500 text-xs font-mono"
        >
          Home
        </div>
      );
    }

    return activeWindows;
  };
  hideSideBar = (id, hide) => {
    this.setState({ hideSideBar: hide });
  };
  giveFocusToLastApp = () => {
    if (!this.checkAllMinimised()) {
      for (const index in this.app_stack) {
        if (!this.state.minimized_windows[this.app_stack[index]]) {
          this.focus(this.app_stack[index]);
          break;
        }
      }
    }
  };
  handleMaximizeChange = (isMaximized) => {
    this.setState({ taskbarHidden: isMaximized });
  };
  hasMinimised = (id) => {
    let minimized_windows = this.state.minimized_windows;
    minimized_windows[id] = true;
    this.setState({ minimized_windows: minimized_windows });
  };
  isAnyWindowMaximized = () => {
    return Object.values(this.state.maximized_windows).some(
      (isMaximized) => isMaximized
    );
  };
  checkAllMinimised = () => {
    let result = true;
    for (const key in this.state.minimized_windows) {
      if (!this.state.closed_windows[key]) {
        // if app is opened
        result = result & this.state.minimized_windows[key];
      }
    }
    return result;
  };

  addToDesktop = (folderName) => {
    // Implementation for adding new folders to desktop
    // This is used by terminal app
    var new_folders = localStorage.getItem("new_folders");
    if (new_folders === null) {
      new_folders = [];
    } else {
      new_folders = JSON.parse(new_folders);
    }

    const newFolder = {
      id: Date.now(),
      name: folderName,
    };

    new_folders.push(newFolder);
    localStorage.setItem("new_folders", JSON.stringify(new_folders));

    // Refresh apps data to include new folder
    this.checkForNewFolders();
  };


  setContextListeners = () => {
    document.addEventListener("contextmenu", this.checkContextMenu);
    // on click, anywhere, hide all menus
    document.addEventListener("click", this.hideAllContextMenu);
  };

  removeContextListeners = () => {
    document.removeEventListener("contextmenu", this.checkContextMenu);
    document.removeEventListener("click", this.hideAllContextMenu);
  };

  checkContextMenu = (e) => {
    e.preventDefault();
    this.hideAllContextMenu();
    switch (e.target.dataset.context) {
      case "desktop-area":
        ReactGA.event({
          category: `Context Menu`,
          action: `Opened Desktop Context Menu`,
        });
        this.showContextMenu(e, "desktop");
        break;
      default:
        ReactGA.event({
          category: `Context Menu`,
          action: `Opened Default Context Menu`,
        });
        this.showContextMenu(e, "default");
    }
  };

  showContextMenu = (e, menuName /* context menu name */) => {
    let { posx, posy } = this.getMenuPosition(e);
    let contextMenu = document.getElementById(`${menuName}-menu`);

    if (posx + $(contextMenu).width() > window.innerWidth)
      posx -= $(contextMenu).width();
    if (posy + $(contextMenu).height() > window.innerHeight)
      posy -= $(contextMenu).height();

    posx = posx.toString() + "px";
    posy = posy.toString() + "px";

    contextMenu.style.left = posx;
    contextMenu.style.top = posy;

    this.setState({
      context_menus: { ...this.state.context_menus, [menuName]: true },
    });
  };

  hideAllContextMenu = () => {
    let menus = this.state.context_menus;
    Object.keys(menus).forEach((key) => {
      menus[key] = false;
    });
    this.setState({ context_menus: menus });
  };

  getMenuPosition = (e) => {
    var posx = 0;
    var posy = 0;

    if (!e) e = window.event;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    return {
      posx,
      posy,
    };
  };

  fetchAppsData = () => {
    let focused_windows = {},
      closed_windows = {},
      disabled_apps = {},
      favourite_apps = {},
      overlapped_windows = {},
      minimized_windows = {};
    let desktop_apps = [];
    apps.forEach((app) => {
      focused_windows = {
        ...focused_windows,
        [app.id]: false,
      };
      closed_windows = {
        ...closed_windows,
        [app.id]: true,
      };
      disabled_apps = {
        ...disabled_apps,
        [app.id]: app.disabled,
      };
      favourite_apps = {
        ...favourite_apps,
        [app.id]: app.favourite,
      };
      overlapped_windows = {
        ...overlapped_windows,
        [app.id]: false,
      };
      minimized_windows = {
        ...minimized_windows,
        [app.id]: false,
      };
      if (app.desktop_shortcut) desktop_apps.push(app.id);
    });
    this.setState({
      focused_windows,
      closed_windows,
      disabled_apps,
      favourite_apps,
      overlapped_windows,
      minimized_windows,
      desktop_apps,
    });
    this.initFavourite = { ...favourite_apps };
  };

  updateAppsData = () => {
    let focused_windows = {},
      closed_windows = {},
      favourite_apps = {},
      minimized_windows = {},
      disabled_apps = {};
    let desktop_apps = [];
    apps.forEach((app) => {
      focused_windows = {
        ...focused_windows,
        [app.id]:
          this.state.focused_windows[app.id] !== undefined ||
          this.state.focused_windows[app.id] !== null
            ? this.state.focused_windows[app.id]
            : false,
      };
      minimized_windows = {
        ...minimized_windows,
        [app.id]:
          this.state.minimized_windows[app.id] !== undefined ||
          this.state.minimized_windows[app.id] !== null
            ? this.state.minimized_windows[app.id]
            : false,
      };
      disabled_apps = {
        ...disabled_apps,
        [app.id]: app.disabled,
      };
      closed_windows = {
        ...closed_windows,
        [app.id]:
          this.state.closed_windows[app.id] !== undefined ||
          this.state.closed_windows[app.id] !== null
            ? this.state.closed_windows[app.id]
            : true,
      };
      favourite_apps = {
        ...favourite_apps,
        [app.id]: app.favourite,
      };
      if (app.desktop_shortcut) desktop_apps.push(app.id);
    });
    this.setState({
      focused_windows,
      closed_windows,
      disabled_apps,
      minimized_windows,
      favourite_apps,
      desktop_apps,
    });
    this.initFavourite = { ...favourite_apps };
  };

  renderDesktopApps = () => {
    if (Object.keys(this.state.closed_windows).length === 0) return;
    let appsJsx = [];
    apps.forEach((app, index) => {
      if (this.state.desktop_apps.includes(app.id)) {
        const props = {
          name: app.title,
          id: app.id,
          icon: app.icon,
          openApp: this.openApp,
        };

        appsJsx.push(<UbuntuApp key={index} {...props} />);
      }
    });
    return appsJsx;
  };

  renderWindows = () => {
    let windowsJsx = [];

    apps.forEach((app, index) => {
      if (this.state.closed_windows[app.id] === false) {
        // Get the window index based on app_stack order for proper cascading
        const windowIndex = this.app_stack.indexOf(app.id);

        const props = {
          title: app.title,
          id: app.id,
          screen: app.screen,
          addFolder: this.addToDesktop,
          closed: this.closeApp,
          openApp: this.openApp,
          focus: this.focus,
          isFocused: this.state.focused_windows[app.id],
          hideSideBar: this.hideSideBar,
          hasMinimised: this.hasMinimised,
          minimized: this.state.minimized_windows[app.id],
          changeBackgroundImage: this.props.changeBackgroundImage,
          changeBackgroundOpacity: this.changeBackgroundOpacity, 
          backgroundOpacity: this.state.backgroundOpacity, 
          bg_image_name: this.props.bg_image_name,
          windowIndex: windowIndex >= 0 ? windowIndex : 0,
          onMaximize: this.handleMaximizeChange,
        };

        windowsJsx.push(<Window key={index} {...props} />);
      }
    });
    return windowsJsx;
  };

  openApp = (objId) => {
    // google analytics
    ReactGA.event({
      category: `Open App`,
      action: `Opened ${objId} window`,
    });

    
    if (this.state.disabled_apps[objId]) return;

    if (this.state.minimized_windows[objId]) {
      
      this.focus(objId);

      // set window's last position
      var r = document.querySelector("#" + objId);
      r.style.transform = `translate(${r.style.getPropertyValue(
        "--window-transform-x"
      )},${r.style.getPropertyValue("--window-transform-y")}) scale(1)`;

      // tell childs that his app has been not minimised
      let minimized_windows = this.state.minimized_windows;
      minimized_windows[objId] = false;
      this.setState({ minimized_windows: minimized_windows });
      return;
    }

    //if app is already opened
    if (this.app_stack.includes(objId)) this.focus(objId);
    else {
      let closed_windows = this.state.closed_windows;
      let favourite_apps = this.state.favourite_apps;
      var frequentApps = localStorage.getItem("frequentApps")
        ? JSON.parse(localStorage.getItem("frequentApps"))
        : [];
      var currentApp = frequentApps.find((app) => app.id === objId);
      if (currentApp) {
        frequentApps.forEach((app) => {
          if (app.id === currentApp.id) {
            app.frequency += 1; // increase the frequency if app is found
          }
        });
      } else {
        frequentApps.push({ id: objId, frequency: 1 }); // new app opened
      }

      frequentApps.sort((a, b) => {
        if (a.frequency < b.frequency) {
          return 1;
        }
        if (a.frequency > b.frequency) {
          return -1;
        }
        return 0; // sort according to decreasing frequencies
      });

      localStorage.setItem("frequentApps", JSON.stringify(frequentApps));

      setTimeout(() => {
        favourite_apps[objId] = true; // adds opened app to sideBar
        closed_windows[objId] = false; // openes app's window
        this.setState(
          { closed_windows, favourite_apps, allAppsView: false },
          this.focus(objId)
        );
        this.app_stack.push(objId);
      }, 200);
    }
  };

  closeApp = (objId) => {
    // remove app from the app stack
    this.app_stack.splice(this.app_stack.indexOf(objId), 1);

    this.giveFocusToLastApp();

    this.hideSideBar(null, false);

    // close window
    let closed_windows = this.state.closed_windows;
    let favourite_apps = this.state.favourite_apps;

    if (this.initFavourite[objId] === false) favourite_apps[objId] = false; // if user default app is not favourite, remove from sidebar
    closed_windows[objId] = true; // closes the app's window

    this.setState({ closed_windows, favourite_apps });
  };

  focus = (objId) => {
    var focused_windows = this.state.focused_windows;
    focused_windows[objId] = true;
    for (let key in focused_windows) {
      if (focused_windows.hasOwnProperty(key)) {
        if (key !== objId) {
          focused_windows[key] = false;
        }
      }
    }
    this.setState({ focused_windows });
  };

  render() {
    return (
      <div
        className={`h-screen w-screen bg-gray-900 text-gray-100 relative overflow-hidden theme-${this.state.currentTheme}`}
        style={{
          fontFamily: "var(--font-sans)",
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        {/* Background Image with Opacity Control - UPDATED */}
        <div
          className="absolute inset-0 z-0"
          style={{
            opacity: this.state.backgroundOpacity / 100,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <BackgroundImage img={this.props.bg_image_name} />
        </div>

        {/* Desktop Area - Full height for windows */}
        <div className="h-[calc(100vh-100px)] relative z-10">
          {/* Window Area - Only your app windows */}
          <div
            className="absolute h-full w-full bg-transparent z-10"
            data-context="desktop-area"
          >
            {this.renderWindows()}
          </div>

          {/* Context Menus - Keep minimal ones */}
          <DesktopMenu
            active={this.state.context_menus.desktop}
            openApp={this.openApp}
            addNewFolder={this.addNewFolder}
          />
          <DefaultMenu active={this.state.context_menus.default} />
        </div>

        {/* GLASSMORPHISM TASKBAR WITH FONTS */}
        <div className="h-25 flex items-center justify-center px-8 pb-6 relative z-40">
          <div
            className="flex items-center justify-between bg-gray-800/20 backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-2xl px-5 py-2 w-2/3 max-w-4xl"
            style={{
              backgroundColor: "rgba(31, 41, 55, 0.15)",
              backdropFilter: "blur(24px)",
              borderColor: "var(--border)",
            }}
          >
            {/* Left: Active Windows */}
            <div className="flex items-center space-x-2 flex-1">
              {this.renderActiveWindows()}
            </div>

            {/* Center: App Icons */}
            <div className="flex items-center space-x-3 px-4">
              {this.renderGlassyTaskbarApps()}
            </div>

            {/* Right: Clock + Theme Selector */}
            <div className="flex items-center justify-end flex-1 space-x-3">
              {/* Clock with mono font */}
              <div
                className="text-gray-200 text-sm font-medium"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-primary)",
                }}
              >
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              {/* Theme Selector */}
              {this.renderThemeSelector()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Desktop;