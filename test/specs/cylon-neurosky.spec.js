"use strict";

var module = source("cylon-neurosky");

var Adaptor = source('adaptor'),
    Driver = source('driver');

describe("cylon-neurosky", function() {
  describe("#adaptors", function() {
    it('is an array of supplied adaptors', function() {
      expect(module.adaptors).to.be.eql(['neurosky']);
    });
  });

  describe("#drivers", function() {
    it('is an array of supplied drivers', function() {
      expect(module.drivers).to.be.eql(['neurosky']);
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
