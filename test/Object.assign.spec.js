import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('Object.assign');

test('tranfrom #0', async () => {
  is(
    await t`if (Object.assign) {}`,
    'if (true) {}'
  );
});

test('tranfrom #1', async () => {
  is(
    await t`Object.assign || A`,
    'Object.assign;'
  );
});

test('tranfrom #2', async () => {
  is(
    await t`Object.assign && A`,
    'A;'
  );
});

test('tranfrom #3', async () => {
  is(
    await t`Object.assign ? A : B`,
    'A;'
  );
});

test.run();
