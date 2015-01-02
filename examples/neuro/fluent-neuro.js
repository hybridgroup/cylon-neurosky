"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("neurosky", { adaptor: "neurosky", port: "/dev/rfcomm0" })
  .device("headset", { driver: "neurosky" })
  .on("ready", function(bot) {
    bot.headset.on("packet", function(packet) {
      console.log("packet:", packet);
    });
  });

Cylon.start();
