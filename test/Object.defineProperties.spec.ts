describe('Object.defineProperties', () => {
  it('transform #1', async () => {
    await expect(
      `Xka = 'function' == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
  if (a == Array.prototype || a == Object.prototype)
    return a;
  a[b] = c.value;
  return a;
};`
    ).toBeTransform(
      'Xka = Object.defineProperty;'
    );
  });
});
