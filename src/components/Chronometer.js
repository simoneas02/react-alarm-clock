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
    setInterval(() => {
      this.chronometer();
      if (this.props.codeDay) {
        this.checkCodeDay();
      }
    } ,1000);
  }



  checkCodeDay() {
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

      const secondsCodeDay = formatToSeconds(this.props.codeTime);

      if(dateHasPassed) {
        return console.log('A data deve ser igual ou maior que a atual')
      }

      if(dateIsToday) {
        const codeTimeSeconds = formatToSeconds(codeTime);
        const currentTimeSeconds = formatToSeconds(currentTime);
        const timeLeft = codeTimeSeconds - currentTimeSeconds;

      this.setState({
        timeLeft: formatToString(timeLeft)
      })
      }

      if (dateIsTomorrow) {
        const timeLeft = leftDay + secondsCodeDay;
        this.setState({ timeLeft: formatToString(timeLeft) })
        return;
      }

      if(dateIsMoreThanTwoDays) {
        const timeLeft = leftDay + secondsCodeDay;
        const timeCode = timeLeft + ((subDay -1) * secondsDay);
        this.setState({ timeLeft: formatToString(timeCode) })
        return;
      }
      return;
    }
  }

  chronometer() {
    const currentTime = new Date().toLocaleTimeString();
    const codeTime = this.props.codeTime;

    if (codeTime && currentTime) {

      const codeTimeSeconds = formatToSeconds(codeTime);
      const currentTimeSeconds = formatToSeconds(currentTime);
      const timeLeft = codeTimeSeconds - currentTimeSeconds;

      this.setState({
        timeLeft: formatToString(timeLeft)
      })

    } else {

      this.setState({
        timeLeft: '00:00:00'
      })

    }
  }

  render() {
    return (
      <h1>{this.state.timeLeft}</h1>
    )
  }
}

export default Chronometer;
