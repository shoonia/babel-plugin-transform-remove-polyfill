import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Map;

describe('Map', () => {
  test('typeof', () => {
    expect(typeof Map).toBe('function');
  });

  test('transform', async () => {
    await expect('var t = "function" == typeof Map ? new Map : void 0;').toBeTransform('var t = new Map();');
  });
});
