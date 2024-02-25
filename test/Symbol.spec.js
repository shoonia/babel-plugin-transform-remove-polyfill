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
];

listFalse.forEach((code, i) => {
  test(`false #${i}`, async () => {
    is(await t(code), 'false;');
  });
});

const noTransformList = [
  'typeof Symbol === "number";',
  'typeof Symbol !== "string";',
  '"object" !== typeof Symbol;',
  '"object" == typeof Symbol;',
];

noTransformList.forEach((code, i) => {
  test(`no transform #${i}`, async () => {
    is(await t(code), code);
  });
});

test.run();
