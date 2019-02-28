import calculateStampDuty from '../../../logic/stampduty/stampduty-calculator';
const {expect} = require('chai');

const testValues = [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 2000000];

describe('calculateStampDuty()', () => {
  it('should return correct values for residential', () => {

    const expectedValues = [3000, 7500, 14000, 22000, 30000, 38000, 46000, 54000, 62000, 73750, 213750];

    testValues.forEach((v, idx) => {
      expect(calculateStampDuty(v, 'residential')).to.be.equal(expectedValues[idx]);
    });
  });
});

describe('calculateStampDuty()', () => {
  it('should return correct values for commercial', () => {

    const expectedValues = [0, 1000, 4500, 9500, 14500, 19500, 24500, 29500, 34500, 39500, 89500];

    testValues.forEach((v, idx) => {
      expect(calculateStampDuty(v, 'commercial')).to.be.equal(expectedValues[idx]);
    });

  });
});

describe('calculateStampDuty()', () => {
  it('should return correct values for residential wales', () => {

    const expectedValues = [3000, 6700, 13950, 21950, 32450, 42950, 53450, 65200, 78200, 91200, 231200];

    testValues.forEach((v, idx) => {
      expect(calculateStampDuty(v, 'residentialWales')).to.be.equal(expectedValues[idx]);
    });
  });
});

describe('calculateStampDuty()', () => {
  it('should return correct values for commercial scotland', () => {

    const expectedValues = [0, 500, 3500, 8500, 13500, 18500, 23500, 28500, 33500, 38500, 98500];

    testValues.forEach((v, idx) => {
      expect(calculateStampDuty(v, 'commercialWales')).to.be.equal(expectedValues[idx]);
    });

  });
});

describe('calculateStampDuty()', () => {
  it('should return correct values for residential scotland', () => {

    const expectedValues = [3000, 7100, 13600, 25350, 38350, 51350, 64350, 78350, 93350, 108350, 258350];

    testValues.forEach((v, idx) => {
      expect(calculateStampDuty(v, 'residentialScotland')).to.be.equal(expectedValues[idx]);
    });
  });
});

describe('calculateStampDuty()', () => {
  it('should return correct values for commercial scotland', () => {

    const expectedValues = [0, 500, 3500, 8500, 13500, 18500, 23500, 28500, 33500, 38500, 88500];

    testValues.forEach((v, idx) => {
      expect(calculateStampDuty(v, 'commercialScotland')).to.be.equal(expectedValues[idx]);
    });

  });
});