import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Object.prototype.hasOwnProperty.call;
void Object.hasOwn;

describe('Object.prototype.hasOwnProperty.call(a,b) -> Object.hasOwn(a,b)', () => {
  test('typeof', () => {
    expect(typeof Object.prototype.hasOwnProperty.call).toBe('function');
    expect(typeof Object.hasOwn).toBe('function');
  });

  test('transform #0', async () => {
    await expect('Object.prototype.hasOwnProperty.call(e, s)')
      .toBeTransform('Object.hasOwn(e, s);');
  });

  test('transform #1', async () => {
    await expect('Object.prototype.hasOwnProperty.call(e, "key")')
      .toBeTransform('Object.hasOwn(e, "key");');
  });

  test('transform #2', async () => {
    await expect('Object.prototype.hasOwnProperty.call(Object(e), s)')
      .toBeTransform('Object.hasOwn(Object(e), s);');
  });

  test('NO transform', async () => {
    const code = 'obj.hasOwnProperty(a);';

    await expect(code).toBeTransform(code);
  });
});
