import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from '../utils.js';

const test = suite('@babel/helpers: _getPrototypeOf');

const code =
`function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf.bind()
    : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
  return _getPrototypeOf(o);
}`;

const result =
`function _getPrototypeOf(o) {
  _getPrototypeOf = Object.getPrototypeOf.bind();
  return _getPrototypeOf(o);
}`;

test('transform', async () => {
  is(await t(code), result);
});

test.run();
