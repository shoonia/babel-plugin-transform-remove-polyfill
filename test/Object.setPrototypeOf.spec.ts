import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Object.setPrototypeOf;

describe('Object.setPrototypeOf', () => {
  test('typeof', () => {
    expect(typeof Object.setPrototypeOf).toBe('function');
  });

  test('transform #1', async () => {
    await expect(
      `var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };`,
    ).toBeTransform(
      `var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf;
  return extendStatics(d, b);
};`,
    );
  });

  test('transform #2', async () => {
    await expect(`var a = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? function(t, n) {
        return t.__proto__ = n, t
      } : function(t, n) {
        for (var r in n) t.hasOwnProperty(r) || (t[r] = n[r]);
        return t
      });`,
    ).toBeTransform('var a = Object.setPrototypeOf;');
  });

  test('transform #3', async () => {
    await expect(`var n = function(t, r) {
        return (n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, n) {
            t.__proto__ = n
        } || function(t, n) {
            for (var r in n) n.hasOwnProperty(r) && (t[r] = n[r])
        })(t, r)
    };`,
    ).toBeTransform(`var n = function (t, r) {
  return (n = Object.setPrototypeOf)(t, r);
};`);
  });

  test('transform #4', async () => {
    await expect(`function p8(e, t) {
      return p8 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
          return e.__proto__ = t, e
      }, p8(e, t)
  }`,
    ).toBeTransform(`function p8(e, t) {
  return p8 = Object.setPrototypeOf.bind(), p8(e, t);
}`);
  });

  test('transform #5', async () => {
    await expect(`var ra;
    if ("function" == typeof Object.setPrototypeOf)
      ra = Object.setPrototypeOf;
    else {
      var sa;
      a: {
        var ta = {
            a: !0
          },
          ua = {};
        try {
          ua.__proto__ = ta;
          sa = ua.a;
          break a;
        } catch (a) {}
        sa = !1;
      }
      ra = sa
        ? function (a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b)
              throw new TypeError(a + " is not extensible");
            return a;
          }
        : null;
    }`,
    ).toBeTransform('var ra;\nif (true) ra = Object.setPrototypeOf;');
  });

  test('transform #6', async () => {
    await expect(`function S(d, t) {
      return (S = Object.setPrototypeOf || function(d, t) {
          return d.__proto__ = t, d
      })(d, t)
  }`,
    ).toBeTransform(`function S(d, t) {
  return (S = Object.setPrototypeOf)(d, t);
}`);
  });

  test('transform #7', async () => {
    await expect(`function A(d) {
      return (A = Object.setPrototypeOf ? Object.getPrototypeOf : function(d) {
          return d.__proto__ || Object.getPrototypeOf(d)
      })(d)
  }`,
    ).toBeTransform(`function A(d) {
  return (A = Object.getPrototypeOf)(d);
}`,
    );
  });

  test('transform #8', async () => {
    await expect(`function a(e, n, t) {
  var i = t(4),
    a = t(35),
    r = t(298);
  e.exports = Object.setPrototypeOf || ("__proto__"in {} ? function() {
      var e, n = !1, t = {};
      try {
          (e = i(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set))(t, []),
          n = t instanceof Array
      } catch (o) {}
      return function(t, i) {
        return a(t), r(i), n ? e(t, i) : t.__proto__ = i, t
      }
  }() : void 0)
}`,
    ).toBeTransform(`function a(e, n, t) {
  var i = t(4),
    a = t(35),
    r = t(298);
  e.exports = Object.setPrototypeOf;
}`,
    );
  });
});
