// eslint-disable-next-line
import React, { Component } from 'react';

const ListItem = (props) => {

  return (
    <li>
      <div className="label">{props.label}</div>
      <div className="value">{props.value}</div>
    </li>
  )

};

const ResultList = (props) => {

  return (
    <ul key={props.id}>
      {props.data.map((ob, ind) => <ListItem key={`li-${props.id}-${ind}`} label={ob.label} value={ob.value}/>)}
    </ul>
  )

};


export default ResultList;