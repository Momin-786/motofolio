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
        <div id="desktop-menu" className={(props.active ? " block " : " hidden ") + " cursor-default w-56 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 py-3 absolute z-50 text-sm font-mono shadow-lg"}>
            <div onClick={props.addNewFolder} className="w-full py-1.5 px-4 hover:bg-gray-700 hover:bg-opacity-50">
                <span className="ml-2">📁 New Folder</span>
            </div>
            <Devider />
            <div className="w-full py-1.5 px-4 text-gray-500 cursor-not-allowed">
                <span className="ml-2">📋 Paste</span>
            </div>
            <Devider />
            <div className="w-full py-1.5 px-4 text-gray-500 cursor-not-allowed">
                <span className="ml-2">🗂 Show Desktop in Files</span>
            </div>
            <div onClick={openTerminal} className="w-full py-1.5 px-4 hover:bg-gray-700 hover:bg-opacity-50">
                <span className="ml-2">🖥 Open in Terminal</span>
            </div>
            <Devider />
            <div onClick={openSettings} className="w-full py-1.5 px-4 hover:bg-gray-700 hover:bg-opacity-50">
                <span className="ml-2">🎨 Change Background...</span>
            </div>
            <Devider />
            <div className="w-full py-1.5 px-4 text-gray-500 cursor-not-allowed">
                <span className="ml-2">🖼 Display Settings</span>
            </div>
            <div onClick={openSettings} className="w-full py-1.5 px-4 hover:bg-gray-700 hover:bg-opacity-50">
                <span className="ml-2">⚙ Settings</span>
            </div>
            <Devider />
            <div onClick={goFullScreen} className="w-full py-1.5 px-4 hover:bg-gray-700 hover:bg-opacity-50">
                <span className="ml-2">{isFullScreen ? "↙ Exit" : "↕ Enter"} Full Screen</span>
            </div>
        </div>
    )
}

function Devider() {
    return (
        <div className="flex justify-center w-full">
            <div className="border-t border-gray-600 py-1 w-3/4"></div>
        </div>
    );
}

export default DesktopMenu