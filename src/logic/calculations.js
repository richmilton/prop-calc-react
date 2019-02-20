import calculateStampDuty from './stampduty/stampduty-calculator';

// eslint-disable-next-line
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

const freeCash = ({loanToValue, buyingCash, propertyValue, doneUpValue,
                    mortgageInterestRatePercent, monthlyRent, moePercent,
                    agentsPercent, refurbCost, otherCost, stampDutyType,
                    remortgageFee, remortgageValuationFee, remortgageLegalFee,
                    initMortgageFee, initLegalFee, initSurveyorsFee, repairingLease}) => {

  const loanToVal = loanToValue / 100;
  //const isCash = buyingCash === 'yes';
  //const initialMortgageAdvance = isCash ? 0 : Math.round(propertyValue * loanToVal);
  const remortgageAdvance = Math.round(doneUpValue * loanToVal);
  const remortgageDeposit = Math.round(doneUpValue * (1 - loanToVal));
  const remortgageMonthlyInterest = Math.round(remortgageAdvance * mortgageInterestRatePercent / 1200);
  const moe = monthlyRent * moePercent / 100;
  const lettingAgentsFees = monthlyRent * agentsPercent / 100;
  const freeCashFlowMonthly = monthlyRent - moe - remortgageMonthlyInterest - lettingAgentsFees;
  const totalOtherCosts = refurbCost + otherCost;
  const sdltTotal = calculateStampDuty(propertyValue, stampDutyType);
  const remortgageFees = remortgageFee + remortgageValuationFee + remortgageLegalFee;
  const initialFees = initMortgageFee + initLegalFee + initSurveyorsFee;
  const initialCost = initialFees + totalOtherCosts + sdltTotal + propertyValue;
  const totFrlCost = repairingLease === 'yes' ? initialCost - totalOtherCosts : initialCost;
  const col = (freeCashFlowMonthly >= 100) ? 'green' : 'red';

  return [
    {label: 'Re-mortgage advance', value: remortgageAdvance},
    {label: 'Re-mortgage deposit', value: remortgageDeposit},
    {label: 'Re-mortgage fees', value: remortgageFees},
    {label: 'Money in', value: totFrlCost},
    {label: 'Money out', value: remortgageAdvance - remortgageFees},
    {label: 'Money left in', value: totFrlCost - (remortgageAdvance - remortgageFees)},
    {label: 'hr'},
    {label: 'Monthly rental', value: monthlyRent},
    {label: 'Mortgage monthly payment', value: remortgageMonthlyInterest},
    {label: 'MOE', value: moe},
    {label: 'Letting agent fees', value: lettingAgentsFees},
    {label: 'Monthly free cashflow', value: freeCashFlowMonthly, colour: col}
    ];
};

const initialFinance = ({buyingCash, loanToValue, propertyValue, initSurveyorsFee, initLegalFee, initMortgageFee,
                          refurbCost, otherCost, stampDutyType}) => {

  const isCash = buyingCash === 'yes';
  const loanToVal = loanToValue / 100;
  const initMortgageAdvance = isCash ? 0 : Math.round(propertyValue * loanToVal);
  const initFees = initSurveyorsFee + initLegalFee + initMortgageFee;
  const other = refurbCost + otherCost;
  const initialDeposit = isCash ? propertyValue : Math.round(propertyValue * (1 - loanToVal));
  const sdltTotal = calculateStampDuty(propertyValue, stampDutyType);
  const totCost = initFees + other + sdltTotal + initialDeposit + initMortgageAdvance;
  const totIn = totCost-initMortgageAdvance;

  return [
    {label: 'Mortgage advance', value:initMortgageAdvance},
    {label: 'hr'},
    {label: 'Deposit', value: initialDeposit},
    {label: 'Stamp duty', value: sdltTotal},
    {label: 'Professional fees', value: initFees},
    {label: 'Refurb/other costs', value: other},
    {label: 'Total money in', value: totIn},
    {label: 'hr'},
    {label: 'Total cost', value: totCost}];
};

/*function flip(data) {
  var col = 'red', sp = parseFloat(data.form.duv), f = parseFloat(data.form.lsFee) + parseFloat(data.form.eFee);
  data.flipGain = Math.round((sp-data.totCost)/data.totCost*10000)/100;
  data.flipgood = data.flipGain >= 20;
  if (data.flipGain >= 20) col = 'green';
  return [['Sale price',sp||0],['Selling costs',f||0],['Total input costs',data.totCost||0],['<b>Profit</b>','<b>' + (sp-(data.totCost+f))||0 + '</b>',col],['<b>Gain</b>','<b>' + (data.flipGain||0)+'&#37;</b>',col]];
}

function stressTest(value, rental, ltvPercent, rate, stress) {
  var M = value * ltvPercent, m = M * rate/1200, pass = rental >= minRent(value, rental, ltvPercent, rate, stress);
  return pass;
}

function minRent(value, rental, ltvPercent, rate, stress) {
  var M = value * ltvPercent, m = M * rate/1200;
  return Math.ceil(m * stress/100);
}
*/

const calculations = {
  freeCash: freeCash,
  initialFinance: initialFinance
};

export default calculations;