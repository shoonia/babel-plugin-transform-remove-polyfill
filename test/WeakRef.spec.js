import { t } from './utils.js';

describe('WeakRef', () => {
  it.each(
    [
      // function
      'typeof WeakRef === "function"',
      'typeof WeakRef == "function"',
      '"function" === typeof WeakRef',
      '"function" == typeof WeakRef',
      // undefined
      'typeof WeakRef !== "undefined"',
      'typeof WeakRef != "undefined"',
      '"undefined" !== typeof WeakRef',
      '"undefined" != typeof WeakRef',
      // incorrect value
      'typeof WeakRef !== "number"',
      '"object" != typeof WeakRef',
    ]
  )('true %#', async (code) => {
    expect(await t(code)).toBe('true;');
  });

  it.each(
    [
      // function
      'typeof WeakRef !== "function"',
      'typeof WeakRef != "function"',
      '"function" !== typeof WeakRef',
      '"function" != typeof WeakRef',
      // undefined
      'typeof WeakRef === "undefined"',
      'typeof WeakRef == "undefined"',
      '"undefined" === typeof WeakRef',
      '"undefined" == typeof WeakRef',
      // incorrect value
      'typeof WeakRef === "number"',
      '"object" == typeof WeakRef',
    ]
  )('false %#', async (code) => {
    expect(await t(code)).toBe('false;');
  });

  it.each(
    [
      'typeof WeakRef === "function" ? WeakRef : Polyfill',
      'typeof WeakRef !== "function" ? Polyfill : WeakRef',
      'typeof WeakRef !== "undefined" ? WeakRef : Polyfill',
      'typeof WeakRef === "undefined" ? Polyfill : WeakRef',
      // ==
      'typeof WeakRef == "function" ? WeakRef : Polyfill',
      'typeof WeakRef != "function" ? Polyfill : WeakRef',
      'typeof WeakRef != "undefined" ? WeakRef : Polyfill',
      'typeof WeakRef == "undefined" ? Polyfill : WeakRef',
      // ..
      '"function" === typeof WeakRef ? WeakRef : Polyfill',
      '"function" !== typeof WeakRef ? Polyfill : WeakRef',
      '"undefined" !== typeof WeakRef ? WeakRef : Polyfill',
      '"undefined" === typeof WeakRef ? Polyfill : WeakRef',
    ]
  )('ternary operator %#', async (code) => {
    expect(await t(code)).toBe('WeakRef;');
  });
});
