import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void String.prototype.startsWith;

describe('String.prototype.startsWith', () => {
  test('typeof', () => {
    expect(typeof String.prototype.startsWith).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
      return t = t || 0, this.indexOf(e, t) === t
  })`).toBeTransform('');
  });
});
