import sdltBands from './stampduty-bands';

const calculateStampDuty = (val, type, region, buyer) => {
  const onePercentOfVal = (val / 100);
  let bands = sdltBands[type][region];
  if (buyer === 'first' && type === 'residential') {
    const { limit, thresholds } = sdltBands[type].first[region];
    if (limit === -1 || val <= limit) {
      bands = thresholds;
    }
  }

  let tax = 0;
  let bandLimit;
  let previousBandLimit;
  let load;

  if (!type || !region) return 0;

  for (let idx = 0; idx < bands.length; idx += 1) {
    load = buyer === 'investor' ? (bands[idx].load || 0) : 0;

    bandLimit = bands[idx].upto;
    const { rate } = bands[idx];
    previousBandLimit = idx > 0 ? bands[idx - 1].upto : 0;

    if (bandLimit === 'end') { // end and return
      tax += ((onePercentOfVal - (previousBandLimit / 100)) * (rate + load));
      return tax;
    }
    if (val <= bandLimit) { // return before end
      if (idx === 0) { // below first limit
        tax += (onePercentOfVal * (rate + load));
      } else { // below this limit
        tax += ((onePercentOfVal - (previousBandLimit / 100)) * (rate + load));
      }
      return tax;
    }
    // add the tax rate for the whole band and carry on
    tax += ((bandLimit - previousBandLimit) / 100 * (rate + load));
  }
  // shouldn't get here but code won't know should throw error
  // console.error(`check stampduty-test-bands for property without upto: 'end' in last entry`);
  return tax;
};

export default calculateStampDuty;
