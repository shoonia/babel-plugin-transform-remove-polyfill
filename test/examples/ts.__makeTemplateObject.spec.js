import { suite } from 'uvu';
import { is } from 'uvu/assert';

import { t } from '../utils.js';

const test = suite('typescript: __makeTemplateObject');

const code =
`function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, 'raw', {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}`;

const result =
`function __makeTemplateObject(cooked, raw) {
  if (true) {
    Object.defineProperty(cooked, 'raw', {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}`;

test('transform', async () => {
  is(await t(code), result);
});

test.run();
