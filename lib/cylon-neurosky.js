/*
 * cylon-neurosky
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Adaptor = require("./adaptor"),
    Driver = require("./driver");

module.exports = {
  adaptors: ["neurosky"],
  drivers: ["neurosky"],

  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    return new Driver(opts);
  }
};
