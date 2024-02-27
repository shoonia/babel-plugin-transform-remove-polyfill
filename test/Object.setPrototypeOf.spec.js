import { t } from './utils.js';

describe('Object.setPrototypeOf', () => {
  it('tranfrom', async () => {
    expect(
      await t`Object.setPrototypeOf || ((e,t)=>(e.__proto__ = t, e))`,
    ).toBe('Object.setPrototypeOf;');
  });

  it('tranfrom #2', async () => {
    expect(
      await t`(Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)`,
    ).toBe('Object.setPrototypeOf(e, t);');
  });
});
