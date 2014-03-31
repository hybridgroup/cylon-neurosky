/*
 * cylon-neurosky adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 Your Name Here
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var namespace = require('node-namespace');

require('./cylon-neurosky');
require('./driver');

namespace('Cylon.Adaptors', function() {
  this.Neurosky = (function(klass) {
    subclass(Neurosky, klass);

    function Neurosky(opts) {
      if (opts == null) { opts = {}; }
      Neurosky.__super__.constructor.apply(this, arguments);
    }

    Neurosky.prototype.connect = function(callback) {
      return Neurosky.__super__.connect.apply(this, arguments);
    };

    return Neurosky;

  })(Cylon.Adaptor);
});

module.exports = Cylon.Adaptors.Neurosky;
