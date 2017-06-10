import React from 'react';
import Chronometer from '../components/Chronometer';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

describe('<Chronometer />', () => {

  //-----------------------------------------

  it('Should to have the prop codeTime', () => {
    const wrapper = mount(<Chronometer codeTime = '20:30:00'/>);
    const codeTimeProp = wrapper.props().codeTime;

    expect(codeTimeProp).to.equal('20:30:00');
  })

  //-----------------------------------------

  it('Should to have the prop currentTime', () => {
    const wrapper = mount(<Chronometer currentTime = '80:30:00'/>);
    const currentTimeProp = wrapper.props().currentTime;

    expect(currentTimeProp).to.equal('80:30:00');
  })

  //-----------------------------------------

  it('Should return the time left', () => {
    const clock = sinon.useFakeTimers();

    const wrapper = mount(
      <Chronometer
        currentTime = '08:00:00'
        codeTime = '20:30:00'
      />
    );

    clock.tick( 1000 );
    const timeLeftState = wrapper.state('timeLeft');

    expect(timeLeftState).to.equal('12:30:00');
  })

  //-----------------------------------------

  it('Should to have a H1 element with left time', () => {
    const clock = sinon.useFakeTimers();

    const wrapper = mount(
      <Chronometer
        currentTime = '08:00:00'
        codeTime = '20:30:00'
      />
    );

    clock.tick( 1000 );

    const h1 = <h1>12:30:00</h1>;

    expect(wrapper.contains(h1)).to.equal(true);
  })

  //-----------------------------------------

  it('Should return default time left', () => {
    const clock = sinon.useFakeTimers();

    const wrapper = mount(<Chronometer currentTime = '08:00:00'/>);

    clock.tick( 1000 );

    const timeLeftState = wrapper.state('timeLeft');

    expect(timeLeftState).to.equal('00:00:00');
  })

})
