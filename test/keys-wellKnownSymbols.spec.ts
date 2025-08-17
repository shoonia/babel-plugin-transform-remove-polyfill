import { describe, test } from 'node:test';
import { expect } from './setup.ts';

import { wellKnownSymbols } from '../src/keys.ts';

describe('well-known symbols', () => {
  wellKnownSymbols.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Symbol[key]).toBe('symbol');
    });
  });
});
