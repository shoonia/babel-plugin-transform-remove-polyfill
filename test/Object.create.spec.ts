describe('Object.create', () => {
  it('tranfrom #0', async () => {
    await expect('if (Object.create) {}').toBeTransform('if (true) {}');
  });

  it('tranfrom #1', async () => {
    await expect('Object.create || A').toBeTransform('Object.create;');
  });

  it('tranfrom #2', async () => {
    await expect('Object.create && A').toBeTransform('A;');
  });

  it('tranfrom #3', async () => {
    await expect('Object.create ? A : B').toBeTransform('A;');
  });

  it('tranfrom #4', async () => {
    await expect('typeof Object.create === "function" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #5', async () => {
    await expect('typeof Object.create !== "undefined" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #6', async () => {
    await expect('"undefined" == typeof Object.create ? A : B').toBeTransform('B;');
  });

  it('tranfrom #7', async () => {
    await expect('Object.create ?? A').toBeTransform('Object.create;');
  });

  it.each(
    [
      'typeof Object.create === "function"',
      'typeof Object.create == "function"',
      '"function" === typeof Object.create',
      '"function" == typeof Object.create',
      // undefined
      'typeof Object.create !== "undefined"',
      'typeof Object.create != "undefined"',
      '"undefined" !== typeof Object.create',
      '"undefined" != typeof Object.create',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      'typeof Object.create !== "function"',
      'typeof Object.create != "function"',
      '"function" !== typeof Object.create',
      '"function" != typeof Object.create',
      // undefined
      'typeof Object.create === "undefined"',
      'typeof Object.create == "undefined"',
      '"undefined" === typeof Object.create',
      '"undefined" == typeof Object.create',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });

  it.each(
    [
      'typeof Object.create === "function" ? A : B',
      'typeof Object.create !== "function" ? B : A',
      'typeof Object.create !== "undefined" ? A : B',
      'typeof Object.create === "undefined" ? B : A',
      // ==
      'typeof Object.create == "function" ? A : B',
      'typeof Object.create != "function" ? B : A',
      'typeof Object.create != "undefined" ? A : B',
      'typeof Object.create == "undefined" ? B : A',
      // ..
      '"function" === typeof Object.create ? A : B',
      '"function" !== typeof Object.create ? B : A',
      '"undefined" !== typeof Object.create ? A : B',
      '"undefined" === typeof Object.create ? B : A',
    ]
  )('ternary operator %#', async (code) => {
    await expect(code).toBeTransform('A;');
  });

  it('case', async () => {
    await expect(
      `var Da = "function" == typeof Object.create ? Object.create : function(a) {
    var b = function() {};
    b.prototype = a;
    return new b
}`
    ).toBeTransform('var Da = Object.create;');
  });
});
