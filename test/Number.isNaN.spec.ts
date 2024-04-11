import { describe, test } from 'node:test';
import { expect } from './setup';

Number.isNaN;

describe('Number.isNaN', () => {
  test('typeof', () => {
    expect(typeof Number.isNaN).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`Number.isNaN = Number.isNaN || function(a) {
    return "number" == typeof a && a !== a;
  };`
    ).toBeTransform('Number.isNaN = Number.isNaN;');
  });
});
