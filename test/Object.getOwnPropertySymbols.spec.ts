import { describe, test } from 'node:test';
import { expect } from './setup';

Object.getOwnPropertySymbols;

describe('Object.getOwnPropertySymbols', () => {
  test('typeof', () => {
    expect(typeof Object.getOwnPropertySymbols).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`function a(t, d) {
      var e, n = Object.keys(t);
      return Object.getOwnPropertySymbols && (e = Object.getOwnPropertySymbols(t), d && (e = e.filter(function(d) {
          return Object.getOwnPropertyDescriptor(t, d).enumerable
      })), n.push.apply(n, e)), n
  }`)
      .toBeTransform(`function a(t, d) {
  var e,
    n = Object.keys(t);
  return (e = Object.getOwnPropertySymbols(t), d && (e = e.filter(function (d) {
    return Object.getOwnPropertyDescriptor(t, d).enumerable;
  })), n.push.apply(n, e)), n;
}`);
  });
});
