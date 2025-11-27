import React from 'react'

function DefaultMenu(props) {
    return (
        <div 
            id="default-menu" 
            className={(props.active ? " block " : " hidden ") + " cursor-default w-44 bg-[#2D2D2D] border border-[#3D3D3D] rounded text-white py-1.5 absolute z-50 text-xs shadow-lg"}
            style={{ fontFamily: "'Ubuntu Mono', monospace" }}
        >
            <Devider />
            <a rel="noreferrer noopener" href="https://www.linkedin.com/in/abdul-momin7863/" target="_blank" className="w-full block py-1 px-3 hover:bg-[#3D3D3D] cursor-pointer transition-colors duration-150">
                <span>🙋‍♂️🔗</span> <span className="ml-2">Follow on <strong>LinkedIn</strong></span>
            </a>
            <a rel="noreferrer noopener" href="https://github.com/Momin-786" target="_blank" className="w-full block py-1 px-3 hover:bg-[#3D3D3D] cursor-pointer transition-colors duration-150">
                <span>🐈🤝</span> <span className="ml-2">Follow on <strong>GitHub</strong></span>
            </a>
            <a rel="noreferrer noopener" href="mailto:momina7863@gmail.com" target="_blank" className="w-full block py-1 px-3 hover:bg-[#3D3D3D] cursor-pointer transition-colors duration-150">
                <span>👋📥</span> <span className="ml-2">Contact Me</span>
            </a>
            <Devider />
            <div onClick={() => { localStorage.clear(); window.location.reload() }} className="w-full block py-1 px-3 hover:bg-[#3D3D3D] cursor-pointer transition-colors duration-150">
                <span>🔁🧹</span> <span className="ml-2">Reset</span>
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

export default DefaultMenu