describe('Object.getOwnPropertyDescriptors', () => {
  it('tranfrom #0', async () => {
    await expect(
      'if (Object.getOwnPropertyDescriptors) {}',
    ).toBeTransform('if (true) {}');
  });

  it('tranfrom #1', async () => {
    await expect(
      'Object.getOwnPropertyDescriptors || A',
    ).toBeTransform('Object.getOwnPropertyDescriptors;');
  });

  it('tranfrom #2', async () => {
    await expect(
      'Object.getOwnPropertyDescriptors && A',
    ).toBeTransform('A;');
  });

  it('tranfrom #3', async () => {
    await expect(
      'Object.getOwnPropertyDescriptors ? A : B',
    ).toBeTransform('A;');
  });
});
