import { describe, test } from 'node:test';
import { expect } from './setup.ts';

import { keys } from '../src/keys.ts';

describe('Keys', () => {
  for (const [constructorName, methodNames] of keys) {
    describe(constructorName, () => {
      for (const methodName of methodNames) {
        test(methodName, () => {
          // @ts-expect-error Test
          expect(typeof globalThis[constructorName][methodName]).toBe('function');
        });
      }
    });
  }
});
