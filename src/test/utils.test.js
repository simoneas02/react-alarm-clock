import { getObjectDate, formatDate, formatToSeconds, formatToString } from '../components/utils';
import { expect } from 'chai';

describe('utils', () => {

  it('Should return the formated date', () => {
    const formatedDate = formatDate('09/06/2017');
    const expectedResult = '2017-06-09';
    expect(formatedDate).to.equal(expectedResult);
  })

  it('Should return the seconds from time', () => {
    const seconds = formatToSeconds('01:50:20');
    const expectedResult = 6620;
    expect(seconds).to.equal(expectedResult);
  })

  it('Should return a date from seconds', () => {
    const time = formatToString(6620);
    const expectedResult = '01:50:20';
    expect(time).to.equal(expectedResult);
  })

  it('Should return a date like an object', () => {
    const objDate = getObjectDate('2017-6-11')
    const expectedResult =
      {
        day: 11,
        month: 6,
        year: 2017
      };

    expect(objDate).to.deep.equal(expectedResult);
  })

})
