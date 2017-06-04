import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
        super(props);
        this.state = {
          time: new Date().toLocaleTimeString(),
          currentDay: ''
        };
    }

    componentDidMount() {
    this.formatDate();
    this.setCurrentTime();

    setInterval(() => this.setCurrentTime() , 1000);
  }

  formatDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    if(day < 10) day ='0'+ day;

    if(month < 10) month ='0'+ month;

    const today =(`${day}/${month}/${year}`);

    this.setState({ currentDay: today });
  }

  setCurrentTime() {
    this.setState({
      time: new Date().toLocaleTimeString()
    })
  }

  checkAlarmTime() {
    const alarmTime = this.refs.time.value + ":00";
    const currentTime = this.state.time;

    if(alarmTime === currentTime) return true;
  };

  checkAlarmDay() {
    const alarmDay = this.refs.day.value;
    const currentDay = new Date().getDate().toString();

    if(alarmDay === currentDay) return true;
  }

  render() {

    return(
      <div>

        <p>Wake-up for code in</p>
        <h1>{this.state.time}</h1>
        
        <div>
          <button>ON</button>
          <button >OFF</button>
        </div>
        
        <div>

          <div>
            <p>Code Time</p>
            <input type="time" ref="time"/>
            <input type="date" ref="day"/>
          </div>
         
          <div>
            <p>Current Day/ Time</p>
            <div>
            <time>{ this.state.time }</time>
            </div>
            <time>{ this.state.currentDay }</time>
          </div>

        </div>
      
      </div>
    );
  }
}

export default Clock;