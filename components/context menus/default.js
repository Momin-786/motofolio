import React from 'react'

function DefaultMenu(props) {
    return (
        <div id="default-menu" className={(props.active ? " block " : " hidden ") + " cursor-default w-52 bg-gray-800 border border-gray-600 rounded text-gray-100 py-4 absolute z-50 text-sm font-mono"}>
            <Devider />
            <a rel="noreferrer noopener" href="https://www.linkedin.com/in/abdul-momin7863/" target="_blank" className="w-full block cursor-default py-0.5 hover:bg-gray-700 hover:bg-opacity-50 mb-1.5">
                <span className="ml-5">🙋‍♂️🔗</span> <span className="ml-2">Follow on <strong>LinkedIn</strong></span>
            </a>
            <a rel="noreferrer noopener" href="https://github.com/Momin-786" target="_blank" className="w-full block cursor-default py-0.5 hover:bg-gray-700 hover:bg-opacity-50 mb-1.5">
                <span className="ml-5">🐈🤝</span> <span className="ml-2">Follow on <strong>GitHub</strong></span>
            </a>
            <a rel="noreferrer noopener" href="mailto:momina7863@gmail.com" target="_blank" className="w-full block cursor-default py-0.5 hover:bg-gray-700 hover:bg-opacity-50 mb-1.5">
                <span className="ml-5">👋📥</span> <span className="ml-2">Contact Me</span>
            </a>
            <Devider />
            <div onClick={() => { localStorage.clear(); window.location.reload() }} className="w-full block cursor-default py-0.5 hover:bg-gray-700 hover:bg-opacity-50 mb-1.5">
                <span className="ml-5">🔁🧹</span> <span className="ml-2">Reset</span>
            </div>
        </div>
    )
}

function Devider() {
    return (
        <div className="flex justify-center w-full">
            <div className="border-t border-gray-600 py-1 w-2/5"></div>
        </div>
    );
}

export default DefaultMenu