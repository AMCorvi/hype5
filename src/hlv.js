require("babel-polyfill");
const exec = require("child_process").exec;
const path = require("path");

/** @module Hype5*/

/** Exported module object
	* @namespace Hype5
	*/
const Hype5 = {};

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
Hype5.remixes = methodFactory("remixes");

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
Hype5.noremixes = methodFactory("noremixes");

/** Factory used to produced module method variations
 * @method
 * @private
 * @param {string} filter the category by which you would like to filter
 * @return {function} a function set to the desired filter as a default
 */
function methodFactory(filter) {
  return async function(
    type = "popular",
    sig = {
      filter: filter,
      retrieveTrackInfo: getData,
      vData: validate
    }
  ) {
    // Check if "type" parameter is valid value
    // if not throw error
    if (type) {
      const isTypeValid = sig.vData(type, sig.filter);
      if (!isTypeValid || isTypeValid instanceof Error) throw isTypeValid;
    } else {
      type = "popular";
    }

    // Run casper script	& retrieve JSON data.
    const d = sig.retrieveTrackInfo(type, sig.filter);
    let output;
    await d.then(data => (output = data)).catch(err => {
      throw err;
    });

    return output;
  };
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
  return new Promise(function(resolve, reject) {
    const data = function(err, stdout) {
      try {
        resolve(stdout);
      } catch (err) {
        reject(err);
      }
    };

    if (type && filter) {
      exec(
        "casperjs --verbose " +
          path.join(__dirname, "./crawler.js") +
          " --hypeType=" +
          type +
          " --hypeFilter=" +
          filter,
        data
      );
    } else if (type) {
      exec(
        " casperjs --verbose ./crawler.js " +
          path.join(__dirname, "./crawler.js") +
          " --hypeType=" +
          type +
          " --hypeFilter=" +
          filter,
        data
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
function getData(type, filter, crawler = casperjsFunction) {
  return new Promise((resolve, reject) => {
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
    return new Error(
      "First parameter (type) must my string e.g. 'popular'|| 'latest' "
    );
  }
  //Verify that filter variable is a string or return error otherwise
  if (typeof filter !== "string") {
    return new Error(
      "Third parameter 'filter' must be of type string and equal one of the follow variable eg. 'top'||'noremixes'||'remixes'"
    );
  }
  const typeIsValid = type === ("popular" || "latest");
  if (!typeIsValid) {
    return new Error("'popular' or 'latest' are the only valid type");
  } else {
    return true;
  }
}

/** Data resource for newly buzzing music using 'Hype Machine' as resource.  */
module.exports = Hype5;
