import { describe, test } from 'node:test';
import { expect } from './setup';

Atomics;

describe('Atomics', () => {
  test('typeof', () => {
    expect(typeof Atomics).toBe('object');
  });

  const trueList = [
    // object
    'typeof Atomics === "object"',
    'typeof Atomics == "object"',
    '"object" === typeof Atomics',
    '"object" == typeof Atomics',
    // undefined
    'typeof Atomics !== "undefined"',
    'typeof Atomics != "undefined"',
    '"undefined" !== typeof Atomics',
    '"undefined" != typeof Atomics',
    // incorrect value
    'typeof Atomics !== "number"',
    '"function" != typeof Atomics',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    // object
    'typeof Atomics !== "object"',
    'typeof Atomics != "object"',
    '"object" !== typeof Atomics',
    '"object" != typeof Atomics',
    // undefined
    'typeof Atomics === "undefined"',
    'typeof Atomics == "undefined"',
    '"undefined" === typeof Atomics',
    '"undefined" == typeof Atomics',
    // incorrect value
    'typeof Atomics === "number"',
    '"function" == typeof Atomics',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof Atomics === "object" ? 1 : 2',
    'typeof Atomics !== "object" ? 2 : 1',
    'typeof Atomics !== "undefined" ? 1 : 2',
    'typeof Atomics === "undefined" ? 2 : 1',
    // ==
    'typeof Atomics == "object" ? 1 : 2',
    'typeof Atomics != "object" ? 2 : 1',
    'typeof Atomics != "undefined" ? 1 : 2',
    'typeof Atomics == "undefined" ? 2 : 1',
    // ..
    '"object" === typeof Atomics ? 1 : 2',
    '"object" !== typeof Atomics ? 2 : 1',
    '"undefined" !== typeof Atomics ? 1 : 2',
    '"undefined" === typeof Atomics ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });
});
