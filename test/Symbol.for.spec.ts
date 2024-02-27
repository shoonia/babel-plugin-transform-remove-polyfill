describe('Symbol.for', () => {
  it('remove', async () => {
    await expect(
      'Symbol.for && Symbol.for("react.forward_ref")',
    ).toBeTransform('Symbol.for("react.forward_ref");');
  });

  it('remove #2', async () => {
    await expect(
      'var c = Symbol.for && Symbol.for("react.forward_ref") || 3911;',
    ).toBeTransform('var c = Symbol.for("react.forward_ref") || 3911;');
  });
});
