import { t } from './utils.js';

describe('Symbol.for', () => {
  it('remove', async () => {
    expect(
      await t`Symbol.for && Symbol.for("react.forward_ref")`,
    ).toBe('Symbol.for("react.forward_ref");');
  });

  it('remove #2', async () => {
    expect(
      await t`var c = Symbol.for && Symbol.for("react.forward_ref") || 3911;`,
    ).toBe('var c = Symbol.for("react.forward_ref") || 3911;');
  });
});
