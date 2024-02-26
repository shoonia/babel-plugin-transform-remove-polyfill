import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('Symbol');

const listTrue = [
  // function
  'typeof Symbol === "function"',
  'typeof Symbol == "function"',
  '"function" === typeof Symbol',
  '"function" == typeof Symbol',
  // undefined
  'typeof Symbol !== "undefined"',
  'typeof Symbol != "undefined"',
  '"undefined" !== typeof Symbol',
  '"undefined" != typeof Symbol',
  // call
  'typeof Symbol() == "symbol"',
  'typeof Symbol() === "symbol"',
  '"symbol" == typeof Symbol()',
  '"symbol" === typeof Symbol()',
  // incorrect value
  'typeof Symbol !== "string"',
  '"object" !== typeof Symbol',
  '"object" != typeof Symbol',
];

listTrue.forEach((code, i) => {
  test(`true #${i}`, async () => {
    is(await t(code), 'true;');
  });
});

const listFalse = [
  // function
  'typeof Symbol !== "function"',
  'typeof Symbol != "function"',
  '"function" !== typeof Symbol',
  '"function" != typeof Symbol',
  // undefined
  'typeof Symbol === "undefined"',
  'typeof Symbol == "undefined"',
  '"undefined" === typeof Symbol',
  '"undefined" == typeof Symbol',
  // call
  'typeof Symbol() != "symbol"',
  'typeof Symbol() !== "symbol"',
  '"symbol" != typeof Symbol()',
  '"symbol" !== typeof Symbol()',
  // incorrect value
  '"object" == typeof Symbol',
  'typeof Symbol == "object"',
  'typeof Symbol === "object"',
];

listFalse.forEach((code, i) => {
  test(`false #${i}`, async () => {
    is(await t(code), 'false;');
  });
});

const ternaryList = [
  'typeof Symbol === "function" ? Symbol : Polyfill',
  'typeof Symbol !== "function" Polyfill : Symbol',
  'typeof Symbol !== "undefined" ? Symbol : Polyfill',
  'typeof Symbol === "undefined" ? Polyfill : Symbol',
  // ==
  'typeof Symbol == "function" ? Symbol : Polyfill',
  'typeof Symbol != "function" Polyfill : Symbol',
  'typeof Symbol != "undefined" ? Symbol : Polyfill',
  'typeof Symbol == "undefined" ? Polyfill : Symbol',
  // ..
  '"function" === typeof Symbol ? Symbol : Polyfill',
  '"function" !== typeof Symbol Polyfill : Symbol',
  '"undefined" !== typeof Symbol ? Symbol : Polyfill',
  '"undefined" === typeof Symbol ? Polyfill : Symbol',
];

ternaryList.forEach((code, i) => {
  test(`ternary operator #${i}`, async () => {
    is(await t(code), 'Symbol;');
  });
});

test.run();
