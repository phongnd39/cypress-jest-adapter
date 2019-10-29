import './utils/jQueryMatchers'
import jestExpect from './utils/expect'
import jestExpectPackage from 'expect'

// Make chai not compatible with jest matchers
const originalNot = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, 'not').get;
Object.defineProperty(chai.Assertion.prototype, 'not', {
	get() {
		Object.assign(this, this.assignedNot);
		return originalNot.apply(this);
	},
	set(newNot) {
		this.assignedNot = newNot;
		return newNot;
	},
});

// Add jest matchers to global expect
global.expect = (actual) => {
	// Format Cypress spies/mocks as Jest spies/mocks
	if (typeof actual === 'function' && actual._cyType === 'spy') {
		actual._isMockFunction = true;
		actual.getMockName = () => actual._cyName;
		actual.mock = {
			calls: actual.args,
			results: actual.getCalls().map((x) => {
				return {
					type: x.exception !== undefined ? 'exception' : 'return',
					value: x.exception !== undefined ? x.exception : x.returnValue,
				}
			})
		};
	}

	const originalMatchers = jestExpect(actual);
	const chaiMatchers = chai.expect(actual);
	const combinedMatchers = Object.assign(chaiMatchers, originalMatchers);
	return combinedMatchers;
};

Object.keys(jestExpectPackage).forEach(key => (global.expect[key] = jestExpectPackage[key]));
Object.keys(jestExpect).forEach(key => (global.expect[key] = jestExpect[key]))