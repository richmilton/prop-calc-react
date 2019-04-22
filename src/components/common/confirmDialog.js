import { confirmAlert } from 'react-confirm-alert';

const confirmDialog = (message, fn) => {
  confirmAlert({
    message,
    buttons: [
      {
        label: 'Yes',
        onClick: fn,
      },
      {
        label: 'No',
        onClick: () => false,
      },
    ],
  });
};

export default confirmDialog;
