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

var Adaptor = module.exports = function Adaptor() {
  Adaptor.__super__.constructor.apply(this, arguments);

  this['serialPort'] = new SerialPort(this.connection.port, {
    baudrate: 57600
  }, false);
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
  this.serialPort.open(function() {
    Cylon.Logger.info("Connecting to adaptor '" + this.name + "'...");
    callback();
    this.connection.emit('connect');
  }.bind(this));
};

Adaptor.prototype.disconnect = function(callback) {
  this.serialPort.pause();

  this.serialPort.flush(function() {
    this.serialPort.close(function() {
      Cylon.Logger.info("Disconnecting to adaptor '" + this.name + "'...");
      this.connection.emit('disconnect');
      callback();
    }.bind(this));
  }.bind(this));
};

Adaptor.prototype.commands = ['read'];

Adaptor.prototype.read = function(callback) {
  this.serialPort.on('data', callback);
};
