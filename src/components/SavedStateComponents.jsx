/* eslint react/prop-types: 0 */
// eslint-disable-next-line
import React, { Component } from 'react';

const handleClick = (e, callback) => {
  e.preventDefault();
  callback(e.target.id || e.target.href);
};

const SavedStateListItem = ({
  label,
  value,
  ondelete,
  onselect,
}) => (
  <li>
    <div className="state">
      <a
        href={value}
        onClick={e => handleClick(e, onselect)}
      >
        {label}
      </a>
    </div>
    <div className="remove-state">
      <button
        className="btn-primary form-control"
        type="submit"
        id={value}
        onClick={e => handleClick(e, ondelete)}
      >
        delete
      </button>
    </div>
  </li>
);

const SavedStateList = ({ data, ondelete, onselect }) => (
  <ul>
    {data.map(({ projectName, id }, ind) => {
      const key = `li-${id}-${ind}`;
      return <SavedStateListItem
        ondelete={ondelete}
        key={`li-${key}`}
        label={projectName || 'untitled'}
        value={id}
        onselect={onselect}
      />;
    })}
  </ul>
);

export default SavedStateList;
