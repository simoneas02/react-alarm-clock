import React, { Component } from 'react'
import { formatDate } from './utils'
import Chronometer from './Chronometer'

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTime: '',
      codeTime: 'hh:mm',
      currentDay: '',
      codeDay: 'dd/mm/aaaa',
      on: false,
      timerId: 0
    };
  }

  componentDidMount() {
    
    setInterval(() => {
        
        this.checkAlarmClock()
        this.setCurrentTime()

    } ,1000)
    
    this.setCurrentDay()
  }

  setCurrentTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString()
    })
  }

  setCurrentDay() {
    const today = new Date().toLocaleDateString();
    this.setState({
      currentDay: today
    })
  }

  setCodeTime(event) {
    event.preventDefault();
    const codeTime = event.target.value + ':00'
    console.log(codeTime)
    this.setState({ codeTime: codeTime })
  }

  setCodeDay(event) {
    const day = event.target.value;
    
    this.setState({
      codeDay: day
    })
  }

  checkAlarmClock() {
    const isTimeToCode = this.state.currentTime === this.state.codeTime
    const isDayToCode = formatDate(this.state.currentDay) === this.state.codeDay

    if(isDayToCode && isTimeToCode) {
      this.chronometerOff()
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

    let playSong = new Audio('assets/songs/EPICA-Cry For The Moon www.myfreemp3.click .mp3');
    playSong.play();

  }

  render() {

    return(
      <div className= "container">
        <aside className="aside">
          <input type="time" onChange={ this.setCodeTime.bind(this) }/>
          <input type="date" onChange={ this.setCodeDay.bind(this) }/>
        </aside>

        <header className="header">
          <img className="header__settings" src="./assets/icons/settings.svg" alt="settings img" />
          <span className="header__text">Config</span>
        </header>

        <main className="main">
          <p className="main__title">Wake-up for code in</p>
          <Chronometer
            on={ this.state.on }
            codeTime={ this.state.codeTime }
            codeDay={ this.state.codeDay }
          />

          <div className="button">
            <button className="button__on-off" onClick={ this.chronometerOn.bind(this) }>on</button>
            <button className="button__on-off" onClick={ this.chronometerOff.bind(this) }>off</button>
          </div>
        </main>

        <footer className="footer">
          <div className="time">
            <p className="time__title"> Code Time</p>
            <time className="time__time">{ this.state.codeTime }</time>
            <time className="time__date">{ this.state.codeDay }</time>
          </div>

          <div className="time">
            <p className="time__title">Code Sound</p>
            <select name="select">
              <option value="0">None</option> 
              <option value="epica">Epica</option>
            </select>
          </div>

          <div className="time">
            <p className="time__title">Current Day/Time</p>
            <time className="time__time">{ this.state.currentTime }</time>
            <time className="time__date">{ this.state.currentDay }</time>
          </div>
        </footer>

      </div>
    );
  }
}

export default Clock;
