import js from '@eslint/js';
import { defineConfig } from '@eslint/config-helpers';
import ts from 'typescript-eslint';

export default defineConfig(
  {
    ignores: [
      'dist',
      'e2e',
    ],
  },
  js.configs.recommended,
  ts.configs.recommended,
  {
    rules: {
      'semi': 'error',
      'no-extra-semi': 'error',
      'require-await': 'error',
      'comma-dangle': [
        'error',
        'always-multiline',
      ],
      'quotes': [
        'error',
        'single',
      ],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'no-else-return': 'error',
      'no-trailing-spaces': 'error',
      'no-use-before-define': 'error',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 0,
        },
      ],
    },
  },
);
