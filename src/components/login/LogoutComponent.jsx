import React from 'react';

const PropTypes = require('prop-types');

function Logout({ doLogout }) {
  const handleClick = (e) => {
    e.preventDefault();
    doLogout();
  };

  return (
    <button
      type="submit"
      className=""
      onClick={handleClick}
    >
      logoff
    </button>
  );
}

Logout.propTypes = {
  doLogout: PropTypes.func.isRequired,
};

export default Logout;
