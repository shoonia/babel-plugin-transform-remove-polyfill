import { t } from './utils.js';

describe('Object.create', () => {
  it('tranfrom #0', async () => {
    expect(
      await t`if (Object.create) {}`,
    ).toBe('if (true) {}');
  });

  it('tranfrom #1', async () => {
    expect(
      await t`Object.create || A`,
    ).toBe('Object.create;');
  });

  it('tranfrom #2', async () => {
    expect(
      await t`Object.create && A`,
    ).toBe('A;');
  });

  it('tranfrom #3', async () => {
    expect(
      await t`Object.create ? A : B`,
    ).toBe('A;');
  });
});
