import { describe, test } from 'node:test';
import { expect } from './setup';

Object.setPrototypeOf;

describe('Object.setPrototypeOf', () => {
  test('typeof', () => {
    expect(typeof Object.setPrototypeOf).toBe('function');
  });

  test('transform', async () => {
    await expect(
      `var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };`
    ).toBeTransform(
      `var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf;
  return extendStatics(d, b);
};`
    );
  });
});
