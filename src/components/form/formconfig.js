import { formTypes, currencyPlaceholder, percentSign } from '../common/appConstants';

const fields = [
  {
    label: 'Project name',
    name: 'projectName',
    type: formTypes.TEXT,
    defVal: '',
    required: true,
    tooltip: 'used as reference when saving',
  },
  {
    label: 'Post code',
    name: 'postCode',
    type: formTypes.TEXT,
    defVal: '',
    required: true,
    tooltip: 'a valid UK postcode will show links panel in results section',
  },
  {
    label: `Asking price(${currencyPlaceholder})`,
    name: 'askingPrice',
    type: formTypes.NUMBER,
    defVal: 0,
    tooltip: 'for reference only: not used in calculations',
  },
  {
    label: `Purchase price(${currencyPlaceholder})`,
    name: 'propertyValue',
    type: formTypes.NUMBER,
    defVal: 0,
    tooltip: 'price you intend paying for property: will be used in deal finance and stamp duty calculation',
  },
  {
    label: `Done up value/GDV(${currencyPlaceholder})`,
    name: 'doneUpValue',
    type: formTypes.NUMBER,
    defVal: 0,
    tooltip: 'market value after completing works: used to calculate buy to let section',
  },
  {
    label: `Initial LTV(${percentSign})`,
    name: 'initialLoanToValue',
    type: formTypes.NUMBER,
    defVal: 75,
    disabled: [{ whenField: 'buyingCash', regex: /yes/ }],
    tooltip: 'used to calculate deal finance mortgage advance and deposit',
  },
  {
    label: `Mortgage fee(${currencyPlaceholder})`,
    name: 'initMortgageFee',
    type: formTypes.NUMBER,
    defVal: 0,
    disabled: [{ whenField: 'buyingCash', regex: /yes/ }],
    tooltip: 'included in deal finance professional fees',
  },
  {
    label: `Surveyors fee(${currencyPlaceholder})`,
    name: 'initSurveyorsFee',
    type: formTypes.NUMBER,
    defVal: 600,
    tooltip: 'included in deal finance professional fees',
  },
  {
    label: 'Cash purchase',
    name: 'buyingCash',
    type: formTypes.CHECKBOX,
    defVal: 'no',
  },
  {
    label: 'Mortgage term',
    name: 'mortgageTerm',
    type: formTypes.NUMBER,
    defVal: 25,
    disabled: [{ whenField: 'buyingCash', regex: /yes/ }],
    tooltip: 'used in deal finance repayment mortgage calculation',
  },
  {
    label: `Legal fees(${currencyPlaceholder})`,
    name: 'initLegalFee',
    type: formTypes.NUMBER,
    defVal: 1500,
    tooltip: 'included in deal finance professional fees',
  },
  {
    label: 'Stamp duty type',
    name: 'stampDutyType',
    type: formTypes.SELECT,
    options: [
      { value: 'residential', name: 'Residential' },
      { value: 'commercial', name: 'Commercial' },
    ],
    defVal: 'residential',
    tooltip: 'what kind of property are you buying',
  },
  {
    label: 'Stamp duty region',
    name: 'stampDutyRegion',
    type: formTypes.SELECT,
    options: [
      { value: 'england', name: 'England/NI' },
      { value: 'scotland', name: 'Scotland' },
      { value: 'wales', name: 'Wales' },
      { value: 'ireland', name: 'Ireland' },
    ],
    defVal: 'england',
    tooltip: 'where is it',
  },
  {
    label: 'Stamp duty buyer',
    name: 'stampDutyBuyer',
    type: formTypes.SELECT,
    options: [
      { value: 'investor', name: 'Investor' },
      { value: 'first', name: 'First time buyer' },
      { value: 'home', name: 'Moving house' },
    ],
    defVal: 'investor',
    disabled: [{ whenField: 'stampDutyType', regex: /commercial/ }],
    tooltip: 'what kind of buyer are you',
  },
  {
    label: `Monthly rent(${currencyPlaceholder})`,
    name: 'monthlyRent',
    type: formTypes.NUMBER,
    defVal: 0,
    disabled: [{ whenField: 'dealType', regex: /^((?!btl).)*$/ }],
    tooltip: 'used for but to let calculation',
  },
  {
    label: 'Deal type',
    name: 'dealType',
    type: formTypes.SELECT,
    options: [
      { value: 'btl&flip', name: 'Buy to let and flip' },
      { value: 'btl', name: 'Buy to let' },
      { value: 'flip', name: 'Flip' },
      { value: 'home', name: 'Home only' },
    ],
    defVal: 'btl&flip',
    tooltip: 'what kind of purchase are you interested in',
  },
  {
    label: `Refurbishment cost(${currencyPlaceholder})`,
    name: 'refurbCost',
    type: formTypes.NUMBER,
    defVal: 0,
    tooltip: 'used in deal finance and buy to let money in and yield calculations',
  },
  {
    label: `Other cost(${currencyPlaceholder})`,
    name: 'otherCost',
    type: formTypes.NUMBER,
    defVal: 0,
    tooltip: 'used in deal finance and buy to let money in and yield calculations',
  },
  {
    label: `Remortgage fee(${currencyPlaceholder})`,
    name: 'remortgageFee',
    type: formTypes.NUMBER,
    defVal: 0,
    disabled: [{ whenField: 'dealType', regex: /^((?!btl).)*$/ }],
    tooltip: 'included in buy to let remortgage fees',
  },
  {
    label: `Remortgage valuation fee(${currencyPlaceholder})`,
    name: 'remortgageValuationFee',
    type: formTypes.NUMBER,
    defVal: 0,
    disabled: [{ whenField: 'dealType', regex: /^((?!btl).)*$/ }],
    tooltip: 'included in buy to let remortgage fees',
  },
  {
    label: `Remortgage legal fees(${currencyPlaceholder})`,
    name: 'remortgageLegalFee',
    type: formTypes.NUMBER,
    defVal: 0,
    disabled: [{ whenField: 'dealType', regex: /^((?!btl).)*$/ }],
    tooltip: 'included in buy to let remortgage fees',
  },
  {
    label: `Letting agents rate(${percentSign})`,
    name: 'agentsPercent',
    type: formTypes.NUMBER,
    defVal: 10,
    disabled: [
      { whenField: 'dealType', regex: /^((?!btl).)*$/ },
      { whenField: 'repairingLease', regex: /yes/ },
    ],
    tooltip: 'used in free cash flow calculation',
  },
  {
    label: `
    MOE rate(${percentSign})`,
    name: 'moePercent',
    type: formTypes.NUMBER,
    defVal: 15,
    disabled: [
      { whenField: 'dealType', regex: /^((?!btl).)*$/ },
      { whenField: 'repairingLease', regex: /yes/ },
    ],
    tooltip: 'used in free cash flow calculation',
  },
  {
    label: 'Repairing lease',
    name: 'repairingLease',
    type: formTypes.CHECKBOX,
    defVal: 'no',
    disabled: [{ whenField: 'dealType', regex: /^((?!btl).)*$/ }],
  },
  {
    label: `Interest rate(${percentSign})`,
    name: 'mortgageInterestRatePercent',
    type: formTypes.NUMBER,
    defVal: 6.0,
    tooltip: 'used in both deal finance and buy to let remortgage calculations',
  },
  {
    label: `Remortgage LTV(${percentSign})`,
    name: 'loanToValue',
    type: formTypes.NUMBER,
    defVal: 75,
    disabled: [{ whenField: 'dealType', regex: /^((?!btl).)*$/ }],
    tooltip: 'used in buy to let remortgage calculations',
  },
  {
    label: `Solicitors selling fee(${currencyPlaceholder})`,
    name: 'sellingLegalFee',
    type: formTypes.NUMBER,
    defVal: 0,
    disabled: [{ whenField: 'dealType', regex: /^((?!flip).)*$/ }],
    tooltip: 'included in flip selling costs',
  },
  {
    label: `Agent/selling fee(${currencyPlaceholder})`,
    name: 'agentSellingFee',
    type: formTypes.NUMBER,
    defVal: 0,
    disabled: [{ whenField: 'dealType', regex: /^((?!flip).)*$/ }],
    tooltip: 'included in flip selling costs',
  },
  {
    label: `Mortgage stress test(${percentSign})`,
    name: 'mortgageStressMultipePercent',
    type: formTypes.NUMBER,
    defVal: 125,
    disabled: [{ whenField: 'dealType', regex: /^((?!btl).)*$/ }],
    tooltip: 'used only for stress test calculations',
  },
  {
    label: `Stress interest rate(${percentSign})`,
    name: 'mortgageStressInterestRatePercent',
    type: formTypes.NUMBER,
    defVal: 5.0,
    disabled: [{ whenField: 'dealType', regex: /^((?!btl).)*$/ }],
    tooltip: 'used only for stress test calcualtions',
  },
];

export default fields;
