import { describe, test } from 'node:test';
import { expect } from './setup';

Proxy.revocable;

describe('Proxy.revocable', () => {
  test('typeof', () => {
    expect(typeof Proxy.revocable).toBe('function');
  });

  test('transform #1', async () => {
    expect('undefined' != typeof Proxy && void 0 !== Proxy.revocable && 'undefined' != typeof Reflect).toBe(true);

    await expect('var H = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect;')
    // TODO: improve result
      .toBeTransform('var H = void 0 !== Proxy.revocable && true;');
  });
});
