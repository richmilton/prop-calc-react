/* eslint react/prop-types: 0 */
import React from 'react';
import validatePostcode from '../util/validate-postcode';

const urls = {
  rmBuy: {
    commercial: process.env.REACT_APP_RM_COM_BUY_URL,
    residential: process.env.REACT_APP_RM_BUY_URL,
  },
  rmRent: {
    commercial: process.env.REACT_APP_RM_COM_LET_URL,
    residential: process.env.REACT_APP_RM_LET_URL,
  },
  nhpSold: process.env.REACT_APP_NHP_SOLD_URL,
  gMap: process.env.REACT_APP_MAP_URL,
};

function Link({ href, text }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {text}
    </a>
  );
}

function Links(
  {
    postCode,
    askingPrice,
    monthlyRent,
    propertyValue,
    stampDutyType,
  },
) {
  const urlType = stampDutyType.startsWith('commercial') ? 'commercial' : 'residential';
  const { oneK, oneHundredK } = { oneK: 1000, oneHundredK: 100000 };
  const maxPrice = Math
    .ceil((askingPrice || propertyValue || 400000) / oneHundredK * 1.2) * oneHundredK;
  const maxRent = Math.ceil((monthlyRent || oneK) / oneK * 1.2) * oneK;

  return (postCode && validatePostcode(postCode)) ? (
    <React.Fragment>
      <Link
        href={urls.nhpSold + postCode}
        text="sold"
      />
      {' | '}
      <Link
        href={`${urls.rmBuy[urlType] + postCode}&maxPrice=${(maxPrice)}`}
        text="for sale"
      />
      {' | '}
      <Link
        href={`${urls.rmRent[urlType] + postCode}&maxPrice=${maxRent}`}
        text="to let"
      />
      {' | '}
      <Link
        href={urls.gMap + postCode}
        text="gmap"
      />
    </React.Fragment>
  ) : <span style={{ color: 'red', fontStyle: 'italic' }}>use a full valid post code to see links here</span>;
}

export default Links;
