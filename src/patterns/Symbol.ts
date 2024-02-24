import type t from '@babel/types'

import { isMatch } from '../isMatch';

// Symbol

const pStringFunction: t.StringLiteral = {
  type: 'StringLiteral',
  value: 'function'
};

const pTypeofSymbol: t.UnaryExpression = {
  type: 'UnaryExpression',
  operator: 'typeof',
  prefix: true,
  argument: {
    type: 'Identifier',
    name: 'Symbol'
  }
};

// Symbol.iterator

const pStringSymbol: t.StringLiteral = {
  type: 'StringLiteral',
  value: 'symbol'
};

const pTypeofSymbolIterator: t.UnaryExpression = {
  type: 'UnaryExpression',
  operator: 'typeof',
  prefix: true,
  argument: {
    type: 'MemberExpression',
    object: {
      type: 'Identifier',
      name: 'Symbol'
    },
    computed: false,
    property: {
      type: 'Identifier',
      name: 'iterator'
    }
  }
};

export const typeofSymbol = (node: t.BinaryExpression) =>
  isMatch(node.right, pTypeofSymbol) && isMatch(node.left, pStringFunction) ||
  isMatch(node.left, pTypeofSymbol) && isMatch(node.right, pStringFunction);

export const typeofSymbolIterator = (node: t.BinaryExpression) =>
  isMatch(node.right, pTypeofSymbolIterator) && isMatch(node.left, pStringSymbol) ||
  isMatch(node.left, pTypeofSymbolIterator) && isMatch(node.right, pStringSymbol);
