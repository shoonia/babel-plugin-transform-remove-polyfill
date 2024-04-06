import { describe, test } from 'node:test';
import { expect } from './setup';

Object.assign;

describe('Object.assign', () => {
  test('typeof', () => {
    expect(typeof Object.assign).toBe('function');
  });

  test('tranfrom #0', async () => {
    await expect('if (Object.assign) {}').toBeTransform('if (true) {}');
  });

  test('tranfrom #1', async () => {
    await expect('Object.assign || 1').toBeTransform('Object.assign;');
  });

  test('tranfrom #2', async () => {
    await expect('Object.assign && 1').toBeTransform('1;');
  });

  test('tranfrom #3', async () => {
    await expect('Object.assign ? 1 : 2').toBeTransform('1;');
  });

  test('tranfrom #4', async () => {
    await expect('Object.assign ?? 1').toBeTransform('Object.assign;');
  });

  const trueList = [
    'typeof Object.assign === "function"',
    'typeof Object.assign == "function"',
    '"function" === typeof Object.assign',
    '"function" == typeof Object.assign',
    // undefined
    'typeof Object.assign !== "undefined"',
    'typeof Object.assign != "undefined"',
    '"undefined" !== typeof Object.assign',
    '"undefined" != typeof Object.assign',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList = [
    'typeof Object.assign !== "function"',
    'typeof Object.assign != "function"',
    '"function" !== typeof Object.assign',
    '"function" != typeof Object.assign',
    // undefined
    'typeof Object.assign === "undefined"',
    'typeof Object.assign == "undefined"',
    '"undefined" === typeof Object.assign',
    '"undefined" == typeof Object.assign',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof Object.assign === "function" ? 1 : 2',
    'typeof Object.assign !== "function" ? 2 : 1',
    'typeof Object.assign !== "undefined" ? 1 : 2',
    'typeof Object.assign === "undefined" ? 2 : 1',
    // ==
    'typeof Object.assign == "function" ? 1 : 2',
    'typeof Object.assign != "function" ? 2 : 1',
    'typeof Object.assign != "undefined" ? 1 : 2',
    'typeof Object.assign == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof Object.assign ? 1 : 2',
    '"function" !== typeof Object.assign ? 2 : 1',
    '"undefined" !== typeof Object.assign ? 1 : 2',
    '"undefined" === typeof Object.assign ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
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
});
