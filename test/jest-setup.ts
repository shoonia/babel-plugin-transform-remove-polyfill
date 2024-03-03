// eslint-disable-next-line
// @ts-nocheck
import { transformAsync } from '@babel/core';
import { diffStringsUnified } from 'jest-diff';

import plugin from '..';

const transform = (source, options) =>
  transformAsync(source, {
    plugins: [options ? [plugin, options] : plugin],
    ast: false,
    babelrc: false,
    sourceMaps: false,
  });

expect.extend({
  async toBeTransform(source, result) {
    const code = await transform(source);

    const pass = Object.is(code?.code, result);

    return {
      pass,
      message: () => pass
        ? 'expected value not to be equal code'
        : 'expected value to be equal code\n\n' + diffStringsUnified(code?.code ?? '', result),
    };
  },

  async toBeTransformWithExperiment(source, result) {
    const code = await transform(source, { experiment: true });

    const pass = Object.is(code?.code, result);

    return {
      pass,
      message: () => pass
        ? 'expected value not to be equal code'
        : 'expected value to be equal code\n\n' + diffStringsUnified(code?.code ?? '', result),
    };
  },
});
