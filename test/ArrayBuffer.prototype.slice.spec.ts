import { describe, test } from 'node:test';
import { expect } from './setup';

ArrayBuffer.prototype.slice;

describe('ArrayBuffer.prototype.slice', () => {
  test('typeof', () => {
    expect(typeof ArrayBuffer.prototype.slice).toBe('function');
  });

  test('transform', async () => {
    await expect(`"undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function() {
    function e(t, e) {
        return (t = 0 | t || 0) < 0 ? Math.max(t + e, 0) : Math.min(t, e)
    }
    ArrayBuffer.prototype.slice = function(n, r) {
        var i, o, s, u, a = this.byteLength, c = e(n, a), l = a;
        return r !== t && (l = e(r, a)),
        c > l ? new ArrayBuffer(0) : (i = l - c,
        o = new ArrayBuffer(i),
        s = new Uint8Array(o),
        u = new Uint8Array(this,c,i),
        s.set(u),
        o)
    }
}()`,
    ).toBeTransform('');
  });
});
