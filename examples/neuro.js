var Cylon = require('cylon');

Cylon.robot({
  connection:
    {name: 'neurosky', adaptor: 'neurosky', port: '/dev/rfcomm0'},

  device:
    {name: 'headset', driver: 'neurosky'},

  work: function(my) {
    every((1).seconds(), function() {
      Logger.info("running");
    });
    my.headset.on('data', function(data) {
      Logger.info("data: " + data);
    });
  }
}).start();
