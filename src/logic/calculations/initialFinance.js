import calculateStampDuty from './stampduty/stampduty-calculator';
import allInputCosts from './allInputCosts';
import calculationsLabels from '../../labels/calculations-labels';

const repaymentCalc = (principal, interest, term) => (
  (interest / 100 / 12) * principal) / (1 - ((1 + (interest / 100 / 12)) ** (-term * 12))
);
const initialFinance = ({
  buyingCash,
  initialLoanToValue,
  mortgageInterestRatePercent,
  propertyValue,
  initSurveyorsFee,
  initLegalFee,
  initMortgageFee,
  refurbCost,
  otherCost,
  stampDutyType,
  stampDutyRegion,
  stampDutyBuyer,
}) => {
  const isCash = buyingCash === 'yes';
  const loanToVal = initialLoanToValue / 100;
  const initMortgageAdvance = isCash ? 0 : Math.round(propertyValue * loanToVal);
  const mortgageMonthlyInterest = Math
    .round(initMortgageAdvance * mortgageInterestRatePercent / 1200);
  const monthlyRepayment = repaymentCalc(initMortgageAdvance, mortgageInterestRatePercent, 25);
  const initFees = initSurveyorsFee + initLegalFee + initMortgageFee;
  const other = refurbCost + otherCost;
  const initialDeposit = isCash ? propertyValue : Math.round(propertyValue * (1 - loanToVal));
  const sdltTotal = calculateStampDuty(
    propertyValue, stampDutyType, stampDutyRegion, stampDutyBuyer,
  );
  const totCost = allInputCosts(initSurveyorsFee, initLegalFee, initMortgageFee,
    refurbCost, otherCost, propertyValue, stampDutyType, stampDutyRegion, stampDutyBuyer);
  const totIn = totCost - initMortgageAdvance;
  const labels = calculationsLabels.initialFinanceLabels;

  return [
    { label: labels[0], value: initMortgageAdvance.toFixed(2) },
    { label: labels[1], value: initialDeposit.toFixed(2) },
    { label: labels[2], value: sdltTotal.toFixed(2) },
    { label: labels[3], value: initFees.toFixed(2) },
    { label: labels[4], value: other.toFixed(2) },
    { label: labels[5], value: totIn.toFixed(2) },
    { label: labels[6], value: totCost.toFixed(2) },
    { label: labels[7], value: mortgageMonthlyInterest.toFixed(2) },
    { label: labels[8], value: monthlyRepayment.toFixed(2) },
  ];
};

export default initialFinance;
