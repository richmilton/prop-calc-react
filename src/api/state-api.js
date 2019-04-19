/* eslint-env browser */
const url = process.env.REACT_APP_COMPARISONS_URL;

// const getSavedStates = (err, success) => {
//   fetch(url)
//     .then(response => response.json())
//     .then(data => success(data))
//     .catch(err());
// };

const removeState = async (stateId, userEmail) => {
  try {
    const resp = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: stateId, email: userEmail }),
    });
    if (resp.ok) {
      return {
        message: 'deleted successfully',
        resp,
      };
    }
    return {
      message: 'delete failed',
      resp,
    };
  } catch (err) {
    return {
      message: 'delete error',
      err,
    };
  }
};

// const removeState = (stateId, userEmail) => {
//   deleteState(stateId, userEmail);
// };

export default { removeState };
