import React, { Component } from 'react';
import { getObjectDate, formatToSeconds, formatToString } from './utils';

class Chronometer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeLeft: ''
    }
  }

  componentDidMount() {
    this.defaultTimeLeft();

    setInterval(() => 
    { this.chronometer(); }
    ,1000);
  }

  chronometer() {
    const isCodeDay = getObjectDate(this.props.codeDay);
    const isCurrentDay = getObjectDate(new Date().toLocaleDateString());

    const subMonth = isCodeDay.month - isCurrentDay.month;
    const currentMonth = subMonth === 0;

    if(currentMonth) {
      const subDay = isCodeDay.day - isCurrentDay.day;
      const dateHasPassed = subDay < 0;
      const dateIsToday = subDay === 0;
      const dateIsTomorrow = subDay === 1;
      const dateIsMoreThanTwoDays= subDay > 1;

      const currentTimeSeconds = formatToSeconds(new Date().toLocaleTimeString());
      const secondsDay = 86400;
      const leftDay = secondsDay - currentTimeSeconds;
      const codeTimeSeconds = formatToSeconds(this.props.codeTime);
      const timeHasPassed = dateIsToday && (codeTimeSeconds - currentTimeSeconds < 0) ;

      if(timeHasPassed) {
        this.setState({
          timeLeft: this.defaultTimeLeft
        })
      }

      if(dateHasPassed) {
        this.setState({
          timeLeft: this.defaultTimeLeft
        })
      }

      if(dateIsToday) {
        const timeLeft = codeTimeSeconds - currentTimeSeconds;

        this.setState({
          timeLeft: formatToString(timeLeft)
        })
      }

      if (dateIsTomorrow) {
        const timeLeft = leftDay + codeTimeSeconds;

        this.setState({ 
          timeLeft: formatToString(timeLeft) 
        })
        return;
      }

      if(dateIsMoreThanTwoDays) {
        const timeLeft = leftDay + codeTimeSeconds;
        const timeCode = timeLeft + ((subDay -1) * secondsDay);

        this.setState({ 
          timeLeft: formatToString(timeCode) 
        })
        return;
      }
     
    }
  }

  defaultTimeLeft () {
    this.setState({ timeLeft: '00:00:00' })
  }

  chronometerOnOff() {
    const on = this.props.on;

    if(on) {
      this.setState({ timeLeft: this.state.timeLeft })
    return;
    } else {
      this.setState({ timeLeft: this.defaultTimeLeft })
    }
    return;
  }

  render() {
    return (
      <h1>{this.state.timeLeft}</h1>
    )
  }
}

export default Chronometer;
