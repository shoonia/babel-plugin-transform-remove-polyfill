import t from '@babel/types';

import {
  functionGroup,
  isBuiltInConstructor,
  isBuiltInMember,
  isWellKnownSymbol,
} from './utils';

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
  t.isUnaryExpression(node, { operator: 'typeof' });

const matchTypeof = (node: t.BinaryExpression): Result => {
  if (isTypeof(node.left) && t.isStringLiteral(node.right, null)) {
    return {
      match: true,
      target: node.left.argument,
      expect: node.right.value,
    };
  }

  if (isTypeof(node.right) && t.isStringLiteral(node.left, null)) {
    return {
      match: true,
      target: node.right.argument,
      expect: node.left.value,
    };
  }

  return {
    match: false,
  };
};

const isUndefined = (node: t.Node) =>
  t.isIdentifier(node, { name: 'undefined' }) ||
  t.isUnaryExpression(node, { operator: 'void' }) && t.isNumericLiteral(node.argument, null);

export const evaluate = (node: t.BinaryExpression): boolean | null => {
  if (equalities.has(node.operator)) {
    const tyof = matchTypeof(node);

    if (tyof.match) {
      if (functionGroup(tyof.target) || isBuiltInConstructor(tyof.target)) {
        return node.operator.startsWith(tyof.expect === 'function' ? '=' : '!');
      } else if (isBuiltInMember(tyof.target)) {
        return node.operator.startsWith(tyof.expect === 'object' ? '=' : '!');
      } else if (isWellKnownSymbol(tyof.target)) {
        return node.operator.startsWith(tyof.expect === 'symbol' ? '=' : '!');
      }
    }

    if (
      isUndefined(node.left) && functionGroup(node.right) ||
      isUndefined(node.right) && functionGroup(node.left)
    ) {
      return node.operator.startsWith('!');
    }
  }

  return null;
};
