# Jest assertions for Cypress

cypress-jest-adapter provides set of custom assertions using jest assertion style to Cypress expect command

Allow to use jest style commands to do assertion:
```
expect(1).toEqual(1)
```
besides chai assertions style of 
```
expect(1).to.be.equal(1)
```
Also, can do assertions for jQuery elements return from cy.get() function directly:
```
expect($el).toHaveId
expect($el).toHaveClass
``` 

## Example

## Installation
```bash
yarn add cypress-jest-adapter
```

or

```bash
npm install --save cypress-jest-adapter
```

Add `cypress-jest-adapter` to cypress `support/index.js` file
```js
import 'cypress-jest-adapter'
```

## Assertions

### Available assertions:

#### Value assertion (using jest matchers)

|method                 |assertions                         |
|-----------------------|-----------------------------------|
|toBe                   |expect(sth).toBe                   |
|toBeCloseTo            |expect(sth).toBeCloseTo            |
|toBeDefined            |expect(sth).toBeDefined            |
|toBeFalsy              |expect(sth).toBeFalsy              |
|toBeGreaterThan        |expect(sth).toBeGreaterThan        |
|toBeGreaterThanOrEqual |expect(sth).toBeGreaterThanOrEqual |
|toBeLessThan           |expect(sth).toBeLessThan           |
|toBeLessThanOrEqual    |expect(sth).toBeLessThanOrEqual    |
|toBeInstanceOf         |expect(sth).toBeInstanceOf         |
|toBeNull               |expect(sth).toBeNull               |
|toBeTruthy             |expect(sth).toBeTruthy             |
|toBeUndefined          |expect(sth).toBeUndefined          |
|toBeNaN                |expect(sth).toBeNaN                |
|toContain              |expect(sth).toContain              |
|toContainEqual         |expect(sth).toContainEqual         |
|toEqual                |expect(sth).toEqual                |
|toHaveLength           |expect(sth).toHaveLength           |
|toMatch                |expect(sth).toMatch                |
|toMatchObject          |expect(sth).toMatchObject          |
|toHaveProperty         |expect(sth).toHaveProperty         |
|toStrictEqual          |expect(sth).toStrictEqual          |
|toThrow                |expect(sth).toThrow                |

#### Promise handlers

|method                 |assertions                         |
|-----------------------|-----------------------------------|
|resolves               |expect(sth).resolves.toBe(sth)     |
|rejects                |expect(sth).rejects.toThrow(error) |

#### Mock assertions (using chai, chai-sinon and jest equal assertion)

|method                 |assertions                         |
|-----------------------|-----------------------------------|
|toHaveBeenCalled       |expect(spy).toHaveBeenCalled       |
|toHaveBeenCalledTimes  |expect(spy).toHaveBeenCalledTimes  |
|toHaveBeenCalledWith   |expect(spy).toHaveBeenCalledWith   |
|toHaveBeenNthCalledWith|expect(spy).toHaveBeenNthCalledWith|
|toHaveReturned         |expect(spy).toHaveReturned         |
|toHaveReturnedTimes    |expect(spy).toHaveReturnedTimes    |
|toHaveReturnedWith     |expect(spy).toHaveReturnedWith     |
|toHaveLastReturnedWith |expect(spy).toHaveLastReturnedWith |
|toHaveNthReturnedWith  |expect(spy).toHaveNthReturnedWith  |

#### Assumptions

|method                 |assertions                                 |
|-----------------------|-------------------------------------------|
|anything               |expect(sth).toBe(expect.anything())        |
|any                    |expect(sth).toBe(expect.any())             |
|arrayContaining        |expect(sth).toBe(expect.arrayContaining()) |
|objectContaining       |expect(sth).toBe(expect.objectContaining())|
|stringContaining       |expect(sth).toBe(expect.stringContaining())|
|stringMatching         |expect(sth).toBe(expect.stringMatching())  |

#### Not implement Jest functions 

|method                             |
|-----------------------------------|
|toMatchSnapshot                    |
|toMatchInlineSnapshot              |
|toThrowErrorMatchingSnapshot       |
|toThrowErrorMatchingInlineSnapshot |
|assertions                         |
|hasAsertions                       |

For detailed usages, go to [jest expect documentation](https://jestjs.io/docs/en/expect)

#### Jest-Jquery assertions

|method                     |assertions                                                            |[chai-jquery equivalent](https://docs.cypress.io/guides/references/assertions.html#Chai-jQuery) |
|---------------------------|----------------------------------------------------------------------|------------------------|
|toHaveAttr                 |expect($ele).toHaveAttr(attribute: string, value?: string)            |to.have.attr            |
|toHaveProp                 |expect($ele).toHaveProp(property: string, value?: string)             |to.have.prop            |
|toHaveCss                  |expect($ele).toHaveCss(css: string/object, value?: string)            |to.have.css             |
|toHaveData                 |expect($ele).toHaveData(key: string, data?: string)                   |to.have.data            |
|toHaveClass                |expect($ele).toHaveClass(className: string)                           |to.have.class           |
|toHaveId                   |expect($ele).toHaveId(id: string)                                     |to.have.id              |
|toHaveHtml                 |expect($ele).toHaveHtml(html: string)                                 |to.have.html            |
|toHaveText                 |expect($ele).toHaveText(text: string)                                 |to.have.text            |
|toHaveValue                |expect($ele).toHaveValue(value: string)                               |to.have.value           |
|toBeVisible                |expect($ele).toBeVisible()                                            |to.be.visible           |
|toBeHidden                 |expect($ele).toBeHidden()                                             |to.be.hidden            |
|toBeSelected               |expect($ele).toBeSelected()                                           |to.be.selected          |
|toBeChecked                |expect($ele).toBeChecked()                                            |to.be.checked           |
|toBeEnabled                |expect($ele).toBeEnabled()                                            |to.be.enabled           |
|toBeDisabled               |expect($ele).toBeDisabled()                                           |to.be.disabled          |
|toBeEmpty                  |expect($ele).toBeEmpty()                                              |to.be.empty             |
|toExist                    |expect($ele).toExist()                                                |to.exist                |
|toBeMatchedBy              |expect($ele).toBeMatchedBy(selector: string)                          |to.match                |
|toMatchSelector            |expect($ele).toMatchSelector(selector: string)                        |to.match                |
|toContainText              |expect($ele).toContainText(text: string)                              |to.contain              |
|toHaveDescendant           |expect($ele).toHaveDescendant(selector: string)                       |to.have.descendants     |
|toHaveDescendantWithText   |expect($ele).toHaveDescendantWithText(selector: string, text: string) |                        |
|toHaveQuantity             |expect($ele).toHaveQuantity(length: number)                           |                        |
|toHaveTag                  |expect($ele).toHaveTag(tag: string)                                   |                        |
|toBeFocused                |expect($ele).toBeFocused()                                            |                        |


#### Used library:
+ [jest expect package](https://github.com/facebook/jest) for value assertions
+ cypress available chai-sinon package for mock assertions
+ chai assert function to provide results to cypress
+ [jest-jquery-matchers](https://github.com/unindented/custom-jquery-matchers/tree/master/packages/jest-jquery-matchers) for jest-jquery assertions

## License
[MIT](http://opensource.org/licenses/MIT)
