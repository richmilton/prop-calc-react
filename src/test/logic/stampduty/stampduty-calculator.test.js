import calculateStampDuty from '../../../logic/stampduty/stampduty-calculator';
import calculations from "../../../logic/calculations";
const {expect} = require('chai');

describe('calculations.calculateStampDuty()', function () {
  it('should return a value', function () {

    let sd = calculateStampDuty(200000, 'commercial');
    console.log(sd);
    expect(sd).to.be.equal(1000);
    sd = calculateStampDuty(2000000, 'commercial');
    expect(sd).to.be.equal(89500);

    sd = calculateStampDuty(200000, 'residential');
    console.log(sd);
    expect(sd).to.be.equal(7500);
    sd = calculateStampDuty(2000000, 'residential');
    expect(sd).to.be.equal(213750);
  });
});