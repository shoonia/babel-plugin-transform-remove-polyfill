import { describe, test } from 'node:test';
import { expect } from './setup';

Array.from;

describe('Array.from', () => {
  test('typeof', () => {
    expect(typeof Array.from).toBe('function');
  });

  test('tranfrom #0', async () => {
    await expect('if (Array.from) {}').toBeTransform('if (true) {}');
  });

  test('tranfrom #1', async () => {
    await expect('Array.from || 1').toBeTransform('Array.from;');
  });

  test('tranfrom #2', async () => {
    await expect('Array.from && 1').toBeTransform('1;');
  });

  test('tranfrom #3', async () => {
    await expect('Array.from ? 1 : 2').toBeTransform('1;');
  });

  test('tranfrom #4', async () => {
    await expect('Array.from ?? A').toBeTransform('Array.from;');
  });

  const trueList = [
    'typeof Array.from === "function"',
    'typeof Array.from == "function"',
    '"function" === typeof Array.from',
    '"function" == typeof Array.from',
    // undefined
    'typeof Array.from !== "undefined"',
    'typeof Array.from != "undefined"',
    '"undefined" !== typeof Array.from',
    '"undefined" != typeof Array.from',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    'typeof Array.from !== "function"',
    'typeof Array.from != "function"',
    '"function" !== typeof Array.from',
    '"function" != typeof Array.from',
    // undefined
    'typeof Array.from === "undefined"',
    'typeof Array.from == "undefined"',
    '"undefined" === typeof Array.from',
    '"undefined" == typeof Array.from',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof Array.from === "function" ? 1 : 2',
    'typeof Array.from !== "function" ? 2 : 1',
    'typeof Array.from !== "undefined" ? 1 : 2',
    'typeof Array.from === "undefined" ? 2 : 1',
    // ==
    'typeof Array.from == "function" ? 1 : 2',
    'typeof Array.from != "function" ? 2 : 1',
    'typeof Array.from != "undefined" ? 1 : 2',
    'typeof Array.from == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof Array.from ? 1 : 2',
    '"function" !== typeof Array.from ? 2 : 1',
    '"undefined" !== typeof Array.from ? 1 : 2',
    '"undefined" === typeof Array.from ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });
});