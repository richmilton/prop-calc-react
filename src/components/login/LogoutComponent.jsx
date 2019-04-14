/* eslint react/prop-types: 0 */
import React from 'react';

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

export default Logout;
