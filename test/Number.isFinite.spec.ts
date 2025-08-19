import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Number.isFinite;

describe('Number.isFinite', () => {
  test('typeof', () => {
    expect(typeof Number.isFinite).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`module.exports = Number.isFinite || function (value) {
	return !(typeof value !== 'number' || value !== value || value === Infinity || value === -Infinity);
};`,
    ).toBeTransform('module.exports = Number.isFinite;');
  });
});
