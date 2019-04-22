import { confirmAlert } from 'react-confirm-alert';

const confirmDialog = (message, fn, label, fn2) => {
  const buttons = [
    {
      label: 'Yes',
      onClick: fn,
    },
    {
      label: 'No',
      onClick: () => false,
    },
  ];
  if (label) buttons[2] = { label, onClick: fn2 };
  confirmAlert({
    message,
    buttons,
  });
};

export default confirmDialog;
