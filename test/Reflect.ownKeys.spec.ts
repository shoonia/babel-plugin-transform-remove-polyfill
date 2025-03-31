import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Reflect.ownKeys;

describe('Reflect.ownKeys', () => {
  test('typeof', () => {
    expect(typeof Reflect.ownKeys).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`var $ = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(e) {
        return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
    } : Object.getOwnPropertyNames`,
    ).toBeTransform('var $ = Reflect.ownKeys;');
  });
});
