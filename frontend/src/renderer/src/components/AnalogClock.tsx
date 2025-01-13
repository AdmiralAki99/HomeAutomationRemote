import React from "react";
import '../styles/AnalogClock.css';

type AnalogClockState = {
    secondsAngle: number,
    minutesAngle: number,
    hoursAngle: number,
    intervalID: any | null // Use number for interval ID, null for clarity
}

class AnalogClock extends React.Component { 

    state: AnalogClockState = {
        secondsAngle: 0,
        minutesAngle: 0,
        hoursAngle: 0,
        intervalID: null 
    }

    componentDidMount() {
        this.setState({
          intervalID: setInterval(() => this.setTime(), 1000) 
        });
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        // console.log(`Seconds: ${this.state.secondsAngle}, Minutes: ${this.state.minutesAngle}, Hours: ${this.state.hoursAngle}`);
    }

    componentWillUnmount(): void {
        clearInterval(this.state.intervalID);
    }


    setTime() {
        const currentDate = new Date(); 

        var seconds = currentDate.getSeconds();
        var minutes = currentDate.getMinutes();
        var hours = currentDate.getHours();

        // Calculate the angle of the second's hand
        var secondsAngle = (seconds / 60) * 360;
        // Calculate the angle of the minute's hand
        var minutesAngle = (minutes / 60) * 360 + 90;
        // Calculate the angle of the hour's hand
        var hoursAngle = (hours / 12) * 360 + 90;

        // Update the state in a single call
        this.setState({
            secondsAngle: secondsAngle,
            minutesAngle: minutesAngle,
            hoursAngle: hoursAngle
        });
    }


    render(): React.ReactNode {
        return (
            <div className="">
                <div className="clock bg-home">
                    <div className="clock-face">
                        <span className={"hour-hand"}  style={{transform: `rotate(${this.state.hoursAngle}deg)`}}></span>
                        <span className="minute-hand" style={{transform: `rotate(${this.state.minutesAngle}deg)`}}></span>
                        <span className="second-hand" style={{transform: `rotate(${this.state.secondsAngle}deg)`}}></span>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default AnalogClock;