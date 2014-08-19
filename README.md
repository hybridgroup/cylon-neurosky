# Cylon.js For Neurosky Mindwave Mobile

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and
physical computing using Node.js

This repository contains the Cylon adaptor for the Neurosky Mindwave Mobile EEG (http://store.neurosky.com/products/mindwave-mobile).

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our
sister project Gobot (http://gobot.io).

For more information about Cylon, check out our repo at
https://github.com/hybridgroup/cylon

[![Build Status](https://travis-ci.org/hybridgroup/cylon-neurosky.svg)](https://travis-ci.org/hybridgroup/cylon-neurosky)

## Getting Started

Install the module with: `npm install cylon-neurosky`

## Examples

This example displays the Attention and Meditation data reading sent by the Mindwave Headset:

### JavaScript

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connection:
    {name: 'neurosky', adaptor: 'neurosky', port: '/dev/rfcomm0'},

  device:
    {name: 'headset', driver: 'neurosky'},

  work: function(my) {
    my.headset.on('attention', function(data) {
      Logger.info("attention:" + data);
    });
    my.headset.on('meditation', function(data) {
      Logger.info("meditation:" + data);
    });
  }
});

Cylon.start();
```

## How To Connect

### OSX

In order to allow Cylon.js running on your Mac to access the Mindwave, go to "Bluetooth > Open Bluetooth Preferences > Sharing Setup" and make sure that "Bluetooth Sharing" is checked.

### Ubuntu

Connecting to the Mindwave from Ubuntu or any other Linux-based OS can be done entirely from the command line using CylonJS CLI commands. Here are the steps.

Find the address of the Mindwave, by using:
```
cylon scan bluetooth
```

Pair to Mindwave using this command (substituting the actual address of your Mindwave):
```
cylon bluetooth pair <address>
```

Connect to the Mindwave using this command (substituting the actual address of your Mindwave):
```
cylon bluetooth connect <address>
```

### Windows

You should be able to pair your Mindwave using your normal system tray applet for Bluetooth, and then connect to the COM port that is bound to the device, such as `COM3`.

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & Lint and test your code using [Grunt](http://gruntjs.com/).
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

Version 0.5.0 - Compatibility with Cylon 0.18.0

Version 0.4.0 - Compatibility with Cylon 0.16.0

Version 0.3.1 - Add peerDependencies to package.json

Version 0.3.0 - Compatibility with Cylon 0.15.0

Version 0.2.0 - Compatibility with Cylon 0.14.0, remove node-namespace.

Version 0.1.0 - Initial release for ongoing development

## License

Copyright (c) 2013-2014 The Hybrid Group. Licensed under the Apache 2.0 license.
