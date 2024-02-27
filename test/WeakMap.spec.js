import { t } from './utils.js';

describe('WeakMap', () => {
  it.each(
    [
      // function
      'typeof WeakMap === "function"',
      'typeof WeakMap == "function"',
      '"function" === typeof WeakMap',
      '"function" == typeof WeakMap',
      // undefined
      'typeof WeakMap !== "undefined"',
      'typeof WeakMap != "undefined"',
      '"undefined" !== typeof WeakMap',
      '"undefined" != typeof WeakMap',
      // incorrect value
      'typeof WeakMap !== "number"',
      '"object" != typeof WeakMap',
    ]
  )('true %#', async (code) => {
    expect(await t(code)).toBe('true;');
  });

  it.each(
    [
      // function
      'typeof WeakMap !== "function"',
      'typeof WeakMap != "function"',
      '"function" !== typeof WeakMap',
      '"function" != typeof WeakMap',
      // undefined
      'typeof WeakMap === "undefined"',
      'typeof WeakMap == "undefined"',
      '"undefined" === typeof WeakMap',
      '"undefined" == typeof WeakMap',
      // incorrect value
      'typeof WeakMap === "number"',
      '"object" == typeof WeakMap',
    ]
  )('false %#', async (code) => {
    expect(await t(code)).toBe('false;');
  });

  it.each(
    [
      'typeof WeakMap === "function" ? WeakMap : Polyfill',
      'typeof WeakMap !== "function" ? Polyfill : WeakMap',
      'typeof WeakMap !== "undefined" ? WeakMap : Polyfill',
      'typeof WeakMap === "undefined" ? Polyfill : WeakMap',
      // ==
      'typeof WeakMap == "function" ? WeakMap : Polyfill',
      'typeof WeakMap != "function" ? Polyfill : WeakMap',
      'typeof WeakMap != "undefined" ? WeakMap : Polyfill',
      'typeof WeakMap == "undefined" ? Polyfill : WeakMap',
      // ..
      '"function" === typeof WeakMap ? WeakMap : Polyfill',
      '"function" !== typeof WeakMap ? Polyfill : WeakMap',
      '"undefined" !== typeof WeakMap ? WeakMap : Polyfill',
      '"undefined" === typeof WeakMap ? Polyfill : WeakMap',
    ]
  )('ternary operator %#', async (code) => {
    expect(await t(code)).toBe('WeakMap;');
  });
});
