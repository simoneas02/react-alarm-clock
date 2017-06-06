import React, { Component } from 'react';

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTime: '',
      codeTime: '',
      timeLeft: ''
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setCurrentTime();
      this.cronometer();
      this.checkAlarmClock();
    } ,1000);
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
    const array = time.split(':');
    const timeSeconds = (+array[0]) * 60 * 60 + (+array[1]) * 60 + (+array[2]);
    return timeSeconds;
  }

  formatToString(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);
    const timeString = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    return timeString;
  }

  checkAlarmClock() {
    const isTimeToCode = this.state.currentTime === this.state.codeTime;

    if(isTimeToCode) {
      this.alarm();
    }
  }

  setCurrentTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString()
    })
  }

  setCodeTime(event) {
    this.setState({
      codeTime: event.target.value + ':00'
    })
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
          </div>

          <div>
            <p>Current Day/ Time</p>
            <time>{ this.state.currentTime }</time>
          </div>

      </div>
    );
  }
}

export default Clock;
