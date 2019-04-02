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
    defVal: '',
    required: true,
  },
  {
    label: 'Post code',
    name: 'postCode',
    type: types.TEXT,
    defVal: '',
    required: true,
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
    label: 'Cash purchase',
    name: 'buyingCash',
    type: types.CHECKBOX,
    defVal: 'no',
  },
  {
    label: `Initial LTV(${percentSign})`,
    name: 'initialLoanToValue',
    type: types.NUMBER,
    defVal: 75,
    disabled: { whenField: 'buyingCash', isEqual: 'yes', defVal: '0' },
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
    disabled: { whenField: 'buyingCash', isEqual: 'yes', defVal: '0' },
  },
  {
    label: `Legal fees(${currencyPlaceholder})`,
    name: 'initLegalFee',
    type: types.NUMBER,
    defVal: 1500,
  },
  {
    label: 'Stamp duty type',
    name: 'stampDutyType',
    type: types.SELECT,
    options: [
      { value: 'residential', name: 'Residential' },
      { value: 'commercial', name: 'Commercial' },
    ],
    defVal: 'residential',
  },
  {
    label: 'Stamp duty region',
    name: 'stampDutyRegion',
    type: types.SELECT,
    options: [
      { value: 'england', name: 'England/NI' },
      { value: 'scotland', name: 'Scotland' },
      { value: 'wales', name: 'Wales' },
      { value: 'ireland', name: 'Ireland' },
    ],
    defVal: 'england',
  },
  {
    label: 'Stamp duty buyer',
    name: 'stampDutyBuyer',
    type: types.SELECT,
    options: [
      { value: 'investor', name: 'Investor' },
      { value: 'first', name: 'First time buyer' },
      { value: 'home', name: 'Moving house' },
    ],
    defVal: 'investor',
    disabled: { whenField: 'stampDutyType', isEqual: 'commercial' },
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
    disabled: { whenField: 'repairingLease', isEqual: 'yes', defVal: '0' },
  },
  {
    label: `
    MOE rate(${percentSign})`,
    name: 'moePercent',
    type: types.NUMBER,
    defVal: 15,
    disabled: { whenField: 'repairingLease', isEqual: 'yes', defVal: '0' },
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
  types,
};
