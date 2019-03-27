/* eslint react/prop-types: 0 */
import React from 'react';
import validatePostcode from '../util/validate-postcode';
import ResultList from './ResultListComponent';

const urls = {
  rmBuy: process.env.REACT_APP_RM_BUY_URL,
  rmRent: process.env.REACT_APP_RM_LET_URL,
  nhpSold: process.env.REACT_APP_NHP_SOLD_URL,
};

function Results({ data, currentState }) {
  const {
    postCode,
    askingPrice,
    monthlyRent,
    propertyValue,
  } = currentState;
  const {
    dealFinance,
    buyToLet,
    stress,
    flip,
  } = data;
  const { oneK, oneHundredK } = { oneK: 1000, oneHundredK: 100000 };
  const maxPrice = Math
    .ceil((askingPrice || propertyValue || 400000) / oneHundredK * 1.2) * oneHundredK;
  const maxRent = Math.ceil((monthlyRent || oneK) / oneK * 1.2) * oneK;
  const links = (postCode && validatePostcode(postCode)) ? (
    <React.Fragment>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={urls.nhpSold + postCode}
      >
        sold data
      </a>
      {' | '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`${urls.rmBuy + postCode}&maxPrice=${(maxPrice)}`}
      >
        for sale
      </a>
      {' | '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`${urls.rmRent + postCode}&maxPrice=${maxRent}`}
      >
        to rent
      </a>
    </React.Fragment>
  ) : <span style={{ color: 'red', fontStyle: 'italic' }}>use a full valid post code to see links here</span>;

  return (
    <React.Fragment>
      <div className="res-block">
        <h6>Links for this post code</h6>
        {links}
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
