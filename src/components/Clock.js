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

  getCodeTime() {
    const timeTime = this.refs.time.value;
    console.log(timeTime)
  }

  getSecondsTime(seconds) {
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);
    let timeFormated = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    return timeFormated;
  }

  render() {

    return(
      <div>

        <p>Wake-up for code in</p>
        <h1>{this.state.time}</h1>
        
        <div>
          <button onClick={ this.getCodeTime.bind(this) }>ON</button>
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