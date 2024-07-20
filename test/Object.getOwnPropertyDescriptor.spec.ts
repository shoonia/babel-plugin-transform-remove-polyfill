import { describe, test } from 'node:test';
import { expect } from './setup';

Object.getOwnPropertyDescriptor;

describe('Object.getOwnPropertyDescriptor', () => {
  test('typeof', () => {
    expect(typeof Object.getOwnPropertyDescriptor).toBe('function');
  });

  test('transform #1', async () => {
    expect(!Object.getOwnPropertyDescriptor).toBe(false);

    await expect(`if (!Object.getOwnPropertyDescriptor) {
      var y = "Object.getOwnPropertyDescriptor called on a non-object: ";
      Object.getOwnPropertyDescriptor = function(t, n) {
          if (typeof t != "object" && typeof t != "function" || t === null)
              throw new TypeError(y + t);
          if (!f(t, n))
              return;
          var r, i, s;
          r = {
              enumerable: !0,
              configurable: !0
          };
          if (d) {
              var u = t.__proto__;
              t.__proto__ = o;
              var i = h(t, n)
                , s = p(t, n);
              t.__proto__ = u;
              if (i || s)
                  return i && (r.get = i), s && (r.set = s), r;
          }
          return r.value = t[n], r;
      }
  }`,
    ).toBeTransform('');
  });
});
