const testResults = {};

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state !== 'pending') {

    const suite = runnable.parent.parent.title;
    const parent = runnable.parent.title;
    const title = `${parent} - ${test.title}`;

    testResults[suite] = testResults[suite] || {};
    testResults[suite][title] = (runnable.commands || []).filter((command) => {
      return command.hookName === 'test' && command.name !== 'spy-1';
    }).map((command) => {
      var cmd = Object.assign({}, command.consoleProps);
      cmd.state = command.state;
      cmd.suite = suite;
      delete cmd.Command;
      delete cmd.subject;
      delete cmd.Error;

      return cmd;
    });
  }
});

describe('messages', () => {
  describe('value assertions', () => {
    var tests = {
      'toBeUndefined': {
        expected: [],
        actualPass: undefined,
        actualFail: 5
      },
      'toBeDefined': {
        expected: [],
        actualPass: 5,
        actualFail: undefined
      },
      'toBeNull': {
        expected: [],
        actualPass: null,
        actualFail: 5
      },
      'toBeNaN': {
        expected: [],
        actualPass: NaN,
        actualFail: 5
      },
      'toBeTruthy': {
        expected: [],
        actualPass: true,
        actualFail: false
      },
      'toBeFalsy': {
        expected: [],
        actualPass: false,
        actualFail: 5
      },
      'toEqual,toStrictEqual,toBe': {
        expected: [11],
        actualPass: 11,
        actualFail: 5
      },
      'toContain': {
        expected: ['b'],
        actualPass: ['a', 'b', 'c'],
        actualFail: ['z', 'y', 'x']
      },
      'toContainEqual': {
        expected: [{ a: 1 }],
        actualPass: [{ a: 1 }, { b: 1 }],
        actualFail: [{ c: 1 }, { d: 1 }]
      },
      'toBeCloseTo': {
        expected: [0.3, 3],
        actualPass: 0.3001,
        actualFail: 0.5
      },
      'toBeGreaterThan,toBeGreaterThanOrEqual': {
        expected: [2],
        actualPass: 3,
        actualFail: 1
      },
      'toBeLessThan,toBeLessThanOrEqual': {
        expected: [2],
        actualPass: 1,
        actualFail: 3
      },
      'toBeInstanceOf': {
        expected: [Function],
        actualPass: () => { },
        actualFail: 'hi'
      },
      'toHaveLength': {
        expected: [3],
        actualPass: 'abc',
        actualFail: 'a'
      },
      'toHaveProperty': {
        expected: ['b.c', 2],
        actualPass: { a: 1, b: { c: 2 } },
        actualFail: { a: 1, b: { d: 2 } },
      },
      'toMatch': {
        expected: [/bcd/],
        actualPass: 'abcde',
        actualFail: 'abde',
      },
      'toMatchObject': {
        expected: [{ a: 1, b: expect.stringMatching(/bc|ab/) }],
        actualPass: { a: 1, b: 'abcde' },
        actualFail: { a: 1, b: 'zyx' }
      },
      'toThrow': {
        expected: ['Pass'],
        actualPass: () => { throw 'Pass'; },
        actualFail: () => { throw 'Fail'; },
      }
    };

    Object.keys(tests).forEach((testTitles) => {
      testTitles.split(',').forEach((testTitle) => {
        describe(testTitle, () => {
          var test = tests[testTitles];

          it('pass', () => {
            // e.g. expect().toBe();
            expect(test.actualPass)[testTitle](...test.expected);
          });

          it('fail', () => {
            expect(test.actualFail)[testTitle](...test.expected);
          });

          if (['toBeUndefined', 'toEqual', 'toThrow', 'toHaveProperty'].includes(testTitle)) {
            it('not - pass', () => {
              expect(test.actualFail).not[testTitle](...test.expected);
            });

            it('not - fail', () => {
              expect(test.actualPass).not[testTitle](...test.expected);
            });
          }
        });
      });
    });
  });

  describe('promise handlers', () => {
    describe('resolves', () => {
      var tests = {
        resolve: {
          assertion: 'toEqual',
          expected: 'abc',
          actualPass: 'abc',
          actualFail: 'def'
        },
        reject: {
          assertion: 'toThrow',
          expected: 'abc',
          actualPass: new Error('abc'),
          actualFail: new Error('def')
        }
      };

      Object.keys(tests).forEach((testTitle) => {
        describe(`${testTitle}s`, () => {
          var test = tests[testTitle];

          it('pass', () => {
            // return expect(Promise.resolve('abc')).resolves.toEqual('abc');
            // return expect(Promise.reject(new Error('abc'))).rejects.toThrow('abc');
            return expect(Promise[testTitle](test.actualPass))[`${testTitle}s`][test.assertion](test.expected);
          });

          it('fail', () => {
            return expect(Promise[testTitle](test.actualFail))[`${testTitle}s`][test.assertion](test.expected);
          });

          it('not - pass', () => {
            return expect(Promise[testTitle](test.actualFail))[`${testTitle}s`].not[test.assertion](test.expected);
          });

          it('not - fail', () => {
            return expect(Promise[testTitle](test.actualPass))[`${testTitle}s`].not[test.assertion](test.expected);
          });

          it('async', async () => {
            await expect(Promise[testTitle](test.actualPass))[`${testTitle}s`][test.assertion](test.expected);
          });
        });
      });
    });
  });

  describe('mock assertions', () => {
    var tests = {
      'toHaveBeenCalled,toHaveReturned': {
        expected: [],
        actualPass: [2],
        actualFail: [0]
      },
      'toHaveBeenCalledTimes,toHaveReturnedTimes': {
        expected: [2],
        actualPass: [2],
        actualFail: [1]
      },
      'toHaveBeenCalledWith,toHaveReturnedWith,toHaveLastReturnedWith': {
        expected: ['abc'],
        actualPass: [2, 'abc'],
        actualFail: [1, 'def']
      },
      'toHaveBeenNthCalledWith,toHaveNthReturnedWith': {
        expected: [2, '123'],
        actualPass: [2, '123'],
        actualFail: [2, '1234']
      }
    };

    function callSpy(calls, args) {
      const spy = cy.spy(() => args);
      const fn = spy => {
        spy(args);
      }

      for (var i = 1; i <= calls; i++) {
        fn(spy);
      }
      return spy;
    }

    Object.keys(tests).forEach((testTitles) => {
      testTitles.split(',').forEach((testTitle) => {
        describe(testTitle, () => {
          var test = tests[testTitles];

          it('pass', () => {
            // e.g. expect(callSpy(1)).toHaveBeenCalled();
            expect(callSpy(...test.actualPass))[testTitle](...test.expected);
          });

          it('fail', () => {
            expect(callSpy(...test.actualFail))[testTitle](...test.expected);
          });

          if (['toHaveBeenCalled', 'toHaveReturnedTimes', 'toHaveBeenCalledWith'].includes(testTitle)) {
            it('not - pass', () => {
              expect(callSpy(...test.actualFail)).not[testTitle](...test.expected);
            });

            it('not - fail', () => {
              expect(callSpy(...test.actualPass)).not[testTitle](...test.expected);
            });
          }

          it.skip('when throws error', () => {
            const spy = cy.spy(() => { throw new Error(); });
            spy();
            expect(spy)[testTitle](...test.expected);
          });

          it.skip('when returns promise', () => {
            const spy = cy.spy(() => Promise.resolve(test.actualPass[1]));
            for (var i = 1; i <= test.actualPass[0]; i++) {
              spy(test.actualPass[1]);
            }
            expect(spy)[testTitle](...test.expected);
          });
        });
      });
    });
  });

  describe('asymmetric matchers', () => {
    ['any', 'anything'].forEach((x) => {
      describe(x, () => {
        it('pass', () => {
          const a = { a: () => { }, b: 2 };
          const b = { a: expect.any(Function), b: 2 };
          expect(a).toEqual(b);
        });

        it('fail', () => {
          const a = { a: 5, b: 2 };
          const b = { a: expect.any(Function), b: 2 };
          expect(a).toEqual(b);
        });

        it('pass - not', () => {
          const a = { a: () => { }, b: 2 };
          const b = { a: expect.any(Number), b: 2 };
          expect(a).not.toEqual(b);
        });
      });
    });

    var tests = {
      arrayContaining: {
        expected: [2, 3],
        actualPass: [1, 2, 3],
        actualFail: [3, 4, 5]
      },
      objectContaining: {
        expected: { a: 1, b: 2 },
        actualPass: { a: 1, b: 2, c: 3 },
        actualFail: { a: 0, b: 1, c: 3 }
      },
      stringContaining: {
        expected: 'abc',
        actualPass: 'abcde',
        actualFail: 'jkllm'
      },
      stringMatching: {
        expected: /abc/i,
        actualPass: 'abcde',
        actualFail: 'jkllm'
      }
    };

    Object.keys(tests).forEach((test) => {
      describe(test, () => {
        it('pass', () => {
          expect(tests[test].actualPass).toEqual(expect[test](tests[test].expected));
        });

        it('fail', () => {
          expect(tests[test].actualFail).toEqual(expect[test](tests[test].expected));
        });

        it('not - pass', () => {
          expect(tests[test].actualFail).not.toEqual(expect[test](tests[test].expected));
        });
      });
    });
  });

  describe('jquery assertions', () => {
    const { $ } = Cypress;
    before(() => {
      cy.visit('cypress/fixtures/index.html');
    });

    var tests = {
      'toExist,toBeVisible': { // toBeInDom
        expected: [],
        actualPass: 'h2',
        actualFail: 'h1'
      },
      'toBeChecked': {
        expected: [],
        actualPass: '#checkbox-1',
        actualFail: '#checkbox-2'
      },
      'toHaveId': {
        expected: ['test-1'],
        actualPass: 'h2',
        actualFail: 'h3'
      },
      'toHaveClass': {
        expected: ['class-1'],
        actualPass: 'h2',
        actualFail: 'h3'
      },
      'toHaveHtml,toHaveText,toContainText': {
        expected: ['Test 1'],
        actualPass: 'h2',
        actualFail: 'h3'
      },
      'toHaveValue': {
        expected: ['value-1'],
        actualPass: '#checkbox-1',
        actualFail: '#checkbox-2'
      },
      'toHaveAttr': {
        expected: ['id'],
        actualPass: 'h2',
        actualFail: 'h3'
      },
      'toHaveData': {
        expected: ['test', 'test'],
        actualPass: 'h2',
        actualFail: 'h3'
      },
      'toHaveTag': {
        expected: ['h2'],
        actualPass: 'h2',
        actualFail: 'h3'
      },
      'toBeHidden,toBeEmpty': {
        expected: [],
        actualPass: '#div-1',
        actualFail: 'h3'
      },
      'toBeDisabled': {
        expected: [],
        actualPass: '#text-1',
        actualFail: 'h3'
      },
      'toBeEnabled': {
        expected: [],
        actualPass: 'h3',
        actualFail: '#text-1'
      },
      'toBeSelected': {
        expected: [],
        actualPass: 'select option:nth-child(2)',
        actualFail: 'select option:nth-child(1)'
      },
      'toBeFocused': {
        expected: [],
        actualPass: '#text-2',
        actualFail: '#text-1'
      },
      'toHaveCss': {
        expected: [{ 'display': 'none' }],
        actualPass: '#div-1',
        actualFail: 'h2'
      },
      'toHaveProp': {
        expected: ['disabled'],
        actualPass: '#text-1',
        actualFail: 'h2'
      },
      'toHaveQuantity': {
        expected: [4],
        actualPass: 'input',
        actualFail: 'h2'
      },
      'toHaveDescendant': {
        expected: ['> option'],
        actualPass: 'select',
        actualFail: 'h2'
      },
      'toHaveDescendantWithText': {
        expected: ['> option', 'A'],
        actualPass: 'select',
        actualFail: 'h2'
      },
      'toBeMatchedBy': {
        expected: ['div'],
        actualPass: '#div-1',
        actualFail: 'h2'
      }
    };

    Object.keys(tests).forEach((testTitles) => {
      testTitles.split(',').forEach((testTitle) => {
        describe(testTitle, () => {
          var test = tests[testTitles];

          it('pass', () => {
            // e.g. expect().toExist();
            expect($(test.actualPass))[testTitle](...test.expected);
          });

          it('fail', () => {
            expect($(test.actualFail))[testTitle](...test.expected);
          });

          if (['toExist', 'toHaveAttr', 'toBeMatchedBy'].includes(testTitle)) {
            it('not - pass', () => {
              expect($(test.actualFail)).not[testTitle](...test.expected);
            });

            it('not - fail', () => {
              expect($(test.actualPass)).not[testTitle](...test.expected);
            });
          }
        });
      });
    });
  });

	describe('expect methods', () => {
		/*describe.skip('assertions', () => {
			it('pass', () => {
				expect.assertions(2);
				expect('a').not.toBe('b');
				expect('a').toBe('a');
			});

			it('fail', () => {
				expect.assertions(2);
				expect('a').toBe('a');
			});
		});

		describe.skip('hasAssertions', () => {
			it('pass', () => {
				expect.hasAssertions();
				expect('a').toBe('a');
			});

			it('fail', () => {
				expect.hasAssertions();
			});
		});

		describe('addSnapshotSerializer', () => { });
		describe('extractExpectedAssertionsErrors', () => { });
		describe('getState', () => { });
		describe('setState', () => { });*/

		describe('extend', () => {
			before(() => {
				expect.extend({
					toBeDivisibleBy(actual, expected) {
            const pass = actual % expected === 0;
            const not = this.isNot ? ' not' : '';
						const message = pass
              ? () => `expected ${actual}${not} to be divisible by ${expected}`
              : () => `expected ${actual}${not} to be divisible by ${expected}`

						return { message, pass };
					}
				});
			});

			it('pass', () => {
				expect(15).toBeDivisibleBy(5);
			});

			it('fail', () => {
				expect(11).toBeDivisibleBy(5);
      });
      
      it('pass - not', () => {
        expect(11).not.toBeDivisibleBy(5)
      })

      it('fail - not', () => {
        expect(15).not.toBeDivisibleBy(5)
      })
		});
	});
});

after(() => {
  try {
    console.log({ testResults });
    cy.writeFile('results/messages.json', JSON.stringify(testResults, (key, value) => {
      if (value === undefined) {
        return 'undefined';
      }

      if (typeof value === 'function') {
        if (value._cyType === 'spy') {
          return `[Spy - ${value.id}]`;
        }
        return `[Function ${value.name}]`;
      }

      if (value && typeof value === 'object') {
        if (value.constructor.__proto__.name === 'AsymmetricMatcher') {
          return `[AsymmetricMatcher ${value.constructor.name}]`;
        }
      }

      return value;
    }));
  } catch (err) {
    console.log(err);
  }
});
