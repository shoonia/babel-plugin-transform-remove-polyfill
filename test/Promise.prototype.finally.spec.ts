import { describe, test } from 'node:test';
import { expect } from './setup';

Promise.prototype.finally;

describe('Promise.prototype.finally', () => {
  test('typeof', () => {
    expect(typeof Promise.prototype.finally).toBe('function');
  });

  test('transform #0', async () => {
    await expect('if (Promise.prototype.finally) {}').toBeTransform('if (true) {}');
  });
});
