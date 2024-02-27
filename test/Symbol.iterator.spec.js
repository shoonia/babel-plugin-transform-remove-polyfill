import { t } from './utils.js';

describe('Symbol.iterator', () => {
  it.each(
    [
      'typeof Symbol.iterator === "symbol"',
      'typeof Symbol.iterator == "symbol"',
      '"symbol" === typeof Symbol.iterator',
      '"symbol" == typeof Symbol.iterator',
    ]
  )('true %#', async (code) => {
    expect(await t(code)).toBe('true;');
  });

  it.each(
    [
      'typeof Symbol.iterator !== "symbol"',
      'typeof Symbol.iterator != "symbol"',
      '"symbol" !== typeof Symbol.iterator',
      '"symbol" != typeof Symbol.iterator',
    ]
  )('false %#', async (code) => {
    expect(await t(code)).toBe('false;');
  });

  it.each(
    [
      'typeof Symbol.iterator === "number";',
      'typeof Symbol.iterator !== "string";',
      '"function" !== typeof Symbol.iterator;',
      '"object" == typeof Symbol.iterator;',
    ]
  )('no transform %#', async (code) => {
    expect(await t(code)).toBe(code);
  });
});
