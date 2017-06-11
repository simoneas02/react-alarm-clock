import React, { Component } from 'react';
import { getObjectDate, formatDate, formatToSeconds, formatToString } from './utils';

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTime: '',
      codeTime: '',
      timeLeft: '',
      currentDay: '',
      codeDay: ''
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setCurrentTime();
      this.chronometer();
      this.checkAlarmClock();
      this.checkCodeDay(this.state.codeDay);
    } ,1000);

    this.setCurrentDay();
  }

  setCurrentTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString()
    })
  }

  checkCodeDay(codeDay) {
    const isCodeDay = getObjectDate(codeDay);
    const isCurrentDay = getObjectDate(this.state.currentDay);

    const subMonth = isCodeDay.month - isCurrentDay.month;
    const currentMonth = subMonth === 0;

    if(currentMonth) {
      const subDay = isCodeDay.day - isCurrentDay.day;
      const dateHasPassed = subDay < 0;
      //const dateIsToday = subDay === 0;
      const dateIsTomorrow = subDay === 1;
      const dateIsMoreThanTwoDays= subDay > 1;

      const currentTimeSeconds = formatToSeconds(this.state.currentTime);
      const secondsDay = 86400;
      const leftDay = secondsDay - currentTimeSeconds;

      const secondsCodeDay = formatToSeconds(this.state.codeTime);

      if(dateHasPassed){
        return console.log('A data deve ser igual ou maior que a atual')
      }

      if (dateIsTomorrow) {
        const timeLeft = leftDay + secondsCodeDay;
        this.setState({ timeLeft: formatToString(timeLeft) })
        return;
      }

      if(dateIsMoreThanTwoDays) {
        const timeLeft = leftDay + secondsCodeDay;
        const timeCode = timeLeft + ((subDay -1) * secondsDay);
        this.setState({ timeLeft: formatToString(timeCode) })
        return;
      }
      return;
    }
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

  chronometer() {
    const currentTime = this.state.currentTime;
    const codeTime = this.state.codeTime;

    if (codeTime !== '') {

      const codeTimeSeconds = formatToSeconds(codeTime);
      const currentTimeSeconds = formatToSeconds(currentTime);
      const timeLeft = codeTimeSeconds - currentTimeSeconds;

      this.setState({
        timeLeft: formatToString(timeLeft)
      })

    }

  }

  checkAlarmClock() {
    const isTimeToCode = this.state.currentTime === this.state.codeTime;
    const isDayToCode = this.state.currentDay === this.state.codeDay;

    if(isDayToCode && isTimeToCode) {
      this.alarm();
    }

  }

  alarm() {
    console.log('acorda!')
  }

  render() {

    return(
      <div>

        <p>Wake-up for code in</p>
        <h1>{this.state.timeLeft}</h1>

        <div>
          <button>ON</button>
          <button>OFF</button>
        </div>

          <div>
            <p>Code Time</p>
            <input type="time" onChange={this.setCodeTime.bind(this)}/>
            <input type="date" onChange={this.setCodeDay.bind(this)}/>
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
