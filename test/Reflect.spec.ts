import { describe, test } from 'node:test';
import { expect } from './setup';

Reflect;

describe('Reflect', () => {
  test('typeof', () => {
    expect(typeof Reflect).toBe('object');
  });

  const trueList = [
    // object
    'typeof Reflect === "object"',
    'typeof Reflect == "object"',
    '"object" === typeof Reflect',
    '"object" == typeof Reflect',
    // undefined
    'typeof Reflect !== "undefined"',
    'typeof Reflect != "undefined"',
    '"undefined" !== typeof Reflect',
    '"undefined" != typeof Reflect',
    // incorrect value
    'typeof Reflect !== "number"',
    '"function" != typeof Reflect',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    // object
    'typeof Reflect !== "object"',
    'typeof Reflect != "object"',
    '"object" !== typeof Reflect',
    '"object" != typeof Reflect',
    // undefined
    'typeof Reflect === "undefined"',
    'typeof Reflect == "undefined"',
    '"undefined" === typeof Reflect',
    '"undefined" == typeof Reflect',
    // incorrect value
    'typeof Reflect === "number"',
    '"function" == typeof Reflect',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof Reflect === "object" ? 1 : 2',
    'typeof Reflect !== "object" ? 2 : 1',
    'typeof Reflect !== "undefined" ? 1 : 2',
    'typeof Reflect === "undefined" ? 2 : 1',
    // ==
    'typeof Reflect == "object" ? 1 : 2',
    'typeof Reflect != "object" ? 2 : 1',
    'typeof Reflect != "undefined" ? 1 : 2',
    'typeof Reflect == "undefined" ? 2 : 1',
    // ..
    '"object" === typeof Reflect ? 1 : 2',
    '"object" !== typeof Reflect ? 2 : 1',
    '"undefined" !== typeof Reflect ? 1 : 2',
    '"undefined" === typeof Reflect ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });
});
