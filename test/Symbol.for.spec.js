import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('Symbol.for');

test('Symbol.for to true', async () => {
  is(
    await t`Symbol.for && Symbol.for("react.forward_ref")`,
    'true && Symbol.for("react.forward_ref");'
  );
});

test('Symbol.for to true #2', async () => {
  is(
    await t`var c = Symbol.for && Symbol.for("react.forward_ref") || 3911;`,
    'var c = true && Symbol.for("react.forward_ref") || 3911;'
  );
});

test.run();
