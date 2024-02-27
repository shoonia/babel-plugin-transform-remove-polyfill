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

  it('tranfrom #4', async () => {
    await expect(
      'typeof Object.getOwnPropertyDescriptors === "function" ? A : B'
    ).toBeTransform('A;');
  });

  it('tranfrom #5', async () => {
    await expect(
      'typeof Object.getOwnPropertyDescriptors !== "undefined" ? A : B'
    ).toBeTransform('A;');
  });

  it('tranfrom #6', async () => {
    await expect(
      '"undefined" == typeof Object.getOwnPropertyDescriptors ? A : B'
    ).toBeTransform('B;');
  });
});
