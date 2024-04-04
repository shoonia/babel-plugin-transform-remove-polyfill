import { describe, test } from 'node:test';
import { expect } from './setup';

String.prototype.includes;

describe('String.prototype.includes', () => {
  test('typeof', () => {
    expect(typeof String.prototype.includes).toBe('function');
  });

  const trueList = [
    'typeof String.prototype.includes === "function"',
    'typeof String.prototype.includes == "function"',
    '"function" === typeof String.prototype.includes',
    '"function" == typeof String.prototype.includes',
    // undefined
    'typeof String.prototype.includes !== "undefined"',
    'typeof String.prototype.includes != "undefined"',
    '"undefined" !== typeof String.prototype.includes',
    '"undefined" != typeof String.prototype.includes',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList =  [
    'typeof String.prototype.includes !== "function"',
    'typeof String.prototype.includes != "function"',
    '"function" !== typeof String.prototype.includes',
    '"function" != typeof String.prototype.includes',
    // undefined
    'typeof String.prototype.includes === "undefined"',
    'typeof String.prototype.includes == "undefined"',
    '"undefined" === typeof String.prototype.includes',
    '"undefined" == typeof String.prototype.includes',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof String.prototype.includes === "function" ? 1 : 2',
    'typeof String.prototype.includes !== "function" ? 2 : 1',
    'typeof String.prototype.includes !== "undefined" ? 1 : 2',
    'typeof String.prototype.includes === "undefined" ? 2 : 1',
    // ==
    'typeof String.prototype.includes == "function" ? 1 : 2',
    'typeof String.prototype.includes != "function" ? 2 : 1',
    'typeof String.prototype.includes != "undefined" ? 1 : 2',
    'typeof String.prototype.includes == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof String.prototype.includes ? 1 : 2',
    '"function" !== typeof String.prototype.includes ? 2 : 1',
    '"undefined" !== typeof String.prototype.includes ? 1 : 2',
    '"undefined" === typeof String.prototype.includes ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });

  test('tranfrom #0', async () => {
    await expect('if (String.prototype.includes) {}').toBeTransform('if (true) {}');
  });

  test('tranfrom #1', async () => {
    await expect('String.prototype.includes || 1').toBeTransform('String.prototype.includes;');
  });

  test('tranfrom #2', async () => {
    await expect('String.prototype.includes && 1').toBeTransform('1;');
  });

  test('tranfrom #3', async () => {
    await expect('String.prototype.includes ? 1 : 2').toBeTransform('1;');
  });

  test('tranfrom #4', async () => {
    await expect('typeof String.prototype.includes === "function" ? 1 : 2').toBeTransform('1;');
  });

  test('tranfrom #5', async () => {
    await expect('typeof String.prototype.includes !== "undefined" ? 1 : 2').toBeTransform('1;');
  });

  test('tranfrom #6', async () => {
    await expect('"undefined" == typeof String.prototype.includes ? 1 : 2').toBeTransform('2;');
  });
});
