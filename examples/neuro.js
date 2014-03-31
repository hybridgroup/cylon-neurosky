var Cylon = require('cylon');

Cylon.robot({
  connection:
    {name: 'neurosky', adaptor: 'neurosky', port: '/dev/rfcomm0'},

  device:
    {name: 'headset', driver: 'neurosky'},

  work: function(my) {
    my.headset.on('attention', function(data) {
      Logger.info("attention:" + data);
    });
    my.headset.on('meditation', function(data) {
      Logger.info("meditation:" + data);
    });
  }
});

Cylon.start();
