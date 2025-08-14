import React, { Component } from 'react';
import Clock from '../util components/clock';
import Status from '../util components/status';

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            status_card: false
        };
    }

    render() {
        return (
            <div className="main-navbar-vp absolute top-0 right-0 w-screen shadow-md flex flex-nowrap justify-between items-center bg-ub-grey/30 backdrop-blur-md text-ubt-grey text-sm select-none z-10 font-['Liberation_Mono','Courier_New',monospace]">
                <div
                    tabIndex="0"
                    className="pl-3 pr-3 outline-none transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange py-1"
                >
                    MoFolio v2.1
                </div>
                <div
                    tabIndex="0"
                    className="pl-2 pr-2 text-xs md:text-sm outline-none transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange py-1"
                >
                    <Clock />
                </div>
                <div
                    id="status-bar"
                    tabIndex="0"
                    onFocus={() => {
                        this.setState({ status_card: true });
                    }}
                    className="relative pr-3 pl-3 outline-none transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange py-1"
                >
                    <Status />
                </div>
            </div>
        );
    }
}