describe('Test Jest Syntax', function () {
  it('test toBe', () => {
    expect({ a: 1 }.a).toBe(1)
    expect({ a: 1 }.a).not.toBe(2)
    expect(NaN).toBe(NaN)
    ;[
      [1, 2],
      [true, false],
      [{}, {}],
      [{ a: 1 }, { a: 1 }],
      [{ a: 1 }, { a: 5 }],
      ['abc', 'cde'],
      ['with \ntrailing space', 'without trailing space'],
      [[], []],
      [null, undefined],
    ].forEach(([a, b]) => {
      expect(a).not.toBe(b)
    })
    ;[false, 1, 'a', undefined, null, {}, []].forEach((v) => {
      expect(v).toBe(v)
    })
  })

  it('test toBeCloseTo', () => {
    ;[
      [0, 0],
      [0, 0.001],
      [1.23, 1.229],
      [1.23, 1.226],
      [1.23, 1.225],
      [1.23, 1.234],
      [Infinity, Infinity],
      [-Infinity, -Infinity],
    ].forEach(([n1, n2]) => {
      expect(n1).toBeCloseTo(n2)
    })
    ;[
      [0, 0.01],
      [1, 1.23],
      [1.23, 1.2249999],
      [Infinity, -Infinity],
      [Infinity, 1.23],
      [-Infinity, -1.23],
    ].forEach(([n1, n2]) => {
      expect(n1).not.toBeCloseTo(n2)
    })
  })

  it('test toBeDefined - toBeUndefined', () => {
    ;[{}, [], true, 1, 'a', 0.5, new Map(), () => {}, Infinity].forEach((v) => {
      expect(v).toBeDefined()
      expect(v).not.toBeUndefined()
    })
    expect(undefined).not.toBeDefined()
    expect(undefined).toBeUndefined()
  })

  it('test toBeFalsy - toBeTruthy', () => {
    ;[{}, [], true, 1, 'a', 0.5, new Map(), () => {}, Infinity].forEach((v) => {
      expect(v).toBeTruthy()
      expect(v).not.toBeFalsy()
    })
    ;[false, null, NaN, 0, '', undefined].forEach((v) => {
      expect(v).toBeFalsy()
      expect(v).not.toBeTruthy()
    })
  })

  it('test toBeGreaterThan - toBeGreaterThanOrEqual - toBeLessThan - toBeLessThanOrEqual', () => {
    ;[
      [1, 2],
      [-Infinity, Infinity],
      [Number.MIN_VALUE, Number.MAX_VALUE],
      [0x11, 0x22],
      [0b11, 0b111],
      [0o11, 0o22],
      [0.1, 0.2],
    ].forEach(([small, big]) => {
      expect(small).toBeLessThan(big)
      expect(big).not.toBeLessThan(small)
      expect(big).toBeGreaterThan(small)
      expect(small).not.toBeGreaterThan(big)
      expect(small).toBeLessThanOrEqual(big)
      expect(big).not.toBeLessThanOrEqual(small)
      expect(big).toBeGreaterThanOrEqual(small)
      expect(small).not.toBeGreaterThanOrEqual(big)
    })
    ;[
      [1, 1],
      [Number.MIN_VALUE, Number.MIN_VALUE],
      [Number.MAX_VALUE, Number.MAX_VALUE],
      [Infinity, Infinity],
      [-Infinity, -Infinity],
    ].forEach(([n1, n2]) => {
      expect(n1).toBeGreaterThanOrEqual(n2)
      expect(n1).toBeLessThanOrEqual(n2)
    })
  })

  it('test toBeInstanceOf', () => {
    class A {}
    class B {}

    ;[
      [new Map(), Map],
      [[], Array],
      [new A(), A],
    ].forEach(([a, b]) => {
      expect(a).toBeInstanceOf(b)
    })
    ;[
      ['a', String],
      [1, Number],
      [true, Boolean],
      [new A(), B],
      [Object.create(null), A],
      [undefined, String],
      [null, String],
    ].forEach(([a, b]) => {
      expect(a).not.toBeInstanceOf(b)
    })
  })

  it('test toBeNull', () => {
    ;[{}, [], true, 1, 'a', 0.5, new Map(), () => {}, Infinity].forEach((v) => {
      expect(v).not.toBeNull()
    })
    expect(null).toBeNull()
  })

  it('test toBeNaN', () => {
    ;[NaN, Math.sqrt(-1), Infinity - Infinity, 0 / 0].forEach((v) => {
      expect(v).toBeNaN()
    })
    ;[1, '', null, [], 0.2, 0, Infinity, -Infinity].forEach((v) => {
      expect(v).not.toBeNaN()
    })
    expect(undefined).not.toBeNaN()
    expect({}).not.toBeNaN()
  })

  it('test toContain - toContainEqual', () => {
    const typedArray = new Int8Array(2)
    typedArray[0] = 0
    typedArray[1] = 1

    const iterable = {
      *[Symbol.iterator]() {
        yield 1
        yield 2
        yield 3
      },
    }
    expect(iterable).toContain(2)
    expect(iterable).toContainEqual(2)
    ;[
      [[1, 2, 3, 4], 1],
      [['a', 'b', 'c', 'd'], 'a'],
      [[undefined, null], null],
      [[undefined, null], undefined],
      [[Symbol.for('a')], Symbol.for('a')],
      ['abcdef', 'abc'],
      ['11112111', '2'],
      [new Set(['abc', 'def']), 'abc'],
      [typedArray, 1],
    ].forEach(([list, v]) => {
      expect(list).toContain(v)
    })
    ;[
      [[1, 2, 3], 4],
      [[null, undefined], 1],
      [[{}, []], []],
      [[{}, []], {}],
    ].forEach(([list, v]) => {
      expect(list).not.toContain(v)
    })
    ;[
      [[1, 2, 3, 4], 1],
      [['a', 'b', 'c', 'd'], 'a'],
      [[undefined, null], null],
      [[undefined, null], undefined],
      [[Symbol.for('a')], Symbol.for('a')],
      [[{ a: 'b' }, { a: 'c' }], { a: 'b' }],
      [new Set([1, 2, 3, 4]), 1],
      [typedArray, 1],
    ].forEach(([list, v]) => {
      expect(list).toContainEqual(v)
    })
    ;[[[{ a: 'b' }, { a: 'c' }], { a: 'd' }]].forEach(([list, v]) => {
      expect(list).not.toContainEqual(v)
    })
  })

  it('test toEqual', () => {
    ;[
      [true, false],
      [1, 2],
      [0, -0],
      [0, Number.MIN_VALUE],
      [Number.MIN_VALUE, 0],
      [{ a: 5 }, { b: 6 }],
      ['banana', 'apple'],
      [null, undefined],
      [[1], [2]],
      [
        [1, 2],
        [2, 1],
      ],
      [new Map(), new Set()],
      [new Set([1, 2]), new Set()],
      [new Set([1, 2]), new Set([1, 2, 3])],
      [new Set([[1], [2]]), new Set([[1], [2], [3]])],
      [new Set([[1], [2]]), new Set([[1], [2], [2]])],
      [
        new Set([new Set([1]), new Set([2])]),
        new Set([new Set([1]), new Set([3])]),
      ],
      [
        new Map([
          [1, 'one'],
          [2, 'two'],
        ]),
        new Map([[1, 'one']]),
      ],
      [new Map([['a', 0]]), new Map([['b', 0]])],
      [new Map([['v', 1]]), new Map([['v', 2]])],
      [new Map([[['v'], 1]]), new Map([[['v'], 2]])],
      [
        new Map([[[1], new Map([[[1], 'one']])]]),
        new Map([[[1], new Map([[[1], 'two']])]]),
      ],
      [{ a: 1, b: 2 }, expect.objectContaining({ a: 2 })],
      [false, expect.objectContaining({ a: 2 })],
      [[1, 3], expect.arrayContaining([1, 2])],
      [1, expect.arrayContaining([1, 2])],
      ['abd', expect.stringContaining('bc')],
      ['abd', expect.stringMatching(/bc/i)],
      [undefined, expect.anything()],
      [undefined, expect.any(Function)],
      [
        'Eve',
        {
          asymmetricMatch: function asymmetricMatch(who) {
            return who === 'Alice' || who === 'Bob'
          },
        },
      ],
      [
        {
          target: {
            nodeType: 1,
            value: 'a',
          },
        },
        {
          target: {
            nodeType: 1,
            value: 'b',
          },
        },
      ],
      [
        {
          nodeName: 'div',
          nodeType: 1,
        },
        {
          nodeName: 'p',
          nodeType: 1,
        },
      ],
    ].forEach(([a, b]) => {
      expect(a).not.toEqual(b)
    })
    ;[
      [true, true],
      [1, 1],
      [NaN, NaN],
      // eslint-disable-next-line no-new-wrappers
      [0, Number(0)],
      // eslint-disable-next-line no-new-wrappers
      [Number(0), 0],
      ['abc', 'abc'],
      // eslint-disable-next-line no-new-wrappers
      [String('abc'), 'abc'],
      // eslint-disable-next-line no-new-wrappers
      ['abc', String('abc')],
      [[1], [1]],
      [
        [1, 2],
        [1, 2],
      ],
      [{}, {}],
      [{ a: 99 }, { a: 99 }],
      [new Set(), new Set()],
      [new Set([1, 2]), new Set([1, 2])],
      [new Set([1, 2]), new Set([2, 1])],
      [new Set([[1], [2]]), new Set([[2], [1]])],
      [
        new Set([new Set([[1]]), new Set([[2]])]),
        new Set([new Set([[2]]), new Set([[1]])]),
      ],
      [new Set([[1], [2], [3], [3]]), new Set([[3], [3], [2], [1]])],
      [new Set([{ a: 1 }, { b: 2 }]), new Set([{ b: 2 }, { a: 1 }])],
      [new Map(), new Map()],
      [
        new Map([
          [1, 'one'],
          [2, 'two'],
        ]),
        new Map([
          [1, 'one'],
          [2, 'two'],
        ]),
      ],
      [
        new Map([
          [1, 'one'],
          [2, 'two'],
        ]),
        new Map([
          [2, 'two'],
          [1, 'one'],
        ]),
      ],
      [
        new Map([
          [[1], 'one'],
          [[2], 'two'],
          [[3], 'three'],
          [[3], 'four'],
        ]),
        new Map([
          [[3], 'three'],
          [[3], 'four'],
          [[2], 'two'],
          [[1], 'one'],
        ]),
      ],
      [
        new Map([
          [[1], new Map([[[1], 'one']])],
          [[2], new Map([[[2], 'two']])],
        ]),
        new Map([
          [[2], new Map([[[2], 'two']])],
          [[1], new Map([[[1], 'one']])],
        ]),
      ],
      [
        new Map([
          [[1], 'one'],
          [[2], 'two'],
        ]),
        new Map([
          [[2], 'two'],
          [[1], 'one'],
        ]),
      ],
      [
        new Map([
          [{ a: 1 }, 'one'],
          [{ b: 2 }, 'two'],
        ]),
        new Map([
          [{ b: 2 }, 'two'],
          [{ a: 1 }, 'one'],
        ]),
      ],
      [
        new Map([
          [1, ['one']],
          [2, ['two']],
        ]),
        new Map([
          [2, ['two']],
          [1, ['one']],
        ]),
      ],
      [{ a: 1, b: 2 }, expect.objectContaining({ a: 1 })],
      [[1, 2, 3], expect.arrayContaining([2, 3])],
      ['abcd', expect.stringContaining('bc')],
      ['abcd', expect.stringMatching('bc')],
      [true, expect.anything()],
      [() => {}, expect.any(Function)],
      [
        {
          a: 1,
          b: function b() {},
          c: true,
        },
        {
          a: 1,
          b: expect.any(Function),
          c: expect.anything(),
        },
      ],
      [
        'Alice',
        {
          asymmetricMatch: function asymmetricMatch(who) {
            return who === 'Alice' || who === 'Bob'
          },
        },
      ],
      [
        {
          nodeName: 'div',
          nodeType: 1,
        },
        {
          nodeName: 'div',
          nodeType: 1,
        },
      ],
    ].forEach(([a, b]) => {
      expect(a).toEqual(b)
    })
    ;(() => {
      // symbol based keys in arrays are processed correctly
      const mySymbol = Symbol('test')
      const actual1 = []
      actual1[mySymbol] = 3
      const actual2 = []
      actual2[mySymbol] = 4
      const expected = []
      expected[mySymbol] = 3
      expect(actual1).toEqual(expected)
      expect(actual2).not.toEqual(expected)
    })()
    ;(() => {
      // non-enumerable members should be skipped during equal
      const actual3 = {
        x: 3,
      }
      Object.defineProperty(actual3, 'test', {
        enumerable: false,
        value: 5,
      })
      expect(actual3).toEqual({ x: 3 })
    })()
    ;(() => {
      // non-enumerable symbolic members should be skipped during equal
      const actual4 = {
        x: 3,
      }
      const mySymbol2 = Symbol('test')
      Object.defineProperty(actual4, mySymbol2, {
        enumerable: false,
        value: 5,
      })
      expect(actual4).toEqual({ x: 3 })
    })()

    // cyclic object equality
    ;(() => {
      // properties with the same circularity are equal
      const a = {}
      a.x = a
      const b = {}
      b.x = b
      const c = {}
      c.x = a
      const d = {}
      d.x = b
      expect(a).toEqual(b)
      expect(b).toEqual(a)
      expect(c).toEqual(d)
      expect(d).toEqual(c)
    })()
    ;(() => {
      // properties with different circularity are not equal
      const a = {}
      a.x = { y: a }
      const b = {}
      const bx = {}
      b.x = bx
      bx.y = bx
      const c = {}
      c.x = a
      const d = {}
      d.x = b
      expect(a).not.toEqual(b)
      expect(b).not.toEqual(a)
      expect(c).not.toEqual(d)
      expect(d).not.toEqual(c)
    })()
    ;(() => {
      // are not equal if circularity is not on the same property
      const a = {}
      const b = {}
      a.a = a
      b.a = {}
      b.a.a = a
      const c = {}
      c.x = { x: c }
      const d = {}
      d.x = d
      expect(a).not.toEqual(b)
      expect(b).not.toEqual(a)
      expect(c).not.toEqual(d)
      expect(d).not.toEqual(c)
    })()
  })

  it('test toStrictEqual', () => {
    class TestClassA {
      constructor(a, b) {
        this.a = a
        this.b = b
      }
    }
    class TestClassB {
      constructor(a, b) {
        this.a = a
        this.b = b
      }
    }

    /* eslint-disable no-useless-constructor */
    const TestClassC = class Child extends TestClassA {
      constructor(a, b) {
        super(a, b)
      }
    }
    const TestClassD = class Child extends TestClassB {
      constructor(a, b) {
        super(a, b)
      }
    }
    /* eslint-enable */

    // does not ignore keys with undefined values
    expect({ a: undefined, b: 2 }).not.toStrictEqual({ b: 2 })

    // passes when comparing same type
    expect({
      test: new TestClassA(1, 2),
    }).toStrictEqual({ test: new TestClassA(1, 2) })

    expect({ test: 2 }).not.toStrictEqual({ test: new TestClassA(1, 2) })

    // does not pass for different types
    expect({ test: new TestClassA(1, 2) }).not.toStrictEqual({
      test: new TestClassB(1, 2),
    })

    // does not simply compare constructor names
    const c = new TestClassC(1, 2)
    const d = new TestClassD(1, 2)
    expect(c.constructor.name).toEqual(d.constructor.name)
    expect({ test: c }).not.toStrictEqual({ test: d })

    /* eslint-disable no-sparse-arrays */
    // passes for matching sparse arrays
    expect([, 1]).toStrictEqual([, 1])

    // does not pass when sparseness of arrays do not match
    expect([, 1]).not.toStrictEqual([undefined, 1])
    expect([undefined, 1]).not.toStrictEqual([, 1])
    expect([, , , 1]).not.toStrictEqual([, 1])

    // does not pass when equally sparse arrays have different values
    expect([, 1]).not.toStrictEqual([, 2])
    /* eslint-enable */
  })

  it('test toHaveLength', () => {
    ;[
      [[1, 2], 2],
      [[], 0],
      [['a', 'b'], 2],
      ['abc', 3],
      ['', 0],
    ].forEach(([received, length]) => {
      expect(received).toHaveLength(length)
    })
    ;[
      [[1, 2], 3],
      [[], 1],
      [['a', 'b'], 99],
      ['abc', 66],
      ['', 1],
    ].forEach(([received, length]) => {
      expect(received).not.toHaveLength(length)
    })
  })

  it('test toMatch', () => {
    ;[
      ['foo', 'foo'],
      ['Foo bar', /^foo/i],
    ].forEach(([n1, n2]) => {
      expect(n1).toMatch(n2)
    })
    ;[
      ['bar', 'foo'],
      ['bar', /foo/],
    ].forEach(([n1, n2]) => {
      expect(n1).not.toMatch(n2)
    })

    // escape string
    expect('this?: throws').toMatch('this?: throws')
  })

  it('toMatchObject', () => {
    class Foo {
      get a() {
        return undefined
      }
      get b() {
        return 'b'
      }
    }

    ;[
      [{ a: 'b', c: 'd' }, { a: 'b' }],
      [
        { a: 'b', c: 'd' },
        { a: 'b', c: 'd' },
      ],
      [
        { a: 'b', t: { x: { r: 'r' }, z: 'z' } },
        { a: 'b', t: { z: 'z' } },
      ],
      [{ a: 'b', t: { x: { r: 'r' }, z: 'z' } }, { t: { x: { r: 'r' } } }],
      [{ a: [3, 4, 5], b: 'b' }, { a: [3, 4, 5] }],
      [{ a: [3, 4, 5, 'v'], b: 'b' }, { a: [3, 4, 5, 'v'] }],
      [{ a: 1, c: 2 }, { a: expect.any(Number) }],
      [{ a: { x: 'x', y: 'y' } }, { a: { x: expect.any(String) } }],
      [new Set([1, 2]), new Set([1, 2])],
      [new Set([1, 2]), new Set([2, 1])],
      [new Date('2015-11-30'), new Date('2015-11-30')],
      [{ a: new Date('2015-11-30'), b: 'b' }, { a: new Date('2015-11-30') }],
      [{ a: null, b: 'b' }, { a: null }],
      [{ a: undefined, b: 'b' }, { a: undefined }],
      [{ a: [{ a: 'a', b: 'b' }] }, { a: [{ a: 'a' }] }],
      [
        [1, 2],
        [1, 2],
      ],
      [{ a: undefined }, { a: undefined }],
      [[], []],
      [new Error('foo'), new Error('foo')],
      [new Error('bar'), { message: 'bar' }],
      [new Foo(), { a: undefined, b: 'b' }],
      [Object.assign(Object.create(null), { a: 'b' }), { a: 'b' }],
    ].forEach(([n1, n2]) => {
      expect(n1).toMatchObject(n2)
    })
    ;[
      [{ a: 'b', c: 'd' }, { e: 'b' }],
      [
        { a: 'b', c: 'd' },
        { a: 'b!', c: 'd' },
      ],
      [{ a: 'a', c: 'd' }, { a: expect.any(Number) }],
      [
        { a: 'b', t: { x: { r: 'r' }, z: 'z' } },
        { a: 'b', t: { z: [3] } },
      ],
      [{ a: 'b', t: { x: { r: 'r' }, z: 'z' } }, { t: { l: { r: 'r' } } }],
      [{ a: [3, 4, 5], b: 'b' }, { a: [3, 4, 5, 6] }],
      [{ a: [3, 4, 5], b: 'b' }, { a: [3, 4] }],
      [{ a: [3, 4, 'v'], b: 'b' }, { a: ['v'] }],
      [{ a: [3, 4, 5], b: 'b' }, { a: { b: 4 } }],
      [{ a: [3, 4, 5], b: 'b' }, { a: { b: expect.any(String) } }],
      [
        [1, 2],
        [1, 3],
      ],
      [[0], [-0]],
      [new Set([1, 2]), new Set([2])],
      [new Date('2015-11-30'), new Date('2015-10-10')],
      [{ a: new Date('2015-11-30'), b: 'b' }, { a: new Date('2015-10-10') }],
      [{ a: null, b: 'b' }, { a: '4' }],
      [{ a: null, b: 'b' }, { a: undefined }],
      [{ a: undefined }, { a: null }],
      [{ a: [{ a: 'a', b: 'b' }] }, { a: [{ a: 'c' }] }],
      [{ a: 1, b: 1, c: 1, d: { e: { f: 555 } } }, { d: { e: { f: 222 } } }],
      [{}, { a: undefined }],
      [
        [1, 2, 3],
        [2, 3, 1],
      ],
      [
        [1, 2, 3],
        [1, 2, 2],
      ],
      [new Error('foo'), new Error('bar')],
      [Object.assign(Object.create(null), { a: 'b' }), { c: 'd' }],
    ].forEach(([n1, n2]) => {
      expect(n1).not.toMatchObject(n2)
    })
  })

  it('test toHaveProperty', () => {
    class Foo {
      get a() {
        return undefined
      }
      get b() {
        return 'b'
      }
      set setter(val) {
        this.val = val
      }
    }
    class Foo2 extends Foo {
      get c() {
        return 'c'
      }
    }
    const foo2 = new Foo2()
    foo2.setter = true

    function E(nodeName) {
      this.nodeName = nodeName.toUpperCase()
    }
    E.prototype.nodeType = 1

    const memoized = function () {}
    memoized.memo = []
    ;[
      [{ a: { b: { c: { d: 1 } } } }, 'a.b.c.d', 1],
      [{ a: { b: { c: { d: 1 } } } }, ['a', 'b', 'c', 'd'], 1],
      [{ 'a.b.c.d': 1 }, ['a.b.c.d'], 1],
      [{ a: { b: [1, 2, 3] } }, ['a', 'b', 1], 2],
      [{ a: 0 }, 'a', 0],
      [{ a: { b: undefined } }, 'a.b', undefined],
      [{ a: { b: { c: 5 } } }, 'a.b', { c: 5 }],
      [Object.assign(Object.create(null), { property: 1 }), 'property', 1],
      [new Foo(), 'a', undefined],
      [new Foo(), 'b', 'b'],
      [new Foo(), 'setter', undefined],
      [foo2, 'a', undefined],
      [foo2, 'c', 'c'],
      [foo2, 'val', true],
      ['', 'length', 0],
      [memoized, 'memo', []],
    ].forEach(([obj, keyPath, value]) => {
      expect(obj).toHaveProperty(keyPath, value)
    })
    ;[
      [{ a: { b: { c: { d: 1 } } } }, 'a.b.ttt.d', 1],
      [{ a: { b: { c: { d: 1 } } } }, 'a.b.c.d', 2],
      [{ 'a.b.c.d': 1 }, 'a.b.c.d', 2],
      [{ 'a.b.c.d': 1 }, ['a.b.c.d'], 2],
      [{ a: { b: { c: { d: 1 } } } }, ['a', 'b', 'c', 'd'], 2],
      [{ a: { b: { c: {} } } }, 'a.b.c.d', 1],
      [{ a: 1 }, 'a.b.c.d', 5],
      [{}, 'a', 'test'],
      [{ a: { b: 3 } }, 'a.b', undefined],
      [1, 'a.b.c', 'test'],
      ['abc', 'a.b.c', { a: 5 }],
      [{ a: { b: { c: 5 } } }, 'a.b', { c: 4 }],
      [new Foo(), 'a', 'a'],
      [new Foo(), 'b', undefined],
    ].forEach(([obj, keyPath, value]) => {
      expect(obj).not.toHaveProperty(keyPath, value)
    })
    ;[
      [{ a: { b: { c: { d: 1 } } } }, 'a.b.c.d'],
      [{ a: { b: { c: { d: 1 } } } }, ['a', 'b', 'c', 'd']],
      [{ 'a.b.c.d': 1 }, ['a.b.c.d']],
      [{ a: { b: [1, 2, 3] } }, ['a', 'b', 1]],
      [{ a: 0 }, 'a'],
      [{ a: { b: undefined } }, 'a.b'],
    ].forEach(([obj, keyPath]) => {
      expect(obj).toHaveProperty(keyPath)
    })
    ;[
      [{ a: { b: { c: {} } } }, 'a.b.c.d'],
      [{ a: 1 }, 'a.b.c.d'],
      [{}, 'a'],
      [1, 'a.b.c'],
      ['abc', 'a.b.c'],
      [false, 'key'],
      [0, 'key'],
      ['', 'key'],
      // eslint-disable-next-line symbol-description
      [Symbol(), 'key'],
      [Object.assign(Object.create(null), { key: 1 }), 'not'],
    ].forEach(([obj, keyPath]) => {
      expect(obj).not.toHaveProperty(keyPath)
    })
  })

  it('test toThrow', () => {
    expect(() => {
      throw new TypeError('error')
    }).toThrow('error')
    expect(() => {
      throw new TypeError('error')
    }).toThrow(/error/)
    expect(() => {
      throw new TypeError('error')
    }).toThrow(TypeError)
    expect(() => {
      throw new TypeError('error')
    }).toThrow(Error)
    expect(() => {
      throw new TypeError('error')
    }).toThrow(new TypeError('error'))
  })

  it('Listing jest stub and spy syntax here', () => {
    const spy = cy.spy((...args) => args)
    const fn = (spy) => {
      spy('abc')
    }
    const fn2 = (spy) => {
      spy('def', 123)
    }

    fn(spy)
    expect(spy).toHaveBeenCalled()

    fn(spy) // 2nd call
    expect(spy).toHaveBeenCalledTimes(2)

    fn(spy)
    expect(spy).toHaveBeenCalledWith('abc')

    fn2(spy) // 4th call
    expect(spy).toHaveBeenLastCalledWith('def', 123)

    expect(spy).toHaveBeenNthCalledWith(2, 'abc') // check 2nd call
    expect(spy).toHaveBeenNthCalledWith(4, 'def', 123) // check 4th call

    expect(spy).toHaveReturned()

    expect(spy).toHaveReturnedTimes(4)

    fn(spy) // 5th call
    expect(spy).toHaveReturnedWith(['abc'])

    fn2(spy) // 6th call
    expect(spy).toHaveLastReturnedWith(['def', 123])

    expect(spy).toHaveNthReturnedWith(5, ['abc']) // 5th call
  })

  it('Extends expect', () => {
    const spy = cy.spy((...args) => args)
    const fn = (spy) => {
      spy('abc')
    }
    fn(spy)
    expect(spy).toHaveBeenCalledWith(expect.anything())
    expect(spy).toHaveBeenCalledWith(expect.any(String))

    expect('abc').toEqual(expect.anything())
    expect('abc').toEqual(expect.any(String))

    const expected = ['Alice', 'Bob']
    expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected))
    expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected))

    expect({ x: 3, y: 5 }).toEqual(
      expect.objectContaining({
        x: expect.any(Number),
        y: expect.any(Number),
      })
    )

    expect('qwerty').toEqual(expect.stringContaining('ty'))
    expect('qwerty').not.toEqual(expect.stringContaining('abc'))

    const expected2 = [
      expect.stringMatching(/^Alic/),
      expect.stringMatching(/^[BR]ob/),
    ]
    expect(['Alicia', 'Roberto', 'Evelina']).toEqual(
      expect.arrayContaining(expected2)
    )
    expect(['Roberto', 'Evelina']).not.toEqual(
      expect.arrayContaining(expected2)
    )

    expect('abc').toEqual(expect.not.stringMatching(/dev/))

    expect([{ foo: 'bar' }, { baz: 1 }]).toMatchObject([
      expect.objectContaining({ foo: 'bar' }),
      expect.objectContaining({ baz: 1 }),
    ])
  })

  it('resolves', async () => {
    await expect(Promise.resolve('abc')).resolves.toEqual('abc')
    await expect(Promise.resolve('lemon')).resolves.not.toBe('octopus')
  })

  it('rejects', async () => {
    await expect(Promise.reject(new Error('abc'))).rejects.toThrow('abc')
    await expect(Promise.reject(new Error('abc'))).rejects.not.toEqual(
      new Error('abcd')
    )
  })
})
