import { describe, test } from 'node:test';
import { expect } from './setup';

Symbol.keyFor;

describe('Symbol.keyFor', () => {
  test('typeof', () => {
    expect(typeof Symbol.keyFor).toBe('function');
  });

  test('tranfrom #0', async () => {
    await expect('if (Symbol.keyFor) {}').toBeTransform('if (true) {}');
  });

  test('tranfrom #1', async () => {
    await expect('Symbol.keyFor || 1').toBeTransform('Symbol.keyFor;');
  });

  test('tranfrom #2', async () => {
    await expect('Symbol.keyFor && 1').toBeTransform('1;');
  });

  test('tranfrom #3', async () => {
    await expect('Symbol.keyFor ? 1 : 2').toBeTransform('1;');
  });

  test('tranfrom #4', async () => {
    await expect('Symbol.keyFor ?? A').toBeTransform('Symbol.keyFor;');
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
