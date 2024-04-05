import { describe, test } from 'node:test';
import { expect } from './setup';

Object.prototype.hasOwnProperty.call;
Object.hasOwn;

describe('Object.prototype.hasOwnProperty.call(a,b) -> Object.hasOwn(a,b)', () => {
  test('typeof', () => {
    expect(typeof Object.prototype.hasOwnProperty.call).toBe('function');
    expect(typeof Object.hasOwn).toBe('function');
  });

  test('transform', async () => {
    await expect('Object.prototype.hasOwnProperty.call(e, s)')
      .toBeTransform('Object.hasOwn(e, s);');
  });

  test('NO transform', async () => {
    const code = 'obj.hasOwnProperty(a);';

    await expect(code).toBeTransform(code);
  });
});
