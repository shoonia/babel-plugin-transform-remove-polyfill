import { strictEqual, fail } from 'node:assert/strict';
import { transformAsync } from '@babel/core';
import type { File } from '@babel/types';

import type { Options } from '../src/transformers';
import plugin from '../src/index.ts';

export const transform = async (code: string, options?: Options): Promise<string> => {
  const result = await transformAsync(code, {
    plugins: [
      options
        ? [plugin, options]
        : plugin,
    ],
    code: true,
    ast: false,
    babelrc: false,
    configFile: false,
    comments: false,
    sourceMaps: false,
  });

  return result!.code!;
};

export const parseAst = async (code: string): Promise<File> => {
  const result = await transformAsync(code, {
    plugins: [],
    code: false,
    ast: true, // Return the AST
    babelrc: false,
    configFile: false,
    comments: false,
    sourceMaps: false,
  });

  return result!.ast!;
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

    return strictEqual(code, expected);
  },
} as const);
