import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('Symbol.for');

test('remove', async () => {
  is(
    await t`Symbol.for && Symbol.for("react.forward_ref")`,
    'Symbol.for("react.forward_ref");'
  );
});

test('remove #2', async () => {
  is(
    await t`var c = Symbol.for && Symbol.for("react.forward_ref") || 3911;`,
    'var c = Symbol.for("react.forward_ref") || 3911;'
  );
});

test.run();
