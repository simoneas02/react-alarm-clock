import React, { Component } from 'react';
import { formatDate } from './utils';
import Chronometer from './Chronometer';

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTime: '',
      codeTime: '',
      currentDay: '',
      codeDay: '',
      on: false
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setCurrentTime();
      this.checkAlarmClock();
    } ,1000);

    this.setCurrentDay();
  }

  setCurrentTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString()
    })
  }

  setCurrentDay() {
    const today = new Date().toLocaleDateString();
    this.setState({
      currentDay: formatDate(today)
    })
  }

  setCodeTime(event) {
    this.setState({
      codeTime: event.target.value + ':00'
    })
  }

  setCodeDay(event) {
    this.setState({
      codeDay: event.target.value
    })
  }

  checkAlarmClock() {
    const isTimeToCode = this.state.currentTime === this.state.codeTime;
    const isDayToCode = this.state.currentDay === this.state.codeDay;

    if(isDayToCode && isTimeToCode) {
      this.alarm();
    }

  }

  chronometerOn() {
    this.setState({ on: true })
  }
  
  chronometerOff() {
    this.setState({ on: false })
  }

  alarm() {
    console.log('acorda!')
  }

  render() {

    return(
      <div>

        <p>Wake-up for code in</p>
        <Chronometer
          on = { this.state.on }
          codeTime = { this.state.codeTime }
          codeDay = { this.state.codeDay }
         />

        <div>
          <button onClick={ this.chronometerOn.bind(this) }>ON</button>
          <button onClick={ this.chronometerOff.bind(this) }>OFF</button>
        </div>

          <div>
            <p>Code Time</p>
            <input type= "time" onChange={ this.setCodeTime.bind(this) }/>
            <input type= "date" onChange={ this.setCodeDay.bind(this) }/>
          </div>

          <div>
            <p>Current Day/ Time</p>
            <time>{ this.state.currentTime }</time>
            <time>{ this.state.currentDay }</time>
          </div>

      </div>
    );
  }
}

export default Clock;
