const Hype5 = require("./hlv.js");


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

    test("Method is a promise", function() {
      expect(Hype5.top()).toBeInstanceOf(Promise);
    });

    test("Module return object", function() {
      expect(typeof Hype5.top()).toBe("object");
    });

    test("Method to throw when called w/ invalid filter args", function() {
			expect(Hype5.top()).rejects.toBeInstanceOf(Error);
			expect(Hype5.top("Invalid Value")).rejects.toBeInstanceOf(Error);
    });

    test("Method to throw when called w/ invalid crawler args", function() {
			expect(Hype5.top("top","Invalid String")).rejects.toBeInstanceOf(Error);
    });

		test("Method to throw when call w/ invalid validation args", function() {
			let func = ()=>{};
			expect(Hype5.top("top","Invalid String")).rejects.toBeInstanceOf(Error);
		});

    test("Calls crawler function", function() {
			const crawler = jest.fn();
      const hype = Hype5.top("popular",crawler);

      expect(crawler).toBeCalled()
    });

  });
});