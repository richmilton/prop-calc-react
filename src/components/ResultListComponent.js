import React, { Component } from 'react';



const ListItem = (props) => {
  console.log(props)
  return <li key={props.id}>
    <div className="label">{props.label}</div>
    <div className="value">{props.value}</div>
  </li>
}

const ResultList = (props) => {
  return (
    <ul key={props.id}>
      {props.data.map((ob, ind) => <ListItem id={'li-' + ind} label={ob.label} value={ob.value}/>)}
    </ul>
  )
}


export default ResultList;