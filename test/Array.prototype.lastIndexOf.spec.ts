import { describe, test } from 'node:test';
import { expect } from './setup';

Array.prototype.lastIndexOf;

describe('Array.prototype.lastIndexOf', () => {
  test('typeof', () => {
    expect(typeof Array.prototype.lastIndexOf).toBe('function');
  });

  test('transform #1', async () => {
    expect(!Array.prototype.lastIndexOf || [0, 1].lastIndexOf(0, -3) != -1).toBe(false);

    await expect(`if (!Array.prototype.lastIndexOf || [0, 1].lastIndexOf(0, -3) != -1)
      Array.prototype.lastIndexOf = function(t) {
          var n = g && a(this) == "[object String]" ? this.split("") : F(this),
            r = n.length >>> 0;
          if (!r)  return -1;
          var i = r - 1;
          arguments.length > 1 && (i = Math.min(i, H(arguments[1]))),
          i = i >= 0 ? i : r - Math.abs(i);
          for (; i >= 0; i--)  if (i in n && t === n[i])  return i;
          return -1
      };`).toBeTransform(`if ([0, 1].lastIndexOf(0, -3) != -1) Array.prototype.lastIndexOf = function (t) {
  var n = g && a(this) == "[object String]" ? this.split("") : F(this),
    r = n.length >>> 0;
  if (!r) return -1;
  var i = r - 1;
  arguments.length > 1 && (i = Math.min(i, H(arguments[1]))), i = i >= 0 ? i : r - Math.abs(i);
  for (; i >= 0; i--) if (i in n && t === n[i]) return i;
  return -1;
};`);
  });
});
