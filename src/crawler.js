var casper = require("casper").create();
var utils = require("utils");

casper.options.waitTimeout = 5000
var tracks = [];

/**
 * IIFE sets variable only hypeFilter varibale only if such option was provided
 *
 * @returns {object} map of options specifying search type wanted
 */
//
var opt = (function() {
  var options = {};
  casper.cli.has("hypeType")
    ? (options.type = casper.cli.get("hypeType"))
    : null;
  casper.cli.has("hypeFilter")
    ? (options.filter = casper.cli.get("hypeFilter"))
    : null;
  return options;
})();


// TODO: Document
function getTrackInfo(tracks) {
  tracks;
  var element = document.getElementsByClassName("section-track");
  var cool = Array.prototype.map.call(element, function(element) {
    var artist = element.querySelector(".artist").text;
    var trackName = element.querySelector(".track").text;
    var postLink = element.querySelector(".readpost").getAttribute("href");
    var descFunc = function() {
      var descUnfiltered = element.querySelector(".post_info").textContent;
      // var regex = /“(?:[^\\"]+|\\.)*”/m ;
      // var result = descUnfiltered.match(regex);
      var end = descUnfiltered.indexOf("”") - 1;
      var start = descUnfiltered.indexOf("“") + 1;
      var result = descUnfiltered.substr(start, end - start);

      return result;
    };
    var desc = descFunc();
    var color = element.querySelector("a.thumb").style.cssText;

    var blogName = element.querySelector(".blog-fav-off").text;

    return {
      artist: artist,
      link: postLink,
      descrip: desc,
      thumbnail: color,
      song: trackName,
      blogName: blogName
    };
  });
  return tracks.concat(cool);
}

/**
 * Scan Hype Machine
 *
 * @param {string} type class of track info request [latest track or most popular tracks]
 * @param {array} filter filter for specifed class of tracks [none, remixes, noremixes]
 * @returns {array} An array of tracks information
 */
function scanHype(type, filter) {
  // set 'type' variable to popular as default if valid value is not provided
  type = type || "popular";

  // check variable and set correct url
  var url = !filter
    ? "http://hypem.com/"+type+"/"+filter
    : "http://hypem.com/"+type;

    /**
     * Start phantomjs instance that crawls url scraping data as instructed by callback function
     *
     * @returns {array} An array of track info from endpoint specified
     */
  casper.start(url, function() {
    this.waitForSelector(".post_info", function() {
      var info = this.evaluate(getTrackInfo, []);
      return (tracks = info);
    });
  });

  casper.then(function() {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(tracks, null, 2));
  });

  casper.run();
}

if (opt.filter) {
  scanHype(opt.type, opt.filter);
} else {
  scanHype(opt.type);
}
