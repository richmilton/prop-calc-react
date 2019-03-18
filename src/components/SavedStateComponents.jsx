/* eslint-env browser */
/* eslint react/prop-types: 0 */
// eslint-disable-next-line
import React, { Component } from 'react';
import dateFormat from 'date-format';

const handleClick = (e, callback) => {
  e.preventDefault();
  callback(e.target.id.split('-')[1]);
};

const showDate = milis => dateFormat('dd/MM hh:mm:ss', new Date(parseInt(milis, 0)));

const SavedStateListItem = ({
  label,
  value,
  ondelete,
}) => (
  <li>
    <div className="state">
      <button
        className="btn-primary form-control"
        style={{ width: '100%' }}
        // href={value}
        type="submit"
        id={`select-${value}`}
        onClick={e => handleClick(e, (id) => { window.location.href = `/${id}`; })}
      >
        {`${label} (${showDate(value)})`}
      </button>
    </div>
    <div className="remove-state">
      <button
        className="btn-sm btn-primary btn-warning"
        type="submit"
        id={`delete-${value}`}
        onClick={e => handleClick(e, ondelete)}
      >
        delete
      </button>
    </div>
  </li>
);

const SavedStateList = ({ data, ondelete, onselect }) => {
  if (data.map) {
    return (
      <ul>
        {data.map(({ projectName, id }, ind) => {
          const key = `li-${id}-${ind}`;
          return (
            <SavedStateListItem
              ondelete={ondelete}
              key={`li-${key}`}
              label={projectName || 'untitled'}
              value={id}
              onselect={onselect}
            />
          );
        })}
      </ul>
    );
  }
  return '';
};

export default SavedStateList;
