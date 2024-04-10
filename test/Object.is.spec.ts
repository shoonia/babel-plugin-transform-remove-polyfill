import { describe, test } from 'node:test';
import { expect } from './setup';

Object.is;

describe('Object.is', () => {
  test('typeof', () => {
    expect(typeof Object.is).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`function hr(e, t) {
  return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t
}
var gr = "function" == typeof Object.is ? Object.is : hr;`
    ).toBeTransform(`function hr(e, t) {
  return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t;
}
var gr = Object.is;`);
  });
});
