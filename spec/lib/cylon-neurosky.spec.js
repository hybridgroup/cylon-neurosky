/* jshint expr:true */
"use strict";

var neurosky = source("cylon-neurosky");

var Adaptor = source("adaptor"),
    Driver = source("driver");

describe("cylon-neurosky", function() {
  describe("#adaptors", function() {
    it("is an array of supplied adaptors", function() {
      expect(neurosky.adaptors).to.be.eql(["neurosky"]);
    });
  });

  describe("#drivers", function() {
    it("is an array of supplied drivers", function() {
      expect(neurosky.drivers).to.be.eql(["neurosky"]);
    });
  });

  describe("#adaptor", function() {
    it("returns an instance of the Neurosky adaptor", function() {
      var args = { port: "/dev/null" };
      expect(neurosky.adaptor(args)).to.be.an.instanceOf(Adaptor);
    });
  });

  describe("#driver", function() {
    it("returns an instance of the Neurosky driver", function() {
      var driver = neurosky.driver({ device: { connection: {} } });
      expect(driver).to.be.an.instanceOf(Driver);
    });
  });
});
