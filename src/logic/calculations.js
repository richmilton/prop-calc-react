import calculateStampDuty from './stampduty/stampduty-calculator';
import calculationsLabels from "../labels/calculations-labels";

const freeCash = ( {loanToValue, buyingCash, propertyValue, doneUpValue,
                    mortgageInterestRatePercent, monthlyRent, moePercent,
                    agentsPercent, refurbCost, otherCost, stampDutyType,
                    remortgageFee, remortgageValuationFee, remortgageLegalFee,
                    initMortgageFee, initLegalFee, initSurveyorsFee, repairingLease} ) => {

  const loanToVal = loanToValue / 100;
  const remortgageAdvance = Math.round(doneUpValue * loanToVal);
  const remortgageDeposit = Math.round(doneUpValue * (1 - loanToVal));
  const remortgageMonthlyInterest = Math.round(remortgageAdvance * mortgageInterestRatePercent / 1200);
  const moe = repairingLease === 'yes' ? 0 : (monthlyRent * moePercent / 100);
  const lettingAgentsFees = monthlyRent * agentsPercent / 100;
  const freeCashFlowMonthly = monthlyRent - (repairingLease === 'yes' ? 0 : moe) - remortgageMonthlyInterest - lettingAgentsFees;
  const totalOtherCosts = refurbCost + otherCost;
  const sdltTotal = calculateStampDuty(propertyValue, stampDutyType);
  const remortgageFees = remortgageFee + remortgageValuationFee + remortgageLegalFee;
  const initialFees = initMortgageFee + initLegalFee + initSurveyorsFee;
  const initialCost = initialFees + totalOtherCosts + sdltTotal + propertyValue;
  const labels = calculationsLabels.freeCashLabels;

  return [
    {label: labels[0], value: remortgageAdvance.toFixed(2)},
    {label: labels[1], value: remortgageDeposit.toFixed(2)},
    {label: labels[2], value: remortgageFees.toFixed(2)},
    {label: labels[3], value: initialCost.toFixed(2)},
    {label: labels[4], value: (remortgageAdvance - remortgageFees).toFixed(2)},
    {label: labels[5], value: (initialCost - (remortgageAdvance - remortgageFees)).toFixed(2)},
    {label: labels[6], value: monthlyRent.toFixed(2)},
    {label: labels[7], value: remortgageMonthlyInterest.toFixed(2)},
    {label: labels[8], value: moe.toFixed(2)},
    {label: labels[9], value: lettingAgentsFees.toFixed(2)},
    {label: labels[10], value: freeCashFlowMonthly.toFixed(2)}
    ];
};

const initialFinance = ( {buyingCash, initialLoanToValue, propertyValue, initSurveyorsFee,
                           initLegalFee, initMortgageFee, refurbCost, otherCost, stampDutyType} ) => {

  const isCash = buyingCash === 'yes';
  const loanToVal = initialLoanToValue / 100;
  const initMortgageAdvance = isCash ? 0 : Math.round(propertyValue * loanToVal);
  const initFees = initSurveyorsFee + initLegalFee + initMortgageFee;
  const other = refurbCost + otherCost;
  const initialDeposit = isCash ? propertyValue : Math.round(propertyValue * (1 - loanToVal));
  const sdltTotal = calculateStampDuty(propertyValue, stampDutyType);
  const totCost = allInputCosts(initSurveyorsFee, initLegalFee, initMortgageFee,
    refurbCost, otherCost, propertyValue, stampDutyType);
  const totIn = totCost-initMortgageAdvance;
  const labels = calculationsLabels.initialFinanceLabels;


  return [
    {label: labels[0], value: initMortgageAdvance.toFixed(2)},
    {label: labels[1], value: initialDeposit.toFixed(2)},
    {label: labels[2], value: sdltTotal.toFixed(2)},
    {label: labels[3], value: initFees.toFixed(2)},
    {label: labels[4], value: other.toFixed(2)},
    {label: labels[5], value: totIn.toFixed(2)},
    {label: labels[6], value: totCost.toFixed(2)}
    ];
};

const flip = ( {sellingLegalFee, agentSellingFee, initSurveyorsFee, initLegalFee,
                 initMortgageFee, refurbCost, otherCost, propertyValue, stampDutyType, doneUpValue} ) => {

  const totCost = allInputCosts(initSurveyorsFee, initLegalFee, initMortgageFee,
    refurbCost, otherCost, propertyValue, stampDutyType);

  const fees = sellingLegalFee + agentSellingFee;
  const flipGain = Math.round((doneUpValue-totCost)/totCost*10000)/100;
  const col = (flipGain >= 20) ? 'green' : 'red';
  const labels = calculationsLabels.flipLabels;

  return [
    {label: labels[0], value: doneUpValue.toFixed(2)},
    {label: labels[1], value: fees.toFixed(2)},
    {label: labels[2], value: totCost.toFixed(2) || '0'},
    {label: labels[3], value:  ((doneUpValue - (totCost + fees)).toFixed(2) || '0'), col},
    {label: labels[4], value: flipGain.toFixed(2) || 0, col}
  ];
};

const stressTest = ( {doneUpValue, monthlyRent, loanToValue,
                       mortgageStressInterestRatePercent, mortgageStressMultipePercent} ) => {

  const minRent = Math.ceil(
    doneUpValue *
    loanToValue / 100 *
    mortgageStressInterestRatePercent / 1200 *
    mortgageStressMultipePercent / 100
  );
  const pass = monthlyRent >= minRent;
  const labels = calculationsLabels.stressLabels;

  return [
    {label: labels[0], value: pass ? 'pass' : 'fail'},
    {label: labels[1], value: minRent.toFixed(2)}
  ];
};

const allInputCosts = (initSurveyorsFee, initLegalFee, initMortgageFee,
                         refurbCost, otherCost, propertyValue, stampDutyType) => {

  const stampDuty = calculateStampDuty(propertyValue, stampDutyType);

  return (
    initSurveyorsFee +
    initLegalFee +
    initMortgageFee +
    refurbCost +
    otherCost +
    stampDuty
    + propertyValue
  );
};

const getCurrencyCode = ({stampDutyType}) => {
  return stampDutyType === 'ireland' ? 8364 : 163
};

const calculations = {
  freeCash,
  initialFinance,
  flip,
  allInputCosts,
  stressTest,
  getCurrencyCode
};

export default calculations;