import { strictEqual } from 'node:assert/strict';
import { transformAsync } from '@babel/core';

// @ts-expect-error Get from dist
import plugin from '../dist/index.cjs';

export const expect = (actual: string) => ({
  toBeTransform: async (expected: string): Promise<void> => {
    const result = await transformAsync(actual, {
      plugins: [plugin],
      ast: false,
      babelrc: false,
      sourceMaps: false,
    });

    return strictEqual(expected, result?.code);
  },
});
