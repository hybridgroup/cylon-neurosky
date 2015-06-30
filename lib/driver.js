/*
 * cylon-neurosky driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var buffy = require("buffy"),
    Cylon = require("cylon");

var BT_SYNC, CODE_EX, CODE_SIGNAL_QUALITY, CODE_ATTENTION,
    CODE_MEDITATION, CODE_BLINK, CODE_WAVE, CODE_ASIC_EEG;

var Driver = module.exports = function Driver() {
  Driver.__super__.constructor.apply(this, arguments);

  this.commands = {
    read: this.read
  };

  this.events = [
    /**
     * Emitted whenever the Mindwave serialport sends data
     *
     * @event data
     * @value data direct data from serialport
     */
    "data",

    /**
     * Emitted whenever a Mindwave packet is received over the serialport
     *
     * @event packet
     * @value packet
     */
    "packet",

    /**
     * Emitted whenever the extended code is found in a Mindwave packet
     *
     * @event extended
     */
    "extended",

    /**
     * Emitted when packets are received, as an indicator of poor signal quality
     *
     * @event signal
     * @value quality 0-255
     */
    "signal",

    /**
     * Emitted when the Attention code is detected in a packet
     *
     * @event attention
     * @value value 0-100
     */
    "attention",

    /**
     * Emitted when the Meditation code is detected in a packet
     *
     * @event meditation
     * @value value 0-100
     */
    "meditation",

    /**
     * Emitted with the packet's provided blink strength
     *
     * @event blink
     * @value value 0-255
     */
    "blink",

    /**
     * Emitted per packet, contains raw EEG wave value
     *
     * @event wave
     * @value value 2-byte big-endian 2s-complement
     */
    "wave",

    /**
     * Emitted with processed EEG data per-packet.
     *
     * @event eeg
     * @value eeg an object containing EEG info (delta, theta, etc wave states)
     */
    "eeg"
  ];
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  this.connection.read(function(data) {
    this.emit("data", data);
    this.parse(data);
  }.bind(this));

  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

/**
 * Reads data from the Neurosky serialport.
 *
 * Triggers the callback with any new data
 *
 * @param {Function} callback to be triggered when new data is available
 * @return {void}
 * @publish
 */
Driver.prototype.read = function(callback) {
  return this.connection.read(callback);
};

/**
 * Parses data from the Mindwave
 *
 * @param {Object} data buffered data to be parsed
 * @return {void}
 * @publish
 */
Driver.prototype.parse = function(data) {
  var reader = buffy.createReader(data);

  while (reader.bytesAhead() > 2) {
    if (reader.uint8() === BT_SYNC && reader.uint8() === BT_SYNC) {
      var len = reader.uint8();
      var payload = reader.buffer(len);
      this.emit("packet", payload);
      this.parsePacket(payload);
    }
  }
};

/**
 * Parses a packet of data from the Mindwave
 *
 * @param {Object} data packet to be parsed
 * @return {void}
 * @publish
 */
Driver.prototype.parsePacket = function(data) {
  var reader = buffy.createReader(data);
  while (reader.bytesAhead() > 0) {
    switch (reader.uint8()) {
      case CODE_EX:
        this.emit("extended");
        break;

      case CODE_SIGNAL_QUALITY:
        this.emit("signal", reader.uint8());
        break;

      case CODE_ATTENTION:
        this.emit("attention", reader.uint8());
        break;

      case CODE_MEDITATION:
        this.emit("meditation", reader.uint8());
        break;

      case CODE_BLINK:
        this.emit("blink", reader.uint8());
        break;

      case CODE_WAVE:
        reader.skip(1);
        this.emit("wave", reader.int16BE());
        break;

      case CODE_ASIC_EEG:
        this.emit("eeg", this.parseEEG(reader.buffer(24)));
        break;
    }
  }
};

/**
 * Parses data from a Mindwave packet to get current EEG state
 *
 * @param {Object} data packet content to be parsed
 * @return {Object} eeg data
 * @publish
 */
Driver.prototype.parseEEG = function(data) {
  return {
    delta: this.parse3ByteInteger(data.slice(0, 2)),
    theta: this.parse3ByteInteger(data.slice(3, 5)),
    loAlpha: this.parse3ByteInteger(data.slice(6, 8)),
    hiAlpha: this.parse3ByteInteger(data.slice(9, 11)),
    loBeta: this.parse3ByteInteger(data.slice(12, 14)),
    hiBeta: this.parse3ByteInteger(data.slice(15, 17)),
    loGamma: this.parse3ByteInteger(data.slice(18, 20)),
    midGamma: this.parse3ByteInteger(data.slice(21, 24))
  };
};

Driver.prototype.parse3ByteInteger = function(data) {
  return (data[0] << 16) |
         (((1 << 16) - 1) & (data[1] << 8)) |
         ((1 << 8) - 1) &
         data[2];
};

BT_SYNC = 0xAA;
CODE_EX = 0x55;              // Extended code
CODE_SIGNAL_QUALITY = 0x02;  // POOR_SIGNAL quality 0-255
CODE_ATTENTION = 0x04;       // ATTENTION eSense 0-100
CODE_MEDITATION = 0x05;      // MEDITATION eSense 0-100
CODE_BLINK = 0x16;           // BLINK strength 0-255
CODE_WAVE = 0x80;            // RAW wave value: 2-byte big-endian 2s-complement
CODE_ASIC_EEG = 0x83;        // ASIC EEG POWER 8 3-byte big-endian integers
