import { t } from './utils.js';

describe('Object.getOwnPropertySymbols', () => {
  it('tranfrom #0', async () => {
    expect(
      await t`if (Object.getOwnPropertySymbols) {}`,
    ).toBe('if (true) {}');
  });

  it('tranfrom #0.1', async () => {
    expect(
      await t`if (Object.getOwnPropertySymbols) {} else if (Object.getOwnPropertySymbols) {}`,
    ).toBe('if (true) {} else if (true) {}');
  });

  it('tranfrom #1', async () => {
    expect(
      await t`Object.getOwnPropertySymbols || A`,
    ).toBe('Object.getOwnPropertySymbols;');
  });

  it('tranfrom #2', async () => {
    expect(
      await t`Object.getOwnPropertySymbols && A`,
    ).toBe('A;');
  });

  it('tranfrom #3', async () => {
    expect(
      await t`Object.getOwnPropertySymbols ? A : B`,
    ).toBe('A;');
  });
});
