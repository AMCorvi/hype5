require('babel-polyfill');
const exec = require('child_process').exec;

function hype5() {

let top = async function (type, crawlFunction = casperjsFunction, filter = 'top') {
		//check if "type" parameter is valid value
		// if not thorw error
		if (type) {
			const isTypeValid = validType(type, filter);
			if (!isTypeValid) throw isTypeValid;
		} else {
			type = 'popular';
		}

		// run casper script retrieve JSON data.
		const d = getData(type, filter);
		let output;
		await d.then((data) => (output = data)).catch((err) => {
			throw err;
		});

		return output;
	}

    return {
        top: top
    }

}

function casperjsFunction (type, filter) {
    return new Promise(function(resolve, reject) {
        const data = function(err, stdout) {
            try {
                resolve(stdout);
            } catch (err) {
                reject(err);
            }
        };

        if (type && filter) {
            exec('casperjs --verbose ./crawler.js '
                + '--hypeType=' + type
                + '--hypeFilter=' + filter, data);
        } else if (type) {
            exec('casperjs --verbose ./crawler.js '
                + '--hypeType=' + type
                + '--hypeFilter=' + filter, data);
        } else if (!type) {
            exec('casperjs --verbose ./crawler.js ', data);
        }
    });
}

function getData (type, filter) {
    return new Promise((resolve, reject) => {
        try {
            type ? resolve(casperjsFunction(type,filter)) : resolve(casperjsFunction());
        } catch (err) {
            reject(err);
        }
    });
}

function validType (type,filter) {
    if (typeof type !== 'string') {
        return new Error("First parameter (type) must my string e.g. 'popular'|| 'latest' ");
    }
    //Verify that filter variable is a string or throw error elsewise
    if (typeof filter !== "string" ) {
        return new Error("Third parameter 'filter' must be of type string and equal one of the follow variable eg. 'top'||'noremixes'||'remixes'");
    }
    const typeValid = type === 'popular' || 'latest';
    if (!type) return new Error("'popular' or 'latest' are the only valid type");
    type ? true : false;
}


module.exports = hype5
