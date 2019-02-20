import calculateStampDuty from '../../../logic/stampduty/stampduty-calculator';
const {expect} = require('chai');

describe('calculations.calculateStampDuty(val, "residential")', function () {
  it('should return correct values for residential', function () {

    let sd = calculateStampDuty(100000, 'residential');
    expect(sd).to.be.equal(3000);

    sd = calculateStampDuty(200000, 'residential');
    expect(sd).to.be.equal(7500);

    sd = calculateStampDuty(300000, 'residential');
    expect(sd).to.be.equal(14000);

    sd = calculateStampDuty(400000, 'residential');
    expect(sd).to.be.equal(22000);

    sd = calculateStampDuty(500000, 'residential');
    expect(sd).to.be.equal(30000);

    sd = calculateStampDuty(600000, 'residential');
    expect(sd).to.be.equal(38000);

    sd = calculateStampDuty(700000, 'residential');
    expect(sd).to.be.equal(46000);

    sd = calculateStampDuty(800000, 'residential');
    expect(sd).to.be.equal(54000);

    sd = calculateStampDuty(900000, 'residential');
    expect(sd).to.be.equal(62000);

    sd = calculateStampDuty(1000000, 'residential');
    expect(sd).to.be.equal(73750);

    sd = calculateStampDuty(2000000, 'residential');
    expect(sd).to.be.equal(213750);
  });
});

describe('calculations.calculateStampDuty()', function () {
  it('should return correct values for commercial', function () {

    let sd = calculateStampDuty(100000, 'commercial');
    expect(sd).to.be.equal(0);

    sd = calculateStampDuty(200000, 'commercial');
    expect(sd).to.be.equal(1000);

    sd = calculateStampDuty(300000, 'commercial');
    expect(sd).to.be.equal(4500);

    sd = calculateStampDuty(400000, 'commercial');
    expect(sd).to.be.equal(9500);

    sd = calculateStampDuty(500000, 'commercial');
    expect(sd).to.be.equal(14500);

    sd = calculateStampDuty(600000, 'commercial');
    expect(sd).to.be.equal(19500);

    sd = calculateStampDuty(700000, 'commercial');
    expect(sd).to.be.equal(24500);

    sd = calculateStampDuty(800000, 'commercial');
    expect(sd).to.be.equal(29500);

    sd = calculateStampDuty(900000, 'commercial');
    expect(sd).to.be.equal(34500);

    sd = calculateStampDuty(1000000, 'commercial');
    expect(sd).to.be.equal(39500);

    sd = calculateStampDuty(2000000, 'commercial');
    expect(sd).to.be.equal(89500);
  });
});