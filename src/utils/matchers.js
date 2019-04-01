import matchers from 'expect/build/matchers'
import toThrowMatcher from './toThrowMatchers'
import { equals } from 'expect/build/jasmineUtils'
import { getPath } from 'expect/build/utils'
import { applyJestMatcher, resolveExpected } from './utils'

export default function(chai, utils) {
  return {
    toHaveBeenCalled() {
      this.called
    },
    toHaveBeenCalledTimes(expected) {
      this.callCount(expected)
    },
    toHaveBeenCalledWith(...expected) {
      const received = utils.flag(this, 'object')
      const calls = received.getCalls()

      this.assert(
        calls.some(call => equals(call.args, expected)),
        `expected spy to have been called with arguments #{exp} at least once`,
        `expected spy not to have been called with arguments #{exp}`,
        expected
      )
    },
    toHaveBeenLastCalledWith(...expected) {
      const received = utils.flag(this, 'object')
      const lastCall = received.lastCall
      this.assert(
        equals(lastCall.args, expected),
        `expected last spy to have been called with arguments #{exp}, actual [${
          lastCall.args
        }]`,
        `expected last spy not to have been called with arguments #{exp}, actual [${
          lastCall.args
        }]`,
        expected
      )
    },
    toHaveBeenNthCalledWith(nth, ...expected) {
      const received = utils.flag(this, 'object')
      const nthCall = received.getCall(nth - 1)
      this.assert(
        equals(nthCall.args, expected),
        `expected spy ${nth} to have been called with arguments #{exp}, actual [${
          nthCall.args
        }]`,
        `expected spy ${nth} not to have been called with arguments #{exp}, actual [${
          nthCall.args
        }]`,
        expected
      )
    },
    toHaveReturned() {
      const received = utils.flag(this, 'object')
      const returnValues = received.returnValues
      this.assert(
        returnValues.length > 0,
        'expected spy to have returned at least once',
        'expected spy not to have returned anything'
      )
    },
    toHaveReturnedTimes(expected) {
      const received = utils.flag(this, 'object')
      const returnValues = received.returnValues
      this.assert(
        returnValues.length === expected,
        'expected spy to have returned #{exp} times',
        'expected spy not to have returned #{exp} times',
        expected
      )
    },
    toHaveReturnedWith(expected) {
      const received = utils.flag(this, 'object')
      const calls = received.getCalls()

      this.assert(
        calls.some(call => equals(call.returnValue, expected)),
        `expected spy to have returned #{exp} at least once`,
        `expected spy not to have returned #{exp}`,
        expected
      )
    },
    toHaveLastReturnedWith(expected) {
      const received = utils.flag(this, 'object')
      const lastCall = received.lastCall
      this.assert(
        equals(lastCall.returnValue, expected),
        `expected last spy to have returned #{exp}, actual [${lastCall.args}]`,
        `expected last spy not to have returned #{exp}, actual [${
          lastCall.args
        }]`,
        expected
      )
    },
    toHaveNthReturnedWith(nth, expected) {
      const received = utils.flag(this, 'object')
      const nthCall = received.getCall(nth - 1)
      this.assert(
        equals(nthCall.returnValue, expected),
        `expected spy ${nth} to have returned #{exp}, actual [${nthCall.args}]`,
        `expected spy ${nth} not to have returned #{exp}, actual [${
          nthCall.args
        }]`,
        expected
      )
    },
    toBe(expected) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(matchers.toBe, received, expected)
      this.assert(
        pass,
        'expected #{this} to equal #{exp}',
        'expected #{this} not to equal #{exp}',
        resolveExpected(expected)
      )
    },
    toBeCloseTo(expected, precision = 2) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(
        matchers.toBeCloseTo,
        received,
        expected,
        precision
      )
      this.assert(
        pass,
        `expected #{act} to be close to #{exp} +/- ${Math.pow(10, -precision)}`,
        `expected #{act} not to be close to #{exp} +/- ${Math.pow(
          10,
          -precision
        )}`,
        resolveExpected(expected),
        received
      )
    },
    toBeDefined() {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(matchers.toBeDefined, received)
      this.assert(
        pass,
        'expected #{this} to be defined',
        'expected #{this} not to be defined'
      )
    },
    toBeFalsy() {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(matchers.toBeFalsy, received)
      this.assert(
        pass,
        'expected #{this} to be falsy',
        'expected #{this} not to be falsy'
      )
    },
    toBeGreaterThan(expected) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(
        matchers.toBeGreaterThan,
        received,
        expected
      )
      this.assert(
        pass,
        'expected #{act} to be greater than #{exp}',
        'expected #{act} not to be greater than #{exp}',
        expected,
        received
      )
    },
    toBeGreaterThanOrEqual(expected) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(
        matchers.toBeGreaterThanOrEqual,
        received,
        expected
      )
      this.assert(
        pass,
        'expected #{act} to be greater than or equal #{exp}',
        'expected #{act} not to be greater than or equal #{exp}',
        expected,
        received
      )
    },
    toBeLessThan(expected) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(
        matchers.toBeLessThan,
        received,
        expected
      )
      this.assert(
        pass,
        'expected #{act} to be less than #{exp}',
        'expected #{act} not to be less than #{exp}',
        expected,
        received
      )
    },
    toBeLessThanOrEqual(expected) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(
        matchers.toBeLessThanOrEqual,
        received,
        expected
      )
      this.assert(
        pass,
        'expected #{act} to be less than or equal #{exp}',
        'expected #{act} not to be less than or equal #{exp}',
        expected,
        received
      )
    },
    toBeInstanceOf(expected) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(
        matchers.toBeInstanceOf,
        received,
        expected
      )
      this.assert(
        pass,
        'expected #{act} to be an instance of #{exp}',
        'expected #{act} not to be an instance of #{exp}',
        expected.name,
        received
      )
    },
    toBeNull() {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(matchers.toBeNull, received)
      this.assert(
        pass,
        'expected #{this} to be null',
        'expected #{this} not to be null'
      )
    },
    toBeTruthy() {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(matchers.toBeTruthy, received)
      this.assert(
        pass,
        'expected #{this} to be truthy',
        'expected #{this} not to be truthy'
      )
    },
    toBeUndefined() {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(matchers.toBeUndefined, received)
      this.assert(
        pass,
        'expected #{this} to be undefined',
        'expected #{this} not to be undefined'
      )
    },
    toBeNaN() {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(matchers.toBeNaN, received)
      this.assert(
        pass,
        'expected #{this} to be NaN',
        'expected #{this} not to be NaN'
      )
    },
    toContain(expected) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(matchers.toContain, received, expected)
      this.assert(
        pass,
        'expected #{act} to contain #{exp}',
        'expected #{act} not to contain #{exp}',
        expected,
        received
      )
    },
    toContainEqual(expected) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(
        matchers.toContainEqual,
        received,
        expected
      )
      this.assert(
        pass,
        'expected #{act} to contain #{exp}',
        'expected #{act} not to contain #{exp}',
        expected,
        received
      )
    },
    toEqual(expected) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(matchers.toEqual, received, expected)
      this.assert(
        pass,
        'expected #{act} to equal #{exp}',
        'expected #{act} not to equal #{exp}',
        resolveExpected(expected),
        received
      )
    },
    toHaveLength(expected) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(
        matchers.toHaveLength,
        received,
        expected
      )

      this.assert(
        pass,
        'expected #{this} to have length of #{exp}',
        'expected #{this} not to have length of #{exp}',
        expected
      )
    },
    toMatch(expected) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(matchers.toMatch, received, expected)
      this.assert(
        pass,
        'expected #{act} to match #{exp}',
        'expected #{act} not to match #{exp}',
        expected,
        received
      )
    },
    toMatchObject(expected) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(
        matchers.toMatchObject,
        received,
        expected
      )
      this.assert(
        pass,
        'expected #{act} to match object #{exp}',
        'expected #{act} not to match object #{exp}',
        expected,
        received
      )
    },
    toHaveProperty(property, value) {
      const received = utils.flag(this, 'object')
      const valuePassed = arguments.length === 2
      let { pass } = valuePassed
        ? applyJestMatcher(matchers.toHaveProperty, received, property, value)
        : applyJestMatcher(matchers.toHaveProperty, received, property)
      const path = getPath(received, property)
      const traversedPath = path.traversedPath.join('.')
      this.assert(
        pass,
        valuePassed
          ? `expected #{this} to have property #{exp} of ${value}`
          : 'expected #{this} to have property #{exp}',
        valuePassed
          ? `expected #{this} not to have property #{exp} of ${value}`
          : 'expected #{this} not to have property #{exp}',
        traversedPath
      )
    },
    toMatchSnapshot() {
      // not implement for now
    },
    toMatchInlineSnapshot() {
      // not implement for now
    },
    toStrictEqual(expected) {
      const received = utils.flag(this, 'object')
      const { pass } = applyJestMatcher(
        matchers.toStrictEqual,
        received,
        expected
      )
      this.assert(
        pass,
        'expected #{act} to equal #{exp}',
        'expected #{act} not to equal #{exp}',
        resolveExpected(expected),
        received
      )
    },
    toThrow(expected) {
      const received = utils.flag(this, 'object')
      const valuePassed = arguments.length === 1
      let { pass } = valuePassed
        ? applyJestMatcher(toThrowMatcher.toThrow, received, expected)
        : applyJestMatcher(toThrowMatcher.toThrow, received)
      this.assert(
        pass,
        valuePassed
          ? `expected function to throw error #{exp}`
          : 'expected function to throw error',
        valuePassed
          ? `expected function not to throw error #{exp}`
          : 'expected function not to throw error',
        expected
      )
    },
    toThrowErrorMatchingSnapshot() {
      // not implement for now
    },
    toThrowErrorMatchingInlineSnapshot() {
      // not implement for now
    }
  }
}
