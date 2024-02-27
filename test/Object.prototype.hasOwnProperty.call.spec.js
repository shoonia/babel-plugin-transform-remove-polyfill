import { t } from './utils.js';

describe('Object.prototype.hasOwnProperty.call', () => {
  it.skip('transform', async () => {
    expect(
      await t`Object.prototype.hasOwnProperty.call(e, s)`,
    ).toBe('Object.hasOwn(e, s);');
  });

  it.skip('NO transform', async () => {
    const code = 'obj.hasOwnProperty(a);';

    expect(await t(code)).toBe(code);
  });
});
