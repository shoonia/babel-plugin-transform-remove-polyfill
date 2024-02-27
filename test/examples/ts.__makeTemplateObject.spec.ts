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

export const result =
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
  await expect(code).toBeTransform(result);
});
