/*
 * cylon-neurosky driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

require('./cylon-neurosky');
require('./adaptor');

var namespace = require('node-namespace');
var buffy = require('buffy');

namespace("Cylon.Drivers", function() {
  this.Neurosky = (function(klass) {
    var BT_SYNC, CODE_EX, CODE_SIGNAL_QUALITY, CODE_ATTENTION,
        CODE_MEDITATION, CODE_BLINK, CODE_WAVE, CODE_ASIC_EEG;

    subclass(Neurosky, klass);

    function Neurosky() {
      Neurosky.__super__.constructor.apply(this, arguments);
    }

    Neurosky.prototype.start = function(callback) {
      var self = this ;
      this.connection.read(function(data) {
        self.device.emit('data', data);
        self.parse(data);
      });

      Neurosky.__super__.start.apply(this, arguments);
    };

    Neurosky.prototype.commands = function() {
      return ['read']
    }

    Neurosky.prototype.read = function(callback) {
      return this.connection.read(callback);
    };

    Neurosky.prototype.parse = function(data) {
      var reader = buffy.createReader(data);
      while (reader.bytesAhead() > 2) {
        if (reader.uint8() == BT_SYNC && reader.uint8() == BT_SYNC) {
          var len = reader.uint8();
          var payload = reader.buffer(len);
          var checksum = reader.uint8();
          this.device.emit('packet', payload);
          this.parsePacket(payload);
        }
      }
    }    

    Neurosky.prototype.parsePacket = function(data) {
      var reader = buffy.createReader(data);
      while(reader.bytesAhead() > 0) {
        switch(reader.uint8()) {
          case CODE_EX:
            this.device.emit('extended');

          case CODE_SIGNAL_QUALITY:
            this.device.emit('signal', reader.uint8());

          case CODE_ATTENTION:
            this.device.emit('attention', reader.uint8());

          case CODE_MEDITATION:
            this.device.emit('meditation', reader.uint8());

          case CODE_BLINK:
            this.device.emit('blink', reader.uint8());

          case CODE_WAVE:
            reader.skip(1);
            this.device.emit('wave', reader.int16BE());

          case CODE_ASIC_EEG:
            this.device.emit('eeg', this.parseEEG(reader.buffer(24)));
        }
      }
    }

    Neurosky.prototype.parseEEG = function(data) {
      var eeg = {
        'delta': this.parse3ByteInteger(data.slice(0,2)),
        'theta': this.parse3ByteInteger(data.slice(3,5)),
        'loAlpha': this.parse3ByteInteger(data.slice(6,8)),
        'hiAlpha': this.parse3ByteInteger(data.slice(9,11)),
        'loBeta': this.parse3ByteInteger(data.slice(12,14)),
        'hiBeta': this.parse3ByteInteger(data.slice(15,17)),
        'loGamma': this.parse3ByteInteger(data.slice(18,20)),
        'midGamma': this.parse3ByteInteger(data.slice(21,24))
      }

      return eeg;
    }

    Neurosky.prototype.parse3ByteInteger = function(data) {
      var bigEndianInteger;
      bigEndianInteger = (data[0] << 16) | (((1 << 16) - 1) & (data[1] << 8)) | ((1 << 8) - 1) & data[2];
      return bigEndianInteger
    }

    BT_SYNC = 0xAA;
    CODE_EX = 0x55;              // Extended code
    CODE_SIGNAL_QUALITY = 0x02;  // POOR_SIGNAL quality 0-255
    CODE_ATTENTION = 0x04;       // ATTENTION eSense 0-100
    CODE_MEDITATION = 0x05;      // MEDITATION eSense 0-100
    CODE_BLINK = 0x16;           // BLINK strength 0-255
    CODE_WAVE = 0x80;            // RAW wave value: 2-byte big-endian 2s-complement
    CODE_ASIC_EEG = 0x83;        // ASIC EEG POWER 8 3-byte big-endian integers

    return Neurosky;

  })(Cylon.Driver);
});

module.exports = Cylon.Drivers.Neurosky;
