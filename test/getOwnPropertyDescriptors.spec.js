import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('Object.getOwnPropertyDescriptors');

test('tranfrom `if(true)`', async () => {
  is(
    await t`if (Object.getOwnPropertyDescriptors) {}`,
    'if (true) {}'
  );
});

test('tranfrom #1', async () => {
  is(
    await t`Object.getOwnPropertyDescriptors || function () {}`,
    'Object.getOwnPropertyDescriptors;'
  );
});

test('tranfrom #2', async () => {
  is(
    await t`(Object.getOwnPropertyDescriptors ? function A() {} : function B() {}`,
    'function A() {}'
  );
});

test.run();
