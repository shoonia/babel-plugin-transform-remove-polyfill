import t from '@babel/types';

type Result = {
  readonly match: true;
  readonly target: t.Expression;
  readonly expect: string;
} | {
  readonly match: false
};

const equalities = new Set<t.BinaryExpression['operator']>([
  '==',
  '===',
  '!=',
  '!==',
]);

const isTypeof = (node: t.Node): node is t.UnaryExpression =>
  t.isUnaryExpression(node, { operator: 'typeof', prefix: true });

export const matchTypeof = (node: t.BinaryExpression): Result => {
  if (equalities.has(node.operator)) {
    if (isTypeof(node.left) && t.isStringLiteral(node.right)) {
      return {
        match: true,
        target: node.left.argument,
        expect: node.right.value,
      };
    }

    if (isTypeof(node.right) && t.isStringLiteral(node.left)) {
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
