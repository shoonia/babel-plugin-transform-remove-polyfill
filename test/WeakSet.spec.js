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
];

listFalse.forEach((code, i) => {
  test(`false #${i}`, async () => {
    is(await t(code), 'false;');
  });
});

const noTransformList = [
  'typeof WeakSet === "number";',
  'typeof WeakSet !== "string";',
  '"object" !== typeof WeakSet;',
  '"object" == typeof WeakSet;',
];

noTransformList.forEach((code, i) => {
  test(`no transform #${i}`, async () => {
    is(await t(code), code);
  });
});

test.run();
