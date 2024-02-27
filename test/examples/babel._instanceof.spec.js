import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from '../utils.js';

const test = suite('@babel/helpers: _instanceof');

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

test('transform', async () => {
  is(await t(code), result);
});

test.run();
