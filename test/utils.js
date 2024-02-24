import { transformAsync } from '@babel/core';

import plugin from '../dist/index.cjs';

/**
 *
 * @param {string | TemplateStringsArray} source
 * @returns {Promise<string>}
 */
export const t = async (source) => {
  const result = await transformAsync(Array.isArray(source) ? source[0] : source, {
    plugins: [plugin],
    ast: false,
    minified: true,
    babelrc: false,
    sourceMaps: false,
  });

  return result?.code ?? '';
};
