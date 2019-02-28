import sdltBands from './stampduty-bands';

const calculateStampDuty = (val, sdltType) => {
  const onePercentOfVal = (val / 100);
  //const load = sdltType === 'residential' ? 3 : 0;
  const bands = sdltBands[sdltType];

  let tax = 0;
  let bandLimit;
  let rate;
  let previousBandLimit;
  let load;

  if (!sdltType) return 0;

  for (let idx = 0; idx < bands.length; idx++) {

    load = bands[idx].load || 0;

    bandLimit = bands[idx].upto;
    rate = bands[idx].rate;
    previousBandLimit = idx > 0 ? bands[idx - 1].upto : 0;

    if (bandLimit === 'end') { //end and return
      tax += ((onePercentOfVal - (previousBandLimit / 100)) * (rate + load));
      return tax;
    }
    if (val <= bandLimit) { //return before end
      if (idx === 0) {      //below first limit
        tax += (onePercentOfVal * (rate + load));
      }
      else {                //below this limit
        tax += ((onePercentOfVal - (previousBandLimit / 100)) * (rate + load));
      }
      return tax;
    }
    else {                  //add the tax rate for the whole band and carry on
      tax += ((bandLimit - previousBandLimit) / 100 * (rate + load));
    }
  }
  // shouldn't get here but code won't know should throw error
  console.error(`check stampduty-bands for property without upto: 'end' in last entry`);
  return tax;

};

export default calculateStampDuty;
