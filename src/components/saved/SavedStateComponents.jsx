/* eslint-env browser */
/* eslint react/prop-types: 0 */
// eslint-disable-next-line
import React from 'react';
import dateFormat from 'date-format';

const handleClick = (e, callback) => {
  e.preventDefault();
  e.target.blur();
  callback(e.target.id.split('-')[1]);
};

const showDate = milis => dateFormat('dd/MM hh:mm:ss', new Date(parseInt(milis, 0)));

const SavedStateListItem = ({
  label,
  value,
  ondelete,
  onclick,
  deletable,
  firstname,
}) => (
  <li>
    <div className="state">
      <button
        className="btn-primary form-control"
        style={{ width: '100%' }}
        type="submit"
        id={`select-${value}`}
        onClick={e => handleClick(e, onclick)}
      >
        {`${label} (${showDate(value)}${deletable ? '' : ` ${firstname}`})`}
      </button>
    </div>
    <div className="remove-state">
      <button
        className="btn-sm btn-primary btn-warning"
        type="submit"
        id={`delete-${value}`}
        onClick={e => handleClick(e, ondelete)}
        style={{ display: deletable ? '' : 'none' }}
      >
        delete
      </button>
    </div>
  </li>
);

const SavedStateList = ({
  data,
  ondelete,
  onselect,
  onclick,
  useremail,
  filter,
}) => {
  if (data.map) {
    const filteredData = data.filter(filter);
    return (
      <ul>
        {filteredData.map(({ projectName, id, email }, ind) => {
          const key = `li-${id}-${ind}`;
          return (
            <SavedStateListItem
              ondelete={ondelete}
              key={`li-${key}`}
              label={projectName || 'untitled'}
              value={id}
              onselect={onselect}
              onclick={onclick}
              deletable={useremail === email}
              firstname={email.split('@')[0].split('.')[0]}
            />
          );
        })}
      </ul>
    );
  }
  return '';
};

export default SavedStateList;
