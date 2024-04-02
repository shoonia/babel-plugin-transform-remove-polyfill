import { describe, test } from 'node:test';
import { expect } from './setup';

describe('Array.from', () => {
  test('tranfrom #0', async () => {
    await expect('if (Array.from) {}').toBeTransform('if (true) {}');
  });

  test('tranfrom #1', async () => {
    await expect('Array.from || 1').toBeTransform('Array.from;');
  });

  test('tranfrom #2', async () => {
    await expect('Array.from && 1').toBeTransform('1;');
  });

  test('tranfrom #3', async () => {
    await expect('Array.from ? 1 : 2').toBeTransform('1;');
  });

  test('tranfrom #4', async () => {
    await expect('Array.from ?? A').toBeTransform('Array.from;');
  });
});
