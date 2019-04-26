import stampDutyCalculator from 'uk-ireland-stampduty-calculator';

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
  const { tax: stampDuty } = stampDutyCalculator.calculate(
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
