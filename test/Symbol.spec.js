import { test } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const listTrue = [
  'typeof Symbol === "function"',
  'typeof Symbol == "function"',
  '"function" === typeof Symbol',
  '"function" == typeof Symbol',
];

listTrue.forEach((code, i) => {
  test(`true #${i}`, async () => {
    is(await t(code), 'true;')
  });
});

const listFalse = [
  'typeof Symbol !== "function"',
  'typeof Symbol != "function"',
  '"function" !== typeof Symbol',
  '"function" != typeof Symbol',
];

listFalse.forEach((code, i) => {
  test(`false #${i}`, async () => {
    is(await t(code), 'false;')
  });
});

test.run();
