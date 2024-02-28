describe('Reflect.construct', () => {
  it.each(
    [
      'typeof Reflect.construct === "function"',
      'typeof Reflect.construct == "function"',
      '"function" === typeof Reflect.construct',
      '"function" == typeof Reflect.construct',
      // undefined
      'typeof Reflect.construct !== "undefined"',
      'typeof Reflect.construct != "undefined"',
      '"undefined" !== typeof Reflect.construct',
      '"undefined" != typeof Reflect.construct',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      'typeof Reflect.construct !== "function"',
      'typeof Reflect.construct != "function"',
      '"function" !== typeof Reflect.construct',
      '"function" != typeof Reflect.construct',
      // undefined
      'typeof Reflect.construct === "undefined"',
      'typeof Reflect.construct == "undefined"',
      '"undefined" === typeof Reflect.construct',
      '"undefined" == typeof Reflect.construct',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });
});
