const fields = [
  {
    label: 'Project name',
    name: 'projectName',
    type: 'text',
  },
  {
    label: 'Purchase price(£)',
    name: 'propertyValue',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Done up value(£)',
    name: 'doneUpValue',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Monthly rent(£)',
    name: 'monthlyRent',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Cash purchase',
    name: 'buyingCash',
    type: 'checkbox',
    defVal: 'no'
  },
  {
    label: 'Surveyors fee(£)',
    name: 'initSurveyorsFee',
    type: 'number',
    defVal: 600
  },
  {
    label: 'Mortgage fee(£)',
    name: 'initMortgageFee',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Solicitors fee(£)',
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
      {value: 'commercial', name: 'Commercial'}
      ],
    defVal: 'residential'
  },
  {
    label: 'Refurbishment cost(£)',
    name: 'refurbCost',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Other cost(£)',
    name: 'otherCost',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Initial LTV(%)',
    name: 'initialLoanToValue',
    type: 'number',
    defVal: 75
  },
  {
    label: 'Remortgage fee(£)',
    name: 'remortgageFee',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Remortgage valuation fee(£)',
    name: 'remortgageValuationFee',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Remortgage solicitors fee(£)',
    name: 'remortgageLegalFee',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Letting agents rate(%)',
    name: 'agentsPercent',
    type: 'number',
    defVal: 10
  },
  {
    label: 'MOE rate(%)',
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
    label: 'Interest rate(%)',
    name: 'mortgageInterestRatePercent',
    type: 'number',
    defVal: 6.0
  },
  {
    label: 'Remortgage LTV(%)',
    name: 'loanToValue',
    type: 'number',
    defVal: 75
  },

  {
    label: 'Solicitors selling fee(£)',
    name: 'sellingLegalFee',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Agent/selling fee(£)',
    name: 'agentSellingFee',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Mortgage stress test(%)',
    name: 'mortgageStressMultipePercent',
    type: 'number',
    defVal: 125
  },
  {
    label: 'Stress interest rate(%)',
    name: 'mortgageStressInterestRatePercent',
    type: 'number',
    defVal: 5.0
  }

];

module.exports = fields;