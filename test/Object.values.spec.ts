import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Object.values;

describe('Object.values', () => {
  test('typeof', () => {
    expect(typeof Object.values).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`var u = Object.values || function(e) {
      return Object.keys(e).map((function(t) {
        return e[t]
      }))
  }`).toBeTransform('var u = Object.values;');
  });
});
