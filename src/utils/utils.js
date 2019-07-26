export function enhanceAsyncMatcher(asyncMatcher, toCypressOutput) {
  return args => {
    const matcher = asyncMatcher(args)
    matcher.toCypressOutput = () => toCypressOutput(args)
    return matcher
  }
}
export function applyJestMatcher(matcher, received, ...args) {
  return matcher.apply({ isNot: false, promise: '' }, [received, ...args])
}
export function resolveExpected(expected) {
  return isAsymmetric(expected)
    ? expected.toCypressOutput
      ? expected.toCypressOutput()
      : expected.toString()
    : expected
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
// Copied from https://github.com/graingert/angular.js/blob/a43574052e9775cbc1d7dd8a086752c979b0f020/src/Angular.js#L685-L693
export function isError(value) {
  switch (Object.prototype.toString.call(value)) {
    case '[object Error]':
      return true
    case '[object Exception]':
      return true
    case '[object DOMException]':
      return true
    default:
      return value instanceof Error
  }
}
export function isString(arg) {
  return typeof arg === 'string'
}
export function isNumber(arg) {
  return typeof arg === 'number'
}
export function isObject(arg) {
  return typeof arg === 'object' && !Array.isArray(arg)
}
