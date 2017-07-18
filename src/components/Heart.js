import React, { Component } from 'react'
import '../assets/css/heart.css'

class Heart extends Component {
  render() {
    
      return (
      <div className='heart'>
        <p>Made with <span className="heart__css"></span> by <a className='heart__author' href='https://simoneas02.github.io/' target="_blank">Simone Amorim</a></p>
      </div>
    )
  };

};

export default Heart;

