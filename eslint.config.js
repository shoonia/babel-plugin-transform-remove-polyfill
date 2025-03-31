import js from '@eslint/js';
import ts from 'typescript-eslint';

export default ts.config(
  {
    ignores: [
      'dist',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    rules: {
      'semi': 'error',
      'no-extra-semi': 'error',
      'require-await': 'error',
      'comma-dangle': [
        'error',
        'always-multiline',
      ],
      'indent': [
        'error',
        2,
        {
          'SwitchCase': 1,
        },
      ],
      'quotes': [
        'error',
        'single',
      ],
      'space-before-function-paren': [
        'error',
        {
          'anonymous': 'always',
          'named': 'never',
          'asyncArrow': 'always',
        },
      ],
      'no-else-return': 'error',
      'no-trailing-spaces': 'error',
      'no-use-before-define': 'error',
      'no-multiple-empty-lines': [
        'error',
        {
          'max': 1,
          'maxBOF': 0,
          'maxEOF': 0,
        },
      ],
    },
  },
);
