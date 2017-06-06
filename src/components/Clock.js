import React, { Component } from 'react';

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTime: '',
      codeTime: ''
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setCurrentTime();
      this.checkAlarmClock();
    } ,1000);
  }

  checkAlarmClock() {
    console.log('currentTime: ' + this.state.currentTime);
    console.log('codeTime: ' + this.state.codeTime);
    const isTimeToCode = this.state.currentTime === this.state.codeTime;
    console.log('result: ' + isTimeToCode);

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
        <h1>{this.state.currentTime}</h1>

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
