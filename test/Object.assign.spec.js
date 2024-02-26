import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('Object.assign');

test('tranfrom', async () => {
  is(
    await t`var x = Object.assign || function () {}`,
    'var x = Object.assign;'
  );
});

test.run();
