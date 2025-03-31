import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void String.prototype.endsWith;

describe('String.prototype.endsWith', () => {
  test('typeof', () => {
    expect(typeof String.prototype.endsWith).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`String.prototype.endsWith || Object.defineProperty(String.prototype, "endsWith", {
      value: function(e, t) {
          return (void 0 === t || t > this.length) && (t = this.length),
          this.substring(t - e.length, t) === e
      },
      writable: !0,
      configurable: !0
  })`,
    ).toBeTransform('');
  });
});
