export function enhanceAsyncMatcherToStringFn(asyncMatcher, toStringFn) {
  return args => {
    const matcher = asyncMatcher(args)
    matcher.toString = () => toStringFn(args)
    return matcher
  }
}
export function applyJestMatcher(matcher, received, ...args) {
  return matcher.apply({ isNot: false, promise: '' }, [received, ...args])
}
export function resolveExpected(expected) {
  return isAsymmetric(expected) ? expected.toString() : expected
}
export function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}
export function isAsymmetric(obj) {
  return !!obj && isA('Function', obj.asymmetricMatch)
}
export function isA(typeName, value) {
  return Object.prototype.toString.apply(value) === '[object ' + typeName + ']'
}
