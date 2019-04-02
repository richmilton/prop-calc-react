const ireland = [
  { upto: 1000000, rate: 1 },
  { upto: 'end', rate: 2 },
];
const scotland = [{ upto: 250000, rate: 2, load: 3 },
  { upto: 325000, rate: 5, load: 3 },
  { upto: 750000, rate: 10, load: 3 },
  { upto: 'end', rate: 12, load: 3 },
];
const bands = {
  commercial: {
    england: [
      { upto: 150000, rate: 0 },
      { upto: 250000, rate: 2 },
      { upto: 'end', rate: 5 },
    ],
    wales: [
      { upto: 150000, rate: 0 },
      { upto: 250000, rate: 1 },
      { upto: 1000000, rate: 5 },
      { upto: 'end', rate: 6 },
    ],
    scotland: [
      { upto: 150000, rate: 0 },
      { upto: 250000, rate: 1 },
      { upto: 'end', rate: 5 },
    ],
    ireland,
  },

  residential: {
    first: {
      england: {
        thresholds: [
          { upto: 300000, rate: 0 },
          { upto: 500000, rate: 5 },
        ],
        limit: 500000,
      },
      scotland: {
        thresholds: [
          { upto: 175000, rate: 0 },
          ...scotland,
        ],
        limit: -1,
      },
    },
    england: [
      { upto: 125000, rate: 0, load: 3 },
      { upto: 250000, rate: 2, load: 3 },
      { upto: 925000, rate: 5, load: 3 },
      { upto: 1500000, rate: 10, load: 3 },
      { upto: 'end', rate: 12, load: 3 },
    ],
    wales: [
      { upto: 180000, rate: 0, load: 3 },
      { upto: 250000, rate: 3.5, load: 3 },
      { upto: 400000, rate: 5, load: 3 },
      { upto: 750000, rate: 7.5, load: 3 },
      { upto: 1500000, rate: 10, load: 3 },
      { upto: 'end', rate: 12, load: 3 },
    ],
    scotland: [
      { upto: 145000, rate: 0, load: 3 },
      ...scotland,
    ],
    ireland,
  },
};

module.exports = bands;
