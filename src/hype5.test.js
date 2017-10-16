const hype5 = require("./hype5.js");

describe("hype5", () => {

	describe("'top' method", () => {

		test("Method is instance of Promise", () => {
			let crawlFuncSim = jest.fn((a) => a );
			let rem = hype5.top;
			expect(rem("popular", crawlFuncSim)).toBeInstanceOf(Promise);
		});

		test("Method is returns a STRING", async () => {
			let crawlFuncSim = jest.fn((a) => a );
			let rem = hype5.top;
			await expect(rem("latest", crawlFuncSim)).resolves.toBe("latest");
		});

		test("Method checks return Error for on incorrect parameter", done => {
			hype5.top("invalid parameter option").catch(err => {
				expect(err).toBeInstanceOf(Error);
				done();
			});
		});

        test("Method continues to run using default when no parameter is set", ()=>{
            let mock = jest.fn()
            .mockReturnValue("We're cool!");

            expect( hype5.top(null, mock).catch(e=>e) ).resolves.toEqual("We're cool!")

        });

		test("Method calls crawlFunc function", async () => {
			let crawlFuncSim = jest.fn((a) => a );
			let rem = hype5.top;

			rem = await rem("latest", crawlFuncSim);
			expect(crawlFuncSim.mock.calls[0][1]).toBeUndefined();
			expect(crawlFuncSim.mock.calls[0][0]).toBe("latest");
		});

	});

	describe("'noremixes' method", () => {

		test("Method is instance of Promise", () => {
			let crawlFuncSim = jest.fn((a, b) => a + b);
			let rem = hype5.noremixes;
			expect(rem("popular", crawlFuncSim)).toBeInstanceOf(Promise);
		});

		test("Method is returns a STRING", () => {
			let crawlFuncSim = jest.fn((a, b) => a + b);
			let rem = hype5.noremixes;
			expect(rem("popular", crawlFuncSim)).resolves.toBeInstanceOf(String);
			expect(rem("popular", crawlFuncSim)).resolves.toBe("popularremix");
		});

		test("Method checks for valid type parameter", done => {
			hype5.noremixes("cool").catch(err => {
				expect(err).toBeInstanceOf(Error);
				done();
			});
		});

		test("Method calls crawlFunc function", async () => {
			let crawlFuncSim = jest.fn((a, b) => a + b);
			let rem = hype5.noremixes;

			rem = await rem("popular", crawlFuncSim);
			expect(crawlFuncSim.mock.calls[0][1]).toBe("noremix");
			expect(crawlFuncSim.mock.calls[0][0]).toBe("popular");
		});
	});

	describe("'remix' method", () => {

		test("Method is instance of Promise", () => {
			let crawlFuncSim = jest.fn((a, b) => a + b);
			let rem = hype5.remixes;
			expect(rem("popular", crawlFuncSim)).toBeInstanceOf(Promise);
		});

		test("Method is returns a STRING", () => {
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
