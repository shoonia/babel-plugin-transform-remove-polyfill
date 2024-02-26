import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('WeakSet');

const listTrue = [
  // function
  'typeof WeakSet === "function"',
  'typeof WeakSet == "function"',
  '"function" === typeof WeakSet',
  '"function" == typeof WeakSet',
  // undefined
  'typeof WeakSet !== "undefined"',
  'typeof WeakSet != "undefined"',
  '"undefined" !== typeof WeakSet',
  '"undefined" != typeof WeakSet',
  // incorrect value
  'typeof WeakSet !== "number"',
  '"object" != typeof WeakSet',
];

listTrue.forEach((code, i) => {
  test(`true #${i}`, async () => {
    is(await t(code), 'true;');
  });
});

const listFalse = [
  // function
  'typeof WeakSet !== "function"',
  'typeof WeakSet != "function"',
  '"function" !== typeof WeakSet',
  '"function" != typeof WeakSet',
  // undefined
  'typeof WeakSet === "undefined"',
  'typeof WeakSet == "undefined"',
  '"undefined" === typeof WeakSet',
  '"undefined" == typeof WeakSet',
  // incorrect value
  'typeof WeakSet === "number"',
  '"object" == typeof WeakSet',
];

listFalse.forEach((code, i) => {
  test(`false #${i}`, async () => {
    is(await t(code), 'false;');
  });
});

const ternaryList = [
  'typeof WeakSet === "function" ? WeakSet : Polyfill',
  'typeof WeakSet !== "function" Polyfill : WeakSet',
  'typeof WeakSet !== "undefined" ? WeakSet : Polyfill',
  'typeof WeakSet === "undefined" ? Polyfill : WeakSet',
  // ==
  'typeof WeakSet == "function" ? WeakSet : Polyfill',
  'typeof WeakSet != "function" Polyfill : WeakSet',
  'typeof WeakSet != "undefined" ? WeakSet : Polyfill',
  'typeof WeakSet == "undefined" ? Polyfill : WeakSet',
  // ..
  '"function" === typeof WeakSet ? WeakSet : Polyfill',
  '"function" !== typeof WeakSet Polyfill : WeakSet',
  '"undefined" !== typeof WeakSet ? WeakSet : Polyfill',
  '"undefined" === typeof WeakSet ? Polyfill : WeakSet',
];

ternaryList.forEach((code, i) => {
  test(`ternary operator #${i}`, async () => {
    is(await t(code), 'WeakSet;');
  });
});

test.run();
