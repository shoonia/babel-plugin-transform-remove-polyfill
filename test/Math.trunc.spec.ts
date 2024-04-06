import { describe, test } from 'node:test';
import { expect } from './setup';

Math.trunc;

describe('Math.trunc', () => {
  test('typeof', () => {
    expect(typeof Math.trunc).toBe('function');
  });

  test('tranfrom #0', async () => {
    await expect('if (Math.trunc) {}').toBeTransform('if (true) {}');
  });

  test('tranfrom #1', async () => {
    await expect('Math.trunc || 1').toBeTransform('Math.trunc;');
  });

  test('tranfrom #2', async () => {
    await expect('Math.trunc && 1').toBeTransform('1;');
  });

  test('tranfrom #3', async () => {
    await expect('Math.trunc ? 1 : 2').toBeTransform('1;');
  });

  test('tranfrom #4', async () => {
    await expect('Math.trunc ?? A').toBeTransform('Math.trunc;');
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
