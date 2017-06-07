import React, { Component } from 'react';

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
      this.cronometer();
      this.checkAlarmClock();
    } ,1000);

    this.setCurrentDay();
  }

  cronometer() {
    const currentTime = this.state.currentTime;
    const codeTime = this.state.codeTime;

    if (codeTime !== '') {

      const codeTimeSeconds = this.formatToSeconds(codeTime);
      const currentTimeSeconds = this.formatToSeconds(currentTime);
      const timeLeft = codeTimeSeconds - currentTimeSeconds;

      this.setState({
        timeLeft: this.formatToString(timeLeft)
      })

    }

  }

  formatToSeconds(time) {
    const [hour, minute, second] = time.split(':');
    const timeSeconds = (+hour) * 60 * 60 + (+minute) * 60 + (+second);
    return timeSeconds;
  }

  formatToString(seconds) {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor(seconds % 3600 / 60);
    const second = Math.floor(seconds % 3600 % 60);
    const timeString = `${(hour < 10 ? "0" : "") + hour}:${(minute < 10 ? "0" : "") + minute}:${(second < 10 ? "0" : "") + second}`;
    return timeString;
  }

  checkAlarmClock() {
    const isTimeToCode = this.state.currentTime === this.state.codeTime;
    const isDayToCode = this.state.currentDay === this.state.codeDay;

    if(isDayToCode && isTimeToCode) {
      this.alarm();
    }
  }

  setCurrentTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString()
    })
  }

  formatDate(date) {
    const [year, month, day] = date.split("-");
    const dateFormated = `${year}-${(month < 10 ? "0" : "") + month}-${(day < 10 ? "0" : "") + day}`;
    return dateFormated;
  }

  setCurrentDay() {
    const today = new Date().toLocaleDateString();
    this.setState({
      currentDay: this.formatDate(today)
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
    console.log(this.state.currentDay == this.state.codeDay);
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
