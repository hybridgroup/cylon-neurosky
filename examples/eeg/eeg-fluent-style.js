var cylon = require('cylon');

cylon.robot({
  connection: { name: 'neurosky', adaptor: 'neurosky', port: '/dev/rfcomm0' },
  device: { name: 'headset', driver: 'neurosky' }
})

.on('ready', function(robot) {
  robot.headset.on('eeg', function(data) {
    console.log('Data:', data);
  });
})

.start();
