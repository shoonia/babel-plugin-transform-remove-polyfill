import { strictEqual, fail } from 'node:assert/strict';
import { transformAsync } from '@babel/core';

import type { Options } from '../src/transformers';
// @ts-expect-error Get from dist
import removePolyfillPlugin from '../dist/index.cjs';

export const transform = async (code: string, options?: Options) => {
  const result = await transformAsync(code, {
    plugins: [
      options
        ? [removePolyfillPlugin, options]
        : removePolyfillPlugin,
    ],
    ast: false,
    babelrc: false,
    sourceMaps: false,
  });

  return result?.code ?? '';
};

export const expect = <T>(actual: T) => ({
  toBe: (expected: T) =>
    strictEqual<T>(expected, actual),

  toBeTransform: async (expected: T): Promise<void> => {
    if (typeof actual !== 'string') {
      return fail();
    }

    const code = await transform(actual, {
      transform: true,
    });

    return strictEqual(expected, code);
  },
} as const);
