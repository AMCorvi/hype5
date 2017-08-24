import "babel-polyfill";
import { exec } from "child_process";

async function runCasper(type, filter) {
	// Variable to assign return data
	let returnValue;

	// Handle child process call asyncronously
	const data = new Promise((resolve, reject) => {
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
			puts
		);
	});

	// pause for data and assign to returnValue variable
	await data.then(trackData => (returnValue = trackData));

	return returnValue;
}

export const noremixes = () => {};

export const remixes = async (type, crawlFunc = runCasper) => {
	// list of options that are actually valid
	const options = ["popular", "latest"];
	// Value assigned to and return by function
	let output;

	// Compare filter parameter with list of possible valid filters
	try {
		if (!options.find(val => val === type)) {
			throw new SyntaxError(
				` \n\n \t Call of function 'remixes' made with invalid arg ${type}.\n\t Insert valid filter argument. \n\t e.g. ${options}\n`,
				"index.js",
				89
			);
		}
	} catch (e) {
		throw e;
	}

	const getData = () => {
		return new Promise((resolve, reject) => {
			try {
				const x = crawlFunc(type, "remix");
				resolve(x);
			} catch (err) {
				reject(err);
			}
		});
	};

	await getData()
		.then(data => {
			output = data;
		})
		.catch(err => {
			throw err;
		});

	return output;
};
