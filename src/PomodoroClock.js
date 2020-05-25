import React from 'react'
import countdown from './countdown.mp4'
import clock from './clock.gif'

class PomodoroClock extends React.Component {
    constructor() {
        super()
        // I know, lots of state props...
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            currBreakMinutes: 5,
            currSessionMinutes: 25,
            currSessionSeconds: 0,
            currBreakSeconds: 0,
            currentLabel: 'Session',
            isPaused: true,
            hide: true
        }
        this.handleReset = this.handleReset.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.startStopTimer = this.startStopTimer.bind(this);
        this.convertTimeFormat = this.convertTimeFormat.bind(this);
        this.hideDisplay = this.hideDisplay.bind(this);

        this.sound = React.createRef();
        this.video = React.createRef();
    }

    hideDisplay() {
        if (this.state.hide){
            return {display:'none'}
        } else {
            return {display:'initial'}
        }
    }

    // Reset them ALL!!!!!!
    handleReset() {
        this.sound.current.pause();
        this.sound.current.currentTime = 0;
        this.setState({
            isPaused: true,
            breakLength: 5, 
            sessionLength: 25, 
            currBreakMinutes: 5, 
            currSessionMinutes: 25, 
            currSessionSeconds: 0,
            currBreakSeconds: 0,
            currentLabel: 'Session',
        })
    }

    handleDecrement(event) { // Check if its break-decrement
        if (event.target.value === "break-decrement") {
            if (this.state.breakLength > 1 && this.state.isPaused === true) { // This makes sure we can't go lower than 1 minute break time
                this.setState (prevState => {                             // It also makes sure its paused before we change anything.
                    return {
                        breakLength: prevState.breakLength - 1,
                        currBreakMinutes: prevState.breakLength - 1,
                        currBreakSeconds: 0
                    }   // This updates breakLength and also the timer values, Minutes and seconds
                }) 
            }

        } else { // Check if its not break decrement, aka if its session-decrement
            if (this.state.sessionLength > 1 && this.state.isPaused === true) { // This makes sure we can't go lower than 1 minute session time
                this.setState (prevState => {                                // It also makes sure its paused before we change anything.
                    return {
                        sessionLength: prevState.sessionLength - 1,
                        currSessionMinutes: prevState.sessionLength - 1,
                        currSessionSeconds: 0
                    }   // This updates breakLength and also the timer values, Minutes and seconds
                }) 
            }
        }
    }

    handleIncrement(event) {
        if (event.target.value === "break-increment") { // Check if its a break increment
            if (this.state.breakLength < 60 && this.state.isPaused === true) { // This makes sure we can't go above 60
                this.setState (prevState => {           // It also makes sure its paused before we change anything.
                    return {     
                        breakLength: prevState.breakLength + 1,
                        currBreakMinutes: prevState.breakLength + 1,
                        currBreakSeconds: 0
                    }   // This updates breakLength and also the timer values, Minutes and seconds
                }) 
            }
        } else { //Check if its not a break increment, aka if its a session increment
            if (this.state.sessionLength < 60 && this.state.isPaused === true) { // This makes sure we can't go above 60
                this.setState (prevState => {                   // It also makes sure its paused before we change anything.
                    return {
                        sessionLength: prevState.sessionLength + 1,
                        currSessionMinutes: prevState.sessionLength + 1,
                        currSessionSeconds: 0
                    }   // This updates breakLength and also the timer values, Minutes and seconds
                }) 
            }
        }
    }

    // This will stop that timer IN ITS TRACKS...... it will also start it........ IN ITS TRACKS!
    startStopTimer () {
    
        this.setState(prevState => {

            if (prevState.isPaused === false) {
                return {
                    isPaused: true
                }
            } else {
                return {
                    isPaused: false
                }
            }     
        })
    }

     convertTimeFormat() {
        // Grabs the correct seconds/minutes values depending on wheather its currently in SESSION or BREAK
        let seconds = this.state.currentLabel === "Session" ? this.state.currSessionSeconds : this.state.currBreakSeconds;
        let minutes = this.state.currentLabel === "Session" ? this.state.currSessionMinutes : this.state.currBreakMinutes;
        
        minutes = minutes < 10 ? "0" + minutes : minutes; // Convert dem minutes
        seconds = seconds < 10 ? "0" + seconds : seconds; // Convert dem seconds
        let timer = minutes + ':' + seconds;        // Turn it into timer format (mm:ss)

        return timer;   // I'm a nice guy, so I return it.
    }

    componentDidMount () {
        // Set the current session and break minutes. We don't worry about seconds since they start off as 0.
        //this.setState({currSessionMinutes: this.state.sessionLength, currBreakMinutes: this.state.breakLength})
        
        this.countDown = setInterval(() => {

            // We only begin once the countdown IS NOT PAUSED.
             if (this.state.isPaused === false) {
                let currentLabel = this.state.currentLabel;
                let hide = this.state.hide;

                // Grabs the correct seconds/minutes values depending on wheather its currently in SESSION or BREAK
                let minutes = currentLabel === "Session" ? this.state.currSessionMinutes : this.state.currBreakMinutes;
                let seconds = currentLabel === "Session" ? this.state.currSessionSeconds : this.state.currBreakSeconds;
                let breakLength = this.state.breakLength;
                let sessionLength = this.state.sessionLength;
                
                seconds--
                

                if ( seconds < 0 ) { // If seconds is less or equal to 0, make it 59.
                    minutes = minutes - 1;
                    seconds = 59;
                }

                
                if ( minutes < 0 ) {
                    if (currentLabel === "Session") {
                        currentLabel = "Break";
                        minutes = this.state.currBreakMinutes;
                        seconds = this.state.currBreakSeconds;
                    } else {
                        currentLabel = "Session";
                        minutes = this.state.currSessionMinutes;
                        seconds = this.state.currSessionSeconds;
                    }
                }

                // So after everything is done, if the output minutes is 0 and seconds is 0.... set from session to break.
                 if ( minutes === 0 && seconds === 0 ) {
                    this.sound.current.play();
                    this.video.current.play();
                    hide = false;
                 }     

                 this.setState(prevState => {
                     if (currentLabel === "Session") {
                         return {
                            currentLabel: currentLabel,
                            currSessionMinutes: minutes,
                            currSessionSeconds: seconds,
                            currBreakMinutes: breakLength,
                            currBreakSeconds: 0,
                            hide: hide
                         }
                     } else {
                         return {
                            currentLabel: currentLabel,
                            currBreakMinutes: minutes,
                            currBreakSeconds: seconds,
                            currSessionMinutes: sessionLength,
                            currSessionSeconds: 0,
                            hide: hide
                         }
                     }
                 });
            }    
        }, 1000);  
    }

    componentWillUnmount() {
        clearInterval(this.countDown) // Kind of a cleanup function I guess... I put it here to be safe
    }


    

    render() {
        console.log(this.convertTimeFormat())

        return (
            <div id='grid-container'>
                <div id="hah" style={this.hideDisplay()}><img src={clock} alt="oh"></img></div>
                <div id="clock-container">
                    <div id="break">
                        <p id="break-label">Break Length</p>
                        <button size = '4em' id="break-increment" value="break-increment" onClick={this.handleIncrement}>Increment</button>
                        <div id="break-length">{this.state.breakLength}</div>
                        <button size = '4em' id="break-decrement" value="break-decrement" onClick={this.handleDecrement}>Decrement</button>
                    </div>
                
                    <div id="session">
                        <p id="session-label">Session Length</p>
                        <button size = '4em' id="session-increment" value="session-increment" onClick={this.handleIncrement}>Increment</button>
                        <div id="session-length">{this.state.sessionLength}</div>
                        <button size = '4em' id="session-decrement" value="session-decrement" onClick={this.handleDecrement}>Decrement</button>
                    </div>
                
                    <div id="timer">
                        <h1 id='title'>Pomodoro Clock</h1>
                        <div id="timer-label">{this.state.currentLabel}</div>
                        <div id="time-left">{this.convertTimeFormat()}</div>
                        <button size="4em" id="start_stop" onClick={this.startStopTimer}>Start/Stop</button>
                        <button size ='4em' id="reset" onClick={this.handleReset}>RESET</button>
                    </div>
                </div>
                {/*Hehehehehehehehehe*/}
                <div id="countdownVid" style={this.hideDisplay()}><video ref={this.video}  width = "260" height="180" controls autoplay loop><source src={countdown}></source></video></div>
                <audio id="beep" ref={this.sound} src=""></audio>
               
            </div>
        )
    }
}

export default PomodoroClock