import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Object.fromEntries;

describe('Object.fromEntries', () => {
  test('typeof', () => {
    expect(typeof Object.fromEntries).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`Object.fromEntries || (Object.fromEntries = function(e) {
    return Array.from(e).reduce((function(e, t) {
        return e[t[0]] = t[1],
        e
    }
    ), {})
})`,
    ).toBeTransform('');
  });
});
