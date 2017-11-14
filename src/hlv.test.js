const hype5 = require("./hlv.js");

/* eslint-disable */

describe("hype5", function() {
  test("Module returns object", function() {
    expect(typeof hype5).toEqual("object");
  });

  test("Module contains expected methods", function() {
    const keys = Object.keys(hype5);
    expect(keys).toContain("top");
  });

  describe("top module", function() {
     test("Module contains expected methods", function () {
      expect(2).toEqual(2);
     });
  });
});
