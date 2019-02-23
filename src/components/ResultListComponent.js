// eslint-disable-next-line
import React, { Component } from 'react';

const ListItem = ({label, value, data}) => {

  return (
    <li>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </li>
  )

};

const ResultList = ({data, id}) => {

  return (
    <ul>
      {data.map(({label, value, colour}, ind) => <ListItem key={`li-${id}-${ind}`} label={label} value={value} />)}
    </ul>
  )

};

export default ResultList;