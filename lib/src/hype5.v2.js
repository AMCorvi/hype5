"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");
var exec = require("child_process").exec;
var path = require("path");

/** @module Hype5*/

/** Exported module object
 * @namespace Hype5
 */
var Hype5 = {};

/** Method retrieves track info for overall "top" rated songs
 * @function
 * @param {string} type The category name of track info desired ( popular || instance )
 * @param {object} sig signature object used for test via dependenct injections
 * @property {string} sig.filter filter type desired. Implemented by default to match method name.
 * @property {string} sig.retrieveTrackInfo function which return Promise containing trackInfo.
 * @property {string} sig.vData function used to validate argument type and values
 * @return {object} object containing track info of specified type and filter
 *
 * */
Hype5.top = methodFactory("top");

/** Method retrieves track info for "remixed" songs
 * @function
 * @param {string} type The category name of track info desired ( popular || instance )
 * @param {object} sig signature object used for test via dependenct injections
 * @property {string} sig.filter filter type desired. Implemented by default to match method name.
 * @property {string} sig.retrieveTrackInfo function which return Promise containing trackInfo.
 * @property {string} sig.vData function used to validate argument type and values
 *
 * @return {object} object containing track info of specified type and filter
 * */
Hype5.remixes = methodFactory("remix");

/** Method retrieves track info for song that are not "remixes"
 * @function
 * @param {string} type The category name of track info desired ( popular || instance )
 * @param {object} sig signature object used for test via dependenct injections
 * @property {string} sig.filter filter type desired. Implemented by default to match method name.
 * @property {string} sig.retrieveTrackInfo function which return Promise containing trackInfo.
 * @property {string} sig.vData function used to validate argument type and values
 *
 * @return {object} object containing track info as specified above
 * */
Hype5.noremixes = methodFactory("noremix");

/** Factory used to produced module method variations
 * @method
 * @private
 * @param {string} filter the category by which you would like to filter
 * @return {function} a function set to the desired filter as a default
 */
function methodFactory(fil) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "popular";
    var crawler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : casperjsFunction;
    var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : fil;
    var retrieveTrackInfo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getData;
    var vData = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : validate;
    var isTypeValid, d, output;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!type) {
              _context.next = 6;
              break;
            }

            isTypeValid = vData(type, filter);

            if (!(!isTypeValid || isTypeValid instanceof Error)) {
              _context.next = 4;
              break;
            }

            throw isTypeValid;

          case 4:
            _context.next = 7;
            break;

          case 6:
            type = "popular";

          case 7:

            // Set filter to null when to so:
            // when calling the top method ensure to correct url is called
            // by choosing the appropriate options in exec call
            filter === "top" && (filter = null);

            // Run casper script	& retrieve JSON data.
            d = retrieveTrackInfo(type, filter, crawler);
            output = void 0;
            _context.next = 12;
            return d.then(function (data) {
              return output = data;
            }).catch(function (err) {
              throw err;
            });

          case 12:
            return _context.abrupt("return", output);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
}

/** This function exec an appropriatley formatted 'casperjs' command with
 * the appropriate flags and data (as determined in the calling function) in
 * a child process. It then return json a json array of music data
 *
 * @protected
 * @param {string} type indicator of whether most "popular" or "latest" music is desired.
 * @param {string} filter the type of music you want listed (eg. top || remixes || noremixes
 * @returns {object} Array of objects contain blogged track info.
 */
function casperjsFunction(type, filter) {
  return new Promise(function (resolve, reject) {
    var data = function data(err, stdout) {
      try {
        // Convert string of JSON to the real deal...
        stdout = JSON.parse(stdout);
        resolve(stdout);
      } catch (err) {
        reject(err);
      }
    };

    if (type && filter) {
      exec("casperjs --verbose " + path.join(__dirname, "./crawler.js") + " --hypeType=" + type + " --hypeFilter=" + filter, data // Callback
      );
    } else if (type) {
      exec("casperjs --verbose " + path.join(__dirname, "./crawler.js") + " --hypeType=" + type, data // Callback
      );
    } else if (!type) {
      exec("casperjs --verbose " + path.join(__dirname, "./crawler.js"), data);
    }
  });
}

/** Manages call to casperFunc function, assigning appropriate arguments if any. Also, handles error.
 *
 * @protected
 * @param {string} type indicator of whether most "popular" or "latest" music is desired.
 * @param {string} filter the type of music you want leasted (eg. top || remixes || noremixes
 * @returns {Promise} Promise containing json from casperFunc or err if rejected.
 */
function getData(type, filter) {
  var crawler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : casperjsFunction;

  return new Promise(function (resolve, reject) {
    try {
      type ? resolve(crawler(type, filter)) : resolve(crawler());
    } catch (err) {
      reject(err);
    }
  });
}

/** Error Handling: Determines if valid parameters are passed to it. Returns error with clarifying message if not.
 *
 * @protected
 * @param {string} type indicator of whether most "popular" or "latest" music is desired.
 * @param {string} filter the type of music you want leasted (eg. top || remixes || noremixes
 * @returns {boolean} An Error on error. Or a true value if argument are correct
 */
function validate(type, filter) {
  //Verify that variable "type" is string return error otherwise
  if (typeof type !== "string") {
    return new Error("First parameter (type) must my string e.g. 'popular'|| 'latest' ");
  }

  //Verify that filter variable is a string or return error otherwise
  if (typeof filter !== "string") {
    return new Error("Third parameter 'filter' must be of type string and equal one of the follow variable eg. 'top'||'noremixes'||'remixes'");
  }

  if (type === "popular" || type === "latest") {
    return true;
  } else {
    return new Error("'popular' or 'latest' are the only valid values for type");
  }
}

/** Data resource for newly buzzing music using 'Hype Machine' as resource.  */
module.exports = Hype5;