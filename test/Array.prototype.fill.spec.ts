import { describe, test } from 'node:test';
import { expect } from './setup';

Array.prototype.fill;

describe('Array.prototype.fill', () => {
  test('typeof', () => {
    expect(typeof Array.prototype.fill).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`Array.prototype.fill || Object.defineProperty(Array.prototype, "fill", {
      value: function(e) {
          if (null == this)
              throw new TypeError("this is null or not defined");
          for (var t = Object(this), o = t.length >>> 0, n = arguments[1] >> 0, r = n < 0 ? Math.max(o + n, 0) : Math.min(n, o), n = arguments[2], n = void 0 === n ? o : n >> 0, i = n < 0 ? Math.max(o + n, 0) : Math.min(n, o); r < i; )
              t[r] = e,
              r++;
          return t
      }
  })`,
    ).toBeTransform('');
  });
});
