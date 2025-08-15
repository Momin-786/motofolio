import React, { useState, useEffect } from 'react';

export default function BackgroundImage(props) {
    const [mediaLoaded, setMediaLoaded] = useState(false);
    const [mediaType, setMediaType] = useState('image');

    // Fixed media library with working online images
    const bg_media = {
        // Static Images - Using reliable sources
        "wall-1": { 
            src: "./images/wallpapers/wallpaper1.jpg", 
            type: "image" 
        },
        "wall-2": { 
            src: "https://picsum.photos/1920/1080?random=1", 
            type: "image" ,
            isDarkened: true
        },
        "wall-3": { 
            src: "./images/wallpapers/wallpaper3.jpg", 
            type: "image" 
        },
        "wall-4": { 
            src: "./images/wallpapers/wallpaper4.jpg", 
            type: "image" 
        },
        "wall-5": { 
            src: "./images/wallpapers/wallpaper5.jpg", 
            type: "image" 
        },
        
        // Video Wallpapers - Using a working video source
        "video-1": { 
            src: "./videos/wallpapers/video1.mp4", 
            type: "video" 
        },
    };

    // Get the media info, with fallback
    const mediaInfo = props.img ? bg_media[props.img] : bg_media["wall-2"];
    const mediaPath = mediaInfo?.src || bg_media["wall-2"].src;
    const currentMediaType = mediaInfo?.type || "image";
     const shouldDarken = mediaInfo?.isDarkened || false;
    useEffect(() => {
        setMediaType(currentMediaType);
        setMediaLoaded(false);
    }, [props.img, currentMediaType, mediaPath, shouldDarken]);

    const commonStyles = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 1
    };
        const imageStyles = {
        ...commonStyles,
        opacity: mediaLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        zIndex: mediaLoaded ? 2 : 1,
        // Apply dark filter for wall-2 (random Picsum images)
        filter: shouldDarken ? 'brightness(0.6) contrast(1.1) saturate(0.9)' : 'none'
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
            {/* Always show fallback gradient first */}
            <div style={{
                ...commonStyles,
                background: "linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)",
                zIndex: 0
            }} />

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
                            transition: 'opacity 0.5s ease-in-out',
                            zIndex: mediaLoaded ? 2 : 1,
                             filter: shouldDarken ? 'brightness(0.6) contrast(1.1) saturate(0.9)' : 'none'
                        }}
                        onLoadedData={() => {
                            
                            setMediaLoaded(true);
                        }}
                        onError={(e) => {
                          
                            setMediaLoaded(false);
                        }}
                    >
                        <source src={mediaPath} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </>
            ) : (
                <>
                    {/* Image Background */}
                    <img
                        src={mediaPath}
                        alt="Desktop Background"
                        style={imageStyles}
                        onLoad={() => {
                          
                            setMediaLoaded(true);
                        }}
                        onError={(e) => {
                      
                            setMediaLoaded(false);
                        }}
                    />
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
                zIndex: 3,
                pointerEvents: "none"
            }} />
        </div>
    );
}