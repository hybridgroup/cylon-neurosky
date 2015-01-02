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
    my.headset.on("attention", function(data) {
      console.log("attention:" + data);
    });

    my.headset.on("meditation", function(data) {
      console.log("meditation:" + data);
    });
  }
}).start();
