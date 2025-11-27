import React from 'react';
import $ from 'jquery';

export function Settings(props) {
    
    
    // Get current opacity from props or default to 100
    const [backgroundOpacity, setBackgroundOpacity] = React.useState(
        props.backgroundOpacity || 100
    );

    // Update local state when props change
    React.useEffect(() => {
        if (props.backgroundOpacity !== undefined) {
            setBackgroundOpacity(props.backgroundOpacity);
        }
    }, [props.backgroundOpacity]);

    // Handle opacity change
    const handleOpacityChange = (e) => {
        const newOpacity = parseInt(e.target.value);
    
        setBackgroundOpacity(newOpacity);
        
        // Call parent function to update background opacity
        if (props.changeBackgroundOpacity) {
           
            props.changeBackgroundOpacity(newOpacity);
        } else {
            
        }
    };

    // Updated wallpapers object with both images and videos
    const wallpapers = {
        // Static Images
        "wall-1": {
            src: "./images/wallpapers/wallpaper1.jpg",
            type: "image",
            name: "Motivational Quote"
        },
"wall-2": {
    src: "https://picsum.photos/1920/1080?random=1",
    type: "image",
    name: "Random"
},
        "wall-3": {
            src: "./images/wallpapers/wallpaper3.jpg",
            type: "image",
            name: "Patterned Design"
        },
        "wall-4": {
            src: "./images/wallpapers/wallpaper4.jpg",
            type: "image",
            name: "Vibe Abstract"
        },
        "wall-5": {
            src: "./images/wallpapers/wallpaper5.jpg",
            type: "image",
            name: "Red Aurora"
        },
        
        // Video Wallpapers
        "video-1": {
            src: "./videos/wallpapers/video1.mp4",
            type: "video",
            name: "Abstract Flow"
        },
    };

    const currentWallpaper = wallpapers[props.currBgImgName] || wallpapers["wall-2"];

    let changeBackgroundImage = (e) => {
        props.changeBackgroundImage($(e.target).data("path"));
    }

    const renderPreview = (wallpaperData, isMain = false) => {
        const baseStyle = {
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            position: "relative",
            overflow: "hidden"
        };

        if (wallpaperData.type === 'video') {
            return (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0
                    }}
                    onError={(e) => console.error('Preview video error:', e)}
                >
                    <source src={wallpaperData.src} type="video/mp4" />
                </video>
            );
        } else {
            return (
                <div 
                    style={{ 
                        ...baseStyle,
                        backgroundImage: `url(${wallpaperData.src})`,
                        width: "100%",
                        height: "100%"
                    }}
                />
            );
        }
    };

    return (
         <div 
        className="w-full h-full bg-[#1E1E1E] font-['Ubuntu_Mono',monospace] overflow-hidden ubuntu-scrollbar"
        style={{
            color: '#FFFFFF',
            fontFamily: "'Ubuntu Mono', monospace"
        }}
    >
            <div className="w-full h-full flex flex-col">
            {/* Ubuntu-style Header */}
            <div className="flex-shrink-0 bg-[#2D2D2D] border-b border-[#3D3D3D] p-3 md:p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 
                            className="text-base md:text-lg font-medium text-white"
                            style={{ fontFamily: "'Ubuntu Mono', monospace" }}
                        >
                            System Settings
                        </h2>
                        <p 
                            className="text-xs md:text-sm mt-1 text-[#B3B3B3]"
                            style={{ fontFamily: "'Ubuntu Mono', monospace" }}
                        >
                            Customize your desktop environment
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Scrollable Content Container */}
            <div className="flex-1 overflow-auto bg-[#1E1E1E] ubuntu-scrollbar">
            {/* Main Preview - Ubuntu style */}
            <div className="p-3 md:p-4 bg-[#2D2D2D] border-b border-[#3D3D3D]">
                <div 
                    className="w-full max-w-md mx-auto h-40 md:h-48 relative rounded overflow-hidden border"
                    style={{
                        borderColor: '#3D3D3D',
                        backgroundColor: '#1E1E1E'
                    }}
                >
                    {renderPreview(currentWallpaper, true)}
                    
                    {/* Preview Info - Ubuntu style */}
                    <div 
                        className="absolute bottom-0 left-0 right-0 px-3 py-2"
                        style={{
                            backgroundColor: 'rgba(30, 30, 30, 0.85)',
                            backdropFilter: 'blur(4px)'
                        }}
                    >
                        <div 
                            className="text-xs md:text-sm font-medium text-white"
                            style={{ 
                                fontFamily: "'Ubuntu Mono', monospace"
                            }}
                        >
                            {currentWallpaper.name}
                        </div>
                        <div 
                            className="text-xs mt-1 text-[#808080]"
                            style={{ fontFamily: "'Ubuntu Mono', monospace" }}
                        >
                            {currentWallpaper.type === 'video' ? 'video/mp4' : 'image/static'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Opacity Control Section - Ubuntu style */}
            <div className="p-3 md:p-4 bg-[#2D2D2D] border-b border-[#3D3D3D]">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-between mb-3">
                        <h3 
                            className="text-sm md:text-base font-medium text-white"
                            style={{ fontFamily: "'Ubuntu Mono', monospace" }}
                        >
                            Background Opacity
                        </h3>
                        <span 
                            className="text-xs md:text-sm px-2 py-1 rounded border bg-[#1E1E1E] text-[#B3B3B3] border-[#3D3D3D]"
                            style={{ fontFamily: "'Ubuntu Mono', monospace" }}
                        >
                            {backgroundOpacity}%
                        </span>
                    </div>
                    
                    {/* Custom Slider - Ubuntu style */}
                    <div className="relative">
                        <input
                            type="range"
                            min="10"
                            max="100"
                            step="5"
                            value={backgroundOpacity}
                            onChange={handleOpacityChange}
                            className="w-full h-2 rounded-lg cursor-pointer slider"
                            style={{
                                background: `linear-gradient(to right, 
                                    #E95420 ${backgroundOpacity}%, 
                                    #3D3D3D ${backgroundOpacity}%)`,
                                outline: 'none',
                                appearance: 'none',
                                WebkitAppearance: 'none'
                            }}
                        />
                        
                        {/* Slider Labels */}
                        <div 
                            className="flex justify-between mt-2 text-xs text-[#808080]"
                            style={{ fontFamily: "'Ubuntu Mono', monospace" }}
                        >
                            <span>10%</span>
                            <span>100%</span>
                        </div>
                    </div>
                    
                    <p 
                        className="text-xs mt-3 text-[#808080]"
                        style={{ fontFamily: "'Ubuntu Mono', monospace" }}
                    >
                        Adjust transparency for optimal visibility
                    </p>
                </div>
            </div>

            {/* Content Section - Ubuntu style */}
            <div className="p-3 md:p-4 bg-[#1E1E1E]">
                <div className="mb-3 md:mb-4">
                    <h3 
                        className="text-sm md:text-base font-medium mb-2 text-white"
                        style={{ fontFamily: "'Ubuntu Mono', monospace" }}
                    >
                        Available Backgrounds
                    </h3>
                    <div 
                        className="flex gap-4 md:gap-6 text-xs md:text-sm text-[#808080]"
                        style={{ fontFamily: "'Ubuntu Mono', monospace" }}
                    >
                        <span>[img] Static Images</span>
                        <span>[vid] Video Loops</span>
                    </div>
                </div>
                
                {/* Wallpaper Grid - Responsive */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                    {Object.keys(wallpapers).map((name, index) => {
                        const wallpaperData = wallpapers[name];
                        const isSelected = name === props.currBgImgName;
                        
                        return (
                            <div 
                                key={index} 
                                tabIndex="1" 
                                onFocus={changeBackgroundImage} 
                                data-path={name} 
                                className={`
                                    relative outline-none cursor-pointer group
                                    transition-all duration-150 
                                    w-full aspect-video rounded overflow-hidden border
                                    ${isSelected 
                                        ? "ring-2 ring-[#E95420]" 
                                        : "hover:ring-1 hover:ring-[#3D3D3D]"
                                    }
                                `}
                                style={{
                                    backgroundColor: '#1E1E1E',
                                    borderColor: isSelected ? '#E95420' : '#3D3D3D'
                                }}
                                title={`${wallpaperData.name} (${wallpaperData.type})`}
                            >
                                {/* Thumbnail */}
                                <div className="w-full h-full">
                                    {renderPreview(wallpaperData)}
                                </div>
                                
                                {/* Type indicator - Ubuntu style */}
                                <div 
                                    className="absolute top-1 right-1 px-1.5 py-0.5 text-xs rounded bg-[#1E1E1E]/80 text-[#808080]"
                                    style={{ fontFamily: "'Ubuntu Mono', monospace" }}
                                >
                                    {wallpaperData.type === 'video' ? 'vid' : 'img'}
                                </div>
                                
                                {/* Selection indicator - Ubuntu style */}
                                {isSelected && (
                                    <div 
                                        className="absolute inset-0 flex items-center justify-center"
                                        style={{
                                            backgroundColor: 'rgba(233, 84, 32, 0.15)'
                                        }}
                                    >
                                        <div 
                                            className="px-2 py-1 text-xs rounded border bg-[#1E1E1E]/90 text-white border-[#E95420]"
                                            style={{ fontFamily: "'Ubuntu Mono', monospace" }}
                                        >
                                            ACTIVE
                                        </div>
                                    </div>
                                )}
                                
                                {/* Hover overlay - Ubuntu style */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                    style={{
                                        backgroundColor: 'rgba(233, 84, 32, 0.05)'
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Footer Instructions - Ubuntu style */}
            <div className="p-3 md:p-4 bg-[#2D2D2D] border-t border-[#3D3D3D]">
                <div 
                    className="text-xs md:text-sm text-[#808080]"
                    style={{ fontFamily: "'Ubuntu Mono', monospace" }}
                >
                    <p>Select thumbnail to apply background</p>
                    <p className="mt-1 text-xs">Video backgrounds loop automatically (muted)</p>
                </div>
            </div>
            </div>
            
            {/* Custom Slider Styles - Ubuntu theme */}
            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #FFFFFF;
                    border: 2px solid #E95420;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }
                
                .slider::-webkit-slider-thumb:hover {
                    background: #E95420;
                    border-color: #FFFFFF;
                }
                
                .slider::-moz-range-thumb {
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #FFFFFF;
                    border: 2px solid #E95420;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }
                
                .slider::-moz-range-thumb:hover {
                    background: #E95420;
                    border-color: #FFFFFF;
                }
                
                .slider::-moz-range-track {
                    height: 8px;
                    border-radius: 4px;
                }
            `}</style>
            </div>
        </div>
    )
}

export default Settings

export const displaySettings = (props) => {
    
    return <Settings {...props}></Settings>;
}