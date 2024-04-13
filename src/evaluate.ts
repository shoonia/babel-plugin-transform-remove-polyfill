import t from '@babel/types';

import {
  keys,
  prototypeKeys,
  functionGroup,
  isBuiltInMember,
  isWellKnownSymbol,
} from './keys';
import { isPrototypeMember, isTypeof, isUndefined } from './utils';

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

export const evaluate = (node: t.BinaryExpression): boolean | null => {
  if (equalities.has(node.operator)) {
    const tyof = matchTypeof(node);

    if (tyof.match) {
      if (functionGroup(tyof.target)) {
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
  } else if (node.operator === 'in' && t.isStringLiteral(node.left, null)) {
    if (t.isIdentifier(node.right, null)) {
      if (keys.get(node.right.name)?.has(node.left.value) === true) {
        return true;
      }
    } else if (isPrototypeMember(node.right)) {
      if (prototypeKeys.get(node.right.object.name)?.has(node.left.value) === true) {
        return true;
      }
    }
  }

  return null;
};
