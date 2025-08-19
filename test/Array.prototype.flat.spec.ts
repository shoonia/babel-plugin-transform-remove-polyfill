import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Array.prototype.flat;

describe('Array.prototype.flat', () => {
  test('typeof', () => {
    expect(typeof Array.prototype.flat).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`Array.prototype.flat || (Array.prototype.flat = function(e, t) {
    return t = this.concat.apply([], this),
    e > 1 && t.some(Array.isArray) ? t.flat(e - 1) : t
},
Array.prototype.flatMap = function(e, t) {
    return this.map(e, t).flat()
})`,
    ).toBeTransform('');
  });
});
