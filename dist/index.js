"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.remixes = exports.remix = exports.latest = exports.top = undefined;

require("babel-polyfill");

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var crawlData = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(type, filter) {
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

							(0, _child_process.exec)("casperjs --verbose ./dist/crawler.js --hypeType=" + type + " --hypeFilter=" + filter, puts);
						});

						// pause for data and assign to returnValue variable

						_context.next = 4;
						return data.then(function (data) {
							return returnValue = data;
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

	return function crawlData(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var top = exports.top = function top(limit) {
	var x = (0, _nodeFetch2.default)("http://hypem.com/playlist/popular/3day/json/1/data.js").then(function (res) {
		return res.json();
	}).then(function (json) {
		if (limit && limit < 20) {
			var res = {};
			for (var i = 0; i <= limit - 1; i += 1) {
				res["" + i] = json["" + i];
			}
			return res;
		}
		return json;
	}).catch(function (error) {
		return console.log(error);
	});

	return x;
};

var latest = exports.latest = function latest(limit) {
	var x = (0, _nodeFetch2.default)("http://hypem.com/playlist/latest/all/json/1/data.json").then(function (res) {
		return res.json();
	}).then(function (json) {
		if (limit && limit < 20) {
			var res = {};
			for (var i = 0; i <= limit - 1; i += 1) {
				res["" + i] = json["" + i];
			}
			return res;
		}
		return json;
	}).catch(function (error) {
		return console.log(error);
	});

	return x;
};

var remix = exports.remix = function remix(limit) {
	var x = (0, _nodeFetch2.default)("http://hypem.com/playlist/popular/remix/json/1/data.json").then(function (res) {
		return res.json();
	}).then(function (json) {
		if (limit && limit < 20) {
			var res = {};
			for (var i = 0; i <= limit - 1; i += 1) {
				res["" + i] = json["" + i];
			}
			return res;
		}
		return json;
	}).catch(function (error) {
		return console.log(error);
	});

	return x;
};

var remixes = exports.remixes = function () {
	var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(type) {
		var options, output, getData;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						options = ["popular", "latest"];

						// Compare filter parameter with list of possible valid filters

						_context2.prev = 1;

						if (options.find(function (val) {
							return val === type;
						})) {
							_context2.next = 4;
							break;
						}

						throw new SyntaxError(" \n\n \t Call of function 'remixes' made with invalid arg " + type + ".\n\t Insert valid filter argument. \n\t e.g. " + options + "\n", "index.js", 89);

					case 4:
						_context2.next = 9;
						break;

					case 6:
						_context2.prev = 6;
						_context2.t0 = _context2["catch"](1);
						throw _context2.t0;

					case 9:
						output = void 0;
						_context2.next = 12;
						return function () {
							return new Promise(function (resolve, reject) {
								try {
									var x = crawlData(type, "remix");
									resolve(x);
								} catch (err) {
									reject(err);
								}
							});
						};

					case 12:
						getData = _context2.sent;
						_context2.next = 15;
						return getData().then(function (data) {
							output = data;
						}).catch(function (err) {
							throw err;
						});

					case 15:
						return _context2.abrupt("return", output);

					case 16:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, this, [[1, 6]]);
	}));

	return function remixes(_x3) {
		return _ref2.apply(this, arguments);
	};
}();
//# sourceMappingURL=index.js.map
