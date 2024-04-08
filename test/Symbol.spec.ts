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

  test('transform #3', async () => {
    expect(typeof Symbol === 'function' && typeof (typeof Symbol === 'function' ? Symbol.iterator : '@@iterator') === 'symbol').toBe(true);

    await expect(`var g = typeof Symbol === "function" && typeof (typeof Symbol === "function" ? Symbol.iterator : "@@iterator") === "symbol" ? function(a) {
      return typeof a
    } : function(a) {
      return a && typeof Symbol === "function" && a.constructor === Symbol && a !== (typeof Symbol === "function" ? Symbol.prototype : "@@prototype") ? "symbol" : typeof a
    }`
    ).toBeTransform('var g = function (a) {\n  return typeof a;\n};'
    );
  });

  test('transform #4', async () => {
    expect(typeof Symbol === 'function' ? Symbol.iterator : '@@iterator').toBe(Symbol.iterator);

    await expect(`for (var g = a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"](), a; !(d = (a = g.next()).done); d = !0) {
      c.push(a.value);
      if (b && c.length === b) break
    }`
    ).toBeTransform(`for (var g = a[Symbol.iterator](), a; !(d = (a = g.next()).done); d = !0) {
  c.push(a.value);
  if (b && c.length === b) break;
}`
    );
  });
});
