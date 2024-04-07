import { describe, test } from 'node:test';
import { expect } from './setup';

Reflect.construct;

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
  if (false) return !1;
  if (Reflect.construct.sham) return !1;
  if (true) return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}`);
  });
});
