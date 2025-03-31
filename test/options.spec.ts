import { describe, test } from 'node:test';

import type { TransformOptions } from '../src/transformers';
import { expect, transform } from './setup.ts';

const code = `
let a = typeof Object.defineProperties === 'function';
let b = Array.prototype.slice.call(x);
let c = Object.assign(Object.assign({}, e), o);
let d = Object.prototype.hasOwnProperty.call(e, s);
`;

describe('Options', () => {
  test('should work widout options', async () => {
    const result = await transform(code);

    expect(result).toBe(`let a = true;
let b = Array.prototype.slice.call(x);
let c = Object.assign(Object.assign({}, e), o);
let d = Object.hasOwn(e, s);`,
    );
  });

  test('should work with empty options', async () => {
    const result = await transform(code, {});

    expect(result).toBe(`let a = true;
let b = Array.prototype.slice.call(x);
let c = Object.assign(Object.assign({}, e), o);
let d = Object.hasOwn(e, s);`,
    );
  });

  const noTransform: TransformOptions[] = [
    false,
    null,
    undefined,
    {},
    {
      'unsafe:Array.from': false,
    },
    {
      'optimize:Object.assign': false,
    },
  ];

  noTransform.forEach((t, i) => {
    test(`should work with options.transform: #${i}`, async () => {
      const result = await transform(code, {
        transform: t,
      });

      expect(result).toBe(`let a = true;
let b = Array.prototype.slice.call(x);
let c = Object.assign(Object.assign({}, e), o);
let d = Object.hasOwn(e, s);`,
      );
    });
  });

  test('should transform all with true', async () => {
    const result = await transform(code, {
      transform: true,
    });

    expect(result).toBe(`let a = true;
let b = Array.from(x);
let c = Object.assign({}, e, o);
let d = Object.hasOwn(e, s);`,
    );
  });

  test('should transform all', async () => {
    const result = await transform(code, {
      transform: {
        'unsafe:Array.from': true,
        'optimize:Object.assign': true,
      },
    });

    expect(result).toBe(`let a = true;
let b = Array.from(x);
let c = Object.assign({}, e, o);
let d = Object.hasOwn(e, s);`,
    );
  });

  test('should transform only `Array.from`', async () => {
    const result = await transform(code, {
      transform: {
        'unsafe:Array.from': true,
      },
    });

    expect(result).toBe(`let a = true;
let b = Array.from(x);
let c = Object.assign(Object.assign({}, e), o);
let d = Object.hasOwn(e, s);`,
    );
  });

  test('should transform only `optimize:Object.assign`', async () => {
    const result = await transform(code, {
      transform: {
        'optimize:Object.assign': true,
      },
    });

    expect(result).toBe(`let a = true;
let b = Array.prototype.slice.call(x);
let c = Object.assign({}, e, o);
let d = Object.hasOwn(e, s);`,
    );
  });
});
