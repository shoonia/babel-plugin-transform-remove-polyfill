import { describe, test } from 'node:test';
import { expect } from './setup';

Object.create;

describe('Object.create', () => {
  test('typeof', () => {
    expect(typeof Object.create).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`var qa = "function" == typeof Object.create ? Object.create : function(a) {
      var b = function() {};
      b.prototype = a;
      return new b
  }`).toBeTransform('var qa = Object.create;');
  });
});
