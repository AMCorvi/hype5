const hype5 = require("./index.js");

describe("hype5", () => {
	describe("remix method", () => {

		test("Method is instance of promise", () => {
			let crawlFuncSim = jest.fn((a, b) => a + b);
			let rem = hype5.remixes;
			expect(rem("popular", crawlFuncSim)).toBeInstanceOf(Promise);
		});

		test("Method is return a STRING", () => {
			let crawlFuncSim = jest.fn((a, b) => a + b);
			let rem = hype5.remixes;
			expect(rem("popular", crawlFuncSim)).resolves.toBeInstanceOf(String);
			expect(rem("popular", crawlFuncSim)).resolves.toBe("popularremix");
		});

		test("Method checks for valid type parameter", done => {
			hype5.remixes("cool").catch(err => {
				expect(err).toBeInstanceOf(Error);
				done();
			});
		});

		test("Method calls crawlFunc function", async () => {
			let crawlFuncSim = jest.fn((a, b) => a + b);
			let rem = hype5.remixes;

			rem = await rem("popular", crawlFuncSim);
			expect(crawlFuncSim.mock.calls[0][1]).toBe("remix");
			expect(crawlFuncSim.mock.calls[0][0]).toBe("popular");
		});
	});
});
