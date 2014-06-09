/*
 * cylon-neurosky adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var SerialPort = require("serialport").SerialPort,
    Cylon = require('cylon');

var Adaptor = module.exports = function Adaptor(opts) {
  if (opts == null) { opts = {}; }
  Adaptor.__super__.constructor.apply(this, arguments);

  this['serialPort'] = new SerialPort(this.connection.port, {
    baudrate: 57600
  }, false);
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
  var self = this ;
  var cb = callback ;
  this.serialPort.open(function() {
    Cylon.Logger.info("Connecting to adaptor '" + self.name + "'...");
    cb(null);
    self.connection.emit('connect');
  });
};

Adaptor.prototype.disconnect = function() {
  var self = this;
  this.serialPort.pause();
  this.serialPort.flush(function() {
    self.serialPort.close(function() {
      Cylon.Logger.info("Disconnecting to adaptor '" + self.name + "'...");
        self.connection.emit('disconnect');
    });
  });
};

Adaptor.prototype.commands = function() {
  return ['read'];
};

Adaptor.prototype.read = function(callback) {
  var cb = callback ;
  this.serialPort.on('data', function(data) {
    cb(data);
  });
};
