var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'neurosky', adaptor: 'neurosky', port: '/dev/rfcomm0' },
  device: { name: 'headset', driver: 'neurosky' },
  work: function(my) {
    my.headset.on('eeg', function(data) {
      console.log('Data:', data);
    });
  }
});

Cylon.start();
