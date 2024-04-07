import { describe, test } from 'node:test';
import { expect } from './setup';

Function.prototype.bind;

describe('Function.prototype.bind', () => {
  test('typeof', () => {
    expect(typeof Function.prototype.bind).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`var Ea = function(a, b, c) {
      Ea = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Ba : Ca;
      return Ea.apply(null, arguments)
  }`)
      .toBeTransform(`var Ea = function (a, b, c) {
  Ea = -1 != Function.prototype.bind.toString().indexOf("native code") ? Ba : Ca;
  return Ea.apply(null, arguments);
};`);
  });
});
