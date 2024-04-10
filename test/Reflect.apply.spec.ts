import { describe, test } from 'node:test';
import { expect } from './setup';

Reflect.apply;

describe('Reflect.apply', () => {
  test('typeof', () => {
    expect(typeof Reflect.apply).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`function a(e, n, t) {
var i = t(91),
  a = Function.prototype,
  r = a.apply,
  o = a.call;
  e.exports = "object" == typeof Reflect && Reflect.apply || (i ? o.bind(r) : function() {
    return o.apply(r, arguments)
  })
  }`).toBeTransform(`function a(e, n, t) {
  var i = t(91),
    a = Function.prototype,
    r = a.apply,
    o = a.call;
  e.exports = Reflect.apply;
}`);
  });
});
