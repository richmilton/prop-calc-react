import calculateStampDuty from '../stampduty/stampduty-calculator';

const allInputCosts = (
  initSurveyorsFee,
  initLegalFee,
  initMortgageFee,
  refurbCost,
  otherCost,
  propertyValue,
  stampDutyType,
) => {
  const stampDuty = calculateStampDuty(propertyValue, stampDutyType);

  return (
    initSurveyorsFee
    + initLegalFee
    + initMortgageFee
    + refurbCost
    + otherCost
    + stampDuty
    + propertyValue
  );
};

export default allInputCosts;