"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("neurosky", { adaptor: "neurosky", port: "/dev/rfcomm0" })
  .device("headset", { driver: "neurosky" })

  .on("ready", function(bot) {
    bot.headset.on("attention", function(data) {
      console.log("attention:" + data);
    });

    bot.headset.on("meditation", function(data) {
      console.log("meditation:" + data);
    });
  });

Cylon.start();
