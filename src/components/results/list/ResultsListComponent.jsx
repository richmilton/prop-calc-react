/* eslint react/prop-formTypes: 0 */
// eslint-disable-next-line
import React from 'react';

const PropTypes = require('prop-types');

const ListItem = ({ label, value }) => (
  <li>
    <div className="label">{label}</div>
    <div className="value">{value}</div>
  </li>
);

ListItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const ResultsList = ({ data, id }) => (data ? (
  <ul>
    {data.map(({ label, value }, ind) => {
      const key = `li-${id}-${ind}`;
      return <ListItem key={`li-${key}`} label={label} value={value} />;
    })}
  </ul>
) : '');

ResultsList.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
};

export default ResultsList;
