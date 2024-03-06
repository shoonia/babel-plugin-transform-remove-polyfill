describe('String.prototype.includes', () => {
  it.each(
    [
      'typeof String.prototype.includes === "function"',
      'typeof String.prototype.includes == "function"',
      '"function" === typeof String.prototype.includes',
      '"function" == typeof String.prototype.includes',
      // undefined
      'typeof String.prototype.includes !== "undefined"',
      'typeof String.prototype.includes != "undefined"',
      '"undefined" !== typeof String.prototype.includes',
      '"undefined" != typeof String.prototype.includes',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      'typeof String.prototype.includes !== "function"',
      'typeof String.prototype.includes != "function"',
      '"function" !== typeof String.prototype.includes',
      '"function" != typeof String.prototype.includes',
      // undefined
      'typeof String.prototype.includes === "undefined"',
      'typeof String.prototype.includes == "undefined"',
      '"undefined" === typeof String.prototype.includes',
      '"undefined" == typeof String.prototype.includes',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });

  it.each(
    [
      'typeof String.prototype.includes === "function" ? A : B',
      'typeof String.prototype.includes !== "function" ? B : A',
      'typeof String.prototype.includes !== "undefined" ? A : B',
      'typeof String.prototype.includes === "undefined" ? B : A',
      // ==
      'typeof String.prototype.includes == "function" ? A : B',
      'typeof String.prototype.includes != "function" ? B : A',
      'typeof String.prototype.includes != "undefined" ? A : B',
      'typeof String.prototype.includes == "undefined" ? B : A',
      // ..
      '"function" === typeof String.prototype.includes ? A : B',
      '"function" !== typeof String.prototype.includes ? B : A',
      '"undefined" !== typeof String.prototype.includes ? A : B',
      '"undefined" === typeof String.prototype.includes ? B : A',
    ]
  )('ternary operator %#', async (code) => {
    await expect(code).toBeTransform('A;');
  });

  it('tranfrom #0', async () => {
    await expect('if (String.prototype.includes) {}').toBeTransform('if (true) {}');
  });

  it('tranfrom #1', async () => {
    await expect('String.prototype.includes || A').toBeTransform('String.prototype.includes;');
  });

  it('tranfrom #2', async () => {
    await expect('String.prototype.includes && A').toBeTransform('A;');
  });

  it('tranfrom #3', async () => {
    await expect('String.prototype.includes ? A : B').toBeTransform('A;');
  });

  it('tranfrom #4', async () => {
    await expect('typeof String.prototype.includes === "function" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #5', async () => {
    await expect('typeof String.prototype.includes !== "undefined" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #6', async () => {
    await expect('"undefined" == typeof String.prototype.includes ? A : B').toBeTransform('B;');
  });
});
