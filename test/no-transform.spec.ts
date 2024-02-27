describe('no-transform', () => {
  it.each(
    [
      'typeof identifier === "function" ? 0 : 1;',
      'typeof identifier !== "function" ? 0 : 1;',
      '"undefined" == typeof identifier ? 0 : 1;',
      '"undefined" != typeof identifier ? 0 : 1;',
      'Object.getOwnPropertyDescriptor(r, t);',
      'typeof Symbol + "__tag";',
    ]
  )('%#', async (code) => {
    await expect(code).toBeTransform(code);
  });
});
