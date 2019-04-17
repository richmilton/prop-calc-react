import React from 'react';
import ResultsList from './list/ResultsListComponent';
import Links from './links/ResultsLinksComponent';
import validatePostcode from '../../util/validate-postcode';

const PropTypes = require('prop-types');

function Results({ data, currentState, currentState: { postCode, dealType } }) {
  const {
    dealFinance,
    buyToLet,
    stress,
    flip,
  } = data;
  const showBTL = /btl/.test(dealType);
  const showFlip = /flip/.test(dealType);

  return (
    <React.Fragment>
      <div className="res-block" style={{ display: validatePostcode(postCode) ? '' : 'none' }}>
        <h6>Links for this post code</h6>
        {Links(currentState)}
      </div>
      <div className="res-block">
        <h6>Deal finance</h6>
        <ResultsList id="1" data={dealFinance} />
      </div>
      <div className="res-block" style={{ display: showBTL ? '' : 'none' }}>
        <h6>Buy to let</h6>
        <ResultsList id="2" data={buyToLet || ''} />
      </div>
      <div className="res-block" style={{ display: showBTL ? '' : 'none' }}>
        <h6>Stress test</h6>
        <ResultsList id="3" data={stress || ''} />
      </div>
      <div className="res-block" style={{ display: showFlip ? '' : 'none' }}>
        <h6>Flip</h6>
        <ResultsList id="4" data={flip} />
      </div>
    </React.Fragment>
  );
}

Results.propTypes = {
  data: PropTypes.shape({
    dealFinance: PropTypes.arrayOf(PropTypes.object).isRequired,
    buyToLet: PropTypes.arrayOf(PropTypes.object),
    stress: PropTypes.arrayOf(PropTypes.object),
    flip: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  currentState: PropTypes.shape({
    postCode: PropTypes.string,
    dealType: PropTypes.string,
  }).isRequired,
};

export default Results;
