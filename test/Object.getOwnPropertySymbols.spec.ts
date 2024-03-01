describe('Object.getOwnPropertySymbols', () => {
  it('transform #0', async () => {
    await expect('if (Object.getOwnPropertySymbols) {}').toBeTransform('if (true) {}');
  });

  it('transform #1', async () => {
    await expect('Object.getOwnPropertySymbols || A').toBeTransform('Object.getOwnPropertySymbols;');
  });

  it('transform #2', async () => {
    await expect('Object.getOwnPropertySymbols && A').toBeTransform('A;');
  });

  it('transform #3', async () => {
    await expect('Object.getOwnPropertySymbols ? A : B').toBeTransform('A;');
  });

  it('transform #4', async () => {
    await expect(
      '"function" == typeof Object.getOwnPropertySymbols'
    ).toBeTransform('true;');
  });
});
