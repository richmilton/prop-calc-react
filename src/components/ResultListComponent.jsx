/* eslint react/prop-types: 0 */
// eslint-disable-next-line
import React, { Component } from 'react';

const ListItem = ({ label, value }) => (
  <li>
    <div className="label">{label}</div>
    <div className="value">{value}</div>
  </li>
);

const ResultList = ({ data, id }) => (
  <ul>
    {data.map(({ label, value }, ind) => {
      const key = `li-${id}-${ind}`;
      return <ListItem key={`li-${key}`} label={label} value={value} />;
    })}
  </ul>
);

export default ResultList;
