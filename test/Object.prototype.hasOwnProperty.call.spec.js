import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from './utils.js';

const test = suite('Object.prototype.hasOwnProperty.call');

test.skip('transform', async () => {
  is(
    await t`Object.prototype.hasOwnProperty.call(e, s)`,
    'Object.hasOwn(e, s);'
  );
});

test.skip('NO transform', async () => {
  const code = 'obj.hasOwnProperty(a);';

  is(await t(code), code);
});

test.run();
