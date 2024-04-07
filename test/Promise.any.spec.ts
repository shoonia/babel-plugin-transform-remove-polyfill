import { describe, test } from 'node:test';
import { expect } from './setup';

Promise.any;

describe('Promise.any', () => {
  test('typeof', () => {
    expect(typeof Promise.any).toBe('function');
  });

  test('tranfrom #0', async () => {
    await expect('if (Promise.any) {}').toBeTransform('if (true) {}');
  });

  test('tranfrom #1', async () => {
    await expect('Promise.any || 1').toBeTransform('Promise.any;');
  });

  test('tranfrom #2', async () => {
    await expect('Promise.any && 1').toBeTransform('1;');
  });

  test('tranfrom #3', async () => {
    await expect('Promise.any ? 1 : 2').toBeTransform('1;');
  });

  test('tranfrom #4', async () => {
    await expect('Promise.any ?? A').toBeTransform('Promise.any;');
  });

  const trueList = [
    'typeof Promise.any === "function"',
    'typeof Promise.any == "function"',
    '"function" === typeof Promise.any',
    '"function" == typeof Promise.any',
    // undefined
    'typeof Promise.any !== "undefined"',
    'typeof Promise.any != "undefined"',
    '"undefined" !== typeof Promise.any',
    '"undefined" != typeof Promise.any',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    'typeof Promise.any !== "function"',
    'typeof Promise.any != "function"',
    '"function" !== typeof Promise.any',
    '"function" != typeof Promise.any',
    // undefined
    'typeof Promise.any === "undefined"',
    'typeof Promise.any == "undefined"',
    '"undefined" === typeof Promise.any',
    '"undefined" == typeof Promise.any',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof Promise.any === "function" ? 1 : 2',
    'typeof Promise.any !== "function" ? 2 : 1',
    'typeof Promise.any !== "undefined" ? 1 : 2',
    'typeof Promise.any === "undefined" ? 2 : 1',
    // ==
    'typeof Promise.any == "function" ? 1 : 2',
    'typeof Promise.any != "function" ? 2 : 1',
    'typeof Promise.any != "undefined" ? 1 : 2',
    'typeof Promise.any == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof Promise.any ? 1 : 2',
    '"function" !== typeof Promise.any ? 2 : 1',
    '"undefined" !== typeof Promise.any ? 1 : 2',
    '"undefined" === typeof Promise.any ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });
});
