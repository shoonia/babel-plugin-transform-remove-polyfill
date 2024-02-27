import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('Object.create');

test('tranfrom #0', async () => {
  is(
    await t`if (Object.create) {}`,
    'if (true) {}'
  );
});

test('tranfrom #1', async () => {
  is(
    await t`Object.create || A`,
    'Object.create;'
  );
});

test('tranfrom #2', async () => {
  is(
    await t`Object.create && A`,
    'A;'
  );
});

test('tranfrom #3', async () => {
  is(
    await t`Object.create ? A : B`,
    'A;'
  );
});

test.run();
