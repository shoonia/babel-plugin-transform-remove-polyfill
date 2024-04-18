import type { types as t } from '@babel/core';
import { isIdent, isNumeric, matchesPattern } from './utils';

export type TransformOptions = boolean | null | undefined | Readonly<{
  'unsafe:Array.from'?: unknown;
  'optimize:Object.assign'?: unknown;
}>;

export interface Options {
  readonly transform?: TransformOptions;
  readonly globalObjects?: string[];
  readonly globalFunctions?: string[];
}

type Transformer = (node: t.CallExpression) => boolean;

export const transformerCallExpression = (options?: TransformOptions): Transformer[] => {
  const memberExpression = (object: string, property: string): t.MemberExpression => ({
    type: 'MemberExpression',
    object: { type: 'Identifier', name: object },
    property: { type: 'Identifier', name: property },
    computed: false,
    optional: false,
  });

  const isObjectHasOwn = matchesPattern('Object.prototype.hasOwnProperty.call');
  const transformers: Transformer[] = [
    (node) => {
      if (node.arguments.length === 2 && isObjectHasOwn(node.callee)) {
        node.callee = memberExpression('Object', 'hasOwn');

        return true;
      }

      return false;
    },
  ];

  if (options == null || options === false) {
    return transformers;
  }

  const useAll = options === true;

  if (useAll || !!options['unsafe:Array.from']) {
    const isArraySlice = matchesPattern('Array.prototype.slice.call');

    transformers.push((node) => {
      if (isArraySlice(node.callee)) {
        const args = node.arguments;

        if (args.length === 1) {
          if (isIdent(args[0])) {
            node.callee = memberExpression('Array', 'from');
          }
        } else if (args.length === 2 && isIdent(args[0]) && isNumeric(args[1], 0)) {
          node.callee = memberExpression('Array', 'from');
          args.pop();
        }

        return true;
      }

      return false;
    });
  }

  if (useAll || !!options['optimize:Object.assign']) {
    const isObjectAssign = matchesPattern('Object.assign');

    transformers.push((node) => {
      if (node.arguments.length > 1 && isObjectAssign(node.callee)) {
        const arg = node.arguments[0];

        if (arg.type === 'CallExpression' && isObjectAssign(arg.callee)) {
          node.arguments.splice(0, 1, ...arg.arguments);
        }

        return true;
      }

      return false;
    });
  }

  return transformers;
};
