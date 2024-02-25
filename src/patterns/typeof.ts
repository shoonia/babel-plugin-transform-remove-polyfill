import type { Node, UnaryExpression, BinaryExpression } from '@babel/types';

const isTypeof = (node: Node): node is UnaryExpression =>
  node.type === 'UnaryExpression' && node.operator === 'typeof' && node.prefix;

export const matchTypeof = (node: BinaryExpression) => {
  if (isTypeof(node.left)) {
    return {
      match: true,
      target: node.left.argument,
      expect: node.right,
    } as const;
  }

  if (isTypeof(node.right)) {
    return {
      match: true,
      target: node.right.argument,
      expect: node.left,
    } as const;
  }

  return {
    match: false,
  } as const;
};
