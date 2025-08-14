import React from 'react';
import $ from 'jquery';

export function Settings(props) {
    console.log('Settings props:', props); // Debug log
    
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
        console.log('Slider changed to:', newOpacity); // Debug log
        setBackgroundOpacity(newOpacity);
        
        // Call parent function to update background opacity
        if (props.changeBackgroundOpacity) {
            console.log('Calling parent changeBackgroundOpacity'); // Debug log
            props.changeBackgroundOpacity(newOpacity);
        } else {
            console.error('changeBackgroundOpacity prop is missing!'); // Debug log
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
            src: "./images/wallpapers/wallpaper2.jpg",
            type: "image",
            name: "Earth View"
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
            className="w-full flex-col flex-grow z-20 max-h-full overflow-y-auto windowMainScreen select-none"
            style={{
                backgroundColor: '#2e3440', // Nord0
                color: '#d8dee9', // Nord4
                fontFamily: '"Fira Code", "JetBrains Mono", monospace'
            }}
        >
            {/* Header Section */}
            <div 
                className="px-6 py-4 border-b"
                style={{
                    borderColor: '#3b4252', // Nord1
                    backgroundColor: '#3b4252' // Nord1
                }}
            >
                <h2 
                    className="text-xl font-medium"
                    style={{
                        color: '#eceff4', // Nord6
                        fontFamily: '"Fira Code", "JetBrains Mono", monospace'
                    }}
                >
                    System Settings
                </h2>
                <p 
                    className="text-sm mt-1"
                    style={{ color: '#88c0d0' }} // Nord8
                >
                    Customize your desktop environment
                </p>
            </div>

            {/* Main Preview */}
            <div className="px-6 py-4">
                <div 
                    className="w-full max-w-md mx-auto h-48 relative rounded border overflow-hidden"
                    style={{
                        borderColor: '#3b4252', // Nord1
                        backgroundColor: '#2e3440' // Nord0
                    }}
                >
                    {renderPreview(currentWallpaper, true)}
                    
                    {/* Preview Info */}
                    <div 
                        className="absolute bottom-0 left-0 right-0 px-3 py-2"
                        style={{
                            backgroundColor: 'rgba(46, 52, 64, 0.8)', // Nord0 with opacity
                            backdropFilter: 'blur(4px)'
                        }}
                    >
                        <div 
                            className="text-sm font-medium"
                            style={{ 
                                color: '#eceff4', // Nord6
                                fontFamily: '"Fira Code", "JetBrains Mono", monospace'
                            }}
                        >
                            {currentWallpaper.name}
                        </div>
                        <div 
                            className="text-xs mt-1"
                            style={{ color: '#88c0d0' }} // Nord8
                        >
                            {currentWallpaper.type === 'video' ? 'video/mp4' : 'image/static'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Opacity Control Section */}
            <div 
                className="px-6 py-4 border-t"
                style={{ borderColor: '#3b4252' }} // Nord1
            >
                <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-between mb-3">
                        <h3 
                            className="text-base font-medium"
                            style={{
                                color: '#eceff4', // Nord6
                                fontFamily: '"Fira Code", "JetBrains Mono", monospace'
                            }}
                        >
                            Background Opacity
                        </h3>
                        <span 
                            className="text-sm px-2 py-1 rounded border"
                            style={{
                                color: '#d8dee9', // Nord4
                                backgroundColor: '#3b4252', // Nord1
                                borderColor: '#4c566a', // Nord3
                                fontFamily: '"Fira Code", "JetBrains Mono", monospace'
                            }}
                        >
                            {backgroundOpacity}%
                        </span>
                    </div>
                    
                    {/* Custom Slider */}
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
                                    #5e81ac ${backgroundOpacity}%, 
                                    #4c566a ${backgroundOpacity}%)`, // Nord10, Nord3
                                outline: 'none',
                                appearance: 'none',
                                WebkitAppearance: 'none'
                            }}
                        />
                        
                        {/* Slider Labels */}
                        <div 
                            className="flex justify-between mt-2 text-xs"
                            style={{ 
                                color: '#81a1c1', // Nord9
                                fontFamily: '"Fira Code", "JetBrains Mono", monospace'
                            }}
                        >
                            <span>10% (transparent)</span>
                            <span>100% (opaque)</span>
                        </div>
                    </div>
                    
                    <p 
                        className="text-xs mt-3"
                        style={{ color: '#81a1c1' }} // Nord9
                    >
                        Adjust transparency for optimal terminal visibility
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div 
                className="px-6 py-4 border-t"
                style={{ borderColor: '#3b4252' }} // Nord1
            >
                <div className="mb-4">
                    <h3 
                        className="text-base font-medium mb-2"
                        style={{
                            color: '#eceff4', // Nord6
                            fontFamily: '"Fira Code", "JetBrains Mono", monospace'
                        }}
                    >
                        Available Backgrounds
                    </h3>
                    <div 
                        className="flex gap-6 text-sm"
                        style={{ 
                            color: '#81a1c1', // Nord9
                            fontFamily: '"Fira Code", "JetBrains Mono", monospace'
                        }}
                    >
                        <span>[img] Static Images</span>
                        <span>[vid] Video Loops</span>
                    </div>
                </div>
                
                {/* Wallpaper Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
                                    w-full aspect-video rounded border overflow-hidden
                                    ${isSelected 
                                        ? "ring-2" 
                                        : "hover:ring-1"
                                    }
                                `}
                                style={{
                                    backgroundColor: '#2e3440', // Nord0
                                    borderColor: isSelected ? '#5e81ac' : '#3b4252', // Nord10, Nord1
                                    ringColor: isSelected ? '#88c0d0' : '#4c566a' // Nord8, Nord3
                                }}
                                title={`${wallpaperData.name} (${wallpaperData.type})`}
                            >
                                {/* Thumbnail */}
                                <div className="w-full h-full">
                                    {renderPreview(wallpaperData)}
                                </div>
                                
                                {/* Type indicator */}
                                <div 
                                    className="absolute top-1 right-1 px-1.5 py-0.5 text-xs font-mono rounded"
                                    style={{
                                        backgroundColor: 'rgba(46, 52, 64, 0.8)', // Nord0 with opacity
                                        color: '#88c0d0', // Nord8
                                        fontFamily: '"Fira Code", "JetBrains Mono", monospace'
                                    }}
                                >
                                    {wallpaperData.type === 'video' ? 'vid' : 'img'}
                                </div>
                                
                                {/* Selection indicator */}
                                {isSelected && (
                                    <div 
                                        className="absolute inset-0 flex items-center justify-center"
                                        style={{
                                            backgroundColor: 'rgba(94, 129, 172, 0.2)' // Nord10 with opacity
                                        }}
                                    >
                                        <div 
                                            className="px-2 py-1 text-xs font-mono rounded border"
                                            style={{
                                                backgroundColor: 'rgba(46, 52, 64, 0.8)', // Nord0 with opacity
                                                color: '#eceff4', // Nord6
                                                borderColor: '#5e81ac', // Nord10
                                                fontFamily: '"Fira Code", "JetBrains Mono", monospace'
                                            }}
                                        >
                                            ACTIVE
                                        </div>
                                    </div>
                                )}
                                
                                {/* Hover overlay */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Footer Instructions */}
            <div 
                className="px-6 py-4 border-t"
                style={{ 
                    borderColor: '#3b4252', // Nord1
                    backgroundColor: '#3b4252' // Nord1
                }}
            >
                <div 
                    className="text-sm"
                    style={{ 
                        color: '#81a1c1', // Nord9
                        fontFamily: '"Fira Code", "JetBrains Mono", monospace'
                    }}
                >
                    <p>Select thumbnail to apply background</p>
                    <p className="mt-1 text-xs">Video backgrounds loop automatically (muted)</p>
                </div>
            </div>
            
            {/* Custom Slider Styles */}
            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 18px;
                    width: 18px;
                    border-radius: 50%;
                    background: #eceff4; // Nord6
                    border: 2px solid #5e81ac; // Nord10
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }
                
                .slider::-webkit-slider-thumb:hover {
                    background: #88c0d0; // Nord8
                    border-color: #81a1c1; // Nord9
                }
                
                .slider::-moz-range-thumb {
                    height: 18px;
                    width: 18px;
                    border-radius: 50%;
                    background: #eceff4; // Nord6
                    border: 2px solid #5e81ac; // Nord10
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }
                
                .slider::-moz-range-thumb:hover {
                    background: #88c0d0; // Nord8
                    border-color: #81a1c1; // Nord9
                }
                
                .slider::-moz-range-track {
                    height: 8px;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    )
}

export default Settings

export const displaySettings = (props) => {
    console.log('displaySettings received props:', props); // Debug log
    return <Settings {...props}></Settings>;
}