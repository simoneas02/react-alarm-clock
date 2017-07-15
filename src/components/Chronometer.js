import React, { Component } from 'react';
import { 
    getObjectDate, 
    formatDate, 
    formatToSeconds, 
    formatToString, 
    secondsDay 
  } from './utils';

class Chronometer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeLeft: '',
      play: true
    }
  }

  componentDidMount() {
      this.defaultTimeLeft();

    setInterval(() => {

      if(this.state.play) {
        this.dateIsToday()
        this.dateIsTomorrow()
        this.dateIsMoreThanTwoDays()
      } else {
        this.defaultTimeLeft();
      }
      
    },1000);
    
  }

  componentWillReceiveProps(nextProps) {
    const timeLeft = formatToSeconds(this.state.timeLeft) >= 0

    if(timeLeft && nextProps.on) {
      this.setState({play: true})
    } else {
      this.setState({play: false})
      this.defaultTimeLeft();
    }
  }

  codeDay() {
    return getObjectDate(this.props.codeDay)
  }

  currentDay() {
    return getObjectDate(formatDate(new Date().toLocaleDateString()))
  }

  subMonth(){
    return this.codeDay().month - this.currentDay().month
  } 
  
  subDay() {
    return this.codeDay().day - this.currentDay().day
  }

  currentTimeSeconds() {
    return formatToSeconds(new Date().toLocaleTimeString())
  }

  codeTimeSeconds() {
    return formatToSeconds(this.props.codeTime)
  }

  leftDay() {
    return secondsDay - this.currentTimeSeconds()
  }

  timeLeft() {
    return this.leftDay() + this.codeTimeSeconds();
  }

  checkDay() {
    const isToday = this.subDay() === 0;
    const dateHasPassed = this.subDay() < 1
    const timeHasPassed = (isToday && (this.codeTimeSeconds() - this.currentTimeSeconds() < 0))

    if(dateHasPassed || timeHasPassed) {
      console.log(`${this.props.codeDay} ou ${this.props.codeTime} é menor que a data ou hora atual`);
    }
  }
  
  dateIsToday() {
    const checkDay = this.subDay() === 0
    const checkMonth = this.subMonth() === 0
    const on = this.state.play

    if(checkDay && on && checkMonth ) {
      const timeLeft = this.codeTimeSeconds() - this.currentTimeSeconds();
      
      this.setState({ timeLeft: formatToString(timeLeft) })
    }
  }

  dateIsTomorrow() {
    const checkDay = this.subDay() === 1
    const checkMonth = this.subMonth() === 0
    const on = this.state.play
    
    if(checkDay && on && checkMonth ) {
      const timeLeft = this.leftDay() + this.codeTimeSeconds();

      this.setState({ timeLeft: formatToString(timeLeft) })
    }
  }

  dateIsMoreThanTwoDays() {
    const checkDay = this.subDay() > 1
    const checkMonth = this.subMonth() === 0
    const on = this.state.play

    if(checkDay && on && checkMonth ) {
      const timeLeft = this.timeLeft() + ((this.subDay() -1) * secondsDay);

      this.setState({ timeLeft: formatToString(timeLeft) })
    }
  }

  defaultTimeLeft() {
    this.setState({ timeLeft: '00:00:00' });
  }

  render() {
    return (
      <h1>{this.state.timeLeft}</h1>
    )
  }
}

export default Chronometer;
