import { describe, test } from 'node:test';
import { expect } from './setup.ts';

import { builtInConstructor } from '../src/keys.ts';

describe('Built-in Constructors', () => {
  for (const constructorName of builtInConstructor) {
    test(constructorName, () => {
      // @ts-expect-error Test
      expect(typeof globalThis[constructorName]).toBe('function');
    });
  }
});
