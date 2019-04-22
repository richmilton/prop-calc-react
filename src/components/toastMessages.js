import { toastPlaceHolder } from './common/appConstants';

const toastMessages = {
  unrecognisedUser: {
    message: `You need to be whitelisted to use the view and save functions.
          You can still use the app to perform calculations which can be printed,
          if you want to save copies. If you think you should be whitelisted,
          check the email address and try logging in again, or contact your administrator`,
    options: { appearance: 'warning', autoDismissTimeout: 10000 },
  },
  dataRetrieved: {
    message: 'proposal data refreshed', options: { appearance: 'success' },
  },
  noneSaved: {
    message: 'you have no saved proposal data', options: { appearance: 'info' },
  },
  dataRetrievalError: {
    message: 'something went wrong retrieving proposal data', options: { appearance: 'error' },
  },
  savedSuccess: {
    message: `new version of ${toastPlaceHolder} saved successfully`, options: { appearance: 'success' },
  },
  saveError: {
    message: `something went wrong saving new version of ${toastPlaceHolder}`, options: { appearance: 'error' },
  },
  deleteSuccess: {
    message: `${toastPlaceHolder} deleted successfully`, options: { appearance: 'success' },
  },
  deleteError: {
    message: `something went wrong deleting ${toastPlaceHolder}`, options: { appearance: 'error' },
  },
  login: {
    message: `logged in as ${toastPlaceHolder}`, options: { appearance: 'success' },
  },
  logout: {
    message: 'logged out', options: { appearance: 'success' },
  },
  loaded: {
    message: `${toastPlaceHolder} loaded successfully`, options: { appearance: 'success' },
  },
};

export default toastMessages;
