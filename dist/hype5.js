'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remixes = exports.latest = exports.top = undefined;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var top = exports.top = function top() {
    var x = (0, _nodeFetch2.default)('https://hypem.com/playlist/popular/3day/json/1/data.json').then(function (res) {
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
//# sourceMappingURL=hype5.js.map
