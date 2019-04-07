/* eslint react/prop-types: 0 */
import React from 'react';
import ResultsList from './list/ResultsListComponent';
import Links from './links/ResultsLinksComponent';

function Results({ data, currentState }) {
  const {
    dealFinance,
    buyToLet,
    stress,
    flip,
  } = data;

  return (
    <React.Fragment>
      <div className="res-block">
        <h6>Links for this post code</h6>
        {Links(currentState)}
      </div>
      <div className="res-block">
        <h6>Deal finance</h6>
        <ResultsList id="1" data={dealFinance} />
      </div>
      <div className="res-block" style={{ display: buyToLet ? '' : 'none' }}>
        <h6>Buy to let</h6>
        <ResultsList id="2" data={buyToLet || ''} />
      </div>
      <div className="res-block" style={{ display: buyToLet ? '' : 'none' }}>
        <h6>Stress test</h6>
        <ResultsList id="3" data={stress || ''} />
      </div>
      <div className="res-block" style={{ display: flip ? '' : 'none' }}>
        <h6>Flip</h6>
        <ResultsList id="4" data={flip} />
      </div>
    </React.Fragment>
  );
}

export default Results;
