import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from '../utils.js';

const test = suite('@babel/helpers: _extends');

const code =
`function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

  return _extends.apply(this, arguments);
}`;

const result =
`function _extends() {
  _extends = Object.assign.bind();
  return _extends.apply(this, arguments);
}`;

test('transform', async () => {
  is(await t(code), result);
});

test.run();
