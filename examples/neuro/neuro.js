var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'neurosky', adaptor: 'neurosky', port: '/dev/rfcomm0' },
  device: { name: 'headset', driver: 'neurosky' },
  work: function(my) {
    my.headset.on('packet', function(packet) {
      console.log('packet:', packet);
    });
  }
});

Cylon.start();
