import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('Object.getOwnPropertyDescriptors');

test('tranfrom #0', async () => {
  is(
    await t`if (Object.getOwnPropertyDescriptors) {}`,
    'if (true) {}'
  );
});

test('tranfrom #1', async () => {
  is(
    await t`Object.getOwnPropertyDescriptors || A`,
    'Object.getOwnPropertyDescriptors;'
  );
});

test('tranfrom #1', async () => {
  is(
    await t`Object.getOwnPropertyDescriptors && A`,
    'A;'
  );
});

test('tranfrom #3', async () => {
  is(
    await t`Object.getOwnPropertyDescriptors ? A : B`,
    'A;'
  );
});

test.run();
