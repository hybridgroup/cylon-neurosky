"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    neurosky: { adaptor: "neurosky", port: "/dev/rfcomm0" }
  },

  devices: {
    headset: { driver: "neurosky" }
  },

  work: function(my) {
    my.headset.on("eeg", function(data) {
      console.log("Data:", data);
    });
  }
});

Cylon.start();
