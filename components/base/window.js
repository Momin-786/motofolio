import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Settings from '../apps/settings';
import ReactGA from 'react-ga4';
import { displayTerminal } from '../apps/terminal'

export class Window extends Component {
    constructor() {
        super();
        this.id = null;
        this.animationFrame = null;
        // Dynamic positioning - will be set based on window count
        this.startX = 100;
        this.startY = 80;
        this.state = {
            cursorType: "cursor-default",
            width: 65,  // Default width
            height: 75, // Default height
            closed: false,
            maximized: false,
            isAnimating: false, // Track animation state
            parentSize: {
                height: 100,
                width: 100
            }
        }
    }

    componentDidMount() {
        this.id = this.props.id;
        
        // Set cascade positioning based on window index
        this.setCascadePosition();
        
        this.setDefaultWindowDimenstion();

        // google analytics
        ReactGA.send({ hitType: "pageview", page: `/${this.id}`, title: "Custom Title" });

        // on window resize, resize boundary
        window.addEventListener('resize', this.resizeBoundries);

        // Add smooth opening animation
        this.animateWindowOpen();
    }

    componentWillUnmount() {
        ReactGA.send({ hitType: "pageview", page: "/desktop", title: "Custom Title" });
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        window.removeEventListener('resize', this.resizeBoundries);
    }

    animateWindowOpen = () => {
        const windowElement = document.querySelector("#" + this.id);
        if (windowElement) {
            // Start with subtle scale and transparent - GPU accelerated
            windowElement.style.transform = `translate3d(${this.startX}px, ${this.startY}px, 0) scale(0.95)`;
            windowElement.style.opacity = '0';
            windowElement.style.transition = 'none';
            
            // Force a reflow for smooth animation
            windowElement.offsetHeight;
            
            // Fast, lightweight opening animation - 150ms with ease-out
            windowElement.style.transition = 'transform 150ms ease-out, opacity 150ms ease-out';
            windowElement.style.transform = `translate3d(${this.startX}px, ${this.startY}px, 0) scale(1)`;
            windowElement.style.opacity = '1';
        }
    }

    setCascadePosition = () => {
        // Get window index from props or calculate based on open windows
        const windowIndex = this.props.windowIndex || 0;
        const isMobile = window.innerWidth < 640;
        
        // Cascade offset - more noticeable offset for better visual stacking
        const cascadeOffsetX = isMobile ? 15 : 40;  // Right offset
        const cascadeOffsetY = isMobile ? 15 : 40;  // Bottom offset
        
        // Base position - left side on desktop, centered on mobile
        const baseX = isMobile ? 10 : 50;  // Left side positioning
        const baseY = isMobile ? 60 : 80;   // Top positioning
        
        // Calculate final position with cascade (offset right and bottom)
        this.startX = baseX + (windowIndex * cascadeOffsetX);
        this.startY = baseY + (windowIndex * cascadeOffsetY);
        
        // Prevent windows from going off-screen
        const maxX = isMobile ? window.innerWidth * 0.5 : window.innerWidth * 0.6;  // Allow more right movement
        const maxY = isMobile ? window.innerHeight * 0.5 : window.innerHeight * 0.6;  // Allow more bottom movement
        
        if (this.startX > maxX) {
            this.startX = baseX + ((windowIndex % 3) * cascadeOffsetX);  // Reset after 3 windows
        }
        if (this.startY > maxY) {
            this.startY = baseY + ((windowIndex % 3) * cascadeOffsetY);  // Reset after 3 windows
        }
    }

    setDefaultWindowDimenstion = () => {
        // Responsive sizing for mobile, tablet, and desktop
        const isMobile = window.innerWidth < 640;
        const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
        
        if (this.id === "settings") {
            // Settings window - responsive sizing
            if (isMobile) {
                this.setState({ height: 80, width: 95 }, this.resizeBoundries);
            }
            else if (isTablet) {
                this.setState({ height: 70, width: 70 }, this.resizeBoundries);
            }
            else {
                this.setState({ height: 55, width: 45 }, this.resizeBoundries);
            }
        } else {
            // Default sizing for other windows - proper size, not full screen
            if (isMobile) {
                this.setState({ height: 85, width: 95 }, this.resizeBoundries);
            }
            else if (isTablet) {
                this.setState({ height: 70, width: 65 }, this.resizeBoundries);
            }
            else {
                // Desktop: reasonable size on left side, not full screen
                this.setState({ height: 60, width: 40 }, this.resizeBoundries);
            }
        }
    }

    resizeBoundries = () => {
        const parent = document.getElementById("desktop-area");
        if (parent) {
            // Account for taskbar height (approximately 80px)
            const taskbarHeight = 80;
            const windowWidth = window.innerWidth * (this.state.width / 100.0);
            const windowHeight = window.innerHeight * (this.state.height / 100.0);
            
            this.setState({
                parentSize: {
                    width: Math.max(0, parent.offsetWidth - windowWidth),
                    height: Math.max(0, parent.offsetHeight - windowHeight - taskbarHeight)
                }
            }, () => {
                // Update Draggable bounds after state update
                this.forceUpdate();
            });
        } else {
            // Fallback calculation
            const windowWidth = window.innerWidth * (this.state.width / 100.0);
            const windowHeight = window.innerHeight * (this.state.height / 100.0);
            this.setState({
                parentSize: {
                    width: Math.max(0, window.innerWidth - windowWidth - 40),
                    height: Math.max(0, window.innerHeight - windowHeight - 140)
                }
            });
        }
    }

    changeCursorToMove = () => {
        this.focusWindow();
        if (this.state.maximized) {
            this.restoreWindow();
        }
        this.setState({ cursorType: "cursor-move" })
    }

    changeCursorToDefault = () => {
        this.setState({ cursorType: "cursor-default" })
    }

    handleVerticleResize = () => {
        this.setState({ height: this.state.height + 0.1 }, this.resizeBoundries);
    }

    handleHorizontalResize = () => {
        this.setState({ width: this.state.width + 0.1 }, this.resizeBoundries);
    }

    setWinowsPosition = () => {
        var r = document.querySelector("#" + this.id);
        if (r) {
            var rect = r.getBoundingClientRect();
            r.style.setProperty('--window-transform-x', rect.x.toFixed(1).toString() + "px");
            r.style.setProperty('--window-transform-y', (rect.y.toFixed(1) - 32).toString() + "px");
        }
    }

    // Simplified overlap check - no more sidebar dependency
    checkOverlap = () => {
        // This function now does nothing since we removed the sidebar
        // Keep it to avoid breaking the dragging functionality
    }

    focusWindow = () => {
        this.props.focus(this.id);
    }

    minimizeWindow = () => {
        if (this.state.isAnimating) return;
        
        this.setState({ isAnimating: true });
        
        let posx = -310;
        if (this.state.maximized) {
            posx = -510;
        }
        this.setWinowsPosition();
        
        var r = document.querySelector("#" + this.id);
        if (r) {
            // Fast, lightweight minimize animation - 150ms
            r.style.transition = 'transform 150ms ease-in, opacity 150ms ease-in';
            r.style.transformOrigin = 'center bottom';
            r.style.transform = `translate3d(${posx}px, ${window.innerHeight - 100}px, 0) scale(0.2)`;
            r.style.opacity = '0.7';
            
            setTimeout(() => {
                this.setState({ isAnimating: false });
                if (this.props.hasMinimised) {
                    this.props.hasMinimised(this.id);
                }
            }, 180);
        }
    }

    restoreWindow = () => {
        if (this.state.isAnimating) return;
        
        this.setState({ isAnimating: true });
        
        var r = document.querySelector("#" + this.id);
        if (r) {
            this.setDefaultWindowDimenstion();
            // get previous position
            let posx = r.style.getPropertyValue("--window-transform-x") || "80px";
            let posy = r.style.getPropertyValue("--window-transform-y") || "120px";

            // Fast, lightweight restore animation - 150ms
            r.style.transition = 'transform 150ms ease-out, opacity 150ms ease-out';
            r.style.transformOrigin = 'center center';
            r.style.transform = `translate3d(${parseFloat(posx)}, ${parseFloat(posy)}, 0) scale(1)`;
            r.style.opacity = '1';
            
            // Reset z-index to normal when restoring
            r.style.zIndex = '';
            
            setTimeout(() => {
                this.setState({ 
                    maximized: false,
                    isAnimating: false 
                });
                // Tell Desktop this window is no longer maximized
                if (this.props.onMaximize) {
                    this.props.onMaximize(this.id, false);
                }
            }, 180);
        }
    }

    maximizeWindow = () => {
        if (this.state.isAnimating) return;
        
        if (this.state.maximized) {
            this.restoreWindow();
        }
        else {
            this.setState({ isAnimating: true });
            this.focusWindow();
            
            var r = document.querySelector("#" + this.id);
            if (r) {
                this.setWinowsPosition();
                
                // Set highest z-index to ensure window is above everything
                r.style.zIndex = '9999';
                
                // Tell Desktop this window is maximized
                if (this.props.onMaximize) {
                    this.props.onMaximize(this.id, true);
                }
                
                // Fast, lightweight maximize animation - 150ms
                r.style.transition = 'transform 150ms ease-out';
                r.style.transformOrigin = 'center center';
                r.style.transform = `translate3d(0px, 0px, 0) scale(1)`;
                
                setTimeout(() => {
                    this.setState({ 
                        maximized: true, 
                        height: 100,  // Full height
                        width: 100,   // Full width
                        isAnimating: false
                    });
                }, 180);
            }
        }
    }

    closeWindow = () => {
        if (this.state.isAnimating) return;
        
        this.setState({ isAnimating: true });
        this.setWinowsPosition();
        
        // Tell Desktop this window is no longer maximized (in case it was)
        if (this.props.onMaximize) {
            this.props.onMaximize(this.id, false);
        }
        
        const windowElement = document.querySelector("#" + this.id);
        if (windowElement) {
            // Fast, lightweight close animation - 120ms with subtle scale
            const currentTransform = windowElement.style.transform || 'translate3d(0, 0, 0)';
            windowElement.style.transition = 'transform 120ms ease-in, opacity 120ms ease-in';
            windowElement.style.transformOrigin = 'center center';
            windowElement.style.transform = currentTransform.replace(/scale\([^)]*\)/, '') + ' scale(0.96)';
            windowElement.style.opacity = '0';
        }
        
        this.setState({ closed: true }, () => {
            setTimeout(() => {
                this.setState({ isAnimating: false });
                this.props.closed(this.id)
            }, 150) // after 150ms this window will be unmounted from parent (Desktop)
        });
    }

    render() {
        return (
            <Draggable
                axis="both"
                handle=".window-drag-handle"
                grid={[1, 1]}
                scale={1}
                onStart={this.changeCursorToMove}
                onStop={this.changeCursorToDefault}
                onDrag={this.checkOverlap}
                allowAnyClick={false}
                defaultPosition={{ x: this.startX, y: this.startY }}
                position={null}
                bounds={{ 
                    left: 0, 
                    top: 0, 
                    right: Math.max(0, this.state.parentSize.width), 
                    bottom: Math.max(0, this.state.parentSize.height)
                }}
                disabled={this.state.maximized || this.state.isAnimating}
            >
                <div
                    style={{
                        width: `${this.state.width}%`,
                        height: `${this.state.height}%`,
                        backgroundColor: '#2D2D2D', // Ubuntu bg-secondary
                        backdropFilter: 'blur(10px)',
                        border: '1px solid #3D3D3D', // Ubuntu border - minimal, not colorful
                        borderRadius: this.state.maximized ? '0' : '4px', // Ubuntu style - smaller radius
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', // Minimal shadow
                        // GPU acceleration for smooth animations - always enabled
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                        perspective: 1000,
                        willChange: this.state.isAnimating ? 'transform, opacity' : 'transform',
                        // Set z-index dynamically based on maximized state
                        zIndex: this.state.maximized ? '9999' : (this.props.isFocused ? '30' : '20'),
                        // Prevent text selection during animations
                        userSelect: this.state.isAnimating ? 'none' : 'auto',
                        pointerEvents: this.state.isAnimating ? 'none' : 'auto',
                        // Mobile responsiveness
                        maxWidth: window.innerWidth < 640 ? '100%' : 'none',
                        maxHeight: window.innerWidth < 640 ? '100%' : 'none'
                    }}
                    className={`${this.state.cursorType} ${this.state.closed ? "closed-window" : ""} ${this.state.maximized ? "maximized rounded-none" : ""} ${this.props.minimized ? "opacity-0 invisible" : ""} opened-window overflow-hidden ${window.innerWidth < 640 ? 'min-w-full min-h-full' : 'min-w-1/4 min-h-1/4'} main-window absolute flex flex-col ubuntu-window gpu-accelerated`}
                    id={this.id}
                >
                    <WindowTopBar title={this.props.title} />
                    <WindowYBorder resize={this.handleHorizontalResize} />
                    <WindowXBorder resize={this.handleVerticleResize} />
                    <WindowEditButtons 
                        minimize={this.minimizeWindow} 
                        maximize={this.maximizeWindow} 
                        isMaximised={this.state.maximized} 
                        close={this.closeWindow} 
                        id={this.id}
                        disabled={this.state.isAnimating}
                    />
                    {/* Content wrapper to ensure proper cursor and pointer events */}
                    <div style={{ position: 'relative', zIndex: 10, cursor: 'default', pointerEvents: 'auto', height: '100%', width: '100%', flex: 1, minHeight: 0 }}>
                    {(this.id === "settings"
                                        ? <Settings 
                                            changeBackgroundImage={this.props.changeBackgroundImage} 
                                            currBgImgName={this.props.bg_image_name}
                                            backgroundOpacity={this.props.backgroundOpacity}
                                            changeBackgroundOpacity={this.props.changeBackgroundOpacity}
                                        />
                                        : <WindowMainScreen 
                                            screen={this.props.screen} 
                                            title={this.props.title}
                                            id={this.id}
                                            addFolder={this.props.id === "terminal" ? this.props.addFolder : null}
                                            openApp={this.props.openApp}
                                            projectsData={this.props.projectsData}
                                            skillsData={this.props.skillsData}
                                            aboutData={this.props.aboutData}
                                          />)}
                    </div>
                </div>
            </Draggable >
        )
    }
}

export default Window

// Window's title bar - Ubuntu style (minimal, clean)
export function WindowTopBar(props) {
    return (
        <div 
            className="window-drag-handle ubuntu-title-bar"
            style={{
                minHeight: '36px', // Ubuntu style - compact
                cursor: 'move',
                position: 'relative',
                zIndex: 100,  // Higher than resize borders
                userSelect: 'none',
            }}
        >
            {/* Title text - Ubuntu Mono font, minimal styling */}
            <div 
                className="title"
                style={{
                    fontFamily: '"Ubuntu Mono", "Fira Code", monospace',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: '500',
                    pointerEvents: 'none',  // Allow dragging through text
                }}
            >
                {props.title}
            </div>
        </div>
    )
}

// Window's Borders
export class WindowYBorder extends Component {
    componentDidMount() {
        this.trpImg = new Image(0, 0);
        this.trpImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        this.trpImg.style.opacity = 0;
    }
    render() {
        return (
            <div 
                className="window-y-border border-transparent border-1 absolute right-0 top-0 bottom-0" 
                style={{
                    width: '4px',
                    cursor: 'ew-resize',
                    zIndex: 50,  // Lower than title bar
                    pointerEvents: 'auto',
                }}
                onDragStart={(e) => { e.dataTransfer.setDragImage(this.trpImg, 0, 0) }} 
                onDrag={this.props.resize}
            >
            </div>
        )
    }
}

export class WindowXBorder extends Component {
    componentDidMount() {
        this.trpImg = new Image(0, 0);
        this.trpImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        this.trpImg.style.opacity = 0;
    }
    render() {
        return (
            <div 
                className="window-x-border border-transparent border-1 absolute bottom-0 left-0 right-0" 
                style={{
                    height: '4px',
                    cursor: 'ns-resize',
                    zIndex: 50,  // Lower than title bar
                    pointerEvents: 'auto',
                }}
                onDragStart={(e) => { e.dataTransfer.setDragImage(this.trpImg, 0, 0) }} 
                onDrag={this.props.resize}
            >
            </div>
        )
    }
}

// Window's Edit Buttons with improved positioning
export function WindowEditButtons(props) {
    return (
        <div 
            className="absolute select-none right-2 top-2 flex justify-center items-center space-x-1.5"
            style={{ zIndex: 150 }}  // Higher than title bar (100) to ensure visibility
        >
            {/* Minimize Button */}
            <span 
                className={`bg-gray-700/40 backdrop-blur-sm hover:scale-110 rounded-full flex justify-center h-7 w-7 items-center transition-all duration-200 cursor-pointer group ${props.disabled ? 'pointer-events-none opacity-50' : ''}`}
                onClick={props.disabled ? undefined : props.minimize}
                style={{
                    backgroundColor: 'rgba(75, 85, 99, 0.7)',  // More opaque for better visibility
                    border: '1px solid var(--accent-primary)/30',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    zIndex: 151  // Ensure buttons are on top
                }}
                onMouseEnter={!props.disabled ? (e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)/20';
                    e.currentTarget.style.borderColor = 'var(--accent-primary)/60';
                    e.currentTarget.style.boxShadow = '0 4px 15px var(--accent-glow)/40';
                } : undefined}
                onMouseLeave={!props.disabled ? (e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(75, 85, 99, 0.7)';  // Match the updated default
                    e.currentTarget.style.borderColor = 'var(--accent-primary)/30';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
                } : undefined}
            >
                <img
                    src="./themes/Yaru/window/window-minimize-symbolic.svg"
                    alt="ubuntu window minimize"
                    className="h-4 w-4 inline transition-all duration-200"
                    style={{ 
                        filter: 'brightness(0) saturate(100%) invert(1)',
                        transition: 'filter 0.2s ease'
                    }}
                />
            </span>

            {/* Maximize/Restore Button */}
            {
                (props.isMaximised
                    ?
                    <span 
                        className={`bg-gray-700/40 backdrop-blur-sm hover:scale-110 rounded-full flex justify-center h-7 w-7 items-center transition-all duration-200 cursor-pointer group ${props.disabled ? 'pointer-events-none opacity-50' : ''}`}
                        onClick={props.disabled ? undefined : props.maximize}
                        style={{
                            backgroundColor: 'rgba(75, 85, 99, 0.4)',
                            border: '1px solid var(--accent-primary)/30',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}
                        onMouseEnter={!props.disabled ? (e) => {
                            e.currentTarget.style.backgroundColor = 'var(--accent-primary)/20';
                            e.currentTarget.style.borderColor = 'var(--accent-primary)/60';
                            e.currentTarget.style.boxShadow = '0 4px 15px var(--accent-glow)/40';
                        } : undefined}
                        onMouseLeave={!props.disabled ? (e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(75, 85, 99, 0.4)';
                            e.currentTarget.style.borderColor = 'var(--accent-primary)/30';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                        } : undefined}
                    >
                        <img
                            src="./themes/Yaru/window/window-restore-symbolic.svg"
                            alt="ubuntu window restore"
                            className="h-4 w-4 inline transition-all duration-200"
                            style={{ 
                                filter: 'brightness(0) saturate(100%) invert(1)',
                                transition: 'filter 0.2s ease'
                            }}
                        />
                    </span>
                    :
                    <span 
                        className={`bg-gray-700/40 backdrop-blur-sm hover:scale-110 rounded-full flex justify-center h-7 w-7 items-center transition-all duration-200 cursor-pointer group ${props.disabled ? 'pointer-events-none opacity-50' : ''}`}
                        onClick={props.disabled ? undefined : props.maximize}
                        style={{
                            backgroundColor: 'rgba(75, 85, 99, 0.4)',
                            border: '1px solid var(--accent-primary)/30',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}
                        onMouseEnter={!props.disabled ? (e) => {
                            e.currentTarget.style.backgroundColor = 'var(--accent-primary)/20';
                            e.currentTarget.style.borderColor = 'var(--accent-primary)/60';
                            e.currentTarget.style.boxShadow = '0 4px 15px var(--accent-glow)/40';
                        } : undefined}
                        onMouseLeave={!props.disabled ? (e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(75, 85, 99, 0.4)';
                            e.currentTarget.style.borderColor = 'var(--accent-primary)/30';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                        } : undefined}
                    >
                        <img
                            src="./themes/Yaru/window/window-maximize-symbolic.svg"
                            alt="ubuntu window maximize"
                            className="h-4 w-4 inline transition-all duration-200"
                            style={{ 
                                filter: 'brightness(0) saturate(100%) invert(1)',
                                transition: 'filter 0.2s ease'
                            }}
                        />
                    </span>
                )
            }

            {/* Close Button with theme color */}
            <button 
                tabIndex="-1" 
                id={`close-${props.id}`} 
                className={`focus:outline-none cursor-pointer backdrop-blur-sm hover:scale-110 rounded-full flex justify-center h-7 w-7 items-center transition-all duration-200 group ${props.disabled ? 'pointer-events-none opacity-50' : ''}`}
                onClick={props.disabled ? undefined : props.close}
                style={{
                    backgroundColor: 'var(--accent-primary)/80',
                    border: '1px solid var(--accent-primary)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2), 0 0 0 1px var(--accent-primary)/30',
                    zIndex: 151  // Ensure close button is on top
                }}
                onMouseEnter={!props.disabled ? (e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 4px 15px var(--accent-glow)/60, 0 0 20px var(--accent-primary)/40';
                } : undefined}
                onMouseLeave={!props.disabled ? (e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)/80';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2), 0 0 0 1px var(--accent-primary)/30';
                } : undefined}
            >
                <img
                    src="./themes/Yaru/window/window-close-symbolic.svg"
                    alt="ubuntu window close"
                    className="h-4 w-4 inline transition-all duration-200"
                    style={{ 
                        filter: 'brightness(0) saturate(100%) invert(1)',
                        transition: 'filter 0.2s ease'
                    }}
                />
            </button>
        </div>
    )
}

// Window's Main Screen with enhanced scrolling
export class WindowMainScreen extends Component {
    constructor() {
        super();
        this.state = {
            setDarkBg: false,
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ setDarkBg: true });
        }, 3000);
    }
    render() {
        // Check if this is Terminal app - no overlay needed
        const isTerminal = this.props.title === "Terminal" || 
                          this.props.id === "terminal" || 
                          this.props.id === "Terminal";
        
        return (
            <div 
                className="w-full flex-grow z-20 max-h-full overflow-y-auto overflow-x-hidden windowMainScreen rounded-b-xl ubuntu-scrollbar"
                style={{
                    backgroundColor: isTerminal ? 'transparent' : (this.state.setDarkBg 
                        ? 'rgba(17, 24, 39, 0.95)' 
                        : 'rgba(55, 65, 81, 0.95)'),
                    backdropFilter: isTerminal ? 'none' : 'blur(2px)',
                    transition: isTerminal ? 'none' : 'background-color 3s ease',
                    minHeight: '0',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(75, 85, 99, 0.8) transparent',
                    // GPU acceleration for smooth scrolling - optimized
                    transform: 'translateZ(0)',
                    willChange: 'scroll-position',
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehavior: 'contain',
                    // Remove smooth scroll for better performance
                    scrollBehavior: 'auto',
                    // Optimize scrolling performance
                    contain: 'layout style paint',
                    position: 'relative'
                }}
            >
                <div className={isTerminal ? "min-h-full w-full h-full" : "min-h-full"} style={isTerminal ? { position: 'relative', zIndex: 10 } : {}}>
                    {this.props.addFolder 
                      ? displayTerminal(this.props.addFolder, this.props.openApp) 
                      : this.props.screen({
                          ...this.props,
                          projectsData: this.props.projectsData,
                          skillsData: this.props.skillsData,
                          aboutData: this.props.aboutData,
                        })
                    }
                </div>
            </div>
        )
    }
}