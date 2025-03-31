import { describe, test } from 'node:test';
import { expect } from './setup.ts';

import {
  keys,
  prototypeKeys,
  wellKnownSymbols,
} from '../src/keys.ts';

describe('Keys: Array', () => {
  keys.get('Array')!.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Array[key]).toBe('function');
    });
  });
});

describe('Keys: Array.prototype', () => {
  prototypeKeys.get('Array')!.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Array.prototype[key]).toBe('function');
    });
  });
});

describe('Keys: String.prototype', () => {
  prototypeKeys.get('String')!.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof String.prototype[key]).toBe('function');
    });
  });
});

describe('Keys: Symbol', () => {
  keys.get('Symbol')!.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Symbol[key]).toBe('function');
    });
  });
});

describe('well-known symbols', () => {
  wellKnownSymbols.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Symbol[key]).toBe('symbol');
    });
  });
});

describe('Keys: Reflect', () => {
  keys.get('Reflect')!.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Reflect[key]).toBe('function');
    });
  });
});

describe('Keys: Math', () => {
  keys.get('Math')!.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Math[key]).toBe('function');
    });
  });
});

describe('Keys: Object', () => {
  keys.get('Object')!.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Object[key]).toBe('function');
    });
  });
});

describe('Keys: Promise', () => {
  keys.get('Promise')!.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Promise[key]).toBe('function');
    });
  });
});

describe('Keys: Promise.prototype', () => {
  prototypeKeys.get('Promise')!.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Promise.prototype[key]).toBe('function');
    });
  });
});

describe('Keys: Date', () => {
  keys.get('Date')!.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Date[key]).toBe('function');
    });
  });
});

describe('Keys: Number', () => {
  keys.get('Number')!.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof Number[key]).toBe('function');
    });
  });
});

describe('Keys: JSON', () => {
  keys.get('JSON')!.forEach((key) => {
    test(key, () => {
      // @ts-expect-error Test
      expect(typeof JSON[key]).toBe('function');
    });
  });
});
