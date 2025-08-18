import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Object.getPrototypeOf;

describe('Object.getPrototypeOf', () => {
  test('typeof', () => {
    expect(typeof Object.getPrototypeOf).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`Object.getPrototypeOf || (Object.getPrototypeOf = function(t) {
      return t.__proto__ || (t.constructor ? t.constructor.prototype : o)
  });`)
      .toBeTransform('');
  });

  test('transform #1', async () => {
    await expect(`var h = Object.getPrototypeOf || function(e) {
    return e.__proto__
}`)
      .toBeTransform('var h = Object.getPrototypeOf;');
  });

  test('transform #2', async () => {
    await expect(`var t = Object.getPrototypeOf ? function(e) {
        return Object.getPrototypeOf(e)
    }
    : function(e) {
        return e.__proto__
    }`)
      .toBeTransform(`var t = function (e) {
  return Object.getPrototypeOf(e);
};`,
      );
  });

  test('transform #3', async () => {
    await expect(`var x = function(e) {
    function t(n) {
        return e.exports = t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }
        ,
        e.exports.__esModule = !0,
        e.exports.default = e.exports,
        t(n)
    }
}`)
      .toBeTransform(`var x = function (e) {
  function t(n) {
    return e.exports = t = Object.getPrototypeOf.bind(), e.exports.__esModule = !0, e.exports.default = e.exports, t(n);
  }
};`,
      );
  });
});
