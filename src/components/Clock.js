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
      playList: 'Choose a music in the Settings'
    };
  }

  componentDidMount() {
    
    setInterval(() => {
        
        this.checkAlarmClock()
        this.setCurrentTime()

    } ,1000)
    
    this.setCurrentDay()
    this.showMenu()
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

  showMenu() {
  const menuToggle = document.querySelectorAll('.menu__toggle')
  const container = document.querySelector('.container');

  menuToggle.forEach((el) => {
    el.addEventListener('click', menuAction);
  })

  document.addEventListener('keyup', (e) => {
      if(e.keyCode === 27) {
          if(container.classList.contains('show-menu')){
              menuAction();
          }
      }
  });


  function menuAction() {
    if(container.classList.contains('show-menu')){
        container.classList.remove('show-menu');
    }
    else {
        container.classList.add('show-menu');
    }
  }
}

  render() {

    return(
      <div className= "container">
        <div className="canvas">

          <aside className="menu">
            <a href="#" className="menu__toggle menu__link">Alarm Clock</a>

            <label className='menu__label' for='code-time'> Code Time </label>
            <input className='menu__input' type="time" name='code-time' onChange={ this.setCodeTime.bind(this) }/>
            
            <label className='menu__label' for='code-day'> Code Day </label>
            <input className='menu__input' type="date" name='code-day' onChange={ this.setCodeDay.bind(this) }/>

            <label className="menu__label">Code Sound</label>
                <select className='menu__input' name="select">
                  <option value="0">Choose a music</option> 
                  <option value="epica">Epica</option>
                </select>
          </aside>

          <header className="header">
            <a href="#" className="menu__toggle">
              <img className="menu-toggle__settings" src="./assets/icons/settings.svg" alt="settings img" />
              <span className="menu-toggle__text">Config</span>
            </a>
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
            <div className='footer__clock'>
              <div className="time">
                <p className="time__title"> Code Time</p>
                <time className="time__time">{ this.state.codeTime }</time>
                <time className="time__date">{ this.state.codeDay }</time>
              </div>

              <div className="time">
                <p className="time__title">Code Sound</p>
                <p>{ this.state.playList }</p>
              </div>

              <div className="time">
                <p className="time__title">Current Day/Time</p>
                <time className="time__time">{ this.state.currentTime }</time>
                <time className="time__date">{ this.state.currentDay }</time>
              </div>
            </div>
            <div className='footer__heart'>
              <p>Made with <span className="heart"></span> by <a href='https://simoneas02.github.io/' target="_blank"></a></p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Clock;
