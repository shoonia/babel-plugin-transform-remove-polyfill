describe('Object.assign', () => {
  it('tranfrom #0', async () => {
    await expect('if (Object.assign) {}',).toBeTransform('if (true) {}');
  });

  it('tranfrom #1', async () => {
    await expect('Object.assign || A',).toBeTransform('Object.assign;');
  });

  it('tranfrom #2', async () => {
    await expect('Object.assign && A',).toBeTransform('A;');
  });

  it('tranfrom #3', async () => {
    await expect('Object.assign ? A : B').toBeTransform('A;');
  });

  it('tranfrom #4', async () => {
    await expect('typeof Object.assign === "function" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #5', async () => {
    await expect('typeof Object.assign !== "undefined" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #6', async () => {
    await expect('"undefined" == typeof Object.assign ? A : B').toBeTransform('B;');
  });

  it('tranfrom #7', async () => {
    await expect('Object.assign ?? A',).toBeTransform('Object.assign;');
  });

  it.each(
    [
      'typeof Object.assign === "function"',
      'typeof Object.assign == "function"',
      '"function" === typeof Object.assign',
      '"function" == typeof Object.assign',
      // undefined
      'typeof Object.assign !== "undefined"',
      'typeof Object.assign != "undefined"',
      '"undefined" !== typeof Object.assign',
      '"undefined" != typeof Object.assign',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      'typeof Object.assign !== "function"',
      'typeof Object.assign != "function"',
      '"function" !== typeof Object.assign',
      '"function" != typeof Object.assign',
      // undefined
      'typeof Object.assign === "undefined"',
      'typeof Object.assign == "undefined"',
      '"undefined" === typeof Object.assign',
      '"undefined" == typeof Object.assign',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });

  it.each(
    [
      'typeof Object.assign === "function" ? A : B',
      'typeof Object.assign !== "function" ? B : A',
      'typeof Object.assign !== "undefined" ? A : B',
      'typeof Object.assign === "undefined" ? B : A',
      // ==
      'typeof Object.assign == "function" ? A : B',
      'typeof Object.assign != "function" ? B : A',
      'typeof Object.assign != "undefined" ? A : B',
      'typeof Object.assign == "undefined" ? B : A',
      // ..
      '"function" === typeof Object.assign ? A : B',
      '"function" !== typeof Object.assign ? B : A',
      '"undefined" !== typeof Object.assign ? A : B',
      '"undefined" === typeof Object.assign ? B : A',
    ]
  )('ternary operator %#', async (code) => {
    await expect(code).toBeTransform('A;');
  });
});
