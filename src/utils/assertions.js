import * as asyncMatchers from 'expect/build/asymmetricMatchers'
import jestExpect from 'expect'
import matchers from './matchers'
import jQueryMatchers from './jQueryMatchers'
import { enhanceAsyncMatcher, isPromise } from './utils'

export default function (chai, utils) {
  const Assertion = chai.Assertion
  const flag = utils.flag
  const assertMethods = matchers(chai, utils)
  const jQueryAssertMethods = jQueryMatchers(chai, utils)

  Object.keys(assertMethods).forEach((name) => {
    Assertion.addMethod(name, assertMethods[name])
  })
  Object.keys(jQueryAssertMethods).forEach((name) => {
    Assertion.addMethod(name, jQueryAssertMethods[name])
  })

  Assertion.addProperty('resolves', function () {
    const received = flag(this, 'object')
    if (!isPromise(received)) {
      throw new Error(`resolves: test value must be a Promise.`)
    }

    const methods = { not: {} }
    Object.keys(assertMethods).forEach((name) => {
      methods[name] = (...args) => {
        return received.then(
          (fulfillmentValue) => {
            flag(this, 'object', fulfillmentValue)
            return assertMethods[name].apply(this, args)
          },
          (error) =>
            (() => {
              throw new Error(
                `resolves: Received promise rejected instead of resolved. Rejected message: ${error.message}`
              )
            }).apply(this)
        )
      }
      methods.not[name] = (...args) => {
        return received.then(
          (fulfillmentValue) => {
            flag(this, 'negate', true)
            flag(this, 'object', fulfillmentValue)
            return assertMethods[name].apply(this, args)
          },
          (error) =>
            (() => {
              throw new Error(
                `resolves: Received promise rejected instead of resolved. Rejected message: ${error.message}`
              )
            }).apply(this)
        )
      }
    })
    return methods
  })
  Assertion.addProperty('rejects', function () {
    const received = flag(this, 'object')
    if (!isPromise(received)) {
      throw new Error(`rejects: test value must be a Promise.`)
    }

    const methods = { not: {} }
    Object.keys(assertMethods).forEach((name) => {
      methods[name] = (...args) => {
        return received.then(
          (fulfillmentValue) =>
            (() => {
              throw new Error(
                `rejects: Received promise resolved instead of rejected. Resolved value: ${fulfillmentValue}`
              )
            }).apply(this),
          (error) => {
            if (name === 'toThrow') {
              flag(this, 'object', () => {
                throw error
              })
            } else {
              flag(this, 'object', error)
            }
            return assertMethods[name].apply(this, args)
          }
        )
      }
      methods.not[name] = (...args) => {
        return received.then(
          (fulfillmentValue) =>
            (() => {
              throw new Error(
                `rejects: Received promise resolved instead of rejected. Resolved value: ${fulfillmentValue}`
              )
            }).apply(this),
          (error) => {
            flag(this, 'negate', true)
            if (name === 'toThrow') {
              flag(this, 'object', () => {
                throw error
              })
            } else {
              flag(this, 'object', error)
            }
            return assertMethods[name].apply(this, args)
          }
        )
      }
    })
    return methods
  })

  expect.anything = enhanceAsyncMatcher(
    asyncMatchers.anything,
    () => `Anything`
  )
  expect.any = enhanceAsyncMatcher(
    asyncMatchers.any,
    (args) => `Any ${args.name}`
  )
  expect.arrayContaining = enhanceAsyncMatcher(
    asyncMatchers.arrayContaining,
    (args) => `Array Containing [${args}]`
  )
  expect.objectContaining = enhanceAsyncMatcher(
    asyncMatchers.objectContaining,
    (args) => `Object Containing {${JSON.stringify(args)}}`
  )
  expect.stringContaining = enhanceAsyncMatcher(
    asyncMatchers.stringContaining,
    (args) => `String Containing ${args}`
  )
  expect.stringMatching = enhanceAsyncMatcher(
    asyncMatchers.stringMatching,
    (args) => `String Matching ${args}`
  )
  expect.not = {
    arrayContaining: enhanceAsyncMatcher(
      asyncMatchers.arrayNotContaining,
      (args) => `Array Not Containing [${args}]`
    ),
    objectContaining: enhanceAsyncMatcher(
      asyncMatchers.objectNotContaining,
      (args) => `Object Not Containing {${JSON.stringify(args)}}`
    ),
    stringContaining: enhanceAsyncMatcher(
      asyncMatchers.stringNotContaining,
      (args) => `String Not Containing ${args}`
    ),
    stringMatching: enhanceAsyncMatcher(
      asyncMatchers.stringNotMatching,
      (args) => `String Not Matching ${args}`
    ),
  }
  expect.assertions = jestExpect.assertions
  expect.hasAsertions = jestExpect.hasAssertions
}
