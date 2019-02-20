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
     rate: 0
    },
    {
     upto: 250000,
     rate: 2
    },
    {
      upto: 925000,
      rate: 5
    },
    {
      upto: 1500000,
      rate: 10
    },
    {
      upto: 'end',
      rate: 12
    }
  ]
};

module.exports = bands;