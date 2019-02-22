import calculations from '../../logic/calculations';
const {expect} = require('chai');

const testState = {
  buyingCash: "yes",
  doneUpValue: 400000,
  agentSellingFee: 4000,
  repairingLease: "no",
  mortgageInterestRatePercent: 3,
  initLegalFee: 1500, agentsPercent: 10, sellingLegalFee: 1500,
  loanToValue: 75, initMortgageFee: 100, moePercent: 15,
  mortgageStressInterestRatePercent: 5,
  mortgageStressMultipePercent: 125, otherCost: 0, refurbCost: 0,
  monthlyRent: 2400, remortgageFee: 150, remortgageLegalFee: 300,
  remortgageValuationFee: 200, initSurveyorsFee: 100, stampDutyType: "residential",
  propertyValue: 350000
};

describe('calculations.freeCash()', () => {
  it('should return expected values', () => {

    const fc = calculations.freeCash(testState);
    const expextedValues = [300000, 100000, 650, 369700, 299350, 70350, 2400, 750, 360, 240, 1050];

    console.log(fc);

    fc.map((ob, i) => {
      expect(ob.value).to.be.equal(expextedValues[i].toFixed(2));
    });
  });
});

describe('calculations.initialFinance()', () => {
  it('should return expected values', () => {

    const initF = calculations.initialFinance(testState);
    const expextedValues = [0, 350000, 18000, 1700, 0, 369700, 369700];

    console.log(initF);

    initF.map((ob, i) => {
      expect(ob.value).to.be.equal(expextedValues[i].toFixed(2));
    });
  });
});

describe('calculations.allInputCosts()', () => {
  it('should return expected value', () => {

    const {initSurveyorsFee, initLegalFee, initMortgageFee,
      refurbCost, otherCost, propertyValue, stampDutyType} = testState;

    const ti = calculations.allInputCosts(initSurveyorsFee, initLegalFee, initMortgageFee,
      refurbCost, otherCost, propertyValue, stampDutyType);

    console.log(ti);

    expect(ti).to.be.equal(369700);

  });
});

describe('calculations.flip()', () => {
  it('should return expected values', () => {

    const f = calculations.flip(testState);
    const expextedValues = [400000, 5500, 369700, 24800, 8.2];

    console.log(f);

    f.map((ob, i) => {
      expect(ob.value).to.be.equal(expextedValues[i].toFixed(2));
    });

  });
});

describe('calculations.stressTest()', () => {
  it('should return expected values', () => {

    const s = calculations.stressTest(testState);
    const expextedValues = ['pass', 1563];

    console.log(s);

    s.map((ob, i) => {
      expect(ob.value).to.be.equal(expextedValues[i]);
    });

  });
});