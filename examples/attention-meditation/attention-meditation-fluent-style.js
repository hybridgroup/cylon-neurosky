var cylon = require('cylon');

cylon.robot({
  connection: {name: 'neurosky', adaptor: 'neurosky', port: '/dev/rfcomm0'},
  device: {name: 'headset', driver: 'neurosky'}
})

.on('ready', function(robot) {
  robot.headset.on('attention', function(data) {
    console.log("attention:" + data);
  });

  robot.headset.on('meditation', function(data) {
    console.log("meditation:" + data);
  });
})

.start();
