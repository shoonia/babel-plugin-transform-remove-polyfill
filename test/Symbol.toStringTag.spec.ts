import { describe, test } from 'node:test';
import { expect } from './setup';

Symbol.toStringTag;

describe('Symbol.toStringTag', () => {
  test('typeof', () => {
    expect(typeof Symbol.toStringTag).toBe('symbol');
  });

  test('transform #1', async () => {
    await expect(`o.r = e => {
  "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
    value: "Module"
  }), Object.defineProperty(e, "__esModule", {
    value: !0
  })
}`
    ).toBeTransform(`o.r = e => {
  Object.defineProperty(e, Symbol.toStringTag, {
    value: "Module"
  }), Object.defineProperty(e, "__esModule", {
    value: !0
  });
};`);
  });
});
