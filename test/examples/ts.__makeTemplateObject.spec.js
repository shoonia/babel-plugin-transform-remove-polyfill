import { t } from '../utils.js';

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

test('typescript: __makeTemplateObject', async () => {
  expect(await t(code)).toBe(result);
});
