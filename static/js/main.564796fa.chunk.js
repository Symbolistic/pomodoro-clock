(this["webpackJsonppomodoro-clock"]=this["webpackJsonppomodoro-clock"]||[]).push([[0],{13:function(e,t,s){},14:function(e,t,s){"use strict";s.r(t);var n=s(0),r=s.n(n),a=s(3),i=s.n(a),c=s(4),o=s(5),u=s(1),h=s(7),l=s(6),d=function(e){Object(h.a)(s,e);var t=Object(l.a)(s);function s(){var e;return Object(c.a)(this,s),(e=t.call(this)).state={breakLength:5,sessionLength:25,currBreakMinutes:5,currSessionMinutes:25,currSessionSeconds:0,currBreakSeconds:0,timeLeft:"25:00",currentLabel:"Session",isPaused:!0},e.handleReset=e.handleReset.bind(Object(u.a)(e)),e.handleDecrement=e.handleDecrement.bind(Object(u.a)(e)),e.handleIncrement=e.handleIncrement.bind(Object(u.a)(e)),e.startStopTimer=e.startStopTimer.bind(Object(u.a)(e)),e.convertTimeFormat=e.convertTimeFormat.bind(Object(u.a)(e)),e.sound=r.a.createRef(),e}return Object(o.a)(s,[{key:"handleReset",value:function(){this.sound.current.pause(),this.sound.current.currentTime=0,this.setState({isPaused:!0,breakLength:5,sessionLength:25,currBreakMinutes:5,currSessionMinutes:25,currSessionSeconds:0,currBreakSeconds:0,currentLabel:"Session"})}},{key:"handleDecrement",value:function(e){"break-decrement"===e.target.value?this.state.breakLength>1&&!0===this.state.isPaused&&this.setState((function(e){return{breakLength:e.breakLength-1,currBreakMinutes:e.breakLength-1,currBreakSeconds:0}})):this.state.sessionLength>1&&!0===this.state.isPaused&&this.setState((function(e){return{sessionLength:e.sessionLength-1,currSessionMinutes:e.sessionLength-1,currSessionSeconds:0}}))}},{key:"handleIncrement",value:function(e){"break-increment"===e.target.value?this.state.breakLength<60&&!0===this.state.isPaused&&this.setState((function(e){return{breakLength:e.breakLength+1,currBreakMinutes:e.breakLength+1,currBreakSeconds:0}})):this.state.sessionLength<60&&!0===this.state.isPaused&&this.setState((function(e){return{sessionLength:e.sessionLength+1,currSessionMinutes:e.sessionLength+1,currSessionSeconds:0}}))}},{key:"startStopTimer",value:function(){this.setState((function(e){return!1===e.isPaused?{isPaused:!0}:{isPaused:!1}}))}},{key:"convertTimeFormat",value:function(){var e="Session"===this.state.currentLabel?this.state.currSessionSeconds:this.state.currBreakSeconds,t="Session"===this.state.currentLabel?this.state.currSessionMinutes:this.state.currBreakMinutes;return(t=t<10?"0"+t:t)+":"+(e=e<10?"0"+e:e)}},{key:"componentDidMount",value:function(){var e=this;this.setState({currSessionMinutes:this.state.sessionLength,currBreakMinutes:this.state.breakLength}),this.countDown=setInterval((function(){if(!1===e.state.isPaused){var t="Session"===e.state.currentLabel?e.state.currSessionMinutes:e.state.currBreakMinutes,s="Session"===e.state.currentLabel?e.state.currSessionSeconds:e.state.currBreakSeconds;if(0===t&&0===s)if("Session"===e.state.currentLabel){var n=(e.state.breakLength<10?"0"+e.state.breakLength:e.state.breakLength)+":00";e.setState({currentLabel:"Break",currBreakMinutes:e.state.breakLength,currSessionMinutes:e.state.sessionLength,currSessionSeconds:0,currBreakSeconds:0,timeLeft:n})}else{var r=(e.state.sessionLength<10?"0"+e.state.sessionLength:e.state.sessionLength)+":00";e.setState({currentLabel:"Session",currBreakMinutes:e.state.breakLength,currSessionMinutes:e.state.sessionLength,currSessionSeconds:0,currBreakSeconds:0,timeLeft:r})}t="Session"===e.state.currentLabel?e.state.currSessionMinutes:e.state.currBreakMinutes,0===(s="Session"===e.state.currentLabel?e.state.currSessionSeconds:e.state.currBreakSeconds)?(t-=1,s=59):s-=1,"Session"===e.state.currentLabel?e.setState({currSessionMinutes:t,currSessionSeconds:s}):e.setState({currBreakMinutes:t,currBreakSeconds:s}),0===t&&0===s&&e.sound.current.play()}}),1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.countDown)}},{key:"render",value:function(){return console.log(this.convertTimeFormat()),r.a.createElement("div",{id:"grid-container"},r.a.createElement("h1",{id:"title"},"Pomodoro Clock"),r.a.createElement("div",{id:"break"},r.a.createElement("h2",{id:"break-label"},"Break Length"),r.a.createElement("button",{size:"4em",id:"break-increment",value:"break-increment",onClick:this.handleIncrement},"Increment"),r.a.createElement("div",{id:"break-length"},this.state.breakLength),r.a.createElement("button",{size:"4em",id:"break-decrement",value:"break-decrement",onClick:this.handleDecrement},"Decrement")),r.a.createElement("div",{id:"session"},r.a.createElement("h2",{id:"session-label"},"Session Length"),r.a.createElement("button",{size:"4em",id:"session-increment",value:"session-increment",onClick:this.handleIncrement},"Increment"),r.a.createElement("div",{id:"session-length"},this.state.sessionLength),r.a.createElement("button",{size:"4em",id:"session-decrement",value:"session-decrement",onClick:this.handleDecrement},"Decrement")),r.a.createElement("div",{id:"timer"},r.a.createElement("div",{id:"timer-label"},this.state.currentLabel),r.a.createElement("div",{id:"time-left"},this.convertTimeFormat()),r.a.createElement("button",{size:"4em",id:"start_stop",onClick:this.startStopTimer},"Start/Stop"),r.a.createElement("button",{size:"4em",id:"reset",onClick:this.handleReset},"RESET")),r.a.createElement("audio",{id:"beep",ref:this.sound,src:"http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav"}))}}]),s}(r.a.Component);s(13);var m=function(){return r.a.createElement(d,null)};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(m,null)),document.getElementById("root"))},8:function(e,t,s){e.exports=s(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.564796fa.chunk.js.map