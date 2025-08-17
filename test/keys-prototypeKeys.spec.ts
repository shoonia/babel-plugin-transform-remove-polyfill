import { describe, test } from 'node:test';
import { expect } from './setup.ts';

import { prototypeKeys } from '../src/keys.ts';

describe('Prototype Methods', () => {
  for (const [constructorName, methodNames] of prototypeKeys) {
    describe(`${constructorName}.prototype`, () => {
      for (const methodName of methodNames) {
        test(methodName, () => {
          // @ts-expect-error Test
          expect(typeof globalThis[constructorName]['prototype'][methodName]).toBe('function');
        });
      }
    });
  }
});
