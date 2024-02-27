describe('Object.prototype.hasOwnProperty.call', () => {
  it.skip('transform', async () => {
    await expect('Object.prototype.hasOwnProperty.call(e, s)',).toBeTransform(
      'Object.hasOwn(e, s);'
    );
  });

  it.skip('NO transform', async () => {
    const code = 'obj.hasOwnProperty(a);';

    await expect(code).toBeTransform(code);
  });
});
