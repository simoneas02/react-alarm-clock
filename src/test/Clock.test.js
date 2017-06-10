import React from 'react';
import Clock from '../components/Clock';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { formatDate } from '../components/utils';

describe('<Clock />', () => {
  
  it('should return the current day', () => {

    const wrapper = mount(<Clock />);
    const today = new Date().toLocaleDateString();
    expect(wrapper.state('currentDay')).to.equal(formatDate(today));
    
  })

}) 
