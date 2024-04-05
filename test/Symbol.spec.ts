import { describe, test } from 'node:test';
import { expect } from './setup';

Symbol;

describe('Symbol', () => {
  test('typeof', () => {
    expect(typeof Symbol).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`function a(t) {
        var n = "function" == typeof Symbol && t[Symbol.iterator],
        r = 0;
        return n ? n.call(t) : {
          next: function() {
            return t && r >= t.length && (t = void 0), {
              value: t && t[r++],
              done: !t
            }
          }
        }
      }`
    ).toBeTransform(`function a(t) {
  var n = t[Symbol.iterator],
    r = 0;
  return n ? n.call(t) : {
    next: function () {
      return t && r >= t.length && (t = void 0), {
        value: t && t[r++],
        done: !t
      };
    }
  };
}`
    );
  });

  test('transform #2', async () => {
    await expect(
      'var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];'
    ).toBeTransform(
      'var n = e[Symbol.iterator] || e["@@iterator"];'
    );
  });
});
