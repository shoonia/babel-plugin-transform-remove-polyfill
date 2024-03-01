describe('Symbol.for', () => {
  it('tranfrom #0', async () => {
    await expect('if (Symbol.for) {}',).toBeTransform('if (true) {}');
  });

  it('tranfrom #1', async () => {
    await expect('Symbol.for || A',).toBeTransform('Symbol.for;');
  });

  it('tranfrom #2', async () => {
    await expect('Symbol.for && A',).toBeTransform('A;');
  });

  it('tranfrom #3', async () => {
    await expect('Symbol.for ? A : B').toBeTransform('A;');
  });

  it('tranfrom #4', async () => {
    await expect('typeof Symbol.for === "function" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #5', async () => {
    await expect('typeof Symbol.for !== "undefined" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #6', async () => {
    await expect('"undefined" == typeof Symbol.for ? A : B').toBeTransform('B;');
  });

  it('remove #1', async () => {
    await expect(
      'Symbol.for && Symbol.for("react.forward_ref")',
    ).toBeTransform('Symbol.for("react.forward_ref");');
  });

  it('remove #2', async () => {
    await expect(
      'var c = Symbol.for && Symbol.for("react.forward_ref") || 3911;',
    ).toBeTransform('var c = Symbol.for("react.forward_ref") || 3911;');
  });

  it('remove #3', async () => {
    await expect(
      'const REACT_ELEMENT_TYPE = (typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.element")) || 0xeac7;'
    ).toBeTransform(
      'const REACT_ELEMENT_TYPE = Symbol.for("react.element") || 0xeac7;'
    );
  });

  it.each(
    [
      'typeof Symbol.for === "function" ? A : B',
      'typeof Symbol.for !== "function" ? B : A',
      'typeof Symbol.for !== "undefined" ? A : B',
      'typeof Symbol.for === "undefined" ? B : A',
      // ==
      'typeof Symbol.for == "function" ? A : B',
      'typeof Symbol.for != "function" ? B : A',
      'typeof Symbol.for != "undefined" ? A : B',
      'typeof Symbol.for == "undefined" ? B : A',
      // ..
      '"function" === typeof Symbol.for ? A : B',
      '"function" !== typeof Symbol.for ? B : A',
      '"undefined" !== typeof Symbol.for ? A : B',
      '"undefined" === typeof Symbol.for ? B : A',
    ]
  )('ternary operator %#', async (code) => {
    await expect(code).toBeTransform('A;');
  });
});
