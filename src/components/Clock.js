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
      open: false
    };
  }

  componentDidMount() {
    
    this.interval = setInterval(() => { this.checkAlarmClock() }, 1000)
    setInterval(() => { this.setCurrentTime() }, 1000)

    this.setState({ playList: 'Choose the music in settings' })
    this.setCurrentDay()
    this.defaultAlarm()
    this.playSong
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
      this.defaultAlarm()
      this.setPlayList()
      this.alarm();
    }
  }

  alarm() {
    const song = this.state.playList

      switch(song) {
        case "Epica":
          this.playSong = new Audio('assets/songs/EPICA-Cry For The Moon.mp3')
          this.playSong.play()
          break
        case "Guns N' Roses":
          this.playSong = new Audio('assets/songs/Guns N Roses - Welcome To The Jungle.mp3')
          this.playSong.play()
          break
        case "Queens Of The Stone Age":
          this.playSong = new Audio('assets/songs/Queens Of The Stone Age - No One Knows.mp3')
          this.playSong.play()
          break
        default:
          break
      }
  }

  chronometerOn() {
    this.setPlayList()
    this.clearAlarme()
    this.setState({ on: true })
  }

  stopChronometer() {
    this.alarm(false)
  }
  
  chronometerOff() {
    this.setState({ playList: 'Choose the music in settings' })
    this.playSong.pause()
    this.playSong.currentTime = 0
    this.setState({ on: false })
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

  openOn() {
    this.setState({open: true})
  }

  openOff() {
    this.setState({open: false})
  } 

  render() {
    // active button
    let btnOn
    let btnOff

    if(this.state.on) {
      btnOn = 'button__is-active'
      btnOff = ''
    } else {
      btnOn = ''
      btnOff = 'button__is-active'
    }

    // show menu
    let showMenu

    if(this.state.open) {
      showMenu = 'show-menu'
    } else {
      showMenu = ''
    }

    return(
      <div className = {`container ${showMenu}`} ref='container'>
        <div className='canvas'>

          <aside className='menu'>
            <button className='menu__button' onClick = {this.openOff.bind(this)}>Alarm Clock ></button>

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
            <button className='menu__button' onClick = {this.openOn.bind(this)}>
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
              <button className= {`button__on-off ${btnOn}`} onClick={ this.chronometerOn.bind(this) }>on</button>
              <button className= {`button__on-off ${btnOff}`} onClick={ this.chronometerOff.bind(this) }>off</button>
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
