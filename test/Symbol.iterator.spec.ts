import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Symbol.iterator;

describe('Symbol.iterator', () => {
  test('typeof', () => {
    expect(typeof Symbol.iterator).toBe('symbol');
  });

  test('transform #1', async () => {
    await expect(`var ma = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  if (b) return b.call(a);
  if ("number" == typeof a.length) return {
    next: ba(a)
  };
  throw Error(String(a) + " is not an iterable or ArrayLike");
}`,
    ).toBeTransform(`var ma = function (a) {
  var b = a[Symbol.iterator];
  if (b) return b.call(a);
  if ("number" == typeof a.length) return {
    next: ba(a)
  };
  throw Error(String(a) + " is not an iterable or ArrayLike");
};`);
  });
});
