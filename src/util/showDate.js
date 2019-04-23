import dateFormat from 'date-format';

const showDate = (id) => {
  const milliseconds = id.split('#')[1] || id;
  return dateFormat('dd/MM hh:mm:ss', new Date(parseInt(milliseconds, 0)));
};

export default showDate;
