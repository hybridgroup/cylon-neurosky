# Cylon.js For Neurosky Mindwave Mobile

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things (IoT).

This repository contains the Cylon.js adaptor/driver for the Neurosky Mindwave Mobile EEG (http://store.neurosky.com/products/mindwave-mobile).

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our
sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-neurosky.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-neurosky) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-neurosky/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-neurosky) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-neurosky/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-neurosky)

## How to Install

    $ npm install cylon cylon-neurosky

## How to Use

This example displays the Attention and Meditation data reading sent by the Mindwave Headset:

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    neurosky: { adaptor: 'neurosky', port: '/dev/rfcomm0' }
  },

  devices: {
    headset: { driver: 'neurosky' }
  },

  work: function(my) {
    my.headset.on('attention', function(data) {
      Logger.info("attention:" + data);
    });

    my.headset.on('meditation', function(data) {
      Logger.info("meditation:" + data);
    });
  }
}).start();
```

## How to Connect

### OSX

In order to allow Cylon.js running on your Mac to access the Mindwave, go to "Bluetooth > Open Bluetooth Preferences > Sharing Setup" and make sure that "Bluetooth Sharing" is checked.

### Ubuntu

Connecting to the Mindwave from Ubuntu or any other Linux-based OS can be done entirely from the command line using [Gort](http://gort.io) commands.
Here are the steps:

Find the address of the Mindwave, by using:

    $ gort scan bluetooth

Pair to Mindwave using this command (substituting the actual address of your Mindwave):

    $ gort bluetooth pair <address>

Connect to the Mindwave using this command (substituting the actual address of your Mindwave):

    $ gort bluetooth connect <address>

### Windows

You should be able to pair your Mindwave using your normal system tray applet for Bluetooth, and then connect to the COM port that is bound to the device, such as `COM3`.

## Documentation

We're busy adding documentation to [cylonjs.com](http://cylonjs.com). Please check there as we continue to work on Cylon.js.

Thank you!

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-neurosky/blob/master/RELEASES.md
](https://github.com/hybridgroup/cylon-neurosky/blob/master/RELEASES.md
).

## License

Copyright (c) 2013-2015 The Hybrid Group. Licensed under the Apache 2.0 license.
