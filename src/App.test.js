//import React from 'react';
//import App from './App';
import calculations from "./logic/calculations";
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

  //test freecash
  let fc = calculations.freeCash(state);
  //console.log(fc);
  expect(fc[0].value).to.be.equal(300000);
  expect(fc[1].value).to.be.equal(100000);
  expect(fc[2].value).to.be.equal(650);
  expect(fc[3].value).to.be.equal(369700);
  expect(fc[4].value).to.be.equal(299350);
  expect(fc[5].value).to.be.equal(70350);
  expect(fc[7].value).to.be.equal(2400);
  expect(fc[8].value).to.be.equal(750);
  expect(fc[9].value).to.be.equal(360);
  expect(fc[10].value).to.be.equal(240);
  expect(fc[11].value).to.be.equal(1050);
  expect(fc[11].colour).to.be.equal('green');

  let sd = calculations.stampDuty(200000, state);
  console.log(sd);
  expect(sd).to.be.equal(7500);
  sd = calculations.stampDuty(2000000, state);
  expect(sd).to.be.equal(213750);

  let initF = calculations.initialFinance(state);
  console.log(initF);

});
