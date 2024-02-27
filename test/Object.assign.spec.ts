describe('Object.assign', () => {
  it('tranfrom #0', async () => {
    await expect('if (Object.assign) {}',).toBeTransform('if (true) {}');
  });

  it('tranfrom #1', async () => {
    await expect('Object.assign || A',).toBeTransform('Object.assign;');
  });

  it('tranfrom #2', async () => {
    await expect('Object.assign && A',).toBeTransform('A;');
  });

  it('tranfrom #3', async () => {
    await expect('Object.assign ? A : B').toBeTransform('A;');
  });

  it('tranfrom #4', async () => {
    await expect('typeof Object.assign === "function" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #5', async () => {
    await expect('typeof Object.assign !== "undefined" ? A : B').toBeTransform('A;');
  });

  it('tranfrom #6', async () => {
    await expect('"undefined" == typeof Object.assign ? A : B').toBeTransform('B;');
  });
});
