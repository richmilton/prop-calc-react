const fields = [
  {
    label: 'Property name',
    name: 'propertyName',
    type: 'text',
  },
  {
    label: 'Price(£)',
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
    label: 'Cash purchase(£)',
    name: 'buyingCash',
    type: 'checkbox',
    defVal: 'no'
  },
  {
    label: 'Surveyors fee(£)',
    name: 'initSurveyorsFee',
    type: 'number',
    defVal: 0
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
    defVal: 0
  },
  {
    label: 'Stamp duty',
    name: 'stampDutyType',
    type: 'select',
    options: [{value: 'residential', name: 'Residential'},{value: 'commercial', name: 'Commercial'}],
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
    label: 'Re-mortgage fee(£)',
    name: 'remortgageFee',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Re-mortgage valuation fee(£)',
    name: 'remortgageValuationFee',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Re-mortgage solicitors fee(£)',
    name: 'remortgageLegalFee',
    type: 'number',
    defVal: 0
  },
  {
    label: 'Letting agents rate(%)',
    name: 'agentsPercent',
    type: 'number',
    options: [[0,0],[6,6],[7,7],[8,8],[9,9],[10,10],[11,11]],
    defVal: 10
  },
  {
    label: 'MOE rate(%)',
    name: 'moePercent',
    type: 'number',
    options: [[0,0],[10,10],[12,12],[14,14],[15,15],[16,16],[18,18]],
    defVal: 15
  },
  {
    label: 'Full repairing lease',
    name: 'repairingLease',
    type: 'checkbox',
    defVal: 'no'
  },
  {
    label: 'Interest rate(%)',
    name: 'mortgageInterestRatePercent',
    type: 'number',
    options: [[1,'1.0'],[1.5,'1.5'],[2,'2.0'],[2.5,'2.5'],[3,'3.0'],[3.5,'3.5'],[4,'4.0'],[4.5,'4.5'],[5,'5.0'],[5.5,'5.5'],[6,'6.0'],[6.5,'6.5'],[7,'7.0'],[7.5,'7.5'],[8,'8.0'],[8.5,'8.5'],[9,'9.0'],[9.5,'9.5'],[10,'10.0']],
    defVal: 6.0
  },
  {
    label: 'Loan to Value(%)',
    name: 'loanToValue',
    type: 'number',
    options: [[50,50],[55,55],[60,60],[65,65],[70,70],[75,75],[80,80]],
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
    options: [[125,125],[130,130],[135,135],[140,140],[145,145],[150,150],[155,155],[160,160]],
    defVal: 125
  },
  {
    label: 'Stress interest rate(%)',
    name: 'mortgageStressInterestRatePercent',
    type: 'number',
    defVal: 5.0
  },
  {
    name: 'submit',
    type: 'submit',
    label: 'log in',
    className: 'btn-primary form-control'
  }

];

module.exports = fields;