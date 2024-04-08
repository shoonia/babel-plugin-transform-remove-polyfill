import { describe, test } from 'node:test';
import { expect } from './setup';

Array.from;

describe('Array.from', () => {
  test('typeof', () => {
    expect(typeof Array.from).toBe('function');
  });

  const trueList = [
    'typeof Array.from === "function"',
    'typeof Array.from == "function"',
    '"function" === typeof Array.from',
    '"function" == typeof Array.from',
    // undefined
    'typeof Array.from !== "undefined"',
    'typeof Array.from != "undefined"',
    '"undefined" !== typeof Array.from',
    '"undefined" != typeof Array.from',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    'typeof Array.from !== "function"',
    'typeof Array.from != "function"',
    '"function" !== typeof Array.from',
    '"function" != typeof Array.from',
    // undefined
    'typeof Array.from === "undefined"',
    'typeof Array.from == "undefined"',
    '"undefined" === typeof Array.from',
    '"undefined" == typeof Array.from',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof Array.from === "function" ? 1 : 2',
    'typeof Array.from !== "function" ? 2 : 1',
    'typeof Array.from !== "undefined" ? 1 : 2',
    'typeof Array.from === "undefined" ? 2 : 1',
    // ==
    'typeof Array.from == "function" ? 1 : 2',
    'typeof Array.from != "function" ? 2 : 1',
    'typeof Array.from != "undefined" ? 1 : 2',
    'typeof Array.from == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof Array.from ? 1 : 2',
    '"function" !== typeof Array.from ? 2 : 1',
    '"undefined" !== typeof Array.from ? 1 : 2',
    '"undefined" === typeof Array.from ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });
});
