/* eslint react/prop-types: 0 */
import React from 'react';
import ResultList from './ResultListComponent';
import Links from './LinksComponent';

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
        <ResultList id="1" data={dealFinance} />
      </div>
      <div className="res-block">
        <h6>Buy to let</h6>
        <ResultList id="2" data={buyToLet} />
      </div>
      <div className="res-block">
        <h6>Stress test</h6>
        <ResultList id="3" data={stress} />
      </div>
      <div className="res-block">
        <h6>Flip</h6>
        <ResultList id="4" data={flip} />
      </div>
    </React.Fragment>
  );
}

export default Results;
