describe('Symbol', () => {
  it.each(
    [
      // function
      'typeof Symbol === "function"',
      'typeof Symbol == "function"',
      '"function" === typeof Symbol',
      '"function" == typeof Symbol',
      // undefined
      'typeof Symbol !== "undefined"',
      'typeof Symbol != "undefined"',
      '"undefined" !== typeof Symbol',
      '"undefined" != typeof Symbol',
      // call
      'typeof Symbol() == "symbol"',
      'typeof Symbol() === "symbol"',
      '"symbol" == typeof Symbol()',
      '"symbol" === typeof Symbol()',
      // incorrect value
      'typeof Symbol !== "string"',
      '"object" !== typeof Symbol',
      '"object" != typeof Symbol',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      // function
      'typeof Symbol !== "function"',
      'typeof Symbol != "function"',
      '"function" !== typeof Symbol',
      '"function" != typeof Symbol',
      // undefined
      'typeof Symbol === "undefined"',
      'typeof Symbol == "undefined"',
      '"undefined" === typeof Symbol',
      '"undefined" == typeof Symbol',
      // call
      'typeof Symbol() != "symbol"',
      'typeof Symbol() !== "symbol"',
      '"symbol" != typeof Symbol()',
      '"symbol" !== typeof Symbol()',
      // incorrect value
      '"object" == typeof Symbol',
      'typeof Symbol == "object"',
      'typeof Symbol === "object"',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });

  it.each(
    [
      'typeof Symbol === "function" ? Symbol : Polyfill',
      'typeof Symbol !== "function" ? Polyfill : Symbol',
      'typeof Symbol !== "undefined" ? Symbol : Polyfill',
      'typeof Symbol === "undefined" ? Polyfill : Symbol',
      // ==
      'typeof Symbol == "function" ? Symbol : Polyfill',
      'typeof Symbol != "function" ? Polyfill : Symbol',
      'typeof Symbol != "undefined" ? Symbol : Polyfill',
      'typeof Symbol == "undefined" ? Polyfill : Symbol',
      // ..
      '"function" === typeof Symbol ? Symbol : Polyfill',
      '"function" !== typeof Symbol ? Polyfill : Symbol',
      '"undefined" !== typeof Symbol ? Symbol : Polyfill',
      '"undefined" === typeof Symbol ? Polyfill : Symbol',
    ]
  )('ternary operator %#', async (code) => {
    await expect(code).toBeTransform('Symbol;');
  });

  it('true && true', async () => {
    await expect(
      '"function" == typeof Symbol && "symbol" == typeof Symbol("foo")',
    ).toBeTransform(
      'true && true;'
    );
  });
});
