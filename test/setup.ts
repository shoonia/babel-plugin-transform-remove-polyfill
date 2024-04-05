import { strictEqual, fail } from 'node:assert/strict';
import { transformAsync } from '@babel/core';

// @ts-expect-error Get from dist
import removePolyfillPlugin from '../dist/index.cjs';

export const expect = <T>(actual: T) => ({
  toBe: (expected: T) =>
    strictEqual<T>(expected, actual),

  toBeTransform: async (expected: T): Promise<void> => {
    if (typeof actual !== 'string') {
      return fail();
    }

    const result = await transformAsync(actual, {
      plugins: [
        [
          removePolyfillPlugin,
          {
            transform: {
              'Object.hasOwn': true,
            },
          },
        ],
      ],
      ast: false,
      babelrc: false,
      sourceMaps: false,
    });

    return strictEqual(expected, result?.code);
  },
} as const);
