import { describe, test } from 'node:test';
import { expect } from './setup';

Object.getPrototypeOf;

describe('Object.getPrototypeOf', () => {
  test('typeof', () => {
    expect(typeof Object.getPrototypeOf).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`Object.getPrototypeOf || (Object.getPrototypeOf = function(t) {
      return t.__proto__ || (t.constructor ? t.constructor.prototype : o)
  });`)
      .toBeTransform('');
  });
});
