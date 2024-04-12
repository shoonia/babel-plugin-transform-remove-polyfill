import { describe, test } from 'node:test';
import { expect, transform } from './setup';
import type { TransformOptions } from '../src/transformers';

const code = `
let a = typeof Object.defineProperties === 'function';
let b = Array.prototype.slice.call(x);
let c = Object.prototype.hasOwnProperty.call(e, s);
let d = Object.assign(Object.assign({}, e), o);
`;

describe('Options', () => {
  test('should work widout options', async () => {
    const result = await transform(code);

    expect(result).toBe(`let a = true;
let b = Array.prototype.slice.call(x);
let c = Object.prototype.hasOwnProperty.call(e, s);
let d = Object.assign(Object.assign({}, e), o);`
    );
  });

  test('should work with empty options', async () => {
    const result = await transform(code, {});

    expect(result).toBe(`let a = true;
let b = Array.prototype.slice.call(x);
let c = Object.prototype.hasOwnProperty.call(e, s);
let d = Object.assign(Object.assign({}, e), o);`
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
      'Object.hasOwn': false,
    },
    {
      'unsafe:Array.from': false,
      'Object.hasOwn': false,
    },
  ];

  noTransform.forEach((t, i) => {
    test(`should work with options.transform: #${i}`, async () => {
      const result = await transform(code, {
        transform: t,
      });

      expect(result).toBe(`let a = true;
let b = Array.prototype.slice.call(x);
let c = Object.prototype.hasOwnProperty.call(e, s);
let d = Object.assign(Object.assign({}, e), o);`
      );
    });
  });

  test('should transform all with true', async () => {
    const result = await transform(code, {
      transform: true,
    });

    expect(result).toBe(`let a = true;
let b = Array.from(x);
let c = Object.hasOwn(e, s);
let d = Object.assign({}, e, o);`
    );
  });

  test('should transform all', async () => {
    const result = await transform(code, {
      transform: {
        'unsafe:Array.from': true,
        'Object.hasOwn': true,
        'optimize:Object.assign': true,
      },
    });

    expect(result).toBe(`let a = true;
let b = Array.from(x);
let c = Object.hasOwn(e, s);
let d = Object.assign({}, e, o);`
    );
  });

  test('should transform only `Object.hasOwn`', async () => {
    const result = await transform(code, {
      transform: {
        'Object.hasOwn': true,
      },
    });

    expect(result).toBe(`let a = true;
let b = Array.prototype.slice.call(x);
let c = Object.hasOwn(e, s);
let d = Object.assign(Object.assign({}, e), o);`
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
let c = Object.prototype.hasOwnProperty.call(e, s);
let d = Object.assign(Object.assign({}, e), o);`
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
let c = Object.prototype.hasOwnProperty.call(e, s);
let d = Object.assign({}, e, o);`
    );
  });
});
