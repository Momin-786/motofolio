import React, { Component } from 'react';
import $ from 'jquery';
import ReactGA from 'react-ga4';
import emailjs from '@emailjs/browser';

export class Gedit extends Component {
    constructor() {
        super();
        this.state = {
            sending: false,
        };
    }

    componentDidMount() {
        // emailjs.init(process.env.NEXT_PUBLIC_USER_ID);
    }

    render() {
        return (
            <div 
                className={`w-full h-full relative flex gap-5 p-5 text-white select-none theme-${this.props.currentTheme} backdrop-blur-xl`}
                style={{ 
                    fontFamily: "'Ubuntu Mono', monospace",
                    backgroundColor: "rgba(31, 41, 55, 0.15)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--accent-primary)/10",
                    opacity: this.props.backgroundOpacity / 100,
                    backgroundImage: `linear-gradient(135deg, var(--accent-primary)/10 0%, transparent 30%, var(--accent-secondary, var(--accent-primary))/10 70%, transparent 100%)`,
                    backgroundSize: "300% 300%",
                    animation: "gradientFlow 12s ease-in-out infinite"
                }}
            >
                {[
                    { href: "https://www.linkedin.com/in/abdul-momin7863/", img: "/images/logos/linkedin.png", label: "Linkedin" },
                    { href: "mailto:momina7863@gmail.com", img: "/images/logos/email.png", label: "Mail" },
                    { href: "https://medium.com/@momina7863", img: "/images/logos/medium.png", label: "Medium" },
                    { href: "https://github.com/Momin-786", img: "/images/logos/discord.png", label: "Github" }
                ].map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className="flex flex-col h-max justify-center items-center group relative"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="relative">
                            <img 
                                src={link.img} 
                                className="h-16 w-16 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
                                style={{
                                    filter: "brightness(0.9)",
                                    transition: "filter 0.3s ease, transform 0.3s ease"
                                }}
                            />
                            <div 
                                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 animate-pulse"
                                style={{
                                    background: `radial-gradient(circle, var(--accent-primary)/40 0%, transparent 70%)`
                                }}
                            />
                        </div>
                        <span 
                            className="text-center transition-all duration-300 group-hover:text-[var(--accent-primary)]"
                        >
                            {link.label}
                        </span>
                    </a>
                ))}
            </div>
        );
    }
}

export default Gedit;

export const displayGedit = () => {
    return <Gedit />;
};