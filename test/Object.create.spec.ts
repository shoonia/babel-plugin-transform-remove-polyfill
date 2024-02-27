describe('Object.create', () => {
  it('tranfrom #0', async () => {
    await expect('if (Object.create) {}',).toBeTransform('if (true) {}');
  });

  it('tranfrom #1', async () => {
    await expect('Object.create || A',).toBeTransform('Object.create;');
  });

  it('tranfrom #2', async () => {
    await expect('Object.create && A',).toBeTransform('A;');
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
});
