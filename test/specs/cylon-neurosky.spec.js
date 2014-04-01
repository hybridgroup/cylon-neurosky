"use strict";

var module = source("cylon-neurosky");

describe("Cylon.Neurosky", function() {
  it("should be able to register", function() {
    module.register.should.be.a('function');
  });

  it("should be able to create adaptor", function() {
    module.adaptor.should.be.a('function');
  });

  it("should be able to create driver", function() {
    module.driver.should.be.a('function');
  });
});
