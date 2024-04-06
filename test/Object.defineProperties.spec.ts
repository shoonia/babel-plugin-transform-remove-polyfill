import { describe, test } from 'node:test';
import { expect } from './setup';

Object.defineProperties;

describe('Object.defineProperties', () => {
  test('typeof', () => {
    expect(typeof Object.defineProperties).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`var ca = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
      if (a == Array.prototype || a == Object.prototype)
          return a;
      a[b] = c.value;
      return a
  }`).toBeTransform('var ca = Object.defineProperty;');
  });
});
