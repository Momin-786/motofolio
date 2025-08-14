import React, { useState, useEffect } from 'react';

export default function BackgroundImage(props) {
    const [mediaLoaded, setMediaLoaded] = useState(false);
    const [mediaType, setMediaType] = useState('image'); // 'image' or 'video'

    // Updated media library with both images and videos
    const bg_media = {
        // Static Images
        "wall-1": { 
            src: "/images/wallpapers/wallpaper1.jpg", 
            type: "image" 
        },
        "wall-2": { 
            src: "/images/wallpapers/wallpaper2.jpg", 
            type: "image" 
        },
        "wall-3": { 
            src: "/images/wallpapers/wallpaper3.jpg", 
            type: "image" 
        },
        "wall-4": { 
            src: "/images/wallpapers/wallpaper4.jpg", 
            type: "image" 
        },
        "wall-5": { 
            src: "/images/wallpapers/wallpaper5.jpg", 
            type: "image" 
        },
        
        // Video Wallpapers
        "video-1": { 
            src: "/videos/wallpapers/video1.mp4", 
            type: "video" 
        },

    };

    // Get the media info, with fallback
    const mediaInfo = props.img ? bg_media[props.img] : bg_media["wall-2"];
    const mediaPath = mediaInfo?.src || bg_media["wall-2"].src;
    const currentMediaType = mediaInfo?.type || "image";

    useEffect(() => {
        setMediaType(currentMediaType);
        setMediaLoaded(false);
    }, [props.img, currentMediaType]);

    
    const commonStyles = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover", // This works for both img and video
        zIndex: 1
    };

    const containerStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden"
    };

    return (
        <div style={containerStyle} className="bg-ubuntu-media absolute top-0 left-0 overflow-hidden h-full w-full">
            {currentMediaType === 'video' ? (
                <>
                    {/* Video Background */}
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                            ...commonStyles,
                            opacity: mediaLoaded ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out'
                        }}
                        onLoadedData={() => {
                            console.log('✅ Video loaded successfully');
                            setMediaLoaded(true);
                        }}
                        onError={(e) => {
                            console.error('❌ Video failed to load:', e);
                            setMediaLoaded(false);
                        }}
                    >
                        <source src={mediaPath} type="video/mp4" />
                        <source src={mediaPath.replace('.mp4', '.webm')} type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                    
                    {/* Fallback gradient while video loads */}
                    {!mediaLoaded && (
                        <div style={{
                            ...commonStyles,
                            background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)",
                            zIndex: 0
                        }} />
                    )}
                </>
            ) : (
                <>
                    {/* Image Background */}
                    <img
                        src={mediaPath}
                        alt="Desktop Background"
                        style={{
                            ...commonStyles,
                            opacity: mediaLoaded ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out'
                        }}
                        onLoad={() => {
                            console.log('✅ Image loaded successfully');
                            setMediaLoaded(true);
                        }}
                        onError={(e) => {
                            console.error('❌ Image failed to load:', e);
                            setMediaLoaded(false);
                        }}
                    />
                    
                    {/* Fallback gradient while image loads */}
                    {!mediaLoaded && (
                        <div style={{
                            ...commonStyles,
                            background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)",
                            zIndex: 0
                        }} />
                    )}
                </>
            )}

            {/* Optional: Subtle overlay for better readability */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.1)",
                zIndex: 2,
                pointerEvents: "none"
            }} />

            {/* Debug info (remove in production) */}
            {process.env.NODE_ENV === 'development' && (
                <div style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "rgba(0, 0, 0, 0.8)",
                    color: "white",
                    padding: "8px",
                    fontSize: "11px",
                    zIndex: 999,
                    borderRadius: "4px",
                    fontFamily: "monospace"
                }}>
                   
                </div>
            )}
        </div>
    );
}