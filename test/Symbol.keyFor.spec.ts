describe('Symbol.keyFor', () => {
  it('tranfrom #0', async () => {
    await expect('if (Symbol.keyFor) {}',).toBeTransform('if (true) {}');
  });

  it('tranfrom #1', async () => {
    await expect('Symbol.keyFor || A',).toBeTransform('Symbol.keyFor;');
  });

  it('tranfrom #2', async () => {
    await expect('Symbol.keyFor && A',).toBeTransform('A;');
  });

  it('tranfrom #3', async () => {
    await expect('Symbol.keyFor ? A : B').toBeTransform('A;');
  });

  it('tranfrom #4', async () => {
    await expect('typeof Symbol.keyFor === "function" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #5', async () => {
    await expect('typeof Symbol.keyFor !== "undefined" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #6', async () => {
    await expect('"undefined" == typeof Symbol.keyFor ? A : B').toBeTransform('B;');
  });

  it.each(
    [
      'typeof Symbol.keyFor === "function"',
      'typeof Symbol.keyFor == "function"',
      '"function" === typeof Symbol.keyFor',
      '"function" == typeof Symbol.keyFor',
      // undefined
      'typeof Symbol.keyFor !== "undefined"',
      'typeof Symbol.keyFor != "undefined"',
      '"undefined" !== typeof Symbol.keyFor',
      '"undefined" != typeof Symbol.keyFor',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      'typeof Symbol.keyFor !== "function"',
      'typeof Symbol.keyFor != "function"',
      '"function" !== typeof Symbol.keyFor',
      '"function" != typeof Symbol.keyFor',
      // undefined
      'typeof Symbol.keyFor === "undefined"',
      'typeof Symbol.keyFor == "undefined"',
      '"undefined" === typeof Symbol.keyFor',
      '"undefined" == typeof Symbol.keyFor',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });
});
