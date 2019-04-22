/* eslint-env mocha */
import { expect } from 'chai';
import shallowObjectEquals from '../../util/shallowObjectEquals';

describe('shallowObjectEquals()', () => {
  it('should return true for valid postcodes false for invalid', () => {
    expect(shallowObjectEquals({ foo: 'bar' }, { foo: 'foo' })).to.be.equal(false);
    expect(shallowObjectEquals({ foo: 'bar' }, { foo: 'bar' })).to.be.equal(true);
  });
});
