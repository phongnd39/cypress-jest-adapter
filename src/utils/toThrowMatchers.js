// edited version of Jest toThrowMatchers
import { isError } from './utils'

const getThrown = e => {
  const hasMessage =
    e !== null && e !== undefined && typeof e.message === 'string'

  if (hasMessage && typeof e.name === 'string' && typeof e.stack === 'string') {
    return {
      hasMessage,
      isError: true,
      message: e.message,
      value: e
    }
  }

  return {
    hasMessage,
    isError: false,
    message: hasMessage ? e.message : String(e),
    value: e
  }
}

export function createMatcher(matcherName, fromPromise) {
  return function(received, expected) {
    const options = {
      isNot: this.isNot,
      promise: this.promise
    }

    let thrown = null

    if (fromPromise && isError(received)) {
      thrown = getThrown(received)
    } else {
      if (typeof received !== 'function') {
        if (!fromPromise) {
          throw new Error(`${matcherName}: Received value must be a function`)
        }
      } else {
        try {
          received()
        } catch (e) {
          thrown = getThrown(e)
        }
      }
    }

    if (expected === undefined) {
      return toThrow(matcherName, options, thrown)
    } else if (typeof expected === 'function') {
      return toThrowExpectedClass(matcherName, options, thrown, expected)
    } else if (typeof expected === 'string') {
      return toThrowExpectedString(matcherName, options, thrown, expected)
    } else if (expected !== null && typeof expected.test === 'function') {
      return toThrowExpectedRegExp(matcherName, options, thrown, expected)
    } else if (
      expected !== null &&
      typeof expected.asymmetricMatch === 'function'
    ) {
      return toThrowExpectedAsymmetric(matcherName, options, thrown, expected)
    } else if (expected !== null && typeof expected === 'object') {
      return toThrowExpectedObject(matcherName, options, thrown, expected)
    } else {
      throw new Error(
        `${matcherName}: Expected value must be a string or regular expression or class or error`
      )
    }
  }
}

function toThrow(matcherName, options, thrown) {
  const pass = thrown !== null
  const message = {}
  return { message, pass }
}
function toThrowExpectedClass(matcherName, options, thrown, expected) {
  const pass = thrown !== null && thrown.value instanceof expected
  const message = {}
  return { message, pass }
}
function toThrowExpectedString(matcherName, options, thrown, expected) {
  const pass = thrown !== null && thrown.message.includes(expected)
  const message = {}
  return { message, pass }
}
function toThrowExpectedRegExp(matcherName, options, thrown, expected) {
  const pass = thrown !== null && expected.test(thrown.message)
  const message = {}
  return { message, pass }
}
function toThrowExpectedAsymmetric(matcherName, options, thrown, expected) {
  const pass = thrown !== null && expected.asymmetricMatch(thrown.value)
  const message = {}
  return { message, pass }
}
function toThrowExpectedObject(matcherName, options, thrown, expected) {
  const pass = thrown !== null && thrown.message === expected.message
  const message = {}
  return { message, pass }
}

const matchers = {
  toThrow: createMatcher('toThrow'),
  toThrowError: createMatcher('toThrowError')
}
export default matchers
