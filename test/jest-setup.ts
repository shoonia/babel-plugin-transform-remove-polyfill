import { transformAsync } from '@babel/core';
import { diffStringsUnified } from 'jest-diff';

import plugin from '../dist/index.cjs';

expect.extend({
  async toBeTransform(source, result) {
    const code = await transformAsync(source, {
      plugins: [plugin],
      ast: false,
      babelrc: false,
      sourceMaps: false,
    });

    const pass = Object.is(code?.code, result);

    return {
      pass,
      message: () => pass
        ? 'expected value not to be equal code'
        : 'expected value to be equal code\n\n' + diffStringsUnified(code?.code ?? '', result),
    };
  },
});
