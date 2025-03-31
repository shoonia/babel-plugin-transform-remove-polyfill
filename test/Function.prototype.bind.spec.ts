import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Function.prototype.bind;

describe('Function.prototype.bind', () => {
  test('typeof', () => {
    expect(typeof Function.prototype.bind).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`var Ea = function(a, b, c) {
      Ea = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Ba : Ca;
      return Ea.apply(null, arguments)
  }`)
      .toBeTransform(`var Ea = function (a, b, c) {
  Ea = -1 != Function.prototype.bind.toString().indexOf("native code") ? Ba : Ca;
  return Ea.apply(null, arguments);
};`);
  });

  test('transform #1', async () => {
    await expect(`Function.prototype.bind || (Function.prototype.bind = function(t) {
  var n = this;
  if (typeof n != "function")
      throw new TypeError("Function.prototype.bind called on incompatible " + n);
  var i = u.call(arguments, 1)
    , s = function() {
      if (this instanceof s) {
          var e = n.apply(this, i.concat(u.call(arguments)));
          return Object(e) === e ? e : this
      }
      return n.apply(t, i.concat(u.call(arguments)))
  };
  return n.prototype && (r.prototype = n.prototype,
  s.prototype = new r,
  r.prototype = null),
  s
});`,
    ).toBeTransform('');
  });
});
