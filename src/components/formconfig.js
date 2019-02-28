
const currencySign = '##CURR##';
const percentSign = String.fromCharCode(37);

const fields = [
  {
    label: 'Project name',
    name: 'projectName',
    type: 'text',
  },
  {
    label: `Purchase price(${currencySign})`,
    name: 'propertyValue',
    type: 'number',
    defVal: 0
  },
  {
    label: `Done up value(${currencySign})`,
    name: 'doneUpValue',
    type: 'number',
    defVal: 0
  },
  {
    label: `Monthly rent(${currencySign})`,
    name: 'monthlyRent',
    type: 'number',
    defVal: 0
  },
  {
    label: `Initial LTV(${percentSign})`,
    name: 'initialLoanToValue',
    type: 'number',
    defVal: 75
  },
  {
    label: 'Cash purchase',
    name: 'buyingCash',
    type: 'checkbox',
    defVal: 'no'
  },
  {
    label: `Surveyors fee(${currencySign})`,
    name: 'initSurveyorsFee',
    type: 'number',
    defVal: 600
  },
  {
    label: `Mortgage fee(${currencySign})`,
    name: 'initMortgageFee',
    type: 'number',
    defVal: 0
  },
  {
    label: `Legal fees(${currencySign})`,
    name: 'initLegalFee',
    type: 'number',
    defVal: 1500
  },
  {
    label: 'Stamp duty',
    name: 'stampDutyType',
    type: 'select',
    options: [
      {value: 'residential', name: 'Residential'},
      {value: 'commercial', name: 'Commercial'},
      {value: 'ireland', name: 'Ireland'}
      ],
    defVal: 'residential'
  },
  {
    label: `Refurbishment cost(${currencySign})`,
    name: 'refurbCost',
    type: 'number',
    defVal: 0
  },
  {
    label: `Other cost(${currencySign})`,
    name: 'otherCost',
    type: 'number',
    defVal: 0
  },
  {
    label: `Remortgage fee(${currencySign})`,
    name: 'remortgageFee',
    type: 'number',
    defVal: 0
  },
  {
    label: `Remortgage valuation fee(${currencySign})`,
    name: 'remortgageValuationFee',
    type: 'number',
    defVal: 0
  },
  {
    label: `Remortgage legal fees(${currencySign})`,
    name: 'remortgageLegalFee',
    type: 'number',
    defVal: 0
  },
  {
    label: `Letting agents rate(${percentSign})`,
    name: 'agentsPercent',
    type: 'number',
    defVal: 10
  },
  {
    label: `
    MOE rate(${percentSign})`,
    name: 'moePercent',
    type: 'number',
    defVal: 15
  },
  {
    label: 'Repairing lease',
    name: 'repairingLease',
    type: 'checkbox',
    defVal: 'no'
  },
  {
    label: `Interest rate(${percentSign})`,
    name: 'mortgageInterestRatePercent',
    type: 'number',
    defVal: 6.0
  },
  {
    label: `Remortgage LTV(${percentSign})`,
    name: 'loanToValue',
    type: 'number',
    defVal: 75
  },
  {
    label: `Solicitors selling fee(${currencySign})`,
    name: 'sellingLegalFee',
    type: 'number',
    defVal: 0
  },
  {
    label: `Agent/selling fee(${currencySign})`,
    name: 'agentSellingFee',
    type: 'number',
    defVal: 0
  },
  {
    label: `Mortgage stress test(${percentSign})`,
    name: 'mortgageStressMultipePercent',
    type: 'number',
    defVal: 125
  },
  {
    label: `Stress interest rate(${percentSign})`,
    name: 'mortgageStressInterestRatePercent',
    type: 'number',
    defVal: 5.0
  }

];

module.exports = fields;