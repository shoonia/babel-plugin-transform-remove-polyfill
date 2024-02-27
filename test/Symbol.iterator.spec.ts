describe('Symbol.iterator', () => {
  it.each(
    [
      'typeof Symbol.iterator === "symbol"',
      'typeof Symbol.iterator == "symbol"',
      '"symbol" === typeof Symbol.iterator',
      '"symbol" == typeof Symbol.iterator',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      'typeof Symbol.iterator !== "symbol"',
      'typeof Symbol.iterator != "symbol"',
      '"symbol" !== typeof Symbol.iterator',
      '"symbol" != typeof Symbol.iterator',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });

  it.each(
    [
      'typeof Symbol.iterator === "number";',
      'typeof Symbol.iterator !== "string";',
      '"function" !== typeof Symbol.iterator;',
      '"object" == typeof Symbol.iterator;',
    ]
  )('no transform %#', async (code) => {
    await expect(code).toBeTransform(code);
  });
});
