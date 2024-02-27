import { t } from './utils.js';

describe('Object.assign', () => {
  it('tranfrom #0', async () => {
    expect(
      await t`if (Object.assign) {}`,
    ).toBe('if (true) {}');
  });

  it('tranfrom #1', async () => {
    expect(
      await t`Object.assign || A`,
    ).toBe('Object.assign;');
  });

  it('tranfrom #2', async () => {
    expect(
      await t`Object.assign && A`,
    ).toBe('A;');
  });

  it('tranfrom #3', async () => {
    expect(
      await t`Object.assign ? A : B`,
    ).toBe('A;');
  });
});
