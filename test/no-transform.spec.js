import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('no-transform');

const list = [
  'typeof identifier === "function" ? 0 : 1;',
  'typeof identifier !== "function" ? 0 : 1;',
  '"undefined" == typeof identifier ? 0 : 1;',
  '"undefined" != typeof identifier ? 0 : 1;',
  'Object.getOwnPropertyDescriptor(r, t);',
  'typeof Symbol + "__tag";',
];

list.forEach((code, i) => {
  test(i, async () => {
    is(await t(code), code);
  });
});

test.run();
