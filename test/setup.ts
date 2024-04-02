import { strictEqual } from 'node:assert/strict';
import { transformAsync } from '@babel/core';

import plugin from '../src';

export const expect = (actual: string) => ({
  toBeTransform: async (expected: string) => {
    const result = await transformAsync(actual, {
      plugins: [plugin],
      ast: false,
      babelrc: false,
      sourceMaps: false,
    });

    return strictEqual(expected, result?.code);
  },
});
