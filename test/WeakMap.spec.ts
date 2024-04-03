import { describe, test } from 'node:test';
import { expect } from './setup';

WeakMap;

describe('WeakMap', () => {
  const trueList = [
    // function
    'typeof WeakMap === "function"',
    'typeof WeakMap == "function"',
    '"function" === typeof WeakMap',
    '"function" == typeof WeakMap',
    // undefined
    'typeof WeakMap !== "undefined"',
    'typeof WeakMap != "undefined"',
    '"undefined" !== typeof WeakMap',
    '"undefined" != typeof WeakMap',
    // incorrect value
    'typeof WeakMap !== "number"',
    '"object" != typeof WeakMap',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    // function
    'typeof WeakMap !== "function"',
    'typeof WeakMap != "function"',
    '"function" !== typeof WeakMap',
    '"function" != typeof WeakMap',
    // undefined
    'typeof WeakMap === "undefined"',
    'typeof WeakMap == "undefined"',
    '"undefined" === typeof WeakMap',
    '"undefined" == typeof WeakMap',
    // incorrect value
    'typeof WeakMap === "number"',
    '"object" == typeof WeakMap',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof WeakMap === "function" ? 1 : 2',
    'typeof WeakMap !== "function" ? 2 : 1',
    'typeof WeakMap !== "undefined" ? 1 : 2',
    'typeof WeakMap === "undefined" ? 2 : 1',
    // ==
    'typeof WeakMap == "function" ? 1 : 2',
    'typeof WeakMap != "function" ? 2 : 1',
    'typeof WeakMap != "undefined" ? 1 : 2',
    'typeof WeakMap == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof WeakMap ? 1 : 2',
    '"function" !== typeof WeakMap ? 2 : 1',
    '"undefined" !== typeof WeakMap ? 1 : 2',
    '"undefined" === typeof WeakMap ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });
});
