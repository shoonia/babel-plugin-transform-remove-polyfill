import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('Object.getOwnPropertySymbols');

test('tranfrom #0', async () => {
  is(
    await t`if (Object.getOwnPropertySymbols) {}`,
    'if (true) {}'
  );
});

test('tranfrom #0.1', async () => {
  is(
    await t`if (Object.getOwnPropertySymbols) {} else if (Object.getOwnPropertySymbols) {}`,
    'if (true) {} else if (true) {}'
  );
});

test('tranfrom #1', async () => {
  is(
    await t`Object.getOwnPropertySymbols || A`,
    'Object.getOwnPropertySymbols;'
  );
});

test('tranfrom #2', async () => {
  is(
    await t`Object.getOwnPropertySymbols && A`,
    'A;'
  );
});

test('tranfrom #3', async () => {
  is(
    await t`Object.getOwnPropertySymbols ? A : B`,
    'A;'
  );
});

test.run();
