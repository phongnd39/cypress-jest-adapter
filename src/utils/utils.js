const { separateMessageFromStack } = require('jest-message-util');
const { stringify } = require('jest-matcher-utils');

function isAsymmetricMatcher(obj) {
	return obj && typeof obj === 'object' && obj.constructor.__proto__.name === 'AsymmetricMatcher';
}

function dotNotationObject(key, value) {
	var object = {};
	var result = object;
	var arr = key.split('.');
	for (var i = 0; i < arr.length - 1; i++) {
		object = object[arr[i]] = {};
	}
	object[arr[arr.length - 1]] = value;
	return result;
}

function getActual(actual, promise) {
	if (promise === 'rejects') {
		return actual.message || actual;
	}
	return actual;
}

function getExpected(args, matcher, isNot) {
	let expected = args[0];

	// toBeCloseTo
	if (matcher.name == 'toBeCloseTo') {
		return args[0];
	}

	// toHaveProperty
	if (args.length == 2 && matcher.name == 'toHaveProperty') {
		return dotNotationObject(args[0], args[1]);
	}

	// matchers with multiple arguments
	if (args.length >= 2) {
		if (matcher.length === 1) { // e.g. toHaveBeenCalledWith(...args)
			return [...args];
		}

		if (args.length > matcher.length) { // e.g. toHaveBeenNthCalledWith(nthCall, ...args)
			var arr = [...args];
			arr.shift();
			return arr;
		}

		return args[1]; // e.g. toHaveNthReturnedWith(nthCall, args)
	}
	
	// asymmetric matchers
	if (isAsymmetricMatcher(expected)) {
		const matcherType = expected.toString();
		const exp = matcherType == 'StringMatching' ? expected.sample : JSON.stringify(expected.sample);
		return `${isNot ? 'not ' : ''}${matcherType} ${exp}`;
	}

	return expected;
}

function formatMatcherMessage(message, isNot, promise, actual) {

	// Missing received value
	if (message.indexOf('Received') == -1) {
		message += `\nReceived: ${stringify(actual)}`;
	}
	
	// Not
	if (isNot) {
		message = message.replace(/(Expected(:| number of calls:)) (?!not)/g, "$1 not ");
	} else {
		message = message.replace(/(Expected.*):.* not/g, '$1:');
	}

	// Rejected promise
	if (promise === 'rejects') {
		return separateMessageFromStack(message).message;
	}

	// Mocks/spies
	if (message.indexOf('toHaveBeenCalled') != -1 || message.indexOf('toHaveReturned') != -1 ) {
		message = message.replace('\n1: undefined\n2: undefined', '');

		if(isNot) {
			message = message.replace(/(Expected number of (calls|returns): )not 0/, "$10");
		} else {
			message = message.replace(/(Expected number of (calls|returns):) (0)/, '$1 1')
		}
	}

	return message;
}

module.exports = {
	getActual,
	getExpected,
	formatMatcherMessage
}
