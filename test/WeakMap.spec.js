import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('WeakMap');

const listTrue = [
  // function
  'typeof WeakMap === "function"',
  'typeof WeakMap == "function"',
  '"function" === typeof WeakMap',
  '"function" == typeof WeakMap',
  // undefined
  'typeof WeakMap !== "undefined"',
  'typeof WeakMap != "undefined"',
  '"undefined" !== typeof WeakMap',
  '"undefined" != typeof WeakMap',
  // incorrect value
  'typeof WeakMap !== "string"',
  '"object" !== typeof WeakMap',
];

listTrue.forEach((code, i) => {
  test(`true #${i}`, async () => {
    is(await t(code), 'true;');
  });
});

const listFalse = [
  // function
  'typeof WeakMap !== "function"',
  'typeof WeakMap != "function"',
  '"function" !== typeof WeakMap',
  '"function" != typeof WeakMap',
  // undefined
  'typeof WeakMap === "undefined"',
  'typeof WeakMap == "undefined"',
  '"undefined" === typeof WeakMap',
  '"undefined" == typeof WeakMap',
  // incorrect value
  'typeof WeakMap === "number"',
  '"object" == typeof WeakMap',
];

listFalse.forEach((code, i) => {
  test(`false #${i}`, async () => {
    is(await t(code), 'false;');
  });
});

test.run();
