import { describe, test } from 'node:test';
import { expect } from './setup.ts';

import { builtInMember } from '../src/keys.ts';

describe('Built-in Members', () => {
  for (const memberName of builtInMember) {
    test(memberName, () => {
      // @ts-expect-error Test
      expect(typeof globalThis[memberName]).toBe('object');
    });
  }
});
