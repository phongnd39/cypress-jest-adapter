interface JestAssertions {
  toHaveBeenCalled(): void
  toHaveBeenCalledTimes(expected: any): void
  toHaveBeenCalledWith(...expected: any[]): void
  toHaveBeenLastCalledWith(...expected: any[]): void
  toHaveBeenNthCalledWith(nth: number, ...expected: any[]): void
  toHaveReturned(): void
  toHaveReturnedTimes(expected: any): void
  toHaveReturnedWith(expected: any): void
  toHaveLastReturnedWith(expected: any): void
  toHaveNthReturnedWith(nth: number, ...expected: any[]): void
  toBe(expected: any): void
  toBeCloseTo(expected: any, precision?: number): void
  toBeDefined(): void
  toBeFalsy(): void
  toBeGreaterThan(expected: any): void
  toBeGreaterThanOrEqual(expected: any): void
  toBeLessThan(expected: any): void
  toBeLessThanOrEqual(expected: any): void
  toBeInstanceOf(expected: any): void
  toBeNull(): void
  toBeTruthy(): void
  toBeUndefined(): void
  toBeNaN(): void
  toContain(expected: any): void
  toContainEqual(expected: any): void
  toEqual(expected: any): void
  toHaveLength(expected: any): void
  toMatch(expected: any): void
  toMatchObject(expected: any): void
  toHaveProperty(property: any, value?: any): void
  toMatchSnapshot(): void
  toMatchInlineSnapshot(): void
  toStrictEqual(expected: any): void
  toThrow(expected: any): void
  toThrowErrorMatchingSnapshot(): void
  toThrowErrorMatchingInlineSnapshot(): void
  not: JestAssertions
  resolves: JestAssertions
  reject: JestAssertions
}

type JestExpect = {
  any(classType: any): any
  arrayContaining(arr: any[]): any
  objectContaining(obj: {}): any
  stringMatching(str: string | RegExp): any
  stringContaining(str: string): any
}

declare namespace Chai {
  interface Assertion extends JestAssertions {}
  type ExpectStatic = typeof chai.expect & JestExpect
}
