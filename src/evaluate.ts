import type t from '@babel/types';

import type { GlobalIdentifier } from './GlobalIdentifier.ts';
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

export const evaluate = (isGlobalIdent: GlobalIdentifier, node: t.BinaryExpression): boolean | null => {
  if (equalities.has(node.operator)) {
    const tyof = matchTypeof(node);

    if (tyof.match) {
      if (functionGroup(isGlobalIdent, tyof.target)) {
        return node.operator.charCodeAt(0) === (tyof.expect === 'function' ? 61 : 33); // '=' : '!'
      }

      if (isBuiltInMember(isGlobalIdent, tyof.target)) {
        return node.operator.charCodeAt(0) === (tyof.expect === 'object' ? 61 : 33); // '=' : '!'
      }

      if (isWellKnownSymbol(isGlobalIdent, tyof.target)) {
        return node.operator.charCodeAt(0) === (tyof.expect === 'symbol' ? 61 : 33); // '=' : '!'
      }
    } else if (
      isUndefined(node.left) && functionGroup(isGlobalIdent, node.right) ||
      isUndefined(node.right) && functionGroup(isGlobalIdent, node.left)
    ) {
      return node.operator.charCodeAt(0) === 33; // '!'
    }
  } else if (node.operator === 'in' && isString(node.left)) {
    const key = node.left.value;

    if (isIdent(node.right)) {
      if (keys.get(node.right.name)?.has(key)) {
        return isGlobalIdent(node.right);
      }
    } else if (isPrototype(node.right)) {
      const name = node.right.object.name;

      if (prototypeKeys.get(name)?.has(key)) {
        return isGlobalIdent(node.right.object);
      }

      if (name === 'Symbol' && key === 'description') {
        return isGlobalIdent(node.right.object);
      }
    }
  }

  return null;
};
