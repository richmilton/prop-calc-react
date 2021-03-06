/* eslint-env mocha */
import { expect } from 'chai';
import calculations from '../../../logic/calculations';

const testState = {
  buyingCash: 'yes',
  doneUpValue: 400000,
  agentSellingFee: 4000,
  repairingLease: 'no',
  mortgageInterestRatePercent: 3,
  initLegalFee: 1500,
  agentsPercent: 10,
  sellingLegalFee: 1500,
  loanToValue: 75,
  initMortgageFee: 100,
  moePercent: 15,
  mortgageStressInterestRatePercent: 5,
  mortgageStressMultipePercent: 125,
  otherCost: 0,
  refurbCost: 0,
  monthlyRent: 2400,
  remortgageFee: 150,
  remortgageLegalFee: 300,
  remortgageValuationFee: 200,
  initSurveyorsFee: 100,
  stampDutyType: 'residential',
  stampDutyRegion: 'england',
  stampDutyBuyer: 'investor',
  propertyValue: 350000,
  mortgageTerm: 25,
};

describe('calculations.freeCash()', () => {
  it('should return expected values', () => {
    const fc = calculations.freeCash(testState);
    const expectedValues = [300000, 100000, 650, 369700, 299350, 70350, 2400, 750, 360, 240, 1050];

    expectedValues
      .map((expectedValue, i) => expect(expectedValue.toFixed(2)).to.be.equal(fc[i].value));

    expect(fc[11].value).to.be.equal('7.79%');
  });
});

describe('calculations.initialFinance()', () => {
  it('should return expected values', () => {
    const initF = calculations.initialFinance(testState);
    const expectedValues = ['0.00', '350000.00', '18000.00', '1700.00', '0.00', '369700.00', '369700.00', '0.00 pcm', '0.00 pcm', '25 years'];

    initF.map((ob, i) => expect(ob.value).to.be.equal(expectedValues[i]));
  });
});

describe('calculations.allInputCosts()', () => {
  it('should return expected value', () => {
    const {
      initSurveyorsFee,
      initLegalFee,
      initMortgageFee,
      refurbCost,
      otherCost,
      propertyValue,
      stampDutyType,
      stampDutyRegion,
      stampDutyBuyer,
    } = testState;

    const ti = calculations.allInputCosts(
      initSurveyorsFee,
      initLegalFee,
      initMortgageFee,
      refurbCost,
      otherCost,
      propertyValue,
      stampDutyType,
      stampDutyRegion,
      stampDutyBuyer,
    );

    expect(ti).to.be.equal(369700);
  });
});

describe('calculations.flip()', () => {
  it('should return expected values', () => {
    const f = calculations.flip(testState);
    const expectedValues = [400000, 5500, 369700, 24800, 8.2];

    f.map((ob, i) => expect(ob.value).to.be.equal(expectedValues[i].toFixed(2)));
  });
});

describe('calculations.stressTest()', () => {
  it('should return expected values', () => {
    const s = calculations.stressTest(testState);
    const expectedValues = ['pass', '1563.00'];

    s.map((ob, i) => expect(ob.value).to.be.equal(expectedValues[i]));
  });
});
