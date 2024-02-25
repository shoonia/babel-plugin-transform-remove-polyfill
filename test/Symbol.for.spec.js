import { test } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

test('Symbol.for to true', async () => {
  is(
    await t`Symbol.for && Symbol.for("react.forward_ref")`,
    'true && Symbol.for("react.forward_ref");'
  );
});

test.run();
