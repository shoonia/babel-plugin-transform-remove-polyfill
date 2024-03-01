describe('Array.prototype', () => {
  it.each(
    [
      'typeof Array.prototype.includes === "function"',
      'typeof Array.prototype.includes == "function"',
      '"function" === typeof Array.prototype.includes',
      '"function" == typeof Array.prototype.includes',
      // undefined
      'typeof Array.prototype.includes !== "undefined"',
      'typeof Array.prototype.includes != "undefined"',
      '"undefined" !== typeof Array.prototype.includes',
      '"undefined" != typeof Array.prototype.includes',
    ]
  )('true %#', async (code) => {
    await expect(code).toBeTransform('true;');
  });

  it.each(
    [
      'typeof Array.prototype.includes !== "function"',
      'typeof Array.prototype.includes != "function"',
      '"function" !== typeof Array.prototype.includes',
      '"function" != typeof Array.prototype.includes',
      // undefined
      'typeof Array.prototype.includes === "undefined"',
      'typeof Array.prototype.includes == "undefined"',
      '"undefined" === typeof Array.prototype.includes',
      '"undefined" == typeof Array.prototype.includes',
    ]
  )('false %#', async (code) => {
    await expect(code).toBeTransform('false;');
  });

  it.each(
    [
      'typeof Array.prototype.findIndex === "function" ? A : B',
      'typeof Array.prototype.findIndex !== "function" ? B : A',
      'typeof Array.prototype.findIndex !== "undefined" ? A : B',
      'typeof Array.prototype.findIndex === "undefined" ? B : A',
      // ==
      'typeof Array.prototype.findIndex == "function" ? A : B',
      'typeof Array.prototype.findIndex != "function" ? B : A',
      'typeof Array.prototype.findIndex != "undefined" ? A : B',
      'typeof Array.prototype.findIndex == "undefined" ? B : A',
      // ..
      '"function" === typeof Array.prototype.findIndex ? A : B',
      '"function" !== typeof Array.prototype.findIndex ? B : A',
      '"undefined" !== typeof Array.prototype.findIndex ? A : B',
      '"undefined" === typeof Array.prototype.findIndex ? B : A',
    ]
  )('ternary operator %#', async (code) => {
    await expect(code).toBeTransform('A;');
  });

  it('tranfrom #0', async () => {
    await expect('if (Array.prototype.find) {}').toBeTransform('if (true) {}');
  });

  it('tranfrom #1', async () => {
    await expect('Array.prototype.find || A').toBeTransform('Array.prototype.find;');
  });

  it('tranfrom #2', async () => {
    await expect('Array.prototype.find && A').toBeTransform('A;');
  });

  it('tranfrom #3', async () => {
    await expect('Array.prototype.find ? A : B').toBeTransform('A;');
  });

  it('tranfrom #4', async () => {
    await expect('typeof Array.prototype.find === "function" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #5', async () => {
    await expect('typeof Array.prototype.find !== "undefined" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #6', async () => {
    await expect('"undefined" == typeof Array.prototype.find ? A : B').toBeTransform('B;');
  });

  it('transform .find #1', async () => {
    await expect(
      `function yr(e, t) {
  return Array.prototype.find ? e.find(t) : e.filter(t)[0]
}`
    ).toBeTransform(
      `function yr(e, t) {
  return e.find(t);
}`
    );
  });
});
