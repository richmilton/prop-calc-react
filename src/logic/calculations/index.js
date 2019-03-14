import allInputCosts from './allInputCosts';
import freeCash from './freeCash';
import initialFinance from './initialFinance';
import flip from './flip';
import stressTest from './stressTest';

const getCurrencyCode = ({ stampDutyType }) => (stampDutyType === 'ireland' ? 8364 : 163);

const calculations = {
  freeCash,
  initialFinance,
  flip,
  allInputCosts,
  stressTest,
  getCurrencyCode,
};

export default calculations;
