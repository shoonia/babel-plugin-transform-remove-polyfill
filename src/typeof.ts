import type { Node, Expression, UnaryExpression, BinaryExpression } from '@babel/types';

type Result = {
  readonly match: true;
  readonly target: Expression;
  readonly expect: string;
} | {
  readonly match: false
};

const equalities = new Set<BinaryExpression['operator']>([
  '==',
  '===',
  '!=',
  '!==',
]);

const isTypeof = (node: Node): node is UnaryExpression =>
  node.type === 'UnaryExpression' && node.operator === 'typeof' && node.prefix;

export const matchTypeof = (node: BinaryExpression): Result => {
  if (equalities.has(node.operator)) {
    if (isTypeof(node.left) && node.right.type === 'StringLiteral') {
      return {
        match: true,
        target: node.left.argument,
        expect: node.right.value,
      };
    }

    if (isTypeof(node.right) && node.left.type === 'StringLiteral') {
      return {
        match: true,
        target: node.right.argument,
        expect: node.left.value,
      };
    }
  }

  return {
    match: false,
  };
};
