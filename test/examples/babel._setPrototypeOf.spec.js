import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from '../utils.js';

const test = suite('@babel/helpers: _setPrototypeOf');

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

test('transform', async () => {
  is(await t(code), result);
});

test.run();
