import { describe, test } from 'node:test';
import { expect } from './setup';

describe('Object.assign', () => {
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
    await expect('Object.assign ?? A').toBeTransform('Object.assign;');
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
});
