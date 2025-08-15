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
            // Start with scaled down and transparent
            windowElement.style.transform = `translate(${this.startX}px, ${this.startY}px) scale(0.8)`;
            windowElement.style.opacity = '0';
            windowElement.style.transition = 'none';
            
            // Force a reflow
            windowElement.offsetHeight;
            
            // Apply smooth opening animation
            windowElement.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            windowElement.style.transform = `translate(${this.startX}px, ${this.startY}px) scale(1)`;
            windowElement.style.opacity = '1';
        }
    }

    setCascadePosition = () => {
        // Get window index from props or calculate based on open windows
        const windowIndex = this.props.windowIndex || 0;
        
        // Cascade offset - each new window offset by 30px right and 30px down
        const cascadeOffset = 30;
        
        // Base position - start much lower to account for top navigation bar
        const baseX = 80;
        const baseY = 120; // Increased from 80 to 120 to avoid top nav bar
        
        // Calculate final position with cascade
        this.startX = baseX + (windowIndex * cascadeOffset);
        this.startY = baseY + (windowIndex * cascadeOffset);
        
        // Prevent windows from going off-screen, accounting for top nav bar
        const maxX = window.innerWidth * 0.5; // More conservative to keep windows visible
        const maxY = window.innerHeight * 0.4; // Account for both top nav and bottom taskbar
        
        if (this.startX > maxX) {
            this.startX = baseX; // Reset to base if too far right
        }
        if (this.startY > maxY) {
            this.startY = baseY; // Reset to base if too far down
        }
    }

    setDefaultWindowDimenstion = () => {
        // Special sizing for different window types
        if (this.id === "settings") {
            // Settings window - much smaller and more manageable
            if (window.innerWidth < 640) {
                this.setState({ height: 55, width: 85 }, this.resizeBoundries);
            }
            else if (window.innerWidth < 1024) {
                this.setState({ height: 60, width: 60 }, this.resizeBoundries);
            }
            else {
                this.setState({ height: 55, width: 45 }, this.resizeBoundries); // Much smaller for desktop
            }
        } else {
            // Default sizing for other windows - narrower widths
            if (window.innerWidth < 640) {
                this.setState({ height: 65, width: 90 }, this.resizeBoundries);
            }
            else if (window.innerWidth < 1024) {
                this.setState({ height: 70, width: 70 }, this.resizeBoundries);
            }
            else {
                this.setState({ height: 70, width: 50 }, this.resizeBoundries); // Narrower default width
            }
        }
    }

    resizeBoundries = () => {
        this.setState({
            parentSize: {
                height: window.innerHeight // parent height
                    - (window.innerHeight * (this.state.height / 100.0))  // this window's height
                    - 140 // space for top nav bar (60px) + bottom taskbar (80px)
                ,
                width: window.innerWidth // parent width
                    - (window.innerWidth * (this.state.width / 100.0)) //this window's width
                    - 40 // some margin from edges
            }
        });
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
            // Use hardware acceleration and smooth transition
            r.style.transition = 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            r.style.transformOrigin = 'center bottom';
            r.style.transform = `translate(${posx}px, ${window.innerHeight - 100}px) scale(0.2)`;
            r.style.opacity = '0.7';
            
            setTimeout(() => {
                this.setState({ isAnimating: false });
                if (this.props.hasMinimised) {
                    this.props.hasMinimised(this.id);
                }
            }, 350);
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

            // Smooth restore animation
            r.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            r.style.transformOrigin = 'center center';
            r.style.transform = `translate(${posx},${posy}) scale(1)`;
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
            }, 400);
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
                
                // Smooth maximize animation
                r.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                r.style.transformOrigin = 'center center';
                r.style.transform = `translate(0px, 0px) scale(1)`;
                
                setTimeout(() => {
                    this.setState({ 
                        maximized: true, 
                        height: 100,  // Full height
                        width: 100,   // Full width
                        isAnimating: false
                    });
                }, 400);
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
            // Smooth close animation - scale down and fade out
            windowElement.style.transition = 'all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53)';
            windowElement.style.transformOrigin = 'center center';
            windowElement.style.transform = windowElement.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(0.8)';
            windowElement.style.opacity = '0';
            windowElement.style.filter = 'blur(2px)';
        }
        
        this.setState({ closed: true }, () => {
            setTimeout(() => {
                this.setState({ isAnimating: false });
                this.props.closed(this.id)
            }, 300) // after 300ms this window will be unmounted from parent (Desktop)
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
                bounds={{ left: 0, top: 0, right: this.state.parentSize.width, bottom: this.state.parentSize.height }}
                disabled={this.state.maximized || this.state.isAnimating}
            >
                <div
                    style={{
                        width: `${this.state.width}%`,
                        height: `${this.state.height}%`,
                        backgroundColor: 'rgba(31, 41, 55, 0.15)',
                        backdropFilter: 'blur(24px)',
                        border: '2px solid var(--accent-primary)',
                        borderRadius: this.state.maximized ? '0' : '12px',
                        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--accent-primary)/30, 0 0 20px var(--accent-glow)/40`,
                        // Remove transition from inline styles to prevent conflicts
                        // Set z-index dynamically based on maximized state
                        zIndex: this.state.maximized ? '9999' : (this.props.isFocused ? '30' : '20'),
                        // Use hardware acceleration
                        willChange: this.state.isAnimating ? 'transform, opacity' : 'auto',
                        // Prevent text selection during animations
                        userSelect: this.state.isAnimating ? 'none' : 'auto',
                        pointerEvents: this.state.isAnimating ? 'none' : 'auto'
                    }}
                    className={`${this.state.cursorType} ${this.state.closed ? "closed-window" : ""} ${this.state.maximized ? "maximized rounded-none" : "rounded-xl"} ${this.props.minimized ? "opacity-0 invisible" : ""} opened-window overflow-hidden min-w-1/4 min-h-1/4 main-window absolute flex flex-col backdrop-blur-xl`}
                    id={this.id}
                >
                    <WindowYBorder resize={this.handleHorizontalResize} />
                    <WindowXBorder resize={this.handleVerticleResize} />
                    <WindowTopBar title={this.props.title} />
                    <WindowEditButtons 
                        minimize={this.minimizeWindow} 
                        maximize={this.maximizeWindow} 
                        isMaximised={this.state.maximized} 
                        close={this.closeWindow} 
                        id={this.id}
                        disabled={this.state.isAnimating}
                    />
                    {(this.id === "settings"
                                        ? <Settings 
                                            changeBackgroundImage={this.props.changeBackgroundImage} 
                                            currBgImgName={this.props.bg_image_name}
                                            backgroundOpacity={this.props.backgroundOpacity}
                                            changeBackgroundOpacity={this.props.changeBackgroundOpacity}
                                        />
                                        : <WindowMainScreen screen={this.props.screen} title={this.props.title}
                                            addFolder={this.props.id === "terminal" ? this.props.addFolder : null}
                                            openApp={this.props.openApp} />)}
                </div>
            </Draggable >
        )
    }
}

export default Window

// Window's title bar with pure glassy background
export function WindowTopBar(props) {
    return (
        <div 
            className="window-drag-handle relative backdrop-blur-xl border-b py-2.5 px-4 text-white w-full select-none rounded-t-xl cursor-move"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)', // Safari support
                minHeight: '42px', // Ensure consistent height for controls positioning
            }}
        >
            {/* Pure glass overlay for extra depth */}
            <div 
                className="absolute inset-0 rounded-t-xl"
                style={{
                    background: `linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.1) 0%, 
                        rgba(255, 255, 255, 0.05) 50%, 
                        rgba(255, 255, 255, 0.1) 100%)`,
                }}
            />
            
            {/* Title text with Linux font and theme color */}
            <div 
                className="flex justify-center text-sm font-bold relative z-10 tracking-wide"
                style={{
                    fontFamily: '"Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                    color: 'var(--text-primary)',
                    textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 0 10px var(--accent-glow)/30',
                    letterSpacing: '0.5px'
                }}
            >
                {props.title}
            </div>

            {/* Glass reflection effect */}
            <div 
                className="absolute top-0 left-4 right-4 h-px"
                style={{
                    background: `linear-gradient(90deg, 
                        transparent 0%, 
                        rgba(255, 255, 255, 0.3) 20%, 
                        rgba(255, 255, 255, 0.6) 50%, 
                        rgba(255, 255, 255, 0.3) 80%, 
                        transparent 100%)`,
                    filter: 'blur(0.5px)'
                }}
            />
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
            <div className=" window-y-border border-transparent border-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onDragStart={(e) => { e.dataTransfer.setDragImage(this.trpImg, 0, 0) }} onDrag={this.props.resize}>
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
            <div className=" window-x-border border-transparent border-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onDragStart={(e) => { e.dataTransfer.setDragImage(this.trpImg, 0, 0) }} onDrag={this.props.resize}>
            </div>
        )
    }
}

// Window's Edit Buttons with improved positioning
export function WindowEditButtons(props) {
    return (
        <div className="absolute select-none right-2 top-2 flex justify-center items-center space-x-1.5 z-50">
            {/* Minimize Button */}
            <span 
                className={`bg-gray-700/40 backdrop-blur-sm hover:scale-110 rounded-full flex justify-center h-7 w-7 items-center transition-all duration-200 cursor-pointer group ${props.disabled ? 'pointer-events-none opacity-50' : ''}`}
                onClick={props.disabled ? undefined : props.minimize}
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
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2), 0 0 0 1px var(--accent-primary)/30'
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
        return (
            <div 
                className="w-full flex-grow z-20 max-h-full overflow-y-auto overflow-x-hidden windowMainScreen rounded-b-xl scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500"
                style={{
                    backgroundColor: this.state.setDarkBg 
                        ? 'rgba(17, 24, 39, 0.8)' 
                        : 'rgba(55, 65, 81, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'background-color 3s ease',
                    minHeight: '0',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(75, 85, 99, 0.8) transparent'
                }}
            >
                <div className="p-2 min-h-full">
                    {this.props.addFolder ? displayTerminal(this.props.addFolder, this.props.openApp) : this.props.screen(this.props)}
                </div>
            </div>
        )
    }
}