import { describe, test } from 'node:test';
import { expect } from './setup';

Object.getOwnPropertyNames;

describe('Object.getOwnPropertyNames', () => {
  test('typeof', () => {
    expect(typeof Object.getOwnPropertyNames).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function(t) {
      return Object.keys(t)
  });`)
      .toBeTransform('');
  });
});
