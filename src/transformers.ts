import t from '@babel/types';

export type TransformOptions = boolean | null | undefined | Readonly<{
  'Object.hasOwn'?: unknown;
  'Array.from'?: unknown;
  'optimize:Object.assign'?: unknown;
}>;

export interface Options {
  readonly transform?: TransformOptions;
}

type Transformer = (node: t.CallExpression) => boolean;

export const transformerCallExpression = (options?: TransformOptions): Transformer[] => {
  if (options == null || options === false) {
    return [];
  }

  const useAll = options === true;

  const isObjectHasOwn = t.buildMatchMemberExpression('Object.prototype.hasOwnProperty.call', false);
  const isArraySlice = t.buildMatchMemberExpression('Array.prototype.slice.call', false);
  const isObjectAssign = t.buildMatchMemberExpression('Object.assign', false);

  const memberExpression = (object: string, property: string) =>
    t.memberExpression(
      t.identifier(object),
      t.identifier(property),
      false,
      false,
    );

  return [
    (useAll || !!options['Object.hasOwn']) && ((node: t.CallExpression) => {
      if (node.arguments.length === 2 && isObjectHasOwn(node.callee)) {
        node.callee = memberExpression('Object', 'hasOwn');
        return true;
      }

      return false;
    }),

    (useAll || !!options['Array.from']) && ((node: t.CallExpression) => {
      if (isArraySlice(node.callee) && t.isIdentifier(node.arguments[0], null)) {
        if (node.arguments.length === 1) {
          node.callee = memberExpression('Array', 'from');
        } else if (
          node.arguments.length === 2 &&
          t.isNumericLiteral(node.arguments[1], { value: 0 })
        ) {
          node.callee = memberExpression('Array', 'from');
          node.arguments.pop();
        }

        return true;
      }

      return false;
    }),

    (useAll || !!options['optimize:Object.assign']) && ((node: t.CallExpression) => {
      if (node.arguments.length > 1 && isObjectAssign(node.callee)) {
        const arg = node.arguments[0];

        if (t.isCallExpression(arg, null) && isObjectAssign(arg.callee)) {
          node.arguments.splice(0, 1, ...arg.arguments);
        }

        return true;
      }

      return false;
    }),
  ].filter((t): t is Transformer => typeof t === 'function');
};
