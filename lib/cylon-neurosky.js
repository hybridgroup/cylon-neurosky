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
    robot.registerAdaptor('cylon-neurosky', 'neurosky');
    robot.registerDriver('cylon-neurosky', 'neurosky');
  }
};
