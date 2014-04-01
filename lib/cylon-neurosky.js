/*
 * cylon-neurosky
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

require('cylon');
require('./adaptor');
require('./driver');

module.exports = {
  adaptor: function(opts) {
    return new Cylon.Adaptors.Neurosky(opts);
  },

  driver: function(opts) {
    return new Cylon.Drivers.Neurosky(opts);
  },

  register: function(robot) {
    Logger.info("Registering Neurosky adaptor for " + robot.name);
    robot.registerAdaptor('cylon-neurosky', 'neurosky');

    Logger.info("Registering Neurosky driver for " + robot.name);
    robot.registerDriver('cylon-neurosky', 'neurosky');
  }
};
