import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('Object.create');

test('tranfrom', async () => {
  is(
    await t`Object.create || function () {}`,
    'Object.create;'
  );
});

test('tranfrom #2', async () => {
  is(
    await t`(Object.create ? function A() {} : function B() {}`,
    'function A() {}'
  );
});

test.run();
