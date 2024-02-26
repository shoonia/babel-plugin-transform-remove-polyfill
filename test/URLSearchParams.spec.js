import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('URLSearchParams');

const listTrue = [
  // function
  'typeof URLSearchParams === "function"',
  'typeof URLSearchParams == "function"',
  '"function" === typeof URLSearchParams',
  '"function" == typeof URLSearchParams',
  // undefined
  'typeof URLSearchParams !== "undefined"',
  'typeof URLSearchParams != "undefined"',
  '"undefined" !== typeof URLSearchParams',
  '"undefined" != typeof URLSearchParams',
  // incorrect value
  'typeof URLSearchParams !== "number"',
  '"object" != typeof URLSearchParams',
];

listTrue.forEach((code, i) => {
  test(`true #${i}`, async () => {
    is(await t(code), 'true;');
  });
});

const listFalse = [
  // function
  'typeof URLSearchParams !== "function"',
  'typeof URLSearchParams != "function"',
  '"function" !== typeof URLSearchParams',
  '"function" != typeof URLSearchParams',
  // undefined
  'typeof URLSearchParams === "undefined"',
  'typeof URLSearchParams == "undefined"',
  '"undefined" === typeof URLSearchParams',
  '"undefined" == typeof URLSearchParams',
  // incorrect value
  'typeof URLSearchParams === "number"',
  '"object" == typeof URLSearchParams',
];

listFalse.forEach((code, i) => {
  test(`false #${i}`, async () => {
    is(await t(code), 'false;');
  });
});

const ternaryList = [
  'typeof URLSearchParams === "function" ? URLSearchParams : Polyfill',
  'typeof URLSearchParams !== "function" Polyfill : URLSearchParams',
  'typeof URLSearchParams !== "undefined" ? URLSearchParams : Polyfill',
  'typeof URLSearchParams === "undefined" ? Polyfill : URLSearchParams',
  // ==
  'typeof URLSearchParams == "function" ? URLSearchParams : Polyfill',
  'typeof URLSearchParams != "function" Polyfill : URLSearchParams',
  'typeof URLSearchParams != "undefined" ? URLSearchParams : Polyfill',
  'typeof URLSearchParams == "undefined" ? Polyfill : URLSearchParams',
  // ..
  '"function" === typeof URLSearchParams ? URLSearchParams : Polyfill',
  '"function" !== typeof URLSearchParams Polyfill : URLSearchParams',
  '"undefined" !== typeof URLSearchParams ? URLSearchParams : Polyfill',
  '"undefined" === typeof URLSearchParams ? Polyfill : URLSearchParams',
];

ternaryList.forEach((code, i) => {
  test(`ternary operator #${i}`, async () => {
    is(await t(code), 'URLSearchParams;');
  });
});

test.run();
