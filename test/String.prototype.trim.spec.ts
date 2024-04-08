import { describe, test } from 'node:test';
import { expect } from './setup';

String.prototype.trim;

describe('String.prototype.trim', () => {
  test('typeof', () => {
    expect(typeof String.prototype.trim).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`var _ = "	\\n\\x0b\\f\\r \\u00a0\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\u2028\\u2029\\ufeff";
    if (!String.prototype.trim || _.trim()) {
        _ = "[" + _ + "]";
        var D = new RegExp("^" + _ + _ + "*")
          , P = new RegExp(_ + _ + "*$");
        String.prototype.trim = function() {
            return String(this).replace(D, "").replace(P, "")
        }
    }`).toBeTransform(`var _ = "	\\n\\x0b\\f\\r \\u00a0\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\u2028\\u2029\\ufeff";
if (_.trim()) {
  _ = "[" + _ + "]";
  var D = new RegExp("^" + _ + _ + "*"),
    P = new RegExp(_ + _ + "*$");
  String.prototype.trim = function () {
    return String(this).replace(D, "").replace(P, "");
  };
}`);
  });
});
