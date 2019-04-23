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
  toStrictEqual(expected: any): void
  toThrow(expected: any): void
  not: JestAssertions
  resolves: JestAssertions
  reject: JestAssertions
}

interface JestJqueryAssertions {
  toHaveAttr(attribute: string, value?: string): void
  toNotHaveAttr(attribute: string, value?: string): void
  toHaveProp(property: string, value?: string): void
  toNotHaveProp(property: string, value?: string): void
  toHaveCss(css: string | object, value?: string): void
  toNotHaveCss(css: string | object, value?: string): void
  toHaveData(key: string, data?: string): void
  toNotHaveData(key: string, data?: string): void
  toHaveClass(className: string): void
  toNotHaveClass(className: string): void
  toHaveId(id: string): void
  toNotHaveId(id: string): void
  toHaveHtml(html: string | RegExp): void
  toNotHaveHtml(html: string | RegExp): void
  toHaveText(text: string | RegExp): void
  toNotHaveText(text: string | RegExp): void
  toHaveValue(value: string): void
  toNotHaveValue(value: string): void
  toBeVisible(): void
  toNotBeVisible(): void
  toBeHidden(): void
  toNotBeHidden(): void
  toBeSelected(): void
  toNotBeSelected(): void
  toBeChecked(): void
  toNotBeChecked(): void
  toBeEnabled(): void
  toNotBeEnabled(): void
  toBeDisabled(): void
  toNotBeDisabled(): void
  toBeEmpty(): void
  toNotBeEmpty(): void
  toExist(): void
  toNotExist(): void
  toBeMatchedBy(selector: string): void
  toNotBeMatchedBy(selector: string): void
  toMatchSelector(selector: string): void
  toNotMatchSelector(selector: string): void
  toContainText(text: string): void
  toNotContainText(text: string): void
  toHaveDescendant(selector: string): void
  toNotHaveDescendant(selector: string): void
  toHaveDescendantWithText(selector: string, text: string): void
  toNotHaveDescendantWithText(selector: string, text: string): void
  toHaveQuantity(length: number): void
  toNotHaveQuantity(length: number): void
  toHaveTag(tag: string): void
  toNotHaveTag(tag: string): void
  toBeFocused(): void
  toNotBeFocused(): void
}

type JestExpect = {
  any(classType: any): any
  arrayContaining(arr: any[]): any
  objectContaining(obj: {}): any
  stringMatching(str: string | RegExp): any
  stringContaining(str: string): any
}

declare namespace Chai {
  interface Assertion extends JestAssertions, JestJqueryAssertions {}
  type ExpectStatic = typeof chai.expect & JestExpect
}
