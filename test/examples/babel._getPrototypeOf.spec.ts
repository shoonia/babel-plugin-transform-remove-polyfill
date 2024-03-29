const code =
`function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf.bind()
    : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
  return _getPrototypeOf(o);
}`;

export const result =
`function _getPrototypeOf(o) {
  _getPrototypeOf = Object.getPrototypeOf.bind();
  return _getPrototypeOf(o);
}`;

it('@babel/helpers: _getPrototypeOf', async () => {
  await expect(code).toBeTransform(result);
});
