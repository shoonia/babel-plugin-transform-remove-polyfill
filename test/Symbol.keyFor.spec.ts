import { describe, test } from 'node:test';
import { expect } from './setup';

Symbol.keyFor;

describe('Symbol.keyFor', () => {
  test('typeof', () => {
    expect(typeof Symbol.keyFor).toBe('function');
  });

  const trueList = [
    'typeof Symbol.keyFor === "function"',
    'typeof Symbol.keyFor == "function"',
    '"function" === typeof Symbol.keyFor',
    '"function" == typeof Symbol.keyFor',
    // undefined
    'typeof Symbol.keyFor !== "undefined"',
    'typeof Symbol.keyFor != "undefined"',
    '"undefined" !== typeof Symbol.keyFor',
    '"undefined" != typeof Symbol.keyFor',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    'typeof Symbol.keyFor !== "function"',
    'typeof Symbol.keyFor != "function"',
    '"function" !== typeof Symbol.keyFor',
    '"function" != typeof Symbol.keyFor',
    // undefined
    'typeof Symbol.keyFor === "undefined"',
    'typeof Symbol.keyFor == "undefined"',
    '"undefined" === typeof Symbol.keyFor',
    '"undefined" == typeof Symbol.keyFor',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof Symbol.keyFor === "function" ? 1 : 2',
    'typeof Symbol.keyFor !== "function" ? 2 : 1',
    'typeof Symbol.keyFor !== "undefined" ? 1 : 2',
    'typeof Symbol.keyFor === "undefined" ? 2 : 1',
    // ==
    'typeof Symbol.keyFor == "function" ? 1 : 2',
    'typeof Symbol.keyFor != "function" ? 2 : 1',
    'typeof Symbol.keyFor != "undefined" ? 1 : 2',
    'typeof Symbol.keyFor == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof Symbol.keyFor ? 1 : 2',
    '"function" !== typeof Symbol.keyFor ? 2 : 1',
    '"undefined" !== typeof Symbol.keyFor ? 1 : 2',
    '"undefined" === typeof Symbol.keyFor ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });
});
