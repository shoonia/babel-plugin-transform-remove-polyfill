import { t } from './utils.js';

describe('WeakSet', () => {
  it.each(
    [
      // function
      'typeof WeakSet === "function"',
      'typeof WeakSet == "function"',
      '"function" === typeof WeakSet',
      '"function" == typeof WeakSet',
      // undefined
      'typeof WeakSet !== "undefined"',
      'typeof WeakSet != "undefined"',
      '"undefined" !== typeof WeakSet',
      '"undefined" != typeof WeakSet',
      // incorrect value
      'typeof WeakSet !== "number"',
      '"object" != typeof WeakSet',
    ]
  )('true %#', async (code) => {
    expect(await t(code)).toBe('true;');
  });

  it.each(
    [
      // function
      'typeof WeakSet !== "function"',
      'typeof WeakSet != "function"',
      '"function" !== typeof WeakSet',
      '"function" != typeof WeakSet',
      // undefined
      'typeof WeakSet === "undefined"',
      'typeof WeakSet == "undefined"',
      '"undefined" === typeof WeakSet',
      '"undefined" == typeof WeakSet',
      // incorrect value
      'typeof WeakSet === "number"',
      '"object" == typeof WeakSet',
    ]
  )('false %#', async (code) => {
    expect(await t(code)).toBe('false;');
  });

  it.each(
    [
      'typeof WeakSet === "function" ? WeakSet : Polyfill',
      'typeof WeakSet !== "function" ? Polyfill : WeakSet',
      'typeof WeakSet !== "undefined" ? WeakSet : Polyfill',
      'typeof WeakSet === "undefined" ? Polyfill : WeakSet',
      // ==
      'typeof WeakSet == "function" ? WeakSet : Polyfill',
      'typeof WeakSet != "function" ? Polyfill : WeakSet',
      'typeof WeakSet != "undefined" ? WeakSet : Polyfill',
      'typeof WeakSet == "undefined" ? Polyfill : WeakSet',
      // ..
      '"function" === typeof WeakSet ? WeakSet : Polyfill',
      '"function" !== typeof WeakSet ? Polyfill : WeakSet',
      '"undefined" !== typeof WeakSet ? WeakSet : Polyfill',
      '"undefined" === typeof WeakSet ? Polyfill : WeakSet',
    ]
  )('ternary operator %#', async (code) => {
    expect(await t(code)).toBe('WeakSet;');
  });
});
