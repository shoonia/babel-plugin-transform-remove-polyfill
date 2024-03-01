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
});
