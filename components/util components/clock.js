import { Component } from 'react'

export default class Clock extends Component {
    constructor() {
        super();
        this.month_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.day_list = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        this.state = {
            hour_12: true,
            current_time: new Date(),
            isClient: false // Prevents SSR mismatch
        };
    }

    componentDidMount() {
        this.setState({ isClient: true });

        this.update_time = setInterval(() => {
            this.setState({ current_time: new Date() });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.update_time);
    }

    toggleTimeFormat = () => {
        this.setState((prevState) => ({ hour_12: !prevState.hour_12 }));
    }

    render() {
        const { current_time, hour_12, isClient } = this.state;

        if (!isClient) {
            // Avoid rendering time on the server to prevent hydration mismatch
            return null;
        }

        let day = this.day_list[current_time.getDay()];
        let hour = current_time.getHours();
        let minute = current_time.getMinutes().toString().padStart(2, '0');
        let second = current_time.getSeconds().toString().padStart(2, '0');
        let month = this.month_list[current_time.getMonth()];
        let date = current_time.getDate().toString().padStart(2, '0');
        let year = current_time.getFullYear();
        let meridiem = hour < 12 ? "AM" : "PM";

        if (hour_12 && hour > 12) hour -= 12;
        if (hour_12 && hour === 0) hour = 12;

        let display_time;
        if (this.props.onlyTime) {
            display_time = `${hour}:${minute}:${second} ${hour_12 ? meridiem : ''}`;
        } else if (this.props.onlyDay) {
            display_time = `${day}, ${month} ${date}, ${year}`;
        } else {
            display_time = `${day}, ${month} ${date}, ${year} ${hour}:${minute}:${second} ${hour_12 ? meridiem : ''}`;
        }

        return (
            <div
                className="inline-flex items-center font-mono text-sm px-3 py-1 rounded-md shadow-md hover:bg-gray-700 cursor-pointer"
                onClick={this.toggleTimeFormat}
            >
                <span>{display_time}</span>
            </div>
        );
    }
}
