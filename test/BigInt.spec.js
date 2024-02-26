import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('BigInt');

const listTrue = [
  // function
  'typeof BigInt === "function"',
  'typeof BigInt == "function"',
  '"function" === typeof BigInt',
  '"function" == typeof BigInt',
  // undefined
  'typeof BigInt !== "undefined"',
  'typeof BigInt != "undefined"',
  '"undefined" !== typeof BigInt',
  '"undefined" != typeof BigInt',
  // incorrect value
  'typeof BigInt !== "number"',
  '"object" != typeof BigInt',
];

listTrue.forEach((code, i) => {
  test(`true #${i}`, async () => {
    is(await t(code), 'true;');
  });
});

const listFalse = [
  // function
  'typeof BigInt !== "function"',
  'typeof BigInt != "function"',
  '"function" !== typeof BigInt',
  '"function" != typeof BigInt',
  // undefined
  'typeof BigInt === "undefined"',
  'typeof BigInt == "undefined"',
  '"undefined" === typeof BigInt',
  '"undefined" == typeof BigInt',
  // incorrect value
  'typeof BigInt === "number"',
  '"object" == typeof BigInt',
];

listFalse.forEach((code, i) => {
  test(`false #${i}`, async () => {
    is(await t(code), 'false;');
  });
});

const ternaryList = [
  'typeof BigInt === "function" ? BigInt : Polyfill',
  'typeof BigInt !== "function" Polyfill : BigInt',
  'typeof BigInt !== "undefined" ? BigInt : Polyfill',
  'typeof BigInt === "undefined" ? Polyfill : BigInt',
  // ==
  'typeof BigInt == "function" ? BigInt : Polyfill',
  'typeof BigInt != "function" Polyfill : BigInt',
  'typeof BigInt != "undefined" ? BigInt : Polyfill',
  'typeof BigInt == "undefined" ? Polyfill : BigInt',
  // ..
  '"function" === typeof BigInt ? BigInt : Polyfill',
  '"function" !== typeof BigInt Polyfill : BigInt',
  '"undefined" !== typeof BigInt ? BigInt : Polyfill',
  '"undefined" === typeof BigInt ? Polyfill : BigInt',
];

ternaryList.forEach((code, i) => {
  test(`ternary operator #${i}`, async () => {
    is(await t(code), 'BigInt;');
  });
});

test.run();
