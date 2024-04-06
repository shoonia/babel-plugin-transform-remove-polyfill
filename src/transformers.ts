import t from '@babel/types';

export interface TransformOptions {
  readonly 'Object.hasOwn'?: unknown;
  readonly 'Array.from'?: unknown;
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
  const isArraySlice = t.buildMatchMemberExpression('Array.prototype.slice.call', false);

  const memberExpression = (object: string, property: string) =>
    t.memberExpression(
      t.identifier(object),
      t.identifier(property),
      false,
      false,
    );

  return [
    !!options['Object.hasOwn'] && ((node: t.CallExpression) => {
      if (
        isObjectHasOwn(node.callee) &&
        node.arguments.length === 2 &&
        node.arguments.every((a) => t.isIdentifier(a, null))
      ) {
        node.callee = memberExpression('Object', 'hasOwn');
        return true;
      }

      return false;
    }),

    !!options['Array.from'] && ((node: t.CallExpression) => {
      if (
        isArraySlice(node.callee) &&
        node.arguments.length === 1 &&
        node.arguments.every((a) => t.isIdentifier(a, null))
      ) {
        node.callee = memberExpression('Array', 'from');
        return true;
      }

      return false;
    }),
  ].filter((i): i is Transformer => i !== false);
};
