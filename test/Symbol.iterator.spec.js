import { test } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const listTrue = [
  'typeof Symbol.iterator === "symbol"',
  'typeof Symbol.iterator == "symbol"',
  '"symbol" === typeof Symbol.iterator',
  '"symbol" == typeof Symbol.iterator',
];

listTrue.forEach((code, i) => {
  test(`true #${i}`, async () => {
    is(await t(code), 'true;')
  });
});

const listFalse = [
  'typeof Symbol.iterator !== "symbol"',
  'typeof Symbol.iterator != "symbol"',
  '"symbol" !== typeof Symbol.iterator',
  '"symbol" != typeof Symbol.iterator',
];

listFalse.forEach((code, i) => {
  test(`false #${i}`, async () => {
    is(await t(code), 'false;')
  });
});

const noTransformList = [
  'typeof Symbol.iterator === "number";',
  'typeof Symbol.iterator !== "string";',
  '"function" !== typeof Symbol.iterator;',
  '"object" == typeof Symbol.iterator;',
];

noTransformList.forEach((code, i) => {
  test(`no transform #${i}`, async () => {
    is(await t(code), code);
  });
});

test.run();
