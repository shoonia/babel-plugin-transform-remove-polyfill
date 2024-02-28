describe('Object.setPrototypeOf', () => {
  it('tranfrom', async () => {
    await expect(
      'Object.setPrototypeOf || ((e,t)=>(e.__proto__ = t, e))',
    ).toBeTransform('Object.setPrototypeOf;');
  });

  it('tranfrom #2', async () => {
    await expect(
      '(Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)',
    ).toBeTransform('Object.setPrototypeOf(e, t);');
  });

  it.each(
    [
      'typeof Object.setPrototypeOf === "function"',
      'typeof Object.setPrototypeOf == "function"',
      '"function" === typeof Object.setPrototypeOf',
      '"function" == typeof Object.setPrototypeOf',
      // undefined
      'typeof Object.setPrototypeOf !== "undefined"',
      'typeof Object.setPrototypeOf != "undefined"',
      '"undefined" !== typeof Object.setPrototypeOf',
      '"undefined" != typeof Object.setPrototypeOf',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      'typeof Object.setPrototypeOf !== "function"',
      'typeof Object.setPrototypeOf != "function"',
      '"function" !== typeof Object.setPrototypeOf',
      '"function" != typeof Object.setPrototypeOf',
      // undefined
      'typeof Object.setPrototypeOf === "undefined"',
      'typeof Object.setPrototypeOf == "undefined"',
      '"undefined" === typeof Object.setPrototypeOf',
      '"undefined" == typeof Object.setPrototypeOf',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });

  it.each(
    [
      'typeof Object.setPrototypeOf === "function" ? A : B',
      'typeof Object.setPrototypeOf !== "function" ? B : A',
      'typeof Object.setPrototypeOf !== "undefined" ? A : B',
      'typeof Object.setPrototypeOf === "undefined" ? B : A',
      // ==
      'typeof Object.setPrototypeOf == "function" ? A : B',
      'typeof Object.setPrototypeOf != "function" ? B : A',
      'typeof Object.setPrototypeOf != "undefined" ? A : B',
      'typeof Object.setPrototypeOf == "undefined" ? B : A',
      // ..
      '"function" === typeof Object.setPrototypeOf ? A : B',
      '"function" !== typeof Object.setPrototypeOf ? B : A',
      '"undefined" !== typeof Object.setPrototypeOf ? A : B',
      '"undefined" === typeof Object.setPrototypeOf ? B : A',
    ]
  )('ternary operator %#', async (code) => {
    await expect(code).toBeTransform('A;');
  });
});
