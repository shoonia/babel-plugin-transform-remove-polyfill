import { describe, test } from 'node:test';
import { expect } from '../setup';

Array.prototype.slice.call;
Array.from;

describe('Array.prototype.slice.call(a) -> Array.from(a,b)', () => {
  test('typeof', () => {
    expect(typeof Array.prototype.slice.call).toBe('function');
    expect(typeof Array.from).toBe('function');
  });

  test('transform', async () => {
    await expect('Array.prototype.slice.call(e)')
      .toBeTransform('Array.from(e);');
  });

  test('NO transform', async () => {
    const code = 'Array.prototype.slice.call(e, 1);';

    await expect(code).toBeTransform(code);
  });
});
