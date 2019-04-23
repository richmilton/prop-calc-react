/* eslint-env mocha */
import { expect } from 'chai';
import showDate from '../../util/showDate';

describe('showDate()', () => {
  it('should return correct date format for id with or without email prefix', () => {
    expect(showDate('name@domain.org#1555494494512')).to.be.equal('17/04 10:48:14');
    expect(showDate('1555494494512')).to.be.equal('17/04 10:48:14');
  });
});
