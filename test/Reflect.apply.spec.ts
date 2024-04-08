import { describe, test } from 'node:test';
import { expect } from './setup';

Reflect.apply;

describe('Reflect.apply', () => {
  test('typeof', () => {
    expect(typeof Reflect.apply).toBe('function');
  });

  const trueList = [
    'typeof Reflect.apply === "function"',
    'typeof Reflect.apply == "function"',
    '"function" === typeof Reflect.apply',
    '"function" == typeof Reflect.apply',
    // undefined
    'typeof Reflect.apply !== "undefined"',
    'typeof Reflect.apply != "undefined"',
    '"undefined" !== typeof Reflect.apply',
    '"undefined" != typeof Reflect.apply',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    'typeof Reflect.apply !== "function"',
    'typeof Reflect.apply != "function"',
    '"function" !== typeof Reflect.apply',
    '"function" != typeof Reflect.apply',
    // undefined
    'typeof Reflect.apply === "undefined"',
    'typeof Reflect.apply == "undefined"',
    '"undefined" === typeof Reflect.apply',
    '"undefined" == typeof Reflect.apply',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof Reflect.apply === "function" ? 1 : 2',
    'typeof Reflect.apply !== "function" ? 2 : 1',
    'typeof Reflect.apply !== "undefined" ? 1 : 2',
    'typeof Reflect.apply === "undefined" ? 2 : 1',
    // ==
    'typeof Reflect.apply == "function" ? 1 : 2',
    'typeof Reflect.apply != "function" ? 2 : 1',
    'typeof Reflect.apply != "undefined" ? 1 : 2',
    'typeof Reflect.apply == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof Reflect.apply ? 1 : 2',
    '"function" !== typeof Reflect.apply ? 2 : 1',
    '"undefined" !== typeof Reflect.apply ? 1 : 2',
    '"undefined" === typeof Reflect.apply ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });
});
