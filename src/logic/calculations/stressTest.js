import calculationsLabels from '../../labels/calculations-labels';

const stressTest = ({
  doneUpValue,
  monthlyRent,
  loanToValue,
  mortgageStressInterestRatePercent,
  mortgageStressMultipePercent,
}) => {
  const minRent = Math.ceil(
    doneUpValue
    * loanToValue / 100
    * mortgageStressInterestRatePercent / 1200
    * mortgageStressMultipePercent / 100,
  );
  const pass = monthlyRent >= minRent;
  const labels = calculationsLabels.stressLabels;

  return [
    { label: labels[0], value: pass ? 'pass' : 'fail' },
    { label: labels[1], value: minRent.toFixed(2) },
  ];
};

export default stressTest;
