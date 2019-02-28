const bands = {

  commercial: [
    {
      upto: 150000,
      rate: 0
    },
    {
      upto: 250000,
      rate: 2
    },
    {
      upto: 'end',
      rate: 5
    }
  ],

  residential:[
    {
      upto: 125000,
      rate: 0,
      load: 3
    },
    {
      upto: 250000,
      rate: 2,
      load: 3
    },
    {
      upto: 925000,
      rate: 5,
      load: 3
    },
    {
      upto: 1500000,
      rate: 10,
      load: 3
    },
    {
      upto: 'end',
      rate: 12,
      load: 3
    }
  ],

  ireland: [
    {
      upto: 1000000,
      rate: 1
    },
    {
      upto: 'end',
      rate: 2
    }
  ]
};

module.exports = bands;