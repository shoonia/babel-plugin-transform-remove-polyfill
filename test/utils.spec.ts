import { describe, test } from 'node:test';
import { expect } from './setup';

import {
  arrayProtoKeys,
  stringProtoKeys,
  objectKeys,
  symbolKeys,
  arrayKeys,
  reflectKeys,
  mathKeys,
} from '../src/utils';

describe('Keys: Array', () => {
  arrayKeys.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Array[key]).toBe('function');
    });
  });
});

describe('Keys: Array.prototype', () => {
  arrayProtoKeys.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Array.prototype[key]).toBe('function');
    });
  });
});

describe('Keys: String.prototype', () => {
  stringProtoKeys.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof String.prototype[key]).toBe('function');
    });
  });
});

describe('Keys: Symbol', () => {
  symbolKeys.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Symbol[key]).toBe('function');
    });
  });
});

describe('Keys: Reflect', () => {
  reflectKeys.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Reflect[key]).toBe('function');
    });
  });
});

describe('Keys: Math', () => {
  mathKeys.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Math[key]).toBe('function');
    });
  });
});

describe('Object', () => {
  objectKeys.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Object[key]).toBe('function');
    });
  });
});
