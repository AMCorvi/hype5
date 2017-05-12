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
//# sourceMappingURL=hype5.js.map
