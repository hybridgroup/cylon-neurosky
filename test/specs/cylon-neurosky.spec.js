"use strict";

var module = source("cylon-neurosky");

var Adaptor = source('adaptor'),
    Driver = source('driver');

describe("cylon-neurosky", function() {
  describe("#register", function() {
    var bot, adaptor, driver;

    beforeEach(function() {
      bot = {};

      adaptor = bot.registerAdaptor = spy();
      driver = bot.registerDriver = spy();

      module.register(bot);
    });

    it("registers the 'cylon-neurosky' adaptor with the robot", function() {
      expect(adaptor).to.be.calledWith('cylon-neurosky', 'neurosky');
    });

    it("registers the 'cylon-neurosky' driver with the robot", function() {
      expect(driver).to.be.calledWith('cylon-neurosky', 'neurosky');
    });
  });

  describe("#adaptor", function() {
    it('returns an instance of the Neurosky adaptor', function() {
      var args = { connection: { port: '/dev/null' } };
      expect(module.adaptor(args)).to.be.an.instanceOf(Adaptor);
    });
  });

  describe("#driver", function() {
    it('returns an instance of the Neurosky driver', function() {
      expect(module.driver({ device: { connection: {} } })).to.be.an.instanceOf(Driver);
    });
  });
});
