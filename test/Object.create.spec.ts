import { describe, test } from 'node:test';
import { expect } from './setup';

Object.create;

describe('Object.create', () => {
  test('typeof', () => {
    expect(typeof Object.create).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`var qa = "function" == typeof Object.create ? Object.create : function(a) {
      var b = function() {};
      b.prototype = a;
      return new b
  }`).toBeTransform('var qa = Object.create;');
  });

  test('transform #1', async () => {
    await expect(`var g = Object.create ? function(e, t, n, r) {
      void 0 === r && (r = n);
      var o = Object.getOwnPropertyDescriptor(t, n);
      o && !("get"in o ? !t.__esModule : o.writable || o.configurable) || (o = {
          enumerable: !0,
          get: function() {
              return t[n]
          }
      }),
      Object.defineProperty(e, r, o)
  } : function(e, t, n, r) {
      void 0 === r && (r = n),
      e[r] = t[n]
  };`).toBeTransform(`var g = function (e, t, n, r) {
  void 0 === r && (r = n);
  var o = Object.getOwnPropertyDescriptor(t, n);
  o && !("get" in o ? !t.__esModule : o.writable || o.configurable) || (o = {
    enumerable: !0,
    get: function () {
      return t[n];
    }
  }), Object.defineProperty(e, r, o);
};`);
  });

  test('transform #2', async () => {
    await expect(`if (!Object.create) {
      var b;
      Object.prototype.__proto__ === null ? b = function() {
          return {
              __proto__: null
          }
      } : b = function() {
          var e = {};
          for (var t in e) e[t] = null;
          return e.constructor = e.hasOwnProperty = e.propertyIsEnumerable = e.isPrototypeOf = e.toLocaleString = e.toString = e.valueOf = e.__proto__ = null, e
      },
      Object.create = function(t, n) {
          var r;
          if (t === null) r = b();
          else {
              if (typeof t != "object") throw new TypeError("typeof prototype[" + typeof t + "] != 'object'");
              var i = function() {};
              i.prototype = t,
              r = new i,
              r.__proto__ = t
          }
          return n !== void 0 && Object.defineProperties(r, n), r
      }
  }`).toBeTransform('');
  });
});
