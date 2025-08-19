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

  test('transform #2', async () => {
    await expect(`function x(e, t) {
    return Object.defineProperty ? Object.defineProperty(e, "raw", {
        value: t
    }) : e.raw = t,
    e
}`,
    ).toBeTransform(`function x(e, t) {
  return Object.defineProperty(e, "raw", {
    value: t
  }), e;
}`);
  });
});
