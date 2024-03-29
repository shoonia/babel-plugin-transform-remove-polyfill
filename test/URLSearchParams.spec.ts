describe('URLSearchParams', () => {
  it.each(
    [
      // function
      'typeof URLSearchParams === "function"',
      'typeof URLSearchParams == "function"',
      '"function" === typeof URLSearchParams',
      '"function" == typeof URLSearchParams',
      // undefined
      'typeof URLSearchParams !== "undefined"',
      'typeof URLSearchParams != "undefined"',
      '"undefined" !== typeof URLSearchParams',
      '"undefined" != typeof URLSearchParams',
      // incorrect value
      'typeof URLSearchParams !== "number"',
      '"object" != typeof URLSearchParams',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      // function
      'typeof URLSearchParams !== "function"',
      'typeof URLSearchParams != "function"',
      '"function" !== typeof URLSearchParams',
      '"function" != typeof URLSearchParams',
      // undefined
      'typeof URLSearchParams === "undefined"',
      'typeof URLSearchParams == "undefined"',
      '"undefined" === typeof URLSearchParams',
      '"undefined" == typeof URLSearchParams',
      // incorrect value
      'typeof URLSearchParams === "number"',
      '"object" == typeof URLSearchParams',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });

  it.each(
    [
      'typeof URLSearchParams === "function" ? URLSearchParams : Polyfill',
      'typeof URLSearchParams !== "function" ? Polyfill : URLSearchParams',
      'typeof URLSearchParams !== "undefined" ? URLSearchParams : Polyfill',
      'typeof URLSearchParams === "undefined" ? Polyfill : URLSearchParams',
      // ==
      'typeof URLSearchParams == "function" ? URLSearchParams : Polyfill',
      'typeof URLSearchParams != "function" ? Polyfill : URLSearchParams',
      'typeof URLSearchParams != "undefined" ? URLSearchParams : Polyfill',
      'typeof URLSearchParams == "undefined" ? Polyfill : URLSearchParams',
      // ..
      '"function" === typeof URLSearchParams ? URLSearchParams : Polyfill',
      '"function" !== typeof URLSearchParams ? Polyfill : URLSearchParams',
      '"undefined" !== typeof URLSearchParams ? URLSearchParams : Polyfill',
      '"undefined" === typeof URLSearchParams ? Polyfill : URLSearchParams',
    ]
  )('ternary operator %#', async (code) => {
    await expect(code).toBeTransform('URLSearchParams;');
  });
});
