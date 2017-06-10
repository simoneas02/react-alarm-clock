import React, { Component } from 'react';
import { formatToSeconds, formatToString } from './utils';

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
    } ,1000);
  }

  chronometer() {
    const currentTime = this.props.currentTime;
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
