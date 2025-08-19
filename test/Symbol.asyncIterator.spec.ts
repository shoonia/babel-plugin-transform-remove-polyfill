import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Symbol.asyncIterator;

describe('Symbol.asyncIterator', () => {
  test('typeof', () => {
    expect(typeof Symbol.asyncIterator).toBe('symbol');
  });

  test('transform #1', async () => {
    await expect('if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");',
    ).toBeTransform('');
  });
});
