import calculations from '../../logic/calculations';
const {expect} = require('chai');

const state = {
  cash: "no", duv: 0, eFee: 0, frl: "no", int: 6, lFee: 1500, let: 10, lsFee: 0, ltv: 75, mFee: 100, moe: 15, msi: 5, mst: 125, other: 0, refurb: 0,
  rent: 0, rmFee: 0, rmsFee: 0, rmvFee: 0, sFee: 0, stamp: "residential", val: 0
};

it('renders without crashing', () => {
  //const div = document.createElement('div');
  console.log(calculations.freeCash(state));
  console.log(calculations.stampDuty(200000, state));
});

describe('calculations.stampDuty()', function () {
  it('should return a value', function () {

    const sd = calculations.stampDuty(200000, state);
    console.log(sd);
    expect(sd).to.be.equal(2000);
  });
});