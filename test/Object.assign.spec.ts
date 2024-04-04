import { describe, test } from 'node:test';
import { expect } from './setup';

Object.assign;

describe('Object.assign', () => {
  test('typeof', () => {
    expect(typeof Object.assign).toBe('function');
  });

  test('tranfrom #0', async () => {
    await expect('if (Object.assign) {}').toBeTransform('if (true) {}');
  });

  test('tranfrom #1', async () => {
    await expect('Object.assign || 1').toBeTransform('Object.assign;');
  });

  test('tranfrom #2', async () => {
    await expect('Object.assign && 1').toBeTransform('1;');
  });

  test('tranfrom #3', async () => {
    await expect('Object.assign ? 1 : 2').toBeTransform('1;');
  });

  test('tranfrom #4', async () => {
    await expect('Object.assign ?? 1').toBeTransform('Object.assign;');
  });

  test('transform polyfill #1', async () => {
    await expect(
      `var assign = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];

          for (var r in n) {
            if (Object.prototype.hasOwnProperty.call(n, r)) {
              e[r] = n[r]
            }
          }
        }
        return e;
      };`
    ).toBeTransform('var assign = Object.assign;');
  });

  const trueList = [
    'typeof Object.assign === "function"',
    'typeof Object.assign == "function"',
    '"function" === typeof Object.assign',
    '"function" == typeof Object.assign',
    // undefined
    'typeof Object.assign !== "undefined"',
    'typeof Object.assign != "undefined"',
    '"undefined" !== typeof Object.assign',
    '"undefined" != typeof Object.assign',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    'typeof Object.assign !== "function"',
    'typeof Object.assign != "function"',
    '"function" !== typeof Object.assign',
    '"function" != typeof Object.assign',
    // undefined
    'typeof Object.assign === "undefined"',
    'typeof Object.assign == "undefined"',
    '"undefined" === typeof Object.assign',
    '"undefined" == typeof Object.assign',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof Object.assign === "function" ? 1 : 2',
    'typeof Object.assign !== "function" ? 2 : 1',
    'typeof Object.assign !== "undefined" ? 1 : 2',
    'typeof Object.assign === "undefined" ? 2 : 1',
    // ==
    'typeof Object.assign == "function" ? 1 : 2',
    'typeof Object.assign != "function" ? 2 : 1',
    'typeof Object.assign != "undefined" ? 1 : 2',
    'typeof Object.assign == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof Object.assign ? 1 : 2',
    '"function" !== typeof Object.assign ? 2 : 1',
    '"undefined" !== typeof Object.assign ? 1 : 2',
    '"undefined" === typeof Object.assign ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });
});
