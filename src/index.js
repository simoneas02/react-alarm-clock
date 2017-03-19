import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Time extends Component {
  constructor(props) {
        super(props);
        this.state = {time: new Date().toLocaleTimeString()};
    } 

  checkAlarmTime() {
    const alarmTime = this.refs.time.value + ":00";
    const currentTime = this.state.time;

    if(alarmTime === currentTime) {
      return true
    }
  }

  checkAlarmDay() {
    const alarmDay = this.refs.day.value;
    const currentDay = new Date().getDate().toString();

    if(alarmDay === currentDay) {
      return true
    }
  }

  setCurrentTime() {    
    this.setState({
      time: new Date().toLocaleTimeString()
    })
  }

  componentDidMount() {
    setInterval(
      () => {
        this.setCurrentTime();

        if(this.checkAlarmTime() && this.checkAlarmDay()) {
          console.log("Eu te amo")
        }
      }, 1000
    );
  }

  render() {
    return(
      <div>
        <input type="Time" ref="time"/>
        <input type="text" ref="day"/>
        <h1>{this.state.time}</h1>
      </div>
    );
  }
}

ReactDOM.render (
    <Time />,
    document.getElementById('root')
);