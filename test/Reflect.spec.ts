describe('Reflect', () => {
  it.each(
    [
      // object
      'typeof Reflect === "object"',
      'typeof Reflect == "object"',
      '"object" === typeof Reflect',
      '"object" == typeof Reflect',
      // undefined
      'typeof Reflect !== "undefined"',
      'typeof Reflect != "undefined"',
      '"undefined" !== typeof Reflect',
      '"undefined" != typeof Reflect',
      // incorrect value
      'typeof Reflect !== "string"',
      '"function" !== typeof Reflect',
      '"function" != typeof Reflect',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      // object
      'typeof Reflect !== "object"',
      'typeof Reflect != "object"',
      '"object" !== typeof Reflect',
      '"object" != typeof Reflect',
      // undefined
      'typeof Reflect === "undefined"',
      'typeof Reflect == "undefined"',
      '"undefined" === typeof Reflect',
      '"undefined" == typeof Reflect',
      // incorrect value
      '"function" == typeof Reflect',
      'typeof Reflect == "function"',
      'typeof Reflect === "function"',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });
});
