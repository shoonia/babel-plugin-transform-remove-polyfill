import { describe, test } from 'node:test';
import { expect } from './setup';

String.prototype.includes;

describe('String.prototype.includes', () => {
  test('typeof', () => {
    expect(typeof String.prototype.includes).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`String.prototype.includes || Object.defineProperty(String.prototype, "includes", {
      value: function(e, t) {
          return !((t = "number" != typeof t ? 0 : t) + e.length > this.length) && -1 !== this.indexOf(e, t)
      },
      writable: !0,
      configurable: !0
  })`,
    ).toBeTransform('');
  });
});
