var casper = require("casper").create();

var tracks = [];
var hypeType = casper.cli.get("hypeType");
var hypeFilter = casper.cli.get("hypeFilter");


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
			blogName: blogName,
		};
	});
	return tracks.concat(cool);
}

function scanHype(type, filter) {

	var url = filter
		? "http://hypem.com"
		: "http://hypem.com/" + type + "/" + filter;

	casper.start(url, function() {
		this.waitForSelector(".post_info", function() {
			var info = this.evaluate(getTrackInfo, []);
			return (tracks = info);
		});
	});

	casper.then(function() {
		console.log(JSON.stringify(tracks, null, 2));
	});

	casper.run();
}

scanHype(hypeType, hypeFilter);
