import { describe, test } from 'node:test';
import { expect } from './setup';

ArrayBuffer.isView;

describe('ArrayBuffer.isView', () => {
  test('typeof', () => {
    expect(typeof ArrayBuffer.isView).toBe('function');
  });

  test('tranfrom #0', async () => {
    await expect('if (ArrayBuffer.isView) {}').toBeTransform('if (true) {}');
  });

  test('tranfrom #1', async () => {
    await expect('ArrayBuffer.isView || 1').toBeTransform('ArrayBuffer.isView;');
  });

  test('tranfrom #2', async () => {
    await expect('ArrayBuffer.isView && 1').toBeTransform('1;');
  });

  test('tranfrom #3', async () => {
    await expect('ArrayBuffer.isView ? 1 : 2').toBeTransform('1;');
  });

  test('tranfrom #4', async () => {
    await expect('ArrayBuffer.isView ?? A').toBeTransform('ArrayBuffer.isView;');
  });

  const trueList = [
    'typeof ArrayBuffer.isView === "function"',
    'typeof ArrayBuffer.isView == "function"',
    '"function" === typeof ArrayBuffer.isView',
    '"function" == typeof ArrayBuffer.isView',
    // undefined
    'typeof ArrayBuffer.isView !== "undefined"',
    'typeof ArrayBuffer.isView != "undefined"',
    '"undefined" !== typeof ArrayBuffer.isView',
    '"undefined" != typeof ArrayBuffer.isView',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    'typeof ArrayBuffer.isView !== "function"',
    'typeof ArrayBuffer.isView != "function"',
    '"function" !== typeof ArrayBuffer.isView',
    '"function" != typeof ArrayBuffer.isView',
    // undefined
    'typeof ArrayBuffer.isView === "undefined"',
    'typeof ArrayBuffer.isView == "undefined"',
    '"undefined" === typeof ArrayBuffer.isView',
    '"undefined" == typeof ArrayBuffer.isView',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof ArrayBuffer.isView === "function" ? 1 : 2',
    'typeof ArrayBuffer.isView !== "function" ? 2 : 1',
    'typeof ArrayBuffer.isView !== "undefined" ? 1 : 2',
    'typeof ArrayBuffer.isView === "undefined" ? 2 : 1',
    // ==
    'typeof ArrayBuffer.isView == "function" ? 1 : 2',
    'typeof ArrayBuffer.isView != "function" ? 2 : 1',
    'typeof ArrayBuffer.isView != "undefined" ? 1 : 2',
    'typeof ArrayBuffer.isView == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof ArrayBuffer.isView ? 1 : 2',
    '"function" !== typeof ArrayBuffer.isView ? 2 : 1',
    '"undefined" !== typeof ArrayBuffer.isView ? 1 : 2',
    '"undefined" === typeof ArrayBuffer.isView ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });
});
