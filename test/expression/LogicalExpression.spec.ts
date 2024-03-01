describe('LogicalExpression', () => {
  it.each([
    '(typeof Symbol == "undefined" && Symbol.for && Symbol.for("react.element")) || 0xeac7;',
    '(typeof Symbol != "function" && Symbol.for && Symbol.for("react.element")) || 0xeac7;',
  ])('%#', async (code) => {
    await expect(code).toBeTransform('0xeac7;');
  });

  it.each([
    '(typeof Symbol == "undefined" && Symbol.for && Symbol.for("react.element"))',
    '(typeof Symbol != "function" && Symbol.for && Symbol.for("react.element"));',
  ])('%#', async (code) => {
    await expect(code).toBeTransform('false;');
  });

  it.each([
    ['typeof Symbol == "function" ?? {}', 'true;'],
    ['typeof Symbol != "function" ?? {}', 'false;'],
    ['true ?? {}', 'true;'],
    ['false ?? {}', 'false;'],
  ])('%#', async (code, result) => {
    await expect(code).toBeTransform(result);
  });
});
