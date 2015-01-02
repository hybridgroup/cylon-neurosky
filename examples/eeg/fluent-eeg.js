"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("neurosky", { adaptor: "neurosky", port: "/dev/rfcomm0" })
  .device("headset", { driver: "neurosky" })
  .on("ready", function(bot) {
    bot.headset.on("eeg", function(data) {
      console.log("Data:", data);
    });
  });

Cylon.start();
