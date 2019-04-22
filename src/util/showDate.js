import dateFormat from 'date-format';

const showDate = milis => dateFormat('dd/MM hh:mm:ss', new Date(parseInt(milis, 0)));

export default showDate;
