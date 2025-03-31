import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Array.prototype.includes;

describe('Array.prototype.includes', () => {
  test('typeof', () => {
    expect(typeof Array.prototype.includes).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
      value: function(e) {
          for (var t = [], o = 1; o < arguments.length; o++)
              t[o - 1] = arguments[o];
          if (null == this)
              throw new TypeError("Array.prototype.includes called on null or undefined");
          var n = Object(this)
            , r = parseInt(n.length, 10) || 0;
          if (0 !== r) {
              var i, s, a = t[1] || 0;
              for (0 <= a ? i = a : (i = r + a) < 0 && (i = 0); i < r; ) {
                  if (e === (s = n[i]) || e != e && s != s)
                      return !0;
                  i++
              }
          }
          return !1
      },
      writable: !0,
      configurable: !0
  })`,
    ).toBeTransform('');
  });
});
