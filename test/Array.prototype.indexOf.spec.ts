import { describe, test } from 'node:test';
import { expect } from './setup';

Array.prototype.indexOf;

describe('Array.prototype.indexOf', () => {
  test('typeof', () => {
    expect(typeof Array.prototype.indexOf).toBe('function');
  });

  test('transform', async () => {
    await expect(`var nc = Array.prototype.indexOf ? function(a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    } : function(a, b) {
        if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    };`
    ).toBeTransform(`var nc = function (a, b) {
  return Array.prototype.indexOf.call(a, b, void 0);
};`);
  });

  test('transform #2', async () => {
    expect(!Array.prototype.indexOf || [0, 1].indexOf(1, 2) != -1).toBe(false);

    await expect(`if (!Array.prototype.indexOf || [0, 1].indexOf(1, 2) != -1) Array.prototype.indexOf = function(t) {
          var n = g && a(this) == "[object String]" ? this.split("") : F(this),
            r = n.length >>> 0;
          if (!r)  return -1;
          var i = 0;
          arguments.length > 1 && (i = H(arguments[1])),
          i = i >= 0 ? i : Math.max(0, r + i);
          for (; i < r; i++)  if (i in n && n[i] === t)  return i;
          return -1
      };`
    ).toBeTransform(`if ([0, 1].indexOf(1, 2) != -1) Array.prototype.indexOf = function (t) {
  var n = g && a(this) == "[object String]" ? this.split("") : F(this),
    r = n.length >>> 0;
  if (!r) return -1;
  var i = 0;
  arguments.length > 1 && (i = H(arguments[1])), i = i >= 0 ? i : Math.max(0, r + i);
  for (; i < r; i++) if (i in n && n[i] === t) return i;
  return -1;
};`);
  });
});
