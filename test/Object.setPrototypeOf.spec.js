import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('Object.setPrototypeOf');

test('tranfrom', async () => {
  is(
    await t`Object.setPrototypeOf || ((e,t)=>(e.__proto__ = t, e))`,
    'Object.setPrototypeOf;'
  );
});

test.run();
