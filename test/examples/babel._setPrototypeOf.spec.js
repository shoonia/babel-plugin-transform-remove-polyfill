import { t } from '../utils.js';

const code =
`function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}`;

const result =
`function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf.bind();
  return _setPrototypeOf(o, p);
}`;

it('@babel/helpers: _setPrototypeOf', async () => {
  expect(await t(code)).toBe(result);
});
