"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.remixes = exports.noremixes = exports.top = undefined;

require("babel-polyfill");

var _child_process = require("child_process");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var runCasper = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(type, filter) {
		var returnValue, data;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						// Variable to assign return data
						returnValue = void 0;

						// Handle child process call asyncronously

						data = new Promise(function (resolve, reject) {
							// Call back function for 'exec' to handle respone from exec() call
							function puts(err, stdout, stderr) {
								if (err) {
									reject(err);
								} else if (stderr) {
									reject(stderr);
								} else {
									resolve(stdout);
								}
							}

							if (type && filter) {
								(0, _child_process.exec)("casperjs --verbose ./dist/crawler.js --hypeType=" + type + " --hypeFilter=" + filter, puts);
							} else if (type) {
								(0, _child_process.exec)("casperjs --verbose ./dist/crawler.js --hypeType=" + type + " ", puts);
							} else if (!type) {
								console.log("no filter no type");
								(0, _child_process.exec)("casperjs --verbose ./dist/crawler.js ", puts);
							}
						});

						// pause for data and assign to returnValue variable

						_context.next = 4;
						return data.then(function (trackData) {
							return returnValue = trackData;
						});

					case 4:
						return _context.abrupt("return", returnValue);

					case 5:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function runCasper(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var top = exports.top = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(type) {
		var crawlFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : runCasper;
		var options, output, getData;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						// list of options that are actually valid
						options = ["popular", "latest"];
						// Value assigned to and return by function

						output = void 0;

						// Compare filter parameter with list of possible valid filters

						_context2.prev = 2;

						if (!type) {
							_context2.next = 6;
							break;
						}

						if (options.find(function (val) {
							return val === type;
						})) {
							_context2.next = 6;
							break;
						}

						throw new SyntaxError(" \n\n \t Call of function 'remixes' made with invalid arg " + type + ".\n\t Insert valid filter argument. \n\t e.g. " + options + "\n", "index.js", 89);

					case 6:
						_context2.next = 11;
						break;

					case 8:
						_context2.prev = 8;
						_context2.t0 = _context2["catch"](2);
						throw _context2.t0;

					case 11:
						getData = function getData() {
							return new Promise(function (resolve, reject) {
								try {
									var x = type ? crawlFunc(type) : crawlFunc();
									resolve(x);
								} catch (err) {
									reject(err);
								}
							});
						};

						_context2.next = 14;
						return getData().then(function (data) {
							output = data;
						}).catch(function (err) {
							throw err;
						});

					case 14:
						return _context2.abrupt("return", output);

					case 15:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[2, 8]]);
	}));

	return function top(_x4) {
		return _ref2.apply(this, arguments);
	};
}();

var noremixes = exports.noremixes = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(type) {
		var crawlFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : runCasper;
		var options, output, getData;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						// list of options that are actually valid
						options = ["popular", "latest"];
						// Value assigned to and return by function

						output = void 0;

						// Compare filter parameter with list of possible valid filters

						_context3.prev = 2;

						if (options.find(function (val) {
							return val === type;
						})) {
							_context3.next = 5;
							break;
						}

						throw new SyntaxError(" \n\n \t Call of function 'remixes' made with invalid arg " + type + ".\n\t Insert valid filter argument. \n\t e.g. " + options + "\n", "index.js", 89);

					case 5:
						_context3.next = 10;
						break;

					case 7:
						_context3.prev = 7;
						_context3.t0 = _context3["catch"](2);
						throw _context3.t0;

					case 10:
						getData = function getData() {
							return new Promise(function (resolve, reject) {
								try {
									var x = crawlFunc(type, "noremix");
									resolve(x);
								} catch (err) {
									reject(err);
								}
							});
						};

						_context3.next = 13;
						return getData().then(function (data) {
							output = data;
						}).catch(function (err) {
							throw err;
						});

					case 13:
						return _context3.abrupt("return", output);

					case 14:
					case "end":
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[2, 7]]);
	}));

	return function noremixes(_x6) {
		return _ref3.apply(this, arguments);
	};
}();

var remixes = exports.remixes = function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(type) {
		var crawlFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : runCasper;
		var options, output, getData;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						// list of options that are actually valid
						options = ["popular", "latest"];
						// Value assigned to and return by function

						output = void 0;

						// Compare filter parameter with list of possible valid filters

						_context4.prev = 2;

						if (options.find(function (val) {
							return val === type;
						})) {
							_context4.next = 5;
							break;
						}

						throw new SyntaxError(" \n\n \t Call of function 'remixes' made with invalid arg " + type + ".\n\t Insert valid filter argument. \n\t e.g. " + options + "\n", "index.js", 89);

					case 5:
						_context4.next = 10;
						break;

					case 7:
						_context4.prev = 7;
						_context4.t0 = _context4["catch"](2);
						throw _context4.t0;

					case 10:
						getData = function getData() {
							return new Promise(function (resolve, reject) {
								try {
									var x = crawlFunc(type, "remix");
									resolve(x);
								} catch (err) {
									reject(err);
								}
							});
						};

						_context4.next = 13;
						return getData().then(function (data) {
							output = data;
						}).catch(function (err) {
							throw err;
						});

					case 13:
						return _context4.abrupt("return", output);

					case 14:
					case "end":
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[2, 7]]);
	}));

	return function remixes(_x8) {
		return _ref4.apply(this, arguments);
	};
}();
//# sourceMappingURL=index.js.map
