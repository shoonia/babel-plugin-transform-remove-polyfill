const code =
`function _instanceof(left, right) {
  if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  }
  return left instanceof right;
}`;

export const result =
`function _instanceof(left, right) {
  if (right != null && true && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  }
  return left instanceof right;
}`;

it('@babel/helpers: _instanceof', async () => {
  await expect(code).toBeTransform(result);
});
