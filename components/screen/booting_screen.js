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
                fontFamily: '"Ubuntu Mono", "Courier New", monospace'
            }}
            className={(props.visible || props.isShutDown ? " visible opacity-100" : " invisible opacity-0 ") + " absolute duration-500 select-none flex flex-col justify-center items-center top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen bg-gray-900"}
        >
            {/* Main Typing Animation Text */}
            <div className="mb-4">
                <span className="text-green-400 text-6xl md:text-8xl font-bold tracking-wider">
                    {props.isShutDown ? 'Hello World' : displayText}
                    <span className={props.visible && !props.isShutDown && displayText.length === fullText.length ? "opacity-0" : (props.visible && !props.isShutDown ? "animate-pulse" : "opacity-0")}>|</span>
                </span>
            </div>
            
            {/* Welcome Text */}
            <div className="mb-12">
                <span className="text-green-300 text-2xl md:text-4xl font-medium tracking-wide">
                    {props.isShutDown ? 'Welcome to my portfolio' : welcomeText}
                    <span className={props.visible && !props.isShutDown && welcomeText.length > 0 && welcomeText.length < welcomeFullText.length ? "animate-pulse" : "opacity-0"}>|</span>
                </span>
            </div>

            {/* Loading/Power Button */}
            <div className="w-16 h-16 flex justify-center items-center rounded-full outline-none cursor-pointer mb-16" onClick={props.turnOn}>
                {(props.isShutDown
                    ? <div className="bg-white rounded-full flex justify-center items-center w-16 h-16 hover:bg-gray-300 transition-colors duration-200">
                        <img width="40px" height="40px" className="w-10" src="./themes/Yaru/status/power-button.svg" alt="Power Button" />
                      </div>
                    : <img width="48px" height="48px" className={" w-12 " + (props.visible ? " animate-spin " : "")} src="./themes/Yaru/status/process-working-symbolic.svg" alt="Loading" />)}
            </div>

            {/* Your Logo - Positioned at Bottom */}
            <div className="absolute bottom-24">
                <img width="150px" height="75px" className="md:w-36 w-32" src="./themes/Yaru/status/momin-logo.png" alt="Momin Logo" />
            </div>

            {/* Social Links - At Very Bottom */}
            <div className="absolute bottom-8 text-gray-400 text-sm flex items-center">
                <a className="flex items-center gap-2 underline hover:text-white transition-colors duration-200" href="https://www.linkedin.com/in/abdul-momin7863/" rel="noreferrer noopener" target="_blank">
                    <Linkedin size={16} />
                    linkedin
                </a>
                <span className="font-bold mx-4">|</span>
                <a href="https://github.com/Momin-786" rel="noreferrer noopener" target="_blank" className="flex items-center gap-2 underline hover:text-white transition-colors duration-200">
                    <Github size={16} />
                    github
                </a>
            </div>
        </div>
    );
}

export default BootingScreen;