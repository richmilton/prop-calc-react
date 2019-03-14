const currencyPlaceholder = '##CURR##';
const percentSign = String.fromCharCode(37);
const types = {
  NUMBER: 'number',
  TEXT: 'text',
  CHECKBOX: 'checkbox',
  SELECT: 'select',
};

const fields = [
  {
    label: 'Project name',
    name: 'projectName',
    type: types.TEXT,
  },
  {
    label: 'Post code',
    name: 'postCode',
    type: types.TEXT,
  },
  {
    label: `Asking price(${currencyPlaceholder})`,
    name: 'askingPrice',
    type: types.NUMBER,
    defVal: 0,
  },
  {
    label: `Purchase price(${currencyPlaceholder})`,
    name: 'propertyValue',
    type: types.NUMBER,
    defVal: 0,
  },
  {
    label: `Done up value(${currencyPlaceholder})`,
    name: 'doneUpValue',
    type: types.NUMBER,
    defVal: 0,
  },
  {
    label: `Monthly rent(${currencyPlaceholder})`,
    name: 'monthlyRent',
    type: types.NUMBER,
    defVal: 0,
  },
  {
    label: `Initial LTV(${percentSign})`,
    name: 'initialLoanToValue',
    type: types.NUMBER,
    defVal: 75,
  },
  {
    label: 'Cash purchase',
    name: 'buyingCash',
    type: types.CHECKBOX,
    defVal: 'no',
  },
  {
    label: `Surveyors fee(${currencyPlaceholder})`,
    name: 'initSurveyorsFee',
    type: types.NUMBER,
    defVal: 600,
  },
  {
    label: `Mortgage fee(${currencyPlaceholder})`,
    name: 'initMortgageFee',
    type: types.NUMBER,
    defVal: 0,
  },
  {
    label: `Legal fees(${currencyPlaceholder})`,
    name: 'initLegalFee',
    type: types.NUMBER,
    defVal: 1500,
  },
  {
    label: 'Stamp duty',
    name: 'stampDutyType',
    type: types.SELECT,
    options: [
      { value: 'residential', name: 'Residential Eng/NI' },
      { value: 'commercial', name: 'Commercial Eng/NI' },
      { value: 'residentialWales', name: 'Residential Wales' },
      { value: 'commercialWales', name: 'Commercial Wales' },
      { value: 'residentialScotland', name: 'Residential Scotland' },
      { value: 'commercialScotland', name: 'Commercial Scotland' },
      { value: 'ireland', name: 'Ireland' },
    ],
    defVal: 'residential',
  },
  {
    label: `Refurbishment cost(${currencyPlaceholder})`,
    name: 'refurbCost',
    type: types.NUMBER,
    defVal: 0,
  },
  {
    label: `Other cost(${currencyPlaceholder})`,
    name: 'otherCost',
    type: types.NUMBER,
    defVal: 0,
  },
  {
    label: `Remortgage fee(${currencyPlaceholder})`,
    name: 'remortgageFee',
    type: types.NUMBER,
    defVal: 0,
  },
  {
    label: `Remortgage valuation fee(${currencyPlaceholder})`,
    name: 'remortgageValuationFee',
    type: types.NUMBER,
    defVal: 0,
  },
  {
    label: `Remortgage legal fees(${currencyPlaceholder})`,
    name: 'remortgageLegalFee',
    type: types.NUMBER,
    defVal: 0,
  },
  {
    label: `Letting agents rate(${percentSign})`,
    name: 'agentsPercent',
    type: types.NUMBER,
    defVal: 10,
  },
  {
    label: `
    MOE rate(${percentSign})`,
    name: 'moePercent',
    type: types.NUMBER,
    defVal: 15,
  },
  {
    label: 'Repairing lease',
    name: 'repairingLease',
    type: types.CHECKBOX,
    defVal: 'no',
  },
  {
    label: `Interest rate(${percentSign})`,
    name: 'mortgageInterestRatePercent',
    type: types.NUMBER,
    defVal: 6.0,
  },
  {
    label: `Remortgage LTV(${percentSign})`,
    name: 'loanToValue',
    type: types.NUMBER,
    defVal: 75,
  },
  {
    label: `Solicitors selling fee(${currencyPlaceholder})`,
    name: 'sellingLegalFee',
    type: types.NUMBER,
    defVal: 0,
  },
  {
    label: `Agent/selling fee(${currencyPlaceholder})`,
    name: 'agentSellingFee',
    type: types.NUMBER,
    defVal: 0,
  },
  {
    label: `Mortgage stress test(${percentSign})`,
    name: 'mortgageStressMultipePercent',
    type: types.NUMBER,
    defVal: 125,
  },
  {
    label: `Stress interest rate(${percentSign})`,
    name: 'mortgageStressInterestRatePercent',
    type: types.NUMBER,
    defVal: 5.0,
  },
];

module.exports = {
  fields,
  currencyPlaceholder,
};
