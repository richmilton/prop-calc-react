/* eslint-env mocha */
import { expect } from 'chai';
import validatePostcode from '../../util/validate-postcode';

describe('validatePostcode()', () => {
  it('should return true for valid postcodes false for invalid', () => {
    expect(validatePostcode('ZZ1 2PP')).to.be.equal(false);
    expect(validatePostcode('QQ5 4JE')).to.be.equal(false);
    expect(validatePostcode('BS9 4JE')).to.be.equal(true);
    expect(validatePostcode('BS7 8DR')).to.be.equal(true);
  });
});
