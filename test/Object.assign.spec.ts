import { describe, test } from 'node:test';
import { expect } from './setup';

Object.assign;

describe('Object.assign', () => {
  test('typeof', () => {
    expect(typeof Object.assign).toBe('function');
  });

  test('transform polyfill #1', async () => {
    await expect(`var assign = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];

          for (var r in n) {
            if (Object.prototype.hasOwnProperty.call(n, r)) {
              e[r] = n[r]
            }
          }
        }
        return e;
      };`
    ).toBeTransform('var assign = Object.assign;');
  });

  test('transform polyfill #2', async () => {
    await expect(`var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        }
        return __assign.apply(this, arguments);
    };`
    ).toBeTransform(`var __assign = function () {
  __assign = Object.assign;
  return __assign.apply(this, arguments);
};`
    );
  });

  test('transform polyfill #3', async () => {
    await expect(`var i = this && this.__assign || function () {
        return i = Object.assign || function (e) {
          for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var o in t = arguments[n])
              Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          return e;
        },
        i.apply(this, arguments);
      };`
    ).toBeTransform(`var i = this && this.__assign || function () {
  return i = Object.assign, i.apply(this, arguments);
};`
    );
  });

  test('transform polyfill #4', async () => {
    await expect(`var c = function() {
        return (c = Object.assign || function(t) {
            for (var n, r = 1, e = arguments.length; r < e; r++)
                for (var i in n = arguments[r])
                    Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
            return t
        }).apply(this, arguments)
    };`
    ).toBeTransform(`var c = function () {
  return (c = Object.assign).apply(this, arguments);
};`
    );
  });

  test('transform polyfill #5', async () => {
    await expect(`function a() {
      return a = Object.assign ? Object.assign.bind() : function(e) {
          for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
      }, a.apply(this, arguments)
    }`
    ).toBeTransform(`function a() {
  return a = Object.assign.bind(), a.apply(this, arguments);
}`
    );
  });

  test('transform #6', async () => {
    await expect(`var pa = "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d) for (var e in d) Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e])
        }
        return a
    }`
    ).toBeTransform('var pa = Object.assign;');
  });

  test('transform #7', async () => {
    // TODO: NOT WORKING
    await expect(`var __assign = (this && this.__assign) || Object.assign || function(t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
  }
  return t;
};`
    ).toBeTransform(`var __assign = this && this.__assign || Object.assign || function (t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];
    for (var p in s) if (Object.hasOwn(s, p)) t[p] = s[p];
  }
  return t;
};`);
  });

  test('transform #8', async () => {
    await expect(`"function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
      value: function(e, t) {
          if (null == e)
              throw new TypeError("Cannot convert undefined or null to object");
          for (var o = Object(e), n = 1; n < arguments.length; n++) {
              var r = arguments[n];
              if (null != r)
                  for (var i in r)
                      Object.prototype.hasOwnProperty.call(r, i) && (o[i] = r[i])
          }
          return o
      },
      writable: !0,
      configurable: !0
  })`
    ).toBeTransform('false;');
  });

  test('flat #0', async () => {
    await expect('Object.assign(Object.assign(Object.assign({}, e), s), { x: 1 });')
      .toBeTransform('Object.assign({}, e, s, {\n  x: 1\n});');
  });

  test('flat #1', async () => {
    await expect(`Object.assign(Object.assign(Object.assign({}, a), function(e) {
  e = e || {};
  const t = Object.keys(e).reduce(((t,n)=>Object.assign(Object.assign({}, t), {
    [n.toLowerCase()]: e[n]
  })), {});
  return t
}(s)), l)`)
      .toBeTransform(`Object.assign({}, a, function (e) {
  e = e || {};
  const t = Object.keys(e).reduce((t, n) => Object.assign({}, t, {
    [n.toLowerCase()]: e[n]
  }), {});
  return t;
}(s), l);`);
  });
});
