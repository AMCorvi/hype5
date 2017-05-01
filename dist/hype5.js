'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remixes = exports.latest = exports.top = undefined;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var top = exports.top = function top(limit) {
    var x = (0, _nodeFetch2.default)('http://hypem.com/playlist/popular/3day/json/1/data.js').then(function (res) {
        return res.json();
    }).then(function (json) {
        if (limit && limit < 20) {
            var res = {};
            for (var i = 0; i <= limit - 1; i += 1) {
                res['' + i] = json['' + i];
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
    var x = (0, _nodeFetch2.default)('http://hypem.com/playlist/latest/all/json/1/data.json').then(function (res) {
        return res.json();
    }).then(function (json) {
        if (limit && limit < 20) {
            var res = {};
            for (var i = 0; i <= limit - 1; i += 1) {
                res['' + i] = json['' + i];
            }
            return res;
        }
        return json;
    }).catch(function (error) {
        return console.log(error);
    });

    return x;
};

var remixes = exports.remixes = function remixes(limit) {
    var x = (0, _nodeFetch2.default)('http://hypem.com/playlist/popular/remix/json/1/data.json').then(function (res) {
        return res.json();
    }).then(function (json) {
        if (limit && limit < 20) {
            var res = {};
            for (var i = 0; i <= limit - 1; i += 1) {
                res['' + i] = json['' + i];
            }
            return res;
        }
        return json;
    }).catch(function (error) {
        return console.log(error);
    });

    return x;
};
'use strict';

var expect = require('chai').expect;
var hype5 = require('../src/index.js');

describe("hype5", function () {
    describe(" 'top' method ", function () {

        it("'top' method should return promise", function () {

            function isAPromise(res) {
                return res instanceof Promise;
            };

            expect(hype5.top()).to.satisfy(isAPromise);
        });

        it(" Promise should contain object", function () {

            hype5.top().then(function (data) {
                expect(data).to.be.an('object');
            }).catch(function (err) {
                return console.log(err);
            });
        });

        it(" Promise data should contain certain properties", function () {
            hype5.top().then(function (data) {
                expect(data["0"]).to.contain.all.keys(["artist", "title", "posturl", "thumb_url"]);
            }).catch(function (err) {
                return console.log(err);
            });
        });

        it("should set response limit given parameter", function () {

            hype5.top(5).then(function (data) {
                expect(data, "should not contain index(or key) of or past 5").to.not.contain.any.keys('5');
                expect(data, "should contain indices (or keys) of 0,1,2,3,4").to.contain.any.keys('0', '1', '2', '3', '4');
            }).catch(function (err) {
                return console.log(err);
            });
        });
    });
});
//# sourceMappingURL=hype5.js.map
