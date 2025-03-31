import type t from '@babel/types';

import {
  keys,
  prototypeKeys,
  functionGroup,
  isBuiltInMember,
  isWellKnownSymbol,
} from './keys.ts';
import {
  isIdent,
  isString,
  isPrototype,
  isUnary,
  isUndefined,
} from './utils.ts';

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
  if (isUnary(node.left, 'typeof')) {
    if (isString(node.right)) {
      return {
        match: true,
        target: node.left.argument,
        expect: node.right.value,
      };
    }
  } else if (isUnary(node.right, 'typeof') && isString(node.left)) {
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
      }

      if (isBuiltInMember(tyof.target)) {
        return node.operator.startsWith(tyof.expect === 'object' ? '=' : '!');
      }

      if (isWellKnownSymbol(tyof.target)) {
        return node.operator.startsWith(tyof.expect === 'symbol' ? '=' : '!');
      }
    } else if (
      isUndefined(node.left) && functionGroup(node.right) ||
      isUndefined(node.right) && functionGroup(node.left)
    ) {
      return node.operator.startsWith('!');
    }
  } else if (node.operator === 'in' && isString(node.left)) {
    if (isIdent(node.right)) {
      if (keys.get(node.right.name)?.has(node.left.value) === true) {
        return true;
      }
    } else if (isPrototype(node.right)) {
      if (prototypeKeys.get(node.right.object.name)?.has(node.left.value) === true) {
        return true;
      }
    }
  }

  return null;
};
