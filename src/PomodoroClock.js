import React from 'react'

class PomodoroClock extends React.Component {
    constructor() {
        super()
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            currBreakMinutes: 5,
            currSessionMinutes: 25,
            currSeconds: 0,
            timeLeft: 25,
            currentLabel: 'Session',
            isPaused: false
        }
        this.handleReset = this.handleReset.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.startStopTimer = this.startStopTimer.bind(this);
    }

    handleReset() {
        this.setState({breakLength: 5, sessionLength: 25})
    }

    handleDecrement(event) { // Check if its break-decrement
        if (event.target.value === "break-decrement") {
            if (this.state.breakLength > 1) { // This makes sure we can't go lower than 1 minute break time
                this.setState (prevState => {
                    return {
                        breakLength: prevState.breakLength - 1,
                        currBreakMinutes: prevState.currBreakMinutes -1
                    }
                }) 
            }

        } else { // Check if its not break decrement, aka if its session-decrement
            if (this.state.sessionLength > 1) { // This makes sure we can't go lower than 1 minute session time
                this.setState (prevState => {
                    return {
                        sessionLength: prevState.sessionLength - 1,    
                        currSessionMinutes: prevState.currSessionMinutes -1,
                        currSeconds: 0,
                    }
                }) 
            }
        }
    }

    handleIncrement(event) {
        if (event.target.value === "break-increment") { // Check if its a break increment
            if (this.state.breakLength < 60) { // This makes sure we can't go above 60
                this.setState (prevState => {
                    return {     
                        breakLength: prevState.breakLength + 1
                    }
                }) 
            }
        } else { //Check if its not a break increment, aka if its a session increment
            if (this.state.sessionLength < 60) { // This makes sure we can't go above 60
                this.setState (prevState => { 
                    return {
                        sessionLength: prevState.sessionLength + 1
                    }
                }) 
            }
        }
    }

    startStopTimer () {
        this.setState(prevState => {
            return {
                isPaused: !this.state.isPaused
            }
        })
    }

    componentDidMount () {
        let minutes = this.state.currentLabel === "Session" ? this.state.currSessionMinutes : this.state.currBreakMinutes;
        let seconds = this.state.currSeconds;
        let timer;

        setInterval(() => {

             if (this.state.isPaused === false) {

                if ( seconds <= 0 ) {
                    minutes = minutes - 1;
                    seconds = 59;
                } else {
                    seconds = seconds - 1;
                }

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                timer = minutes + ':' + seconds

                this.setState (prevState => {
                    return {
                        timeLeft: timer,
                        currSessionMinutes: minutes,
                        currSeconds: seconds
                    }
                })
            }    
        }, 1000);
    }
    

    render() {
        return (
            <div className='grid-container'>
                
                <h1>Pomodoro Clock</h1>
                
                <div id="break">
                    <h2 id="break-label">Break Length</h2>
                    <button id="break-increment" value="break-increment" onClick={this.handleIncrement}>Increment</button>
                    <div id="break-length">{this.state.breakLength}</div>
                    <button id="break-decrement" value="break-decrement" onClick={this.handleDecrement}>Decrement</button>
                </div>
                
                <div id="session">
                    <h2 id="session-label">Session Length</h2>
                    <button id="session-increment" value="session-increment" onClick={this.handleIncrement}>Increment</button>
                    <div id="session-length">{this.state.sessionLength}</div>
                    <button id="session-decrement" value="session-decrement" onClick={this.handleDecrement}>Decrement</button>
                </div>
                
                <div id="timer">
                    <div id="timer-label">{this.state.currentLabel}</div>
                    <div id="time-left">{this.state.timeLeft}</div>
                    <button id="start_stop" onClick={this.startStopTimer}>Start/Stop</button>
                    <button id="reset" onClick={this.handleReset}>RESET</button>
                </div>
            </div>
        )
    }
}

export default PomodoroClock