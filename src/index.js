import "babel-polyfill";
import fetch from "node-fetch";
import {exec} from "child_process";

let crawlData = async function(type, filter) {
	// Variable to assign return data
	let returnValue;

	// Handle child process call asyncronously
	let data = new Promise(function(resolve, reject) {
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

		exec(
			`casperjs --verbose ./dist/crawler.js --hypeType=${type} --hypeFilter=${filter}`,
			puts,
		);
	});

	// pause for data and assign to returnValue variable
	await data.then(data => (returnValue = data));

	return returnValue;
};

export let top = limit => {
	let x = fetch("http://hypem.com/playlist/popular/3day/json/1/data.js")
		.then(res => res.json())
		.then(json => {
			if (limit && limit < 20) {
				let res = {};
				for (var i = 0; i <= limit - 1; i += 1) {
					res[`${i}`] = json[`${i}`];
				}
				return res;
			}
			return json;
		})
		.catch(error => console.log(error));

	return x;
};

export let latest = limit => {
	let x = fetch("http://hypem.com/playlist/latest/all/json/1/data.json")
		.then(res => res.json())
		.then(json => {
			if (limit && limit < 20) {
				let res = {};
				for (var i = 0; i <= limit - 1; i += 1) {
					res[`${i}`] = json[`${i}`];
				}
				return res;
			}
			return json;
		})
		.catch(error => console.log(error));

	return x;
};

export let remix = limit => {
	let x = fetch("http://hypem.com/playlist/popular/remix/json/1/data.json")
		.then(res => res.json())
		.then(json => {
			if (limit && limit < 20) {
				let res = {};
				for (var i = 0; i <= limit - 1; i += 1) {
					res[`${i}`] = json[`${i}`];
				}
				return res;
			}
			return json;
		})
		.catch(error => console.log(error));

	return x;
};

export let remixes = async function(type) {
	const options = ["popular", "latest"];

	try {

        // Compare filter parameter with list of possible valid filters
		if (!options.find(val => val === type)) {
			throw new Error(
				`\n \n Invalid Argument: \n \t Call of function 'remixes' made with invalid arg ${type}.\n \t Insert valid filter argument. \n \t e.g. ${options} \n\n`,
				"index.js",
				89,
			);

			let result;
			let getData = await function() {
				return new Promise((resolve, reject) => {
					try {
						let x = crawlData(type, "remix");
					} catch (err) {
						reject(err);
					}
					resolve(x);
				});
			};

			await getData()
				.then(data => {
					result = data;
				})
				.catch(err => {
					throw err;
				});
		}
	} catch (err) {
		return err.message;
	}

	return result;
};
