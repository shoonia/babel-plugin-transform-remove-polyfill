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

  it('transform #3', async () => {
    await expect(
      `var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
  return typeof e
}
: function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
}`
    ).toBeTransform(
      `var r = function (e) {
  return typeof e;
};`
    );
  });
});
