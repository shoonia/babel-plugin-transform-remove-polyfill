import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import pkg from './package.json' with { type: 'json' };

const extensions = ['.ts'];

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.exports,
      exports: 'default',
      format: 'cjs',
    },
  ],
  external: Object.keys(pkg.peerDependencies),
  plugins: [
    babel({
      extensions,
      babelHelpers: 'bundled',
      comments: false,
      plugins: [
        'babel-plugin-transform-lhs-constants',
      ],
      presets: [
        '@babel/preset-typescript',
      ],
    }),
    nodeResolve({ extensions }),
  ],
};
