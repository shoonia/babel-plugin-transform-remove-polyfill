import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Date.now;

describe('Date.now', () => {
  test('typeof', () => {
    expect(typeof Date.now).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`Date.now || (Date.now = function() {
      return (new Date).getTime()
  });`).toBeTransform('');
  });
});
