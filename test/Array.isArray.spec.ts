import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Array.isArray;

describe('Array.isArray', () => {
  test('typeof', () => {
    expect(typeof Array.isArray).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`var v = Array.isArray ? Array.isArray : function(e) {
      return "[object Array]" === Object.prototype.toString.call(e)
    }`,
    ).toBeTransform('var v = Array.isArray;');
  });
});
