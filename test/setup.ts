import { strictEqual, fail } from 'node:assert/strict';
import { transformAsync } from '@babel/core';

// @ts-expect-error Get from dist
import plugin from '../dist/index.cjs';

export const expect = <T>(actual: T) => ({
  toBe: (expected: T) =>
    strictEqual<T>(expected, actual),

  toBeTransform: async (expected: T): Promise<void> => {
    if (typeof actual !== 'string') {
      return fail();
    }

    const result = await transformAsync(actual, {
      plugins: [plugin],
      ast: false,
      babelrc: false,
      sourceMaps: false,
    });

    return strictEqual(expected, result?.code);
  },
} as const);
