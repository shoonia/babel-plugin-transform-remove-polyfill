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
});
