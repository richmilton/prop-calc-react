/* eslint-env browser */
const url = 'http://localhost:3000/comparisons';

const getSavedStates = (err, success) => {
  fetch(url)
    .then(response => response.json())
    .then(data => success(data))
    .catch(err());
};

const stateAPI = {
  getSavedStates,
};

export default stateAPI;
