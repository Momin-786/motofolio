import React, { Component } from 'react';
import BootingScreen from './screen/booting_screen';
import Desktop from './screen/desktop';
import LockScreen from './screen/lock_screen';
import Navbar from './screen/navbar';
import BackgroundImage from './util components/background-image';
import ReactGA from 'react-ga4';

export default class Ubuntu extends Component {
	constructor() {
		super();
		this.state = {
			screen_locked: false,
			bg_image_name: 'wall-2',
			booting_screen: true,
			shutDownScreen: false
		};
	}

	componentDidMount() {
		this.getLocalData();
	}

	setTimeOutBootScreen = () => {
		setTimeout(() => {
			this.setState({ booting_screen: false });
		}, 5000); // Show booting screen for 5 seconds
	};

	getLocalData = () => {
		// Get Previously selected Background Image
		let bg_image_name = localStorage.getItem('bg-image');
		if (bg_image_name !== null && bg_image_name !== undefined) {
			this.setState({ bg_image_name });
		}

		// Always show booting screen on page load for 3-4 seconds
		this.setState({ booting_screen: true });
		this.setTimeOutBootScreen();

		// get shutdown state
		let shut_down = localStorage.getItem('shut-down');
		if (shut_down !== null && shut_down !== undefined && shut_down === 'true') {
			this.shutDown();
		} else {
			// Get previous lock screen state
			let screen_locked = localStorage.getItem('screen-locked');
			if (screen_locked !== null && screen_locked !== undefined) {
				this.setState({ screen_locked: screen_locked === 'true' ? true : false });
			}
		}
	};

	lockScreen = () => {
		// google analytics
		ReactGA.send({ hitType: "pageview", page: "/lock-screen", title: "Lock Screen" });
		ReactGA.event({
			category: `Screen Change`,
			action: `Set Screen to Locked`
		});

		document.getElementById('status-bar').blur();
		setTimeout(() => {
			this.setState({ screen_locked: true });
		}, 100); // waiting for all windows to close (transition-duration)
		localStorage.setItem('screen-locked', true);
	};

	unLockScreen = () => {
		ReactGA.send({ hitType: "pageview", page: "/desktop", title: "Custom Title" });

		window.removeEventListener('click', this.unLockScreen);
		window.removeEventListener('keypress', this.unLockScreen);

		this.setState({ screen_locked: false });
		localStorage.setItem('screen-locked', false);
	};

	changeBackgroundImage = (img_name) => {
		this.setState({ bg_image_name: img_name });
		localStorage.setItem('bg-image', img_name);
	};

	shutDown = () => {
		ReactGA.send({ hitType: "pageview", page: "/switch-off", title: "Custom Title" });

		ReactGA.event({
			category: `Screen Change`,
			action: `Switched off the Ubuntu`
		});

		document.getElementById('status-bar').blur();
		this.setState({ shutDownScreen: true });
		localStorage.setItem('shut-down', true);
	};

	turnOn = () => {
		ReactGA.send({ hitType: "pageview", page: "/desktop", title: "Custom Title" });

		this.setState({ shutDownScreen: false, booting_screen: true });
		this.setTimeOutBootScreen();
		localStorage.setItem('shut-down', false);
	};

	render() {
		return (
			<div className="w-screen h-screen overflow-hidden" id="monitor-screen">
				<LockScreen
					isLocked={this.state.screen_locked}
					bgImgName={this.state.bg_image_name}
					unLockScreen={this.unLockScreen}
				/>
				<BootingScreen
					visible={this.state.booting_screen}
					isShutDown={this.state.shutDownScreen}
					turnOn={this.turnOn}
				/>
				
				{/* Background Image - Always visible, loads during boot - Lowest z-index */}
				{!this.state.shutDownScreen && (
					<div 
						style={{ 
							position: 'fixed', 
							top: 0, 
							left: 0, 
							width: '100vw', 
							height: '100vh', 
							zIndex: -1,
							pointerEvents: 'none'
						}}
					>
						<BackgroundImage img={this.state.bg_image_name} />
					</div>
				)}
				
				{/* Render Desktop - hidden during boot, visible after */}
				{!this.state.shutDownScreen && (
					<div 
						style={{ 
							position: 'absolute', 
							top: 0, 
							left: 0, 
							width: '100%', 
							height: '100%', 
							zIndex: 1,
							opacity: this.state.booting_screen ? 0 : 1,
							transition: 'opacity 0.4s ease-in-out',
							pointerEvents: this.state.booting_screen ? 'none' : 'auto',
							backgroundColor: 'transparent'
						}}
					>
						<Navbar lockScreen={this.lockScreen} shutDown={this.shutDown} />
						<Desktop 
							bg_image_name={this.state.bg_image_name} 
							changeBackgroundImage={this.changeBackgroundImage}
							projectsData={this.props.projectsData}
							skillsData={this.props.skillsData}
							aboutData={this.props.aboutData}
							hideBackground={true}
						/>
					</div>
				)}
			</div>
		);
	}
}