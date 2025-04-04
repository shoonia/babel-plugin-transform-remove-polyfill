import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Object.create;

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

  test('transform #3', async () => {
    await expect(`var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
    }));`,
    ).toBeTransform(`var __createBinding = this && this.__createBinding || function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
};`);
  });
});
