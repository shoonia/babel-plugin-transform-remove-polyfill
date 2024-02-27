describe('Object.getOwnPropertySymbols', () => {
  it('tranfrom #0', async () => {
    await expect('if (Object.getOwnPropertySymbols) {}',).toBeTransform('if (true) {}');
  });

  it('tranfrom #1', async () => {
    await expect('Object.getOwnPropertySymbols || A',).toBeTransform('Object.getOwnPropertySymbols;');
  });

  it('tranfrom #2', async () => {
    await expect('Object.getOwnPropertySymbols && A',).toBeTransform('A;');
  });

  it('tranfrom #3', async () => {
    await expect('Object.getOwnPropertySymbols ? A : B').toBeTransform('A;');
  });
});
