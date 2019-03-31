import allInputCosts from './allInputCosts';
import calculationsLabels from '../../labels/calculations-labels';

const flip = ({
  sellingLegalFee,
  agentSellingFee,
  initSurveyorsFee,
  initLegalFee,
  initMortgageFee,
  refurbCost,
  otherCost,
  propertyValue,
  stampDutyType,
  stampDutyRegion,
  stampDutyBuyer,
  doneUpValue,
}) => {
  const totCost = allInputCosts(initSurveyorsFee, initLegalFee, initMortgageFee,
    refurbCost, otherCost, propertyValue, stampDutyType, stampDutyRegion, stampDutyBuyer);

  const fees = sellingLegalFee + agentSellingFee;
  const flipGain = Math.round((doneUpValue - totCost) / totCost * 10000) / 100;
  const col = (flipGain >= 20) ? 'green' : 'red';
  const labels = calculationsLabels.flipLabels;

  return [
    { label: labels[0], value: doneUpValue.toFixed(2) },
    { label: labels[1], value: fees.toFixed(2) },
    { label: labels[2], value: totCost.toFixed(2) || '0' },
    { label: labels[3], value: ((doneUpValue - (totCost + fees)).toFixed(2) || '0'), col },
    { label: labels[4], value: flipGain.toFixed(2) || 0, col },
  ];
};

export default flip;
