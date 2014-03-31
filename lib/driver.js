/*
 * cylon-neurosky driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 Your Name Here
 * Licensed under the Apache 2.0 license.
*/

"use strict";

require('./cylon-neurosky');
require('./adaptor');

var namespace = require('node-namespace');

namespace("Cylon.Drivers", function() {
  this.Neurosky = (function(klass) {
    subclass(Neurosky, klass);

    function Neurosky() {
      Neurosky.__super__.constructor.apply(this, arguments);
    }

    Neurosky.prototype.start = function(callback) {
      return Neurosky.__super__.start.apply(this, arguments);
    };

    return Neurosky;

  })(Cylon.Driver);
});

module.exports = Cylon.Drivers.Neurosky;
