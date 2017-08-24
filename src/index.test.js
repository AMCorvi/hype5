const hype5 = require("./index.js");

describe("hype5", () => {
	describe("remix method", () => {
		test.skip("That method checks for vali type parameter", done => {
			hype5.remixes("cool").catch(err => {
				expect(err).toBeInstanceOf(Error);
				done();
			});
		});

    test("Method return 'Promise'")

		test("That method calls crawlFunc function", async () => {
			let crawlFuncSim = jest.fn((a, b) => `${a} ${b}`);
			let rem = hype5.remixes;


			rem = await rem("popular", crawlFuncSim);
      expect(crawlFuncSim.mock.calls[0][1]).toBe("remix");
      expect(crawlFuncSim.mock.calls[0][0]).toBe("popular");
		});
	});
});
