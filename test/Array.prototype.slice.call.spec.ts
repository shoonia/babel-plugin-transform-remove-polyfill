import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Array.prototype.slice.call;
void Array.from;

describe('Array.prototype.slice.call(a) -> Array.from(a)', () => {
  test('typeof', () => {
    expect(typeof Array.prototype.slice.call).toBe('function');
    expect(typeof Array.from).toBe('function');
  });

  test('transform', async () => {
    await expect('Array.prototype.slice.call(arguments)')
      .toBeTransform('Array.from(arguments);');
  });

  test('transform if second argument is 0', async () => {
    await expect('Array.prototype.slice.call(a, 0)')
      .toBeTransform('Array.from(a);');
  });

  const noTransform = [
    'Array.prototype.slice.call;',
    'Array.prototype.slice.call();',
    'Array.prototype.slice.call(0);',
    'Array.prototype.slice.call(a, 1);',
    'Array.prototype.slice.call(a, b);',
    'Array.prototype.slice.call(a, b, 0);',
    'Array.prototype.slice.call.bind(true);',
  ];

  noTransform.forEach((code, i) => {
    test(`NO transform #${i}`, async () => {
      await expect(code).toBeTransform(code);
    });
  });
});
