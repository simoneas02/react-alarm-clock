import React, { Component } from 'react'
import { formatDate } from './utils'
import GithubCorner from 'react-github-corner'
import Chronometer from './Chronometer'
import Heart from './Heart'
import '../assets/css/container.css'
import '../assets/css/menu.css'
import '../assets/css/header.css'
import '../assets/css/main.css'
import '../assets/css/footer.css'

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTime: '',
      codeTime: '',
      currentDay: '',
      codeDay: '',
      on: false,
      playList: '',
      playSong: false
    };
  }

  componentDidMount() {
    
    this.interval = setInterval(() => { this.checkAlarmClock() }, 1000)
    setInterval(() => { this.setCurrentTime() }, 1000)
    
    this.setCurrentDay()
    this.showMenu()
    this.defaultAlarm()
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
    this.setState({ codeTime: codeTime })
  }

  setCodeDay(event) {
    const codeDay = event.target.value;

    const [year, month, day] = codeDay.split("-");
    const dateFormated = `${day}/${month}/${year}`;

    this.setState({
      codeDay: dateFormated
    })
  }

  checkAlarmClock() {
    const isTimeToCode = this.state.currentTime === this.state.codeTime
    const isDayToCode = formatDate(this.state.currentDay) === formatDate(this.state.codeDay)

    if(isDayToCode && isTimeToCode) {
      this.chronometerOff()
      this.defaultAlarm()
      this.setPlayList()
      this.alarm();
    }
  }

  chronometerOn() {
    this.refs.btnOn.classList.add('button__is-active')
    this.refs.btnOff.classList.remove('button__is-active')

    this.setPlayList()
    this.clearAlarme()
    this.setState({ on: true })
  }
  
  chronometerOff() {
    this.refs.btnOn.classList.remove('button__is-active')
    this.refs.btnOff.classList.add('button__is-active')

    this.setState({ on: false })
  }

  alarm() {
    const song = this.state.playList
    let playSong;

      switch(song) {
        case "Epica":
          playSong = new Audio('assets/songs/EPICA-Cry For The Moon.mp3')
          playSong.play()
          break
        case "Guns N' Roses":
          playSong = new Audio('assets/songs/Guns N Roses - Welcome To The Jungle.mp3')
          playSong.play()
          break
        case "Queens Of The Stone Age":
          playSong = new Audio('assets/songs/Queens Of The Stone Age - No One Knows.mp3')
          playSong.play()
          break
        default:
          break
      }
  }

  defaultAlarm() {
    this.setState({ codeTime: 'hh:mm' })
    this.setState({ codeDay: 'dd/mm/aaaa' })
  }

  setPlayList() {
    let song = this.refs.inputSound.options.selectedIndex

    switch(song) {
        case 1:
          this.setState({ playList: this.refs.inputSound.options[1].value })
          break
        case 2:
          this.setState({ playList: this.refs.inputSound.options[2].value })
          break
        case 3:
          this.setState({ playList: this.refs.inputSound.options[3].value })
          break
        default:
          break
      }
  }

  clearAlarme() {
    this.refs.inputTime.value = ''
    this.refs.inputDate.value = ''
    this.refs.inputSound.options.selectedIndex = this.refs.inputSound.options[0].value
  }

  showMenu() {
  const menu = this.refs.menu
  const menuBtn = this.refs.menuBtn
  const container = this.refs.container

  menu.addEventListener('click', menuAction);
  menuBtn.addEventListener('click', menuAction);

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
      <div className='container' ref='container'>
        <div className='canvas'>

          <aside className='menu'>
            <button className='menu__button' ref='menuBtn'>Alarm Clock ></button>

            <label className='menu__label'> Code Time </label>
            <input className='menu__input' ref='inputTime' type='time' onChange={ this.setCodeTime.bind(this) }/>
            
            <label className='menu__label'> Code Day </label>
            <input className='menu__input' ref='inputDate' type='date' onChange={ this.setCodeDay.bind(this) }/>

            <label className='menu__label'>Code Sound</label>
                <select className='menu__input' ref='inputSound' name='select'>
                  <option>Choose a music</option> 
                  <option>Epica</option>
                  <option>Guns N' Roses</option>
                  <option>Queens Of The Stone Age</option>
                </select>
          </aside>

          <header className='header'>
            <button className='menu__button' ref='menu'>
              <img className='menu-toggle__settings' src='./assets/icons/settings.svg' alt='settings img' />
              <span className='menu-toggle__text'>Config</span>
            </button>

            <GithubCorner octoColor='--bg-color' bannerColor='#ee017c' href="https://github.com/simoneas02/react-alarm-clock" />
          </header>

          <main className='main'>
            <p className='main__title'>Timeleft for wake-up/code</p>
            <Chronometer
              on={ this.state.on }
              codeTime={ this.state.codeTime }
              codeDay={ this.state.codeDay }
            />

            <div className='button'>
              <button className='button__on-off' ref='btnOn' onClick={ this.chronometerOn.bind(this) }>on</button>
              <button className='button__on-off button__is-active' ref='btnOff' onClick={ this.chronometerOff.bind(this) }>off</button>
            </div>
          </main>

          <footer className='footer'>
            <div className='footer__clock'>
              <div className='time'>
                <p className='time__title'>Wake-up</p>
                <time className='time__time'>{ this.state.codeTime }</time>
                <time className='time__date'>{ this.state.codeDay }</time>
              </div>

              <div className='time'>
                <p className='time__title'>Code Sound</p>
                <p className='time__time'>{ this.state.playList }</p>
              </div>

              <div className='time'>
                <p className='time__title'>Current Day/Time</p>
                <time className='time__time'>{ this.state.currentTime }</time>
                <time className='time__date'>{ this.state.currentDay }</time>
              </div>
            </div>
            <Heart />
          </footer>
        </div>
      </div>
    );
  }
}

export default Clock;
