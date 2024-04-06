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
});
