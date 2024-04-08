import { describe, test } from 'node:test';
import { expect } from './setup';

Math.trunc;

describe('Math.trunc', () => {
  test('typeof', () => {
    expect(typeof Math.trunc).toBe('function');
  });

  const trueList = [
    'typeof Math.trunc === "function"',
    'typeof Math.trunc == "function"',
    '"function" === typeof Math.trunc',
    '"function" == typeof Math.trunc',
    // undefined
    'typeof Math.trunc !== "undefined"',
    'typeof Math.trunc != "undefined"',
    '"undefined" !== typeof Math.trunc',
    '"undefined" != typeof Math.trunc',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    'typeof Math.trunc !== "function"',
    'typeof Math.trunc != "function"',
    '"function" !== typeof Math.trunc',
    '"function" != typeof Math.trunc',
    // undefined
    'typeof Math.trunc === "undefined"',
    'typeof Math.trunc == "undefined"',
    '"undefined" === typeof Math.trunc',
    '"undefined" == typeof Math.trunc',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof Math.trunc === "function" ? 1 : 2',
    'typeof Math.trunc !== "function" ? 2 : 1',
    'typeof Math.trunc !== "undefined" ? 1 : 2',
    'typeof Math.trunc === "undefined" ? 2 : 1',
    // ==
    'typeof Math.trunc == "function" ? 1 : 2',
    'typeof Math.trunc != "function" ? 2 : 1',
    'typeof Math.trunc != "undefined" ? 1 : 2',
    'typeof Math.trunc == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof Math.trunc ? 1 : 2',
    '"function" !== typeof Math.trunc ? 2 : 1',
    '"undefined" !== typeof Math.trunc ? 1 : 2',
    '"undefined" === typeof Math.trunc ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });
});
