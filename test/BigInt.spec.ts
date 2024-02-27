describe('BigInt', () => {
  it.each(
    [
      // function
      'typeof BigInt === "function"',
      'typeof BigInt == "function"',
      '"function" === typeof BigInt',
      '"function" == typeof BigInt',
      // undefined
      'typeof BigInt !== "undefined"',
      'typeof BigInt != "undefined"',
      '"undefined" !== typeof BigInt',
      '"undefined" != typeof BigInt',
      // incorrect value
      'typeof BigInt !== "number"',
      '"object" != typeof BigInt',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      // function
      'typeof BigInt !== "function"',
      'typeof BigInt != "function"',
      '"function" !== typeof BigInt',
      '"function" != typeof BigInt',
      // undefined
      'typeof BigInt === "undefined"',
      'typeof BigInt == "undefined"',
      '"undefined" === typeof BigInt',
      '"undefined" == typeof BigInt',
      // incorrect value
      'typeof BigInt === "number"',
      '"object" == typeof BigInt',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });

  it.each(
    [
      'typeof BigInt === "function" ? BigInt : Polyfill',
      'typeof BigInt !== "function" ? Polyfill : BigInt',
      'typeof BigInt !== "undefined" ? BigInt : Polyfill',
      'typeof BigInt === "undefined" ? Polyfill : BigInt',
      // ==
      'typeof BigInt == "function" ? BigInt : Polyfill',
      'typeof BigInt != "function" ? Polyfill : BigInt',
      'typeof BigInt != "undefined" ? BigInt : Polyfill',
      'typeof BigInt == "undefined" ? Polyfill : BigInt',
      // ..
      '"function" === typeof BigInt ? BigInt : Polyfill',
      '"function" !== typeof BigInt ? Polyfill : BigInt',
      '"undefined" !== typeof BigInt ? BigInt : Polyfill',
      '"undefined" === typeof BigInt ? Polyfill : BigInt',
    ]
  )('ternary operator %#', async (code) => {
    await expect(code).toBeTransform('BigInt;');
  });
});
