import calculateStampDuty from './stampduty/stampduty-calculator';
import calculationsLabels from '../../labels/calculations-labels';

const percentSign = String.fromCharCode(37);
const freeCash = ({
  loanToValue,
  propertyValue,
  doneUpValue,
  mortgageInterestRatePercent,
  monthlyRent,
  moePercent,
  agentsPercent,
  refurbCost,
  otherCost,
  stampDutyType,
  stampDutyRegion,
  stampDutyBuyer,
  remortgageFee,
  remortgageValuationFee,
  remortgageLegalFee,
  initMortgageFee,
  initLegalFee,
  initSurveyorsFee,
  repairingLease,
}) => {
  const isRepairing = repairingLease === 'yes';
  const loanToVal = loanToValue / 100;
  const remortgageAdvance = Math.round(doneUpValue * loanToVal);
  const remortgageDeposit = Math.round(doneUpValue * (1 - loanToVal));
  const remortgageMonthlyInterest = Math
    .round(remortgageAdvance * mortgageInterestRatePercent / 1200);
  const moe = isRepairing ? 0 : (monthlyRent * moePercent / 100);
  const lettingAgentsFees = isRepairing ? 0 : (monthlyRent * agentsPercent / 100);
  const freeCashFlowMonthly = monthlyRent - (repairingLease === 'yes' ? 0 : moe) - remortgageMonthlyInterest - lettingAgentsFees;
  const totalOtherCosts = refurbCost + otherCost;
  const { tax: sdltTotal } = calculateStampDuty(
    propertyValue, stampDutyType, stampDutyRegion, stampDutyBuyer,
  );
  const remortgageFees = remortgageFee + remortgageValuationFee + remortgageLegalFee;
  const initialFees = initMortgageFee + initLegalFee + initSurveyorsFee;
  const initialCost = initialFees + totalOtherCosts + sdltTotal + propertyValue;
  const grossYield = (monthlyRent * 1200) / initialCost;
  const labels = calculationsLabels.freeCashLabels;

  return [
    { label: labels[0], value: remortgageAdvance.toFixed(2) },
    { label: labels[1], value: remortgageDeposit.toFixed(2) },
    { label: labels[2], value: remortgageFees.toFixed(2) },
    { label: labels[3], value: initialCost.toFixed(2) },
    { label: labels[4], value: (remortgageAdvance - remortgageFees).toFixed(2) },
    { label: labels[5], value: (initialCost - (remortgageAdvance - remortgageFees)).toFixed(2) },
    { label: labels[6], value: monthlyRent.toFixed(2) },
    { label: labels[7], value: remortgageMonthlyInterest.toFixed(2) },
    { label: labels[8], value: moe.toFixed(2) },
    { label: labels[9], value: lettingAgentsFees.toFixed(2) },
    { label: labels[10], value: freeCashFlowMonthly.toFixed(2) },
    { label: labels[11], value: grossYield.toFixed(2) + percentSign },
  ];
};

export default freeCash;
