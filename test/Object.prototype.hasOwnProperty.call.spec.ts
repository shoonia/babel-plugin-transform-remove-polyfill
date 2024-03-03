describe('Object.prototype.hasOwnProperty.call', () => {
  it('transform', async () => {
    await expect(
      'Object.prototype.hasOwnProperty.call(e, s)'
    ).toBeTransformWithExperiment(
      'Object.hasOwn(e, s);'
    );
  });

  it.each([
    'obj.hasOwnProperty(a);',
    'Object.prototype.hasOwnProperty.call;',
    'Object.prototype.hasOwnProperty.call(this, b);',
    'Object.prototype.hasOwnProperty.call.bind(true);',
    'SomeObject.prototype.hasOwnProperty.call(a, b);',
  ])('NO transform', async (code) => {
    await expect(code).toBeTransformWithExperiment(code);
  });
});
