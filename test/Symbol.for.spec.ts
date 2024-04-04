import { describe, test } from 'node:test';
import { expect } from './setup';

Symbol.for;

describe('Symbol.for', () => {
  test('typeof', () => {
    expect(typeof Symbol.for).toBe('function');
  });

  test('tranfrom #0', async () => {
    await expect('if (Symbol.for) {}').toBeTransform('if (true) {}');
  });

  test('tranfrom #1', async () => {
    await expect('Symbol.for || 1').toBeTransform('Symbol.for;');
  });

  test('tranfrom #2', async () => {
    await expect('Symbol.for && 1').toBeTransform('1;');
  });

  test('tranfrom #3', async () => {
    await expect('Symbol.for ? 1 : 2').toBeTransform('1;');
  });

  test('tranfrom #4', async () => {
    await expect('Symbol.for ?? A').toBeTransform('Symbol.for;');
  });

  const trueList = [
    'typeof Symbol.for === "function"',
    'typeof Symbol.for == "function"',
    '"function" === typeof Symbol.for',
    '"function" == typeof Symbol.for',
    // undefined
    'typeof Symbol.for !== "undefined"',
    'typeof Symbol.for != "undefined"',
    '"undefined" !== typeof Symbol.for',
    '"undefined" != typeof Symbol.for',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    'typeof Symbol.for !== "function"',
    'typeof Symbol.for != "function"',
    '"function" !== typeof Symbol.for',
    '"function" != typeof Symbol.for',
    // undefined
    'typeof Symbol.for === "undefined"',
    'typeof Symbol.for == "undefined"',
    '"undefined" === typeof Symbol.for',
    '"undefined" == typeof Symbol.for',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof Symbol.for === "function" ? 1 : 2',
    'typeof Symbol.for !== "function" ? 2 : 1',
    'typeof Symbol.for !== "undefined" ? 1 : 2',
    'typeof Symbol.for === "undefined" ? 2 : 1',
    // ==
    'typeof Symbol.for == "function" ? 1 : 2',
    'typeof Symbol.for != "function" ? 2 : 1',
    'typeof Symbol.for != "undefined" ? 1 : 2',
    'typeof Symbol.for == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof Symbol.for ? 1 : 2',
    '"function" !== typeof Symbol.for ? 2 : 1',
    '"undefined" !== typeof Symbol.for ? 1 : 2',
    '"undefined" === typeof Symbol.for ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });
});
