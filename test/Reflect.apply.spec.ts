import { describe, test } from 'node:test';
import { expect } from './setup';

Reflect.apply;

describe('Reflect.apply', () => {
  test('tranfrom #0', async () => {
    await expect('if (Reflect.apply) {}').toBeTransform('if (true) {}');
  });

  test('tranfrom #1', async () => {
    await expect('Reflect.apply || 1').toBeTransform('Reflect.apply;');
  });

  test('tranfrom #2', async () => {
    await expect('Reflect.apply && 1').toBeTransform('1;');
  });

  test('tranfrom #3', async () => {
    await expect('Reflect.apply ? 1 : 2').toBeTransform('1;');
  });

  test('tranfrom #4', async () => {
    await expect('Reflect.apply ?? A').toBeTransform('Reflect.apply;');
  });

  const trueList = [
    'typeof Reflect.apply === "function"',
    'typeof Reflect.apply == "function"',
    '"function" === typeof Reflect.apply',
    '"function" == typeof Reflect.apply',
    // undefined
    'typeof Reflect.apply !== "undefined"',
    'typeof Reflect.apply != "undefined"',
    '"undefined" !== typeof Reflect.apply',
    '"undefined" != typeof Reflect.apply',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    'typeof Reflect.apply !== "function"',
    'typeof Reflect.apply != "function"',
    '"function" !== typeof Reflect.apply',
    '"function" != typeof Reflect.apply',
    // undefined
    'typeof Reflect.apply === "undefined"',
    'typeof Reflect.apply == "undefined"',
    '"undefined" === typeof Reflect.apply',
    '"undefined" == typeof Reflect.apply',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof Reflect.apply === "function" ? 1 : 2',
    'typeof Reflect.apply !== "function" ? 2 : 1',
    'typeof Reflect.apply !== "undefined" ? 1 : 2',
    'typeof Reflect.apply === "undefined" ? 2 : 1',
    // ==
    'typeof Reflect.apply == "function" ? 1 : 2',
    'typeof Reflect.apply != "function" ? 2 : 1',
    'typeof Reflect.apply != "undefined" ? 1 : 2',
    'typeof Reflect.apply == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof Reflect.apply ? 1 : 2',
    '"function" !== typeof Reflect.apply ? 2 : 1',
    '"undefined" !== typeof Reflect.apply ? 1 : 2',
    '"undefined" === typeof Reflect.apply ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      expect(code).toBeTransform('1;');
    });
  });
});
