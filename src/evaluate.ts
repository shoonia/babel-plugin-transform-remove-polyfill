import type t from '@babel/types';

import {
  keys,
  prototypeKeys,
  KeyChecker,
  regExpPrototypeKeys,
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

export const evaluate = (checker: KeyChecker, node: t.BinaryExpression): boolean | null => {
  const operator = node.operator;

  if (equalities.has(operator)) {
    const tyof = matchTypeof(node);

    if (tyof.match) {
      if (checker.functionGroup(tyof.target)) {
        return operator.charCodeAt(0) === (tyof.expect === 'function' ? 61 : 33); // '=' : '!'
      }

      if (checker.isBuiltInMember(tyof.target)) {
        return operator.charCodeAt(0) === (tyof.expect === 'object' ? 61 : 33); // '=' : '!'
      }

      if (checker.isWellKnownSymbol(tyof.target)) {
        return operator.charCodeAt(0) === (tyof.expect === 'symbol' ? 61 : 33); // '=' : '!'
      }
    } else if (
      isUndefined(node.left) && checker.functionGroup(node.right) ||
      isUndefined(node.right) && checker.functionGroup(node.left)
    ) {
      return operator.charCodeAt(0) === 33; // '!'
    }
  } else if (operator === 'in' && isString(node.left)) {
    const key = node.left.value;

    if (isIdent(node.right)) {
      if (keys.get(node.right.name)?.has(key)) {
        return checker.isGlobalIdent(node.right);
      }
    } else if (isPrototype(node.right)) {
      const name = node.right.object.name;

      switch (true) {
        case prototypeKeys.get(name)?.has(key):
        case name === 'Symbol' && key === 'description':
        case name === 'RegExp' && regExpPrototypeKeys.has(key): {
          return checker.isGlobalIdent(node.right.object);
        }
      }
    }
  }

  return null;
};
