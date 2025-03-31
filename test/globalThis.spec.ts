import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void globalThis;

describe('globalThis', () => {
  test('typeof', () => {
    expect(typeof globalThis).toBe('object');
  });

  test('transform #0', async () => {
    await expect(`function Xo() {
  return "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== n.g ? n.g : "undefined" != typeof self ? self : Yo
}`,
    ).toBeTransform(`function Xo() {
  return globalThis;
}`);
  });

  test('transform #1', async () => {
    await expect(`var K3 = function() {
  return "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : void 0 !== n.g ? n.g : "undefined" != typeof WorkerGlobalScope ? WorkerGlobalScope : G3
}`,
    ).toBeTransform(`var K3 = function () {
  return "undefined" != typeof window ? window : globalThis;
};`);
  });
});
