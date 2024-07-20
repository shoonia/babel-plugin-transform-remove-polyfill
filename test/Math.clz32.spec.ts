import { describe, test } from 'node:test';
import { expect } from './setup';

Math.clz32;

describe('Math.clz32', () => {
  test('typeof', () => {
    expect(typeof Math.clz32).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`var ft = Math.clz32 ? Math.clz32 : bt,
  mt = Math.log,
  pt = Math.LN2;
function bt(e) {
  return 0 === (e >>>= 0) ? 32 : 31 - (mt(e) / pt | 0) | 0
}`,
    ).toBeTransform(`var ft = Math.clz32,
  mt = Math.log,
  pt = Math.LN2;
function bt(e) {
  return 0 === (e >>>= 0) ? 32 : 31 - (mt(e) / pt | 0) | 0;
}`);
  });
});
