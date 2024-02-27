import { t } from './utils.js';

describe('Object.getOwnPropertyDescriptors', () => {
  it('tranfrom #0', async () => {
    expect(
      await t`if (Object.getOwnPropertyDescriptors) {}`,
    ).toBe('if (true) {}');
  });

  it('tranfrom #1', async () => {
    expect(
      await t`Object.getOwnPropertyDescriptors || A`,
    ).toBe('Object.getOwnPropertyDescriptors;');
  });

  it('tranfrom #2', async () => {
    expect(
      await t`Object.getOwnPropertyDescriptors && A`,
    ).toBe('A;');
  });

  it('tranfrom #3', async () => {
    expect(
      await t`Object.getOwnPropertyDescriptors ? A : B`,
    ).toBe('A;');
  });
});
