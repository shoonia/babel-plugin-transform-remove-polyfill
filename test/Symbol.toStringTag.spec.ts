describe('Symbol.toStringTag', () => {
  it.each(
    [
      'typeof Symbol.toStringTag === "symbol"',
      'typeof Symbol.toStringTag == "symbol"',
      '"symbol" === typeof Symbol.toStringTag',
      '"symbol" == typeof Symbol.toStringTag',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      'typeof Symbol.toStringTag !== "symbol"',
      'typeof Symbol.toStringTag != "symbol"',
      '"symbol" !== typeof Symbol.toStringTag',
      '"symbol" != typeof Symbol.toStringTag',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });

  it.each(
    [
      'typeof Symbol.toStringTag === "number";',
      'typeof Symbol.toStringTag !== "string";',
      '"function" !== typeof Symbol.toStringTag;',
      '"object" == typeof Symbol.toStringTag;',
    ]
  )('no transform %#', async (code) => {
    await expect(code).toBeTransform(code);
  });
});
