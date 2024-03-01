describe('Array.isArray', () => {
  it('tranfrom #0', async () => {
    await expect('if (Array.isArray) {}',).toBeTransform('if (true) {}');
  });

  it('tranfrom #1', async () => {
    await expect('Array.isArray || A',).toBeTransform('Array.isArray;');
  });

  it('tranfrom #2', async () => {
    await expect('Array.isArray && A',).toBeTransform('A;');
  });

  it('tranfrom #3', async () => {
    await expect('Array.isArray ? A : B').toBeTransform('A;');
  });

  it('tranfrom #4', async () => {
    await expect('typeof Array.isArray === "function" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #5', async () => {
    await expect('typeof Array.isArray !== "undefined" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #6', async () => {
    await expect('"undefined" == typeof Array.isArray ? A : B').toBeTransform('B;');
  });

  it('tranfrom #7', async () => {
    await expect('Array.isArray ?? A',).toBeTransform('Array.isArray;');
  });

  it.each(
    [
      'typeof Array.isArray === "function"',
      'typeof Array.isArray == "function"',
      '"function" === typeof Array.isArray',
      '"function" == typeof Array.isArray',
      // undefined
      'typeof Array.isArray !== "undefined"',
      'typeof Array.isArray != "undefined"',
      '"undefined" !== typeof Array.isArray',
      '"undefined" != typeof Array.isArray',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      'typeof Array.isArray !== "function"',
      'typeof Array.isArray != "function"',
      '"function" !== typeof Array.isArray',
      '"function" != typeof Array.isArray',
      // undefined
      'typeof Array.isArray === "undefined"',
      'typeof Array.isArray == "undefined"',
      '"undefined" === typeof Array.isArray',
      '"undefined" == typeof Array.isArray',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });

  it.each(
    [
      'typeof Array.isArray === "function" ? A : B',
      'typeof Array.isArray !== "function" ? B : A',
      'typeof Array.isArray !== "undefined" ? A : B',
      'typeof Array.isArray === "undefined" ? B : A',
      // ==
      'typeof Array.isArray == "function" ? A : B',
      'typeof Array.isArray != "function" ? B : A',
      'typeof Array.isArray != "undefined" ? A : B',
      'typeof Array.isArray == "undefined" ? B : A',
      // ..
      '"function" === typeof Array.isArray ? A : B',
      '"function" !== typeof Array.isArray ? B : A',
      '"undefined" !== typeof Array.isArray ? A : B',
      '"undefined" === typeof Array.isArray ? B : A',
    ]
  )('ternary operator %#', async (code) => {
    await expect(code).toBeTransform('A;');
  });
});
