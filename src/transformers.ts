import type { types as t } from '@babel/core';

import { matchesPattern } from './utils.ts';
import type { GlobalIdentifier } from './GlobalIdentifier.ts';

export type TransformOptions = boolean | null | undefined | Readonly<{
  'optimize:Object.assign'?: unknown;
}>;

export interface Options {
  readonly transform?: TransformOptions;
  readonly globalObjects?: string[];
  readonly globalFunctions?: string[];
}

type Transformer = (ident: GlobalIdentifier, node: t.CallExpression) => boolean;

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
    (ident, node) => {
      if (node.arguments.length === 2 && isObjectHasOwn(node.callee) && ident.isGlobal(node.callee.object)) {
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

  if (useAll || !!options['optimize:Object.assign']) {
    const isObjectAssign = matchesPattern('Object.assign');

    transformers.push((ident, node) => {
      if (node.arguments.length > 1 && isObjectAssign(node.callee) && ident.isGlobal(node.callee.object)) {
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
