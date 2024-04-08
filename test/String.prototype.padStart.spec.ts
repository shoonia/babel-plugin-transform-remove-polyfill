import { describe, test } from 'node:test';
import { expect } from './setup';

String.prototype.padStart;

describe('String.prototype.padStart', () => {
  test('typeof', () => {
    expect(typeof String.prototype.padStart).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`String.prototype.padStart || (String.prototype.padStart = function(e, t) {
      return e >>= 0,
      t = String(void 0 !== t ? t : " "),
      this.length >= e ? String(this) : ((e -= this.length) > t.length && (t += t.repeat(e / t.length)),
      t.slice(0, e) + String(this))
  })`).toBeTransform('');
  });
});
