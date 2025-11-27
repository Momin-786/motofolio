import React, { useState, useEffect } from 'react';
import { Linkedin, Github } from 'lucide-react';

function BootingScreen(props) {
    const [displayText, setDisplayText] = useState('');
    const [welcomeText, setWelcomeText] = useState('');
    const fullText = 'Hello World';
    const welcomeFullText = 'Welcome to my portfolio';
    
    useEffect(() => {
        if (props.visible && !props.isShutDown) {
            let index = 0;
            setDisplayText('');
            setWelcomeText('');
            
            const typeMainText = () => {
                if (index < fullText.length) {
                    setDisplayText(fullText.slice(0, index + 1));
                    index++;
                    setTimeout(typeMainText, 150); // Faster typing - 150ms between characters
                } else {
                    // Start typing welcome text after main text is complete
                    setTimeout(typeWelcomeText, 500);
                }
            };
            
            let welcomeIndex = 0;
            const typeWelcomeText = () => {
                if (welcomeIndex < welcomeFullText.length) {
                    setWelcomeText(welcomeFullText.slice(0, welcomeIndex + 1));
                    welcomeIndex++;
                    setTimeout(typeWelcomeText, 100); // Even faster for welcome text
                }
            };
            
            setTimeout(typeMainText, 1000); // Initial delay - 1 second
        }
    }, [props.visible, props.isShutDown]);

    return (
        <div 
            style={{
                ...(props.visible || props.isShutDown ? { zIndex: "100" } : { zIndex: "-20" }),
                fontFamily: '"Ubuntu Mono", "Courier New", monospace',
                backgroundColor: 'var(--bg-primary)'
            }}
            className={(props.visible || props.isShutDown ? " visible opacity-100" : " invisible opacity-0 ") + " absolute duration-500 select-none flex flex-col justify-center items-center top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen"}
        >
            {/* Main Typing Animation Text */}
            <div className="mb-4 relative z-10">
                <span 
                    className="text-6xl md:text-8xl font-bold tracking-wider"
                    style={{
                        color: 'var(--ubuntu-success)',
                        textShadow: '0 0 20px var(--ubuntu-success-muted), 0 0 40px var(--ubuntu-success-muted)'
                    }}
                >
                    {props.isShutDown ? 'Hello World' : displayText}
                    <span 
                        className={props.visible && !props.isShutDown && displayText.length === fullText.length ? "opacity-0" : (props.visible && !props.isShutDown ? "animate-pulse" : "opacity-0")}
                        style={{ color: 'var(--ubuntu-success)' }}
                    >|</span>
                </span>
            </div>
            
            {/* Welcome Text */}
            <div className="mb-12 relative z-10">
                <span 
                    className="text-2xl md:text-4xl font-medium tracking-wide"
                    style={{
                        color: 'var(--ubuntu-text-primary)',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    {props.isShutDown ? 'Welcome to my portfolio' : welcomeText}
                    <span 
                        className={props.visible && !props.isShutDown && welcomeText.length > 0 && welcomeText.length < welcomeFullText.length ? "animate-pulse" : "opacity-0"}
                        style={{ color: 'var(--ubuntu-text-primary)' }}
                    >|</span>
                </span>
            </div>

            {/* Loading/Power Button */}
            <div className="w-16 h-16 flex justify-center items-center rounded-full outline-none cursor-pointer mb-16 relative z-10" onClick={props.turnOn}>
                {(props.isShutDown
                    ? <div 
                        className="rounded-full flex justify-center items-center w-16 h-16 transition-all duration-200 hover:scale-110"
                        style={{
                            backgroundColor: 'var(--ubuntu-text-primary)',
                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--ubuntu-accent)';
                            e.currentTarget.style.boxShadow = '0 0 30px var(--ubuntu-accent), 0 0 60px var(--ubuntu-accent)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--ubuntu-text-primary)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)';
                        }}
                    >
                        <img width="40px" height="40px" className="w-10" src="./themes/Yaru/status/power-button.svg" alt="Power Button" />
                      </div>
                    : <div 
                        className="relative"
                    >
                        <img 
                            width="48px" 
                            height="48px" 
                            className={" w-12 " + (props.visible ? " animate-spin " : "")} 
                            src="./themes/Yaru/status/process-working-symbolic.svg" 
                            alt="Loading"
                            style={{
                                filter: 'brightness(0) saturate(100%) invert(48%) sepia(96%) saturate(1352%) hue-rotate(353deg) brightness(95%) contrast(89%) drop-shadow(0 0 10px #E95420) drop-shadow(0 0 5px #E95420)'
                            }}
                        />
                    </div>)}
            </div>

            {/* Your Logo - Positioned at Bottom */}
            <div className="absolute bottom-24 z-10">
                <img 
                    width="150px" 
                    height="75px" 
                    className="md:w-36 w-32" 
                    src="./themes/Yaru/status/momin-logo.png" 
                    alt="Momin Logo"
                    style={{
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'
                    }}
                />
            </div>

            {/* Social Links - At Very Bottom */}
            <div 
                className="absolute bottom-8 text-sm flex items-center z-10"
                style={{
                    color: 'var(--ubuntu-text-secondary)'
                }}
            >
                <a 
                    className="flex items-center gap-2 underline transition-all duration-200 hover:scale-105" 
                    href="https://www.linkedin.com/in/abdul-momin7863/" 
                    rel="noreferrer noopener" 
                    target="_blank"
                    style={{
                        color: 'var(--ubuntu-text-secondary)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--ubuntu-accent)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--ubuntu-text-secondary)';
                    }}
                >
                    <Linkedin size={16} />
                    linkedin
                </a>
                <span 
                    className="font-bold mx-4"
                    style={{
                        color: 'var(--ubuntu-border)'
                    }}
                >|</span>
                <a 
                    href="https://github.com/Momin-786" 
                    rel="noreferrer noopener" 
                    target="_blank" 
                    className="flex items-center gap-2 underline transition-all duration-200 hover:scale-105"
                    style={{
                        color: 'var(--ubuntu-text-secondary)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--ubuntu-accent)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--ubuntu-text-secondary)';
                    }}
                >
                    <Github size={16} />
                    github
                </a>
            </div>
        </div>
    );
}

export default BootingScreen;