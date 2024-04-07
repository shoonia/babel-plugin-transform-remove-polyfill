import { describe, test } from 'node:test';
import { expect } from './setup';

Object.defineProperties;

describe('Object.defineProperties', () => {
  test('typeof', () => {
    expect(typeof Object.defineProperties).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`var ca = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
      if (a == Array.prototype || a == Object.prototype)
          return a;
      a[b] = c.value;
      return a
  }`).toBeTransform('var ca = Object.defineProperty;');
  });

  test('transform #2 (drop `else`)', async () => {
    await expect(`if (Object.defineProperties) {
      var d = Object.getOwnPropertyDescriptor(b, c);
      d && Object.defineProperty(a, c, d)
    } else
      a[c] = b[c];`
    ).toBeTransform(`if (true) {
  var d = Object.getOwnPropertyDescriptor(b, c);
  d && Object.defineProperty(a, c, d);
}`);
  });
});
