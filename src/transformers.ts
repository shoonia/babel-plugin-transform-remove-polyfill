import t from '@babel/types';

export interface TransformOptions {
  readonly 'Object.hasOwn'?: unknown
}

export interface Options {
  readonly transform?: TransformOptions;
}

type Transformer = (node: t.CallExpression) => boolean;

export const transformerCallExpression = (options?: TransformOptions): Transformer[] => {
  if (options == null) {
    return [];
  }

  const isObjectHasOwn = t.buildMatchMemberExpression('Object.prototype.hasOwnProperty.call', false);

  return [
    !!options['Object.hasOwn'] && ((node: t.CallExpression) => {
      if (
        isObjectHasOwn(node.callee) &&
        node.arguments.length === 2 &&
        node.arguments.every((a) => t.isIdentifier(a, null))
      ) {
        node.callee = t.memberExpression(
          t.identifier('Object'),
          t.identifier('hasOwn'),
          false,
          false,
        );

        return true;
      }

      return false;
    }),
  ].filter((i): i is Transformer => i !== false);
};
