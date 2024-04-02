import { describe, test } from 'node:test';
import { expect } from './setup';

describe('Object.assign', () => {
  test('tranfrom #0', async () => {
    await expect('if (Object.assign) {}').toBeTransform('if (true) {}');
  });
});
