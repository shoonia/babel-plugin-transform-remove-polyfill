describe('Reflect.construct', () => {
  it('tranfrom #0', async () => {
    await expect('if (Reflect.construct) {}').toBeTransform('if (true) {}');
  });

  it('tranfrom #1', async () => {
    await expect('Reflect.construct || A').toBeTransform('Reflect.construct;');
  });

  it('tranfrom #2', async () => {
    await expect('Reflect.construct && A').toBeTransform('A;');
  });

  it('tranfrom #3', async () => {
    await expect('Reflect.construct ? A : B').toBeTransform('A;');
  });

  it('tranfrom #4', async () => {
    await expect('typeof Reflect.construct === "function" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #5', async () => {
    await expect('typeof Reflect.construct !== "undefined" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #6', async () => {
    await expect('"undefined" == typeof Reflect.construct ? A : B').toBeTransform('B;');
  });

  it('tranfrom #7', async () => {
    await expect('Reflect.construct ?? A').toBeTransform('Reflect.construct;');
  });

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

  it.each(
    [
      'typeof Reflect.construct === "function" ? A : B',
      'typeof Reflect.construct !== "function" ? B : A',
      'typeof Reflect.construct !== "undefined" ? A : B',
      'typeof Reflect.construct === "undefined" ? B : A',
      // ==
      'typeof Reflect.construct == "function" ? A : B',
      'typeof Reflect.construct != "function" ? B : A',
      'typeof Reflect.construct != "undefined" ? A : B',
      'typeof Reflect.construct == "undefined" ? B : A',
      // ..
      '"function" === typeof Reflect.construct ? A : B',
      '"function" !== typeof Reflect.construct ? B : A',
      '"undefined" !== typeof Reflect.construct ? A : B',
      '"undefined" === typeof Reflect.construct ? B : A',
    ]
  )('ternary operator %#', async (code) => {
    await expect(code).toBeTransform('A;');
  });
});
