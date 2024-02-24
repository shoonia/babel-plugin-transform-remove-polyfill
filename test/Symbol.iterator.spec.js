import { test } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const TRUE = 'true;';
const FALSE = 'false;';

// true

test('true #1', async () => {
  const result = await t`typeof Symbol.iterator === 'symbol'`;
  is(result, TRUE)
});

test('true #2', async () => {
  const result = await t`typeof Symbol.iterator == 'symbol'`;
  is(result, TRUE)
});

test('true #3', async () => {
  const result = await t`'symbol' === typeof Symbol.iterator`;
  is(result, TRUE)
});

test('true #4', async () => {
  const result = await t`'symbol' == typeof Symbol.iterator`;
  is(result, TRUE)
});

// false

test('false #1', async () => {
  const result = await t`typeof Symbol.iterator !== 'symbol'`;
  is(result, FALSE)
});

test('false #2', async () => {
  const result = await t`typeof Symbol.iterator != 'symbol'`;
  is(result, FALSE)
});

test('false #3', async () => {
  const result = await t`'symbol' !== typeof Symbol.iterator`;
  is(result, FALSE)
});

test('false #4', async () => {
  const result = await t`'symbol' != typeof Symbol.iterator`;
  is(result, FALSE)
});

test.run();
