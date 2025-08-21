import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Reflect.construct;

describe('Reflect.construct', () => {
  test('typeof', () => {
    expect(typeof Reflect.construct).toBe('function');
  });

  test('transform #1', async () => {
    expect('undefined' == typeof Reflect || !Reflect.construct).toBe(false);
    expect('function' == typeof Proxy).toBe(true);

    await expect(`function A() {
    if ("undefined" == typeof Reflect || !Reflect.construct)
        return !1;
    if (Reflect.construct.sham)
        return !1;
    if ("function" == typeof Proxy)
        return !0;
    try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
        ))),
        !0
    } catch (e) {
        return !1
    }
  }`).toBeTransform(`function A() {
  if (Reflect.construct.sham) return !1;
  if (true) return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}`);
  });

  test('transform #2', async () => {
    await expect(`var eaa = function() {
  function a() {
    function e() {}
    new e;
    Reflect.construct(e, [], l());
    return new e instanceof e
  }
  if (typeof Reflect != "undefined" && Reflect.construct) {
    if (a())
      return Reflect.construct;
    var c = Reflect.construct;
    return function(e, f, g) {
      e = c(e, f);
      g && Reflect.setPrototypeOf(e, g.prototype);
      return e
    }
  }
  return function(e, f, g) {
    g === void 0 && (g = e);
    g = baa(g.prototype || Object.prototype);
    return Function.prototype.apply.call(e, g, f) || g
  }
}()`,
    ).toBeTransform(`var eaa = function () {
  function a() {
    function e() {}
    new e();
    Reflect.construct(e, [], l());
    return new e() instanceof e;
  }
  if (true) {
    if (a()) return Reflect.construct;
    var c = Reflect.construct;
    return function (e, f, g) {
      e = c(e, f);
      g && Reflect.setPrototypeOf(e, g.prototype);
      return e;
    };
  }
  return function (e, f, g) {
    g === void 0 && (g = e);
    g = baa(g.prototype || Object.prototype);
    return Function.prototype.apply.call(e, g, f) || g;
  };
}();`);
  });
});
