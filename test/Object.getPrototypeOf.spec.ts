describe('Object.getPrototypeOf', () => {
  it('remove #1', async () => {
    await expect(
      'var h = Object.getPrototypeOf || function(e) { return e.__proto__ }'
    ).toBeTransform('var h = Object.getPrototypeOf;');
  });
});
