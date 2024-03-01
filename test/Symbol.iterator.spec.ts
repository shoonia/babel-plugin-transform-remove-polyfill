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

  it('transform #1', async () => {
    await expect(
      `"function" == typeof Symbol && (i[Symbol.iterator] = function() {
  return this;
})`
    ).toBeTransform(`i[Symbol.iterator] = function () {
  return this;
};`
    );
  });

  it('transform #2', async () => {
    await expect('"function" == typeof Symbol && Symbol.iterator').toBeTransform('Symbol.iterator;');
  });
});
