import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Object.getOwnPropertyNames;

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

  test('transform #1', async () => {
    await expect(`var C = function(e) {
    return C = Object.getOwnPropertyNames || function(e) {
        var t = [];
        for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
        return t
    },
    C(e)
};`,
    ).toBeTransform(`var C = function (e) {
  return C = Object.getOwnPropertyNames, C(e);
};`);
  });
});
