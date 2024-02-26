import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('Object.getOwnPropertySymbols');

test('tranfrom `if(true)`', async () => {
  is(
    await t`if (Object.getOwnPropertySymbols) {}`,
    'if (true) {}'
  );
});

test('tranfrom', async () => {
  is(
    await t`Object.getOwnPropertySymbols || function () {}`,
    'Object.getOwnPropertySymbols;'
  );
});

test('tranfrom #2', async () => {
  is(
    await t`(Object.getOwnPropertySymbols ? function A() {} : function B() {}`,
    'function A() {}'
  );
});

test.run();
