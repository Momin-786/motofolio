import React, { useState, useEffect } from 'react'

function DesktopMenu(props) {
    const [isFullScreen, setIsFullScreen] = useState(false)

    useEffect(() => {
        document.addEventListener('fullscreenchange', checkFullScreen);
        return () => {
            document.removeEventListener('fullscreenchange', checkFullScreen);
        };
    }, [])

    const openTerminal = () => {
        props.openApp("terminal");
    }

    const openSettings = () => {
        props.openApp("settings");
    }

    const checkFullScreen = () => {
        setIsFullScreen(!!document.fullscreenElement);
    }

    const goFullScreen = () => {
        try {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div 
            id="desktop-menu" 
            className={(props.active ? " block " : " hidden ") + " cursor-default w-44 bg-[#2D2D2D] border border-[#3D3D3D] rounded text-white py-1.5 absolute z-50 text-xs shadow-lg"}
            style={{ fontFamily: "'Ubuntu Mono', monospace" }}
        >
            <div className="w-full py-1 px-3 text-[#808080] cursor-not-allowed">
                <span>📋 Paste</span>
            </div>
            <Devider />
            <div className="w-full py-1 px-3 text-[#808080] cursor-not-allowed">
                <span>🗂 Show Desktop in Files</span>
            </div>
            <div onClick={openTerminal} className="w-full py-1 px-3 hover:bg-[#3D3D3D] cursor-pointer transition-colors duration-150">
                <span>🖥 Open in Terminal</span>
            </div>
            <Devider />
            <div onClick={openSettings} className="w-full py-1 px-3 hover:bg-[#3D3D3D] cursor-pointer transition-colors duration-150">
                <span>🎨 Change Background...</span>
            </div>
            <Devider />
            <div className="w-full py-1 px-3 text-[#808080] cursor-not-allowed">
                <span>🖼 Display Settings</span>
            </div>
            <div onClick={openSettings} className="w-full py-1 px-3 hover:bg-[#3D3D3D] cursor-pointer transition-colors duration-150">
                <span>⚙ Settings</span>
            </div>
            <Devider />
            <div onClick={goFullScreen} className="w-full py-1 px-3 hover:bg-[#3D3D3D] cursor-pointer transition-colors duration-150">
                <span>{isFullScreen ? "↙ Exit" : "↕ Enter"} Full Screen</span>
            </div>
        </div>
    )
}

function Devider() {
    return (
        <div className="flex justify-center w-full my-0.5">
            <div className="border-t border-[#3D3D3D] w-full"></div>
        </div>
    );
}

export default DesktopMenu