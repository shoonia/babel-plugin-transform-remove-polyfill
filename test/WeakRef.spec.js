import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('WeakRef');

const listTrue = [
  // function
  'typeof WeakRef === "function"',
  'typeof WeakRef == "function"',
  '"function" === typeof WeakRef',
  '"function" == typeof WeakRef',
  // undefined
  'typeof WeakRef !== "undefined"',
  'typeof WeakRef != "undefined"',
  '"undefined" !== typeof WeakRef',
  '"undefined" != typeof WeakRef',
  // incorrect value
  'typeof WeakRef !== "string"',
  '"object" !== typeof WeakRef',
];

listTrue.forEach((code, i) => {
  test(`true #${i}`, async () => {
    is(await t(code), 'true;');
  });
});

const listFalse = [
  // function
  'typeof WeakRef !== "function"',
  'typeof WeakRef != "function"',
  '"function" !== typeof WeakRef',
  '"function" != typeof WeakRef',
  // undefined
  'typeof WeakRef === "undefined"',
  'typeof WeakRef == "undefined"',
  '"undefined" === typeof WeakRef',
  '"undefined" == typeof WeakRef',
  // incorrect value
  'typeof WeakRef === "number"',
  '"object" == typeof WeakRef',
];

listFalse.forEach((code, i) => {
  test(`false #${i}`, async () => {
    is(await t(code), 'false;');
  });
});

test.run();
