import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Object.defineProperty;

describe('Object.defineProperty', () => {
  test('typeof', () => {
    expect(typeof Object.defineProperty).toBe('function');
  });

  test('transform #1', async () => {
    await expect('var o = Object.defineProperty || function(t, n, e) { t[n] = e.value }')
      .toBeTransform('var o = Object.defineProperty;');
  });
});
