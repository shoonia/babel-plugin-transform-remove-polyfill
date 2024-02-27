import { t } from '../utils.js';

const code =
`function _instanceof(left, right) {
  if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  }
  return left instanceof right;
}`;

const result =
`function _instanceof(left, right) {
  if (right != null && true && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  }
  return left instanceof right;
}`;

it('@babel/helpers: _instanceof', async () => {
  expect(await t(code)).toBe(result);
});
