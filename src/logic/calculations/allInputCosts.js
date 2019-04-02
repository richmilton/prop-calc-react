import calculateStampDuty from './stampduty/stampduty-calculator';

const allInputCosts = (
  initSurveyorsFee,
  initLegalFee,
  initMortgageFee,
  refurbCost,
  otherCost,
  propertyValue,
  stampDutyType,
  stampDutyRegion,
  stampDutyBuyer,
) => {
  const stampDuty = calculateStampDuty(
    propertyValue, stampDutyType, stampDutyRegion, stampDutyBuyer,
  );

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
