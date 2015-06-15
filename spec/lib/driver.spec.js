"use strict";

var Driver = lib("driver");

var Cylon = require("cylon");

describe("Cylon.Drivers.Neurosky", function() {
  var driver;

  beforeEach(function() {
    driver = new Driver({ connection: {} });
  });

  it("subclasses Cylon.Driver", function() {
    expect(driver).to.be.an.instanceOf(Cylon.Driver);
    expect(driver).to.be.an.instanceOf(Driver);
  });

  describe("#start", function() {
    var read;

    beforeEach(function() {
      driver.connection = { read: stub() };
      read = driver.connection.read;
    });

    it("calls #read on the connection", function() {
      driver.start(function() {});
      expect(read).to.be.called;
    });

    describe("the callback to #read", function() {
      beforeEach(function() {
        driver.emit = spy();
        driver.parse = spy();

        read.yields("data");
        driver.start(function() { });
      });

      it("emits the provided data", function() {
        expect(driver.emit).to.be.calledWith("data", "data");
      });

      it("calls #parse with the data", function() {
        expect(driver.parse).to.be.calledWith("data");
      });
    });
  });

  describe("#parse", function() {
    it("needs tests");
  });

  describe("#parsePacket", function() {
    it("needs tests");
  });

  describe("#parseEEG", function() {
    it("needs tests");
  });

  describe("#parse3ByteInteger", function() {
    it("needs tests");
  });
});
