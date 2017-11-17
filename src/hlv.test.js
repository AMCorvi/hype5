const Hype5 = require("./hlv.js");

/* eslint-disable */

describe("Hype5", function() {
  test("Module returns object", function() {
    expect(typeof Hype5).toEqual("object");
  });

  test("Module contains expected methods", function() {
    const keys = Object.keys(Hype5);
  });

  describe("top module", function() {
    test("Module contains expected method 'top' ", function() {
      expect(Hype5.top).toBeDefined();
    });

		test("Method is a promise", function () {
			expect(Hype5.top()).toBeInstanceOf(Promise);
		})

		test("Module return object", function () {

			expect(typeof Hype5.top()).toBe("object")
		})

		test.skip("Method to throw when call w/ invalid args", function () {
			expect(Hype5.top(4)).toThrow()
		})

		test("Calls crawler function", function () {
			const mockCrawl = jest.fn();
			const sig = {};
			sig.vData = function () {return true};
			sig.filter= "top"
			sig.retrieveTrackInfo = ()=>{then:2}
			const hype = Hype5.top("popular", sig);

			expect(mockCrawl.mock.call).toEqual(1);

		});
  });
});
