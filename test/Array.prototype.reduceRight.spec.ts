import { describe, test } from 'node:test';
import { expect } from './setup';

Array.prototype.reduceRight;

describe('Array.prototype.reduceRight', () => {
  test('typeof', () => {
    expect(typeof Array.prototype.reduceRight).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`Array.prototype.reduceRight || (Array.prototype.reduceRight = function(t) {
      var n = F(this)
        , r = g && a(this) == "[object String]" ? this.split("") : n
        , i = r.length >>> 0;
      if (a(t) != "[object Function]")
          throw new TypeError(t + " is not a function");
      if (!i && arguments.length == 1) throw new TypeError("reduceRight of empty array with no initial value");
      var s, o = i - 1;
      if (arguments.length >= 2) s = arguments[1];
      else
          do {
              if (o in r) {
                  s = r[o--];
                  break
              }
              if (--o < 0) throw new TypeError("reduceRight of empty array with no initial value")
          } while (!0);
      do
          o in this && (s = t.call(void 0, s, r[o], o, n));
      while (o--);
      return s
  });`).toBeTransform('');
  });
});
