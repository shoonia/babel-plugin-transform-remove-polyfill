import { strictEqual, fail } from 'node:assert/strict';
import { transformAsync } from '@babel/core';

import type { Options } from '../src/transformers';
// @ts-expect-error Get from dist
import removePolyfillPlugin from '../dist/index.cjs';

const options: Options = {
  transform: {
    'Object.hasOwn': true,
    'Array.from': true,
  },
};

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
          options,
        ],
      ],
      ast: false,
      babelrc: false,
      sourceMaps: false,
    });

    return strictEqual(expected, result?.code);
  },
} as const);
