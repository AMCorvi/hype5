'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remixes = exports.latest = exports.top = undefined;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var top = exports.top = function top() {
    var x = (0, _nodeFetch2.default)('http://hypem.com/playlist/popular/3day/json/1/data.json').then(function (res) {
        return res.json();
    }).then(function (json) {
        return json;
    }).catch(function (error) {
        return console.log(error);
    });

    return x;
};

var latest = exports.latest = function latest() {
    var x = (0, _nodeFetch2.default)('http://hypem.com/playlist/latest/all/json/1/data.json').then(function (res) {
        return res.json();
    }).then(function (json) {
        return json;
    }).catch(function (error) {
        return console.log(error);
    });

    return x;
};

var remixes = exports.remixes = function remixes() {
    var x = (0, _nodeFetch2.default)('http://hypem.com/playlist/popular/remix/json/1/data.json').then(function (res) {
        return res.json();
    }).then(function (json) {
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
                return hype5.top() instanceof Promise;
            };

            expect(hype5.top()).to.satisfy(isAPromise);
        });

        it(" Promise should contain object", function () {
            var array = void 0;

            hype5.top().then(function (data) {
                expect(data).to.be.an('object');
            });
        });

        it(" Promise data should contain certain properties", function () {
            hype5.top().then(function (data) {
                console.log;
                expect(data["0"]).to.contain.all.keys(["artistslll", "titlelsslsls", "posturl", "thumb_url"]);
            });
        });
    });
});
//# sourceMappingURL=hype5.js.map
