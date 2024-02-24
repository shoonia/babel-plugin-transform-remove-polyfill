import { test } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const TRUE = 'true;';
const FALSE = 'false;';

// true

test('transform to true #1', async () => {
  const result = await t`typeof Symbol === 'function'`;
  is(result, TRUE)
});

test('transform to true #2', async () => {
  const result = await t`typeof Symbol == 'function'`;
  is(result, TRUE)
});

test('transform to true #3', async () => {
  const result = await t`'function' === typeof Symbol`;
  is(result, TRUE)
});

test('transform to true #4', async () => {
  const result = await t`'function' == typeof Symbol`;
  is(result, TRUE)
});

// false

test('transform to false #1', async () => {
  const result = await t`typeof Symbol !== 'function'`;
  is(result, FALSE)
});

test('transform to false #2', async () => {
  const result = await t`typeof Symbol != 'function'`;
  is(result, FALSE)
});

test('transform to false #3', async () => {
  const result = await t`'function' !== typeof Symbol`;
  is(result, FALSE)
});

test('transform to false #4', async () => {
  const result = await t`'function' != typeof Symbol`;
  is(result, FALSE)
});

test.run();
