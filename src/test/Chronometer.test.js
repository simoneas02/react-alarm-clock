import React from 'react';
import Chronometer from '../components/Chronometer';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { getObjectDate, formatToSeconds, formatToString } from '../components/utils';

describe('<Chronometer />', () => {

  //-----------------------------------------

  it('Should return default time left', () => {
    const wrapper = mount(<Chronometer />);

    const timeLeftState = wrapper.state('timeLeft');

    expect(timeLeftState).to.equal('00:00:00');
  })

  //-----------------------------------------

  it('Should return chronometer on for current day', () => {
    const clock = sinon.useFakeTimers();

    const currentDay = new Date().toLocaleDateString();

    const wrapper = mount(
      <Chronometer 
        on= { true }
        codeTime = '23:59:59'
        codeDay = { currentDay }
        />
      );

    clock.tick( 1000 );

    const timeLeftState = wrapper.state('timeLeft');

    const currentTimeSeconds = formatToSeconds(new Date().toLocaleTimeString());
    const codeTimeSeconds = formatToSeconds('23:59:59');
    const leftTime = formatToString(codeTimeSeconds - currentTimeSeconds);

    expect(timeLeftState).to.equal(leftTime);
  })

  //-----------------------------------------
it('Should return chronometer on for next day', () => {
    const clock = sinon.useFakeTimers();

    const currentDay = new Date().toLocaleDateString();
    const objCurrentDay = getObjectDate(currentDay);
    const tomorrow = `${objCurrentDay.year}-${objCurrentDay.month}-${objCurrentDay.day + 1}`;

    const wrapper = mount(
      <Chronometer 
        on= { true }
        codeTime = '23:59:59'
        codeDay = { tomorrow }
        />
      );

    clock.tick( 1000 );

    const timeLeftState = wrapper.state('timeLeft');

    const currentTimeSeconds = formatToSeconds(new Date().toLocaleTimeString());
    const secondsDay = 86400;
    const leftDay = secondsDay - currentTimeSeconds;
    const codeTime = formatToSeconds('23:59:59');

    const leftTime = formatToString(codeTime + leftDay);

    expect(timeLeftState).to.equal(leftTime);
  })

  //-----------------------------------------

  it('Should return chronometer on for date more than two days', () => {
    const clock = sinon.useFakeTimers();

    const currentDay = new Date().toLocaleDateString();
    const objCurrentDay = getObjectDate(currentDay);
    const futureDay = `${objCurrentDay.year}-${objCurrentDay.month}-${objCurrentDay.day + 3}`;

    const wrapper = mount(
      <Chronometer 
        on= { true }
        codeTime = '23:59:59'
        codeDay = { futureDay }
        />
      );

    clock.tick( 1000 );

    const timeLeftState = wrapper.state('timeLeft');

    const currentTimeSeconds = formatToSeconds(new Date().toLocaleTimeString());
    const secondsDay = 86400;
    const leftDay = secondsDay - currentTimeSeconds;
    const codeTime = formatToSeconds('23:59:59');
    const leftTime = formatToString(leftDay + (secondsDay * 2) + codeTime);

    expect(timeLeftState).to.equal(leftTime);
  })

  //-----------------------------------------

  it('Should return chronometer off for current day', () => {
    const clock = sinon.useFakeTimers();

    const currentDay = new Date().toLocaleDateString();

    const wrapper = mount(
      <Chronometer 
        on= { false }
        codeTime = '23:59:59'
        codeDay = { currentDay }
        />
      );

    clock.tick( 1000 );

    const timeLeftState = wrapper.state('timeLeft');

    expect(timeLeftState).to.equal('00:00:00');
  })
  //-----------------------------------------TODO

  it('Should return chronometer off for next day', () => {
    const clock = sinon.useFakeTimers();

    const currentDay = new Date().toLocaleDateString();
    const objCurrentDay = getObjectDate(currentDay);
    const tomorrow = `${objCurrentDay.year}-${objCurrentDay.month}-${objCurrentDay.day + 1}`;

    const wrapper = mount(
      <Chronometer 
        on= { false }
        codeTime = '23:59:59'
        codeDay = { tomorrow }
        />
      );

    clock.tick( 1000 );

    const timeLeftState = wrapper.state('timeLeft');

    expect(timeLeftState).to.equal('00:00:00');
  })
  //-----------------------------------------TODO

  it('Should return chronometer off for date more than two days', () => {
    const clock = sinon.useFakeTimers();

    const currentDay = new Date().toLocaleDateString();
    const objCurrentDay = getObjectDate(currentDay);
    const futureDay = `${objCurrentDay.year}-${objCurrentDay.month}-${objCurrentDay.day + 3}`;

    const wrapper = mount(
      <Chronometer 
        on= { false }
        codeTime = '23:59:59'
        codeDay = { currentDay }
        />
      );

    clock.tick( 1000 );

    const timeLeftState = wrapper.state('timeLeft');

    expect(timeLeftState).to.equal('00:00:00');
  })
  //-----------------------------------------

  it('Should to have the prop codeTime', () => {
    const wrapper = mount(<Chronometer codeTime = '20:30:00'/>);
    const codeTimeProp = wrapper.props().codeTime;

    expect(codeTimeProp).to.equal('20:30:00');
  })

  //-----------------------------------------

  it('Should to have the prop on', () => {
    const wrapper = mount(<Chronometer on= { true }/>);
    const onProp = wrapper.props().on;

    expect(onProp).to.equal(true);
  })

  //-----------------------------------------

  it('Should to have the prop codeDay', () => {
    const wrapper = mount(<Chronometer codeDay = '2017-06-11'/>);
    const codeDayProp = wrapper.props().codeDay;

    expect(codeDayProp).to.equal('2017-06-11');
  })

  //-----------------------------------------

  it('Should return a chronometer for current day', () => {
    const clock = sinon.useFakeTimers();

    const currentDay = new Date().toLocaleDateString();

    const wrapper = mount(
      <Chronometer
        on= { true }
        codeTime = '23:59:59'
        codeDay = { currentDay }
      />
    );

    clock.tick( 1000 );
    const timeLeftState = wrapper.state('timeLeft');

    const currentTime = formatToSeconds(new Date().toLocaleTimeString());
    const codeTime = formatToSeconds('23:59:59');
    const leftTime = formatToString(codeTime - currentTime);
    
    expect(timeLeftState).to.equal(leftTime);
  })

  //-----------------------------------------

  it('Should return a chronometer for next day', () => {
    const clock = sinon.useFakeTimers();

    const currentDay = new Date().toLocaleDateString();
    const objCurrentDay = getObjectDate(currentDay);
    const tomorrow = `${objCurrentDay.year}-${objCurrentDay.month}-${objCurrentDay.day + 1}`;

    const wrapper = mount(
      <Chronometer
        on= { true }
        codeTime = '23:59:59'
        codeDay = { tomorrow }
      />
    );

    clock.tick( 1000 );
    const timeLeftState = wrapper.state('timeLeft');

    const currentTimeSeconds= formatToSeconds(new Date().toLocaleTimeString());
    const secondsDay = 86400;
    const leftDay = secondsDay - currentTimeSeconds;
    const codeTime = formatToSeconds('23:59:59');

    const leftTime = formatToString(codeTime + leftDay);
    
    expect(timeLeftState).to.equal(leftTime);
  })

  //-----------------------------------------

  it('Should return a chronometer for date more than two days', () => {
    const clock = sinon.useFakeTimers();

    const currentDay = new Date().toLocaleDateString();
    const objCurrentDay = getObjectDate(currentDay);
    const futureDay = `${objCurrentDay.year}-${objCurrentDay.month}-${objCurrentDay.day + 3}`;

    const wrapper = mount(
      <Chronometer
        on= { true }
        codeTime = '23:59:59'
        codeDay = { futureDay }
      />
    );

    clock.tick( 1000 );
    const timeLeftState = wrapper.state('timeLeft');

    const currentTimeSeconds= formatToSeconds(new Date().toLocaleTimeString());
    const secondsDay = 86400;
    const leftDay = secondsDay - currentTimeSeconds;
    const codeTime = formatToSeconds('23:59:59');
    const leftTime = formatToString(leftDay + (secondsDay * 2) + codeTime);
    
    expect(timeLeftState).to.equal(leftTime);
  })

  //-----------------------------------------

  it('Should to have a H1 element with left time', () => {
    const clock = sinon.useFakeTimers();

    const currentDay = new Date().toLocaleDateString();

    const wrapper = mount(
      <Chronometer
        on= { true }
        codeTime = '23:59:59'
        codeDay = { currentDay }
      />
    );

    clock.tick( 1000 );

    const currentTimeSeconds = formatToSeconds(new Date().toLocaleTimeString());
    const codeTimeSeconds = formatToSeconds('23:59:59');
    const timeLeftSeconds = codeTimeSeconds - currentTimeSeconds;
    const timeLeft = formatToString(timeLeftSeconds);

    const h1 = <h1>{ timeLeft }</h1>;

    expect(wrapper.contains(h1)).to.equal(true);
  })

  //-----------------------------------------

  it('Should return a chronometer for time passed', () => {
    const clock = sinon.useFakeTimers();

    const currentDay = new Date().toLocaleDateString();
    const currentTimeSeconds = formatToSeconds(new Date().toLocaleTimeString());
    const codeTimeSeconds = currentTimeSeconds - 60;
    const codeTimeSting = formatToString(codeTimeSeconds);

    const wrapper = mount(
      <Chronometer
        on= { true }
        codeTime = { codeTimeSting }
        codeDay = { currentDay }
      />
    );

    clock.tick( 1000 );
    const timeLeftState = wrapper.state('timeLeft');
    
    expect(timeLeftState).to.equal('00:00:00');
  })

  //-----------------------------------------

  it('Should return a chronometer for date passed', () => {
    const clock = sinon.useFakeTimers();

    const wrapper = mount(
      <Chronometer
        on= { true }
        codeTime = '23:59:59'
        codeDay = '1998-05-20'
      />
    );

    clock.tick( 1000 );
    const timeLeftState = wrapper.state('timeLeft');
    
    expect(timeLeftState).to.equal('00:00:00');
  })


})
