import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from '../utils.js';

const test = suite('typescript: __assign');

const code =
`var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};`;

const result = 'var __assign = Object.assign;';

test('transform', async () => {
  is(await t(code), result);
});

test.run();
