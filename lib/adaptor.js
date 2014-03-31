/*
 * cylon-neurosky adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 Your Name Here
 * Licensed under the Apache 2.0 license.
*/

"use strict";

require('./cylon-neurosky');
require('./driver');
var SerialPort = require("serialport").SerialPort;
var namespace = require('node-namespace');

namespace('Cylon.Adaptors', function() {
  this.Neurosky = (function(klass) {
    subclass(Neurosky, klass);

    function Neurosky(opts) {
      if (opts == null) { opts = {}; }
      Neurosky.__super__.constructor.apply(this, arguments);

      this.serialPort = new SerialPort(this.connection.port, {
        baudrate: 57600
      }, false);
    }

    Neurosky.prototype.connect = function(callback) {
      var self = this ;
      var cb = callback ;
      this.serialPort.on('open', function() {
        Logger.info("Connecting to adaptor '" + self.name + "'...");
        cb(null);
        self.connection.emit('connect');
      });
    };

    Neurosky.prototype.commands = function() {
      return ['read']
    }

    Neurosky.prototype.read = function(cb) {
      this.serialPort.on('data', function(data) {
        cb(data);
      });
    }

    return Neurosky;

  })(Cylon.Adaptor);
});
