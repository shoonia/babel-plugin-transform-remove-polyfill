import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Reflect.getPrototypeOf;

describe('Reflect.getPrototypeOf', () => {
  test('typeof', () => {
    expect(typeof Reflect.getPrototypeOf).toBe('function');
  });

  test('transform #1', async () => {
    // Real code example (maybe it has a but, because `typeof Reflect == "object")
    await expect(`var R = ("function" == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
    return e.__proto__
}
: null);`)
      .toBeTransform('var R = Object.getPrototypeOf;');
  });
});
