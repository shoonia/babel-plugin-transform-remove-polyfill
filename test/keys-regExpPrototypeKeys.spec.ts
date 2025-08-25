import { describe, test } from 'node:test';
import { expect } from './setup.ts';

import { regExpPrototypeKeys } from '../src/keys.ts';

describe('RegExp.prototype keys', () => {
  regExpPrototypeKeys.forEach((key) => {
    test(key, () => {
      expect(key in RegExp.prototype).toBe(true);
    });
  });
});
