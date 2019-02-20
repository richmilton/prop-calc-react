import calculations from '../../logic/calculations';
const {expect} = require('chai');

const state = {
  buyingCash: "yes",
  doneUpValue: 400000,
  agentSellingFee: 0,
  repairingLease: "no",
  mortgageInterestRatePercent: 3,
  initLegalFee: 1500, agentsPercent: 10, sellingLegalFee: 0,
  loanToValue: 75, initMortgageFee: 100, moePercent: 15,
  mortgageStressInterestRatePercent: 5,
  mortgageStressMultipePercent: 125, otherCost: 0, refurbCost: 0,
  monthlyRent: 2400, remortgageFee: 150, remortgageLegalFee: 300,
  remortgageValuationFee: 200, initSurveyorsFee: 100, stampDutyType: "residential",
  propertyValue: 350000
};

it('renders without crashing', () => {
  //const div = document.createElement('div');
  console.log(calculations.freeCash(state));
  console.log(calculations.stampDuty(200000, 'residential'));
});

describe('calculations.calculateStampDuty()', function () {
  it('should return a value', function () {

    const sd = calculations.stampDuty(200000, 'residential');
    console.log(sd);
    expect(sd).to.be.equal(2000);
  });
});