import * as jQueryMatchers from 'jest-jquery-matchers'
import $ from 'jquery'

const Assertion = chai.Assertion;

Object.keys(jQueryMatchers).forEach((key) => {
  Assertion.addMethod(key, function () {
    const result = jQueryMatchers[key]().compare(this._obj, ...arguments);
    const isNot = chai.util.flag(this, 'negate');
    let msg = result.message().replace(/'/g, '`');

    if (result.pass) {
      msg = msg.replace('not to', 'to');
    }

    if (isNot) {
      msg = msg.replace('element to', 'element not to');
    }

    msg = msg.replace('Expected element', 'expected #{this}');
    this.assert(result.pass, msg, msg);
  });
});

Assertion.addMethod('toContainText', function (text) {
  const pass = $(this._obj).is(`:contains(${text})`);
  this.assert(
    pass,
    `expected #{this} to contain ${text}`,
    `expected #{this} not to contain ${text}`
  );
});

Assertion.addMethod('toHaveQuantity', function (length) {
  const { pass } = jQueryMatchers.toHaveLength().compare(this._obj, length)
  this.assert(
    pass,
    `expected #{this} to have length ${length}`,
    `expected #{this} not to have length ${length}`
  );
});

Assertion.addMethod('toBeEnabled', function () {
  const { pass } = jQueryMatchers.toBeDisabled().compare(this._obj);
  this.assert(
    !pass,
    `expected #{this} to be enabled`,
    `expected #{this} not to be enabled`
  );
});

