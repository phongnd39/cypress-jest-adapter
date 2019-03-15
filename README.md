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

###Available assertions:

####Value assertion (using jest matchers)
|method|assertions|
|----------------------|----------------------------------|
|toBe|expect(sth).toBe|
|toBeCloseTo|expect(sth).toBeCloseTo|
|toBeDefined|expect(sth).toBeDefined|
|toBeFalsy|expect(sth).toBeFalsy|
|toBeGreaterThan|expect(sth).toBeGreaterThan|
|toBeGreaterThanOrEqual|expect(sth).toBeGreaterThanOrEqual|
|toBeLessThan|expect(sth).toBeLessThan|
|toBeLessThanOrEqual|expect(sth).toBeLessThanOrEqual|
|toBeInstanceOf|expect(sth).toBeInstanceOf|
|toBeNull|expect(sth).toBeNull|
|toBeTruthy|expect(sth).toBeTruthy|
|toBeUndefined|expect(sth).toBeUndefined|
|toBeNaN|expect(sth).toBeNaN|
|toContain|expect(sth).toContain|
|toContainEqual|expect(sth).toContainEqual|
|toEqual|expect(sth).toEqual|
|toHaveLength|expect(sth).toHaveLength|
|toMatch|expect(sth).toMatch|
|toMatchObject|expect(sth).toMatchObject|
|toHaveProperty|expect(sth).toHaveProperty|
|toStrictEqual|expect(sth).toStrictEqual|
|toThrow|expect(sth).toThrow|

####Promise handlers
|method|assertions|
|----------------------|----------------------------------|
|resolves|expect(sth).resolves.toBe(sth)|
|rejects|expect(sth).rejects.toThrow(error)|

####Mock assertions (using chai-sinon and chai and jest equal assertion)
|method|assertions|
|----------------------|----------------------------------|
|toHaveBeenCalled|expect(spy).toHaveBeenCalled|
|toHaveBeenCalledTimes|expect(spy).toHaveBeenCalledTimes|
|toHaveBeenCalledWith|expect(spy).toHaveBeenCalledWith|
|toHaveBeenNthCalledWith|expect(spy).toHaveBeenNthCalledWith|
|toHaveReturned|expect(spy).toHaveReturned|
|toHaveReturnedTimes|expect(spy).toHaveReturnedTimes|
|toHaveReturnedWith|expect(spy).toHaveReturnedWith|
|toHaveLastReturnedWith|expect(spy).toHaveLastReturnedWith|
|toHaveNthReturnedWith|expect(spy).toHaveNthReturnedWith|

####Assumptions
|method|assertions|
|----------------------|----------------------------------|
|anything|expect(sth).toBe(expect.anything())|
|any|expect(sth).toBe(expect.any())|
|arrayContaining|expect(sth).toBe(expect.arrayContaining())|
|objectContaining|expect(sth).toBe(expect.objectContaining())|
|stringContaining|expect(sth).toBe(expect.stringContaining())|
|stringMatching|expect(sth).toBe(expect.stringMatching())|

For detailed usages, go to [jest expect documentation](https://jestjs.io/docs/en/expect)

####Used library:
+ [jest expect package](https://github.com/facebook/jest) for value assertions
+ cypress available chai-sinon package for mock assertions
+ chai assert function to provide results to cypress

## License
[MIT](http://opensource.org/licenses/MIT)
